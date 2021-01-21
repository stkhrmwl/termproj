#include <Arduino.h>
#include <ArduinoJson.h>
#include <MySGP30.h>
#include <PubSubClient.h>
#include <WiFi.h>
#include <env.h>

// WiFi
const char ssid[] = WIFI_SSID;
const char passwd[] = WIFI_PASSWORD;

// Broker
const char *mqttHost = MQTT_HOST;
const int mqttPort = MQTT_PORT;
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

// payload
const char *topic = "conditions/takahara";
std::string payload;

// json
DynamicJsonDocument doc(1024);

// module
MySGP30 sgp;
float val = 0;
int RED_LED_PORT = 17;
int BLUE_LED_PORT = 16;

unsigned long lastConnectionTime = 0;
const unsigned long postingInterval = 0.05L * 1000L;

// prototype declaration
void reconnectWifi();
void connectMqtt();

// int count = 0;

void setup() {
    Serial.begin(115200);
    delay(5000);
    Serial.println("Start setup");
    while (!sgp.isEnabled()) {
        Serial.println("Could not find a valid SGP30 sensor, do re-checking.");
        delay(5000);
    }
    pinMode(RED_LED_PORT, OUTPUT);
    pinMode(BLUE_LED_PORT, OUTPUT);
    WiFi.begin(ssid, passwd);
    while (WiFi.status() != WL_CONNECTED) {
        digitalWrite(RED_LED_PORT, HIGH);
        Serial.print(".");
        delay(500);
    }
    digitalWrite(RED_LED_PORT, LOW);
    connectMqtt();
}

void loop() {

    if (WiFi.status() != WL_CONNECTED) {
        reconnectWifi();
    }
    if (!mqttClient.connected()) {
        connectMqtt();
    }
    if (!sgp.canMeasureIAQ()) {
        Serial.println("Measurement failed");
        return;
    }
    if (!sgp.canMeasureRawIAQ()) {
        Serial.println("Raw Measurement failed");
        return;
    }

    if (millis() - lastConnectionTime > postingInterval) {
        doc["val"] = sgp.getRawH2();
        std::string message;
        serializeJson(doc, message);
        payload = message;
        mqttClient.publish(topic, payload.c_str());
        mqttClient.loop();
        Serial.print(message.c_str());
        Serial.println(" is published");
        lastConnectionTime = millis();
        digitalWrite(BLUE_LED_PORT, HIGH);
        delay(10);
        digitalWrite(BLUE_LED_PORT, LOW);
    }
}

void reconnectWifi() {
    Serial.println("Attempting to connect to SSID: " + String(ssid));
    while (WiFi.status() != WL_CONNECTED) {
        digitalWrite(RED_LED_PORT, HIGH);
        WiFi.begin(ssid, passwd);
        Serial.print(".");
        delay(5000);
    }
    digitalWrite(RED_LED_PORT, LOW);
    Serial.println("\nConnected.");
}

void connectMqtt() {
    mqttClient.setServer(mqttHost, mqttPort);
    while (!mqttClient.connected()) {
        digitalWrite(RED_LED_PORT, HIGH);
        Serial.println("Connecting to MQTT...");
        String clientId = "ESP32-" + String(random(0xffff), HEX);
        if (mqttClient.connect(clientId.c_str())) {
            Serial.println("connected");
        }
        delay(1000);
        randomSeed(micros());
    }
    digitalWrite(RED_LED_PORT, LOW);
}