class CaptiveRequestHandler : public AsyncWebHandler {
  public:
    CaptiveRequestHandler() {}
    virtual ~CaptiveRequestHandler() {}

    bool canHandle(AsyncWebServerRequest *request) {
      //we can handle anything!
      return true;
    }

    void handleRequest(AsyncWebServerRequest *request) {
      Serial.print("handleRequest: ");
      Serial.println(request->url());

      if (!isResetting) {
        if (request->method() == HTTP_GET) {
          if (request->url() == "/credentials") getCredentials(request);
          else if (request->url() == "/scan")   getScan(request);
          else if (SPIFFS.exists(request->url())) sendFile(request, request->url());
          else if (request->url().endsWith(".html") || request->url().endsWith("/") || request->url().endsWith("generate_204") || request->url().endsWith("redirect"))  {
            sendFile(request, "/index.html");
          }
          else if (request->url().endsWith("connecttest.txt") || request->url().endsWith("ncsi.txt")) {
            request->send(200, "text/plain", "Microsoft NCSI");
          } else if (strstr(request->url().c_str(), "generate_204_") != NULL) {
            Serial.println("you must be huawei!");
            sendFile(request, "/index.html");
          }
          else {
            request->send(304);
          }
        }
      }
    }

    void handleBody(AsyncWebServerRequest * request, uint8_t *data, size_t len, size_t index, size_t total) {
      Serial.print("handleBody: ");
      Serial.println(request->url());

      if (!isResetting) {
        if (request->method() == HTTP_POST) {
          if (request->url() == "/credentials") {
            String json = "";
            for (int i = 0; i < len; i++)  json += char(data[i]);

            StaticJsonDocument<1024> credentialsJsonDoc;
            if (!deserializeJson(credentialsJsonDoc, json)) {
              if(setCredentials(credentialsJsonDoc.as<JsonObject>())) request->send(200);

              else request->send(400);
            }
          }
          else if(request->url() == "/reboot") {
              String json = "";
              for (int i = 0; i < len; i++)  json += char(data[i]);

              StaticJsonDocument<256> rebootJsonDoc;
              if (!deserializeJson(rebootJsonDoc, json)) {
                int delayMs = rebootJsonDoc["delay"];

                softReset(delayMs);
              }

              request->send(200);
          }
          else {
            request->send(404);
          }
        }
      }
    }

    void sendFile(AsyncWebServerRequest * request, String path) {
      Serial.println("handleFileRead: " + path);
      
      if (SPIFFS.exists(path)) {
        request->send(SPIFFS, path, getContentType(path));
      }
      else {
        Serial.println("Sending 404 :(");
        request->send(404);
      }
    }

    String getContentType(String filename) {
      if (filename.endsWith(".htm")) return "text/html";
      else if (filename.endsWith(".html")) return "text/html";
      else if (filename.endsWith(".css")) return "text/css";
      else if (filename.endsWith(".js")) return "application/javascript";
      else if (filename.endsWith(".png")) return "image/png";
      else if (filename.endsWith(".gif")) return "image/gif";
      else if (filename.endsWith(".jpg")) return "image/jpeg";
      else if (filename.endsWith(".ico")) return "image/x-icon";
      else if (filename.endsWith(".xml")) return "text/xml";
      else if (filename.endsWith(".pdf")) return "application/x-pdf";
      else if (filename.endsWith(".zip")) return "application/x-zip";
      else if (filename.endsWith(".gz")) return "application/x-gzip";
      else if (filename.endsWith(".json")) return "application/json";
      return "text/plain";
    }

    void getCredentials(AsyncWebServerRequest *request) {
      Serial.println("getCredentials");
      AsyncResponseStream *response = request->beginResponseStream("application/json");

      StaticJsonDocument<1024> settingsJsonDoc;
      settingsJsonDoc["local_mac"] = uniqueID;
      settingsJsonDoc["local_ssid"] = "";
      settingsJsonDoc["local_pass_len"] = 0;

      String jsonString;
      serializeJson(settingsJsonDoc, jsonString);
      response->print(jsonString);

      request->send(response);
    }

    bool setCredentials(JsonVariant json) {
      bool result = false;

      Serial.println("setCredentials");

      String local_ssid = json["local_ssid"].as<String>();
      String local_pass = json["local_pass"].as<String>();
      String name = json["name"].as<String>();

      if (local_ssid != "" && local_pass != "" && name != "") {
        addToWiFiJSON(local_ssid, local_pass);
        setStationName(name);
        result = true;
      }

      return (result);
    }

    void getScan(AsyncWebServerRequest * request) {
      AsyncResponseStream *response = request->beginResponseStream("application/json");
      response->print(getJSONNetworks());

      request->send(response);

      // response->print(getScanAsJsonString());
      // request->send(response);
    }
};

void setupCaptivePortal() {
  dnsServer.start(DNS_PORT, "*", apIP);
  server.addHandler(new CaptiveRequestHandler()).setFilter(ON_AP_FILTER);
  server.begin();
  Serial.println("Captive portal started");
}
