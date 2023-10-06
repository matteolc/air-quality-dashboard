#include <Wire.h>
#include <EEPROM.h>
#include <FS.h>
#include <SPIFFS.h>
#include <Preferences.h>
#include <ArduinoJson.h>
#include <MicrocontrollerID.h>
#include <bsec.h>
#include <Adafruit_NeoPixel.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebSrv.h>
#include <DNSServer.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>

#define DEFAULT_I2C_PORT &Wire

#if defined(ARDUINO_ADAFRUIT_QTPY_ESP32S2) \
    || defined(ARDUINO_ADAFRUIT_QTPY_ESP32S3_NOPSRAM) \
    || defined(ARDUINO_ADAFRUIT_QTPY_ESP32S3) \
    || defined(ARDUINO_ADAFRUIT_QTPY_ESP32_PICO)
  #define SECONDARY_I2C_PORT &Wire1
#endif

#define BRIGHTNESS 150 // Set BRIGHTNESS to about 1/5 (max = 255)
#define STATE_SAVE_PERIOD	UINT32_C(360 * 60 * 1000) // 360 minutes - 4 times a day

#define MAX_NETWORKS_TO_SCAN 8
#define WIFICONNECTTIMEOUT 240000
#define SSID_MAX_LENGTH 31

void check_iaq_sensor_status(void);
void boot();
void setup_iaq();
void get_aqi_data();
void connect_to_wifi();
void connect_to_websocket();
void get_battery_level();
void blink_led(void);
void loadState(void);
void updateState(void);

// Access Point credentials
String scads_ssid = "";
String scads_pass = "airqualitydash";

const byte DNS_PORT = 53;
DNSServer dnsServer;
IPAddress apIP(192, 168, 4, 1);

Preferences preferences;

// local AP
AsyncWebServer server(80);
WiFiMulti wiFiMulti;
SocketIOclient socketIO;
Bsec iaqSensor;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "europe.pool.ntp.org", 3600, 60000);
#if defined(PIN_NEOPIXEL)
Adafruit_NeoPixel strip(1, PIN_NEOPIXEL, NEO_GRBW + NEO_KHZ800);
#endif

String wifi_credentials = "";

bool disconnected = false;

unsigned long wificheckMillis;
unsigned long wifiCheckTime = 5000;

enum SETUP_STATUS {
  SETUP_PENDING,
  SETUP_SERVER,
  SETUP_FINISHED
};
int current_setup_status = SETUP_PENDING;

bool isResetting = false;
unsigned long resetTime;
int resetDurationMs = 4000;

char uniqueID [50];
String location = "Living Room";
float temperature;
float humidity;
float pressure;
float iaq;
float staticIaq;
float co2Equivalent;
uint8_t co2Accuracy;
float breathVocEquivalent;
float gasResistance;
float gasPercentage;
uint8_t iaqAccuracy;
uint8_t breathVocAccuracy;
uint8_t gasPercentageAccuracy;
uint8_t staticIaqAccuracy;
float stabStatus;
float runInStatus;

unsigned long message_timestamp = 0;
unsigned long ntp_timestamp = 0;

float vbat;

const uint8_t bsec_config_iaq[] = {
#include "config/generic_33v_3s_4d/bsec_iaq.txt"
};

uint8_t bsecState[BSEC_MAX_STATE_BLOB_SIZE] = {0};
uint16_t stateUpdateCounter = 0;

bsec_virtual_sensor_t sensorList[8] = {
  BSEC_OUTPUT_RAW_TEMPERATURE,
  BSEC_OUTPUT_RAW_PRESSURE,
  BSEC_OUTPUT_RAW_HUMIDITY,
  BSEC_OUTPUT_RAW_GAS,
  BSEC_OUTPUT_STABILIZATION_STATUS,
  BSEC_OUTPUT_RUN_IN_STATUS,
  BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_TEMPERATURE,
  BSEC_OUTPUT_SENSOR_HEAT_COMPENSATED_HUMIDITY
};

bsec_virtual_sensor_t sensorIAQ[6] = {
  BSEC_OUTPUT_STATIC_IAQ,
  BSEC_OUTPUT_RAW_GAS,
  BSEC_OUTPUT_IAQ,
  BSEC_OUTPUT_CO2_EQUIVALENT,
  BSEC_OUTPUT_BREATH_VOC_EQUIVALENT,
  BSEC_OUTPUT_GAS_PERCENTAGE
};

/**
 * @brief Initializes the sensor and hardware settings
 */
void setup() {

  boot();

  preferences.begin("scads", false);
  wifi_credentials = preferences.getString("wifi", "");
  preferences.end();

  if (wifi_credentials == "") {
    scanLocalSCADS();
    current_setup_status = SETUP_SERVER;
    Serial.print("Setting up Access Point");
    createSCADSAP();
    setupCaptivePortal();
  }
  else {
    Serial.print("Last connected WiFi SSID: ");
    Serial.println(get_last_connected());
    connect_to_wifi(wifi_credentials);
    timeClient.begin();
    timeClient.update();
    connect_to_websocket();
    setup_iaq();

    current_setup_status = SETUP_FINISHED;
    Serial.println("setup complete");
  }
}

