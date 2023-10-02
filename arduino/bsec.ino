
/**
 * @brief Setup IAQ
 */
void setup_iaq() {

  String output;

  iaqSensor.begin(BME68X_I2C_ADDR_LOW, Wire);
  output = "\nBSEC library version " + String(iaqSensor.version.major) + "." + String(iaqSensor.version.minor) + "." + String(iaqSensor.version.major_bugfix) + "." + String(iaqSensor.version.minor_bugfix);
  Serial.println(output);
  check_iaq_sensor_status();

  iaqSensor.setConfig(bsec_config_iaq);
  check_iaq_sensor_status();

  loadState();

  iaqSensor.updateSubscription(sensorList, 8, BSEC_SAMPLE_RATE_LP);
  iaqSensor.updateSubscription(sensorIAQ, 6, BSEC_SAMPLE_RATE_LP);
  check_iaq_sensor_status();
}


/**
 * @brief Get data from AQI
 */
void get_aqi_data(void) {

  if (iaqSensor.run()) { // If new data is available
    temperature = iaqSensor.temperature;
    pressure = iaqSensor.pressure;
    humidity = iaqSensor.humidity;
    co2Equivalent = iaqSensor.co2Equivalent;
    co2Accuracy = iaqSensor.co2Accuracy;
    breathVocEquivalent = iaqSensor.breathVocEquivalent;
    breathVocAccuracy = iaqSensor.breathVocAccuracy;
    gasPercentage = iaqSensor.gasPercentage;
    gasPercentageAccuracy = iaqSensor.gasPercentageAccuracy;
    gasResistance = iaqSensor.gasResistance;
    iaq = iaqSensor.iaq;
    iaqAccuracy = iaqSensor.iaqAccuracy;
    staticIaq = iaqSensor.staticIaq;
    staticIaqAccuracy = iaqSensor.staticIaqAccuracy;
    stabStatus = iaqSensor.stabStatus;
    runInStatus = iaqSensor.runInStatus;
    updateState();
  } else {
    check_iaq_sensor_status();
  }
}

/**
 * @brief Check AQI sensor status
 */
void check_iaq_sensor_status(void) {
  String output;
  if (iaqSensor.bsecStatus != BSEC_OK) {
    if (iaqSensor.bsecStatus < BSEC_OK) {
      output = "BSEC error code : " + String(iaqSensor.bsecStatus);
      Serial.println(output);
      for (;;)
        blink_led(); /* Halt in case of failure */
    } else {
      output = "BSEC warning code : " + String(iaqSensor.bsecStatus);
      Serial.println(output);
    }
  }

  if (iaqSensor.bme68xStatus != BME68X_OK) {
    if (iaqSensor.bme68xStatus < BME68X_OK) {
      output = "BME68X error code : " + String(iaqSensor.bme68xStatus);
      Serial.println(output);
      for (;;)
        blink_led(); /* Halt in case of failure */
    } else {
      output = "BME68X warning code : " + String(iaqSensor.bme68xStatus);
      Serial.println(output);
    }
  }
}


void loadState(void)
{
  if (EEPROM.read(0) == BSEC_MAX_STATE_BLOB_SIZE) {
    // Existing state in EEPROM
    Serial.println("Reading state from EEPROM");

    for (uint8_t i = 0; i < BSEC_MAX_STATE_BLOB_SIZE; i++) {
      bsecState[i] = EEPROM.read(i + 1);
      Serial.println(bsecState[i], HEX);
    }

    iaqSensor.setState(bsecState);
    check_iaq_sensor_status();
  } else {
    // Erase the EEPROM with zeroes
    Serial.println("Erasing EEPROM");

    for (uint8_t i = 0; i < BSEC_MAX_STATE_BLOB_SIZE + 1; i++)
      EEPROM.write(i, 0);

    EEPROM.commit();
  }
}

void updateState(void)
{
  bool update = false;
  if (stateUpdateCounter == 0) {
    /* First state update when IAQ accuracy is >= 3 */
    if (iaqSensor.iaqAccuracy >= 3) {
      update = true;
      stateUpdateCounter++;
    }
  } else {
    /* Update every STATE_SAVE_PERIOD minutes */
    if ((stateUpdateCounter * STATE_SAVE_PERIOD) < millis()) {
      update = true;
      stateUpdateCounter++;
    }
  }

  if (update) {
    iaqSensor.getState(bsecState);
    check_iaq_sensor_status();

    Serial.println("Writing state to EEPROM");

    for (uint8_t i = 0; i < BSEC_MAX_STATE_BLOB_SIZE ; i++) {
      EEPROM.write(i + 1, bsecState[i]);
      Serial.println(bsecState[i], HEX);
    }

    EEPROM.write(0, BSEC_MAX_STATE_BLOB_SIZE);
    EEPROM.commit();
  }
}


/**
 * @brief IAQ color coding
 */
uint32_t color_for_iaq(float iaq) {
  uint32_t color = 0x00FF00;
  if (iaq > 50) {
    color = 0xFFFF00;
  }
  if (iaq > 100) {
    color = 0xFF9900;
  }
  if (iaq > 150) {
    color = 0XFF0000;
  }
  if (iaq > 200) {
    color = 0x800080;
  }
  if (iaq > 300) {
    color = 0x800000;
  }
  return color;
}
