

bool inList;

String getJSONNetworks() {
  preferences.begin("scads", false);
  String requestBody = preferences.getString("networks", "");
  preferences.end();
  return (requestBody);
}

void setJSONNetworks(String networksString ) {
  preferences.begin("scads", false);
  preferences.putString("networks", networksString);
  preferences.end();
}

String getJSONWifi() {
  preferences.begin("scads", false);
  String requestBody = preferences.getString("wifi", "");
  preferences.end();
  return (requestBody);
}

String getStationName() {
  preferences.begin("scads", false);
  String name = preferences.getString("name");
  preferences.end();
  return (name);
}

void setLastConnected(String ssid) {
  preferences.begin("scads", false);
  preferences.putString("lastConnected",ssid);
  preferences.end();

}

String get_last_connected() {
  String lastConnected;
  preferences.begin("scads", false);
  lastConnected = preferences.getString("lastConnected", "");
  preferences.end();
  return lastConnected;
}

void setStationName(String name) {
  preferences.begin("scads", false);
  preferences.remove("name");
  preferences.putString("name", name);
  preferences.end();
}

void setJSONWifi(String wifiString ) {
  preferences.begin("scads", false);
  preferences.putString("wifi", wifiString);
  preferences.end();
}

void addToLocalNetworkJSON(String network) {
  preferences.begin("scads", false);
  String networkList = preferences.getString("networks", "");
  const size_t capacity = JSON_ARRAY_SIZE(6) + JSON_OBJECT_SIZE(1) + 10;
  DynamicJsonDocument networks(capacity);
  if (networkList != "") {
    deserializeJson(networks, networkList);
    JsonArray networkArray = networks["networks"];
    networkArray.add(network);
    Serial.print("Adding ");
    Serial.print(network);
    Serial.println(" to the networks list");
    networkList = "";
    serializeJson(networks, networkList);
    Serial.println(networkList);
    preferences.putString("networks", networkList);
  } else {
    JsonArray networkArray = networks.createNestedArray("networks");
    networkArray.add(network);
    networkList = "";
    serializeJson(networks, networkList);
    preferences.putString("networks", networkList);
    Serial.print("Creating json object and adding the network ");
    Serial.print(network);
    Serial.println(" to the networks list");
  }
  preferences.end();
}

void addToWiFiJSON(String newSSID, String newPassword) {
  // appends wifi credentials to memory json array if isn't already in it, creates the array if it doesnt exist
  preferences.begin("scads", false);
  String wifilist = preferences.getString("wifi", "");
  if (wifilist != NULL) {
    const size_t capacity = 2 * JSON_ARRAY_SIZE(6) + JSON_OBJECT_SIZE(2) + 150;
    DynamicJsonDocument addresses(capacity);
    deserializeJson(addresses, wifilist);
    JsonArray ssids = addresses["ssid"];
    JsonArray passwords = addresses["password"];
    inList = false;
    for ( int i = 0; i < ssids.size(); i++) {
      if (ssids[i] == newSSID) {
        Serial.println("wifi credentials already in list");
        if (passwords[i] == newPassword) {
          inList = true;
          Serial.println("password same too");
          break;
        } else {
          inList = true;
          Serial.println("password will be updated");
          passwords[i] = newPassword;
          wifilist = "";
          serializeJson(addresses, wifilist);
          preferences.putString("wifi", wifilist);
          break;
        }
      }
    }
    if (inList == false) {
      ssids.add(newSSID);
      passwords.add(newPassword);
      Serial.print("adding ");
      Serial.print(newSSID);
      Serial.println(" to the wifi list");
      wifilist = "";
      serializeJson(addresses, wifilist);
      preferences.putString("wifi", wifilist);
    }
  } else {
    const size_t capacity = 2 * JSON_ARRAY_SIZE(6) + JSON_OBJECT_SIZE(2) + 150;
    DynamicJsonDocument addresses(capacity);
    JsonArray ssidArray = addresses.createNestedArray("ssid");
    ssidArray.add(newSSID);
    JsonArray passwordArray = addresses.createNestedArray("password");
    passwordArray.add(newPassword);
    wifilist = "";
    serializeJson(addresses, wifilist);
    preferences.putString("wifi", wifilist);
    Serial.print("creating json object and adding the local wificredentials");
  }
  preferences.end();
}

String getScanAsJsonString() {
  String jsonString;

  StaticJsonDocument<1000> jsonDoc;
  getScanAsJson(jsonDoc);
  serializeJson(jsonDoc[0], jsonString);

  return (jsonString);
}

void getScanAsJson(JsonDocument& jsonDoc) {
  JsonArray networks = jsonDoc.createNestedArray();

  Serial.println("Scan start");
  int16_t n = WiFi.scanNetworks();
  n = (n > MAX_NETWORKS_TO_SCAN) ? MAX_NETWORKS_TO_SCAN : n;
  Serial.println("Scan done");

  // Array is ordered by signal strength - strongest first
  for (int16_t i = 0; i < n; ++i) {
    String networkSSID = WiFi.SSID(i);
    Serial.println(networkSSID);
    delay(10);
    if (networkSSID.length() <= SSID_MAX_LENGTH) {
      JsonObject network  = networks.createNestedObject();
      network["SSID"] = WiFi.SSID(i);
      network["BSSID"] = WiFi.BSSIDstr(i);
      network["RSSI"] = WiFi.RSSI(i);
    }
  }
}