/**
 * @brief Main loop
 */
void loop() {

  switch (current_setup_status) {
    case SETUP_PENDING:
      break;
    case SETUP_SERVER:
      dnsServer.processNextRequest();
      break;
    case SETUP_FINISHED:
      main_handler();
      wifi_check();
      break;
  }

  checkReset();

}

void main_handler() {

  uint64_t now = millis();

  socketIO.loop();
  get_aqi_data();

#if defined(PIN_NEOPIXEL)
  uint32_t color = color_for_iaq(staticIaq);
  strip.setPixelColor(0, color);
  strip.show();
#endif

  if (runInStatus == 0 || stabStatus == 0) {
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else {
    digitalWrite(LED_BUILTIN, LOW);
  }

  if(now - message_timestamp > 3000) {
    message_timestamp = now;

    get_battery_level();

    String payload;
    payload = get_payload();
    Serial.println(payload);
    socketIO.sendEVENT(payload);
  }


  if(now - ntp_timestamp > 1000 * 60 * 60 * 4) {
    ntp_timestamp = now;
    timeClient.update();
  }
}

/**
 * @brief Create data payload to send on the wire
 */
String get_payload(void) {

  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("msg");

  JsonObject param1 = array.createNestedObject();
  param1["epoch"] = timeClient.getEpochTime();
  param1["uuid"] = uniqueID;
  param1["name"] = getStationName(); //name;
  param1["location"] = location;
  param1["temperature"] = temperature;
  param1["pressure"] = pressure;
  param1["humidity"] = humidity;
  param1["iaq"] = iaq;
  param1["eco2"] = co2Equivalent;
  param1["bvoc"] = breathVocEquivalent;
  param1["gasResistance"] = gasResistance;
  param1["gasPercentage"] = gasPercentage;
  param1["iaqAccuracy"] = iaqAccuracy;
  param1["co2Accuracy"] = co2Accuracy;
  param1["staticIaq"] = staticIaq;
  param1["staticIaqAccuracy"] = staticIaqAccuracy;
  param1["bvocAccuracy"] = breathVocAccuracy;
  param1["gasPercentageAccuracy"] = gasPercentageAccuracy;
  param1["stabStatus"] = stabStatus;
  param1["runInStatus"] = runInStatus;
  param1["vbat"] = vbat;

  String output;
  serializeJson(doc, output);
  return output;
}

/**
 * @brief Create boot payload to send on the wire
 */
String get_boot_payload(void) {

  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  array.add("boot");

  JsonObject param1 = array.createNestedObject();
  param1["epoch"] = timeClient.getEpochTime();
  param1["uuid"] = uniqueID;
  param1["name"] = getStationName(); // name;
  param1["location"] = location;

  String output;
  serializeJson(doc, output);
  return output;
}

/**
 * @brief Boot core functions
 */
void boot() {

  EEPROM.begin(BSEC_MAX_STATE_BLOB_SIZE + 1);

  pinMode(LED_BUILTIN, OUTPUT);
#if defined(BATT_MONITOR)
  pinMode(BATT_MONITOR, INPUT);
#endif
	Wire.begin();
	Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.println();

  for(uint8_t t = 4; t > 0; t--) {
      Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
      Serial.flush();
      delay(1000);
  }

  if(!SPIFFS.begin(false)){
    Serial.println("An Error has occurred while mounting SPIFFS");
    for (;;)
      blink_led();
  }
  else {
    File file = SPIFFS.open("/index.html");
    if (!file || file.isDirectory()) {
      Serial.println("- failed to open file for reading");
      for (;;)
        blink_led();
    }
  }

#if defined(ARDUINO_ADAFRUIT_QTPY_ESP32S2) || \
    defined(ARDUINO_ADAFRUIT_QTPY_ESP32S3_NOPSRAM) || \
    defined(ARDUINO_ADAFRUIT_QTPY_ESP32S3) || \
    defined(ARDUINO_ADAFRUIT_QTPY_ESP32_PICO)
  Wire1.setPins(SDA1, SCL1);
#endif

#if defined(ARDUINO_ADAFRUIT_FEATHER_ESP32S2)
  // turn on the I2C power by setting pin to opposite of 'rest state'
  pinMode(PIN_I2C_POWER, INPUT);
  delay(1);
  bool polarity = digitalRead(PIN_I2C_POWER);
  pinMode(PIN_I2C_POWER, OUTPUT);
  digitalWrite(PIN_I2C_POWER, !polarity);
#endif

#if defined(ADAFRUIT_FEATHER_ESP32_V2)
  // Turn on the I2C power by pulling pin HIGH.
  pinMode(NEOPIXEL_I2C_POWER, OUTPUT);
  digitalWrite(NEOPIXEL_I2C_POWER, HIGH);
#endif

  MicroID.getUniqueIDString(uniqueID);

#if defined(PIN_NEOPIXEL)
  strip.begin();
  strip.show();
  strip.setBrightness(BRIGHTNESS);
#endif
}

/**
 * @brief Send a boot message
 */
void send_boot_message() {
  String payload;
  payload = get_boot_payload();
  Serial.println(payload);
  socketIO.sendEVENT(payload);
}
