
/**
 * @brief Websocket callbacks
 */
void socket_io_event(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Connected to url: %s\n", payload);
            socketIO.send(sIOtype_CONNECT, "/");
            blinkOnConnect();
            break;
        case sIOtype_EVENT:
            {
              char * sptr = NULL;
              int id = strtol((char *)payload, &sptr, 10);
              Serial.printf("[IOc] Got event: %s id: %d\n", payload, id);
              if (id) {
                payload = (uint8_t *)sptr;
              }
              DynamicJsonDocument doc(1024);
              DeserializationError error = deserializeJson(doc, payload, length);
              if (error) {
                Serial.print(F("deserializeJson() failed: "));
                Serial.println(error.c_str());
                return;
              }

              String eventName = doc[0];
              Serial.printf("[IOc] event name: %s\n", eventName.c_str());
              if (eventName == "ack") {
                send_boot_message();
              }
            }
            break;
        case sIOtype_ACK:
            Serial.printf("[IOc] get ack: %u\n", length);
            break;
        case sIOtype_ERROR:
            Serial.printf("[IOc] get error: %u\n", length);
            break;
        case sIOtype_BINARY_EVENT:
            Serial.printf("[IOc] get binary: %u\n", length);
            break;
        case sIOtype_BINARY_ACK:
            Serial.printf("[IOc] get binary ack: %u\n", length);
            break;
    }
}

/**
 * @brief Connect to Websocket server
 */
void connect_to_websocket() {
  socketIO.begin("192.168.1.82", 3000, "/socket.io/?EIO=4");
  socketIO.onEvent(socket_io_event);
}
