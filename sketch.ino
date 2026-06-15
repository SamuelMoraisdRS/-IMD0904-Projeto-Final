#include <DHTesp.h>
#include <ESP32Servo.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <string>

#define DHTPIN 25
#define COOLERPIN 12
#define UMIDIFICADORPIN 14
#define CORTINAPIN 26
#define INTLDRPIN 33
#define EXTLDRPIN 32

#define TEMPMAX 30.0
#define UMIMIN 40.0
#define LUZMAX 200

// -- MQTT Macros (mudar para os valores do laboratorio)
#define WIFI_NAME "Wokwi-GUEST"
#define WIFI_PW ""
#define END_IP_BROKER "broker.emqx.io"
#define PORT_BROKER 1883
#define BROKER_UN ""
#define BROKER_PW ""
#define ESP_ID "romulo_e_samuel"

const char* ssid = WIFI_NAME;
const char* wifi_pw = WIFI_PW;

const char* mqtt_server = END_IP_BROKER; // MQTT_Broker_NPITI
const int mqtt_port = PORT_BROKER; // MQTT_Broker_NPITI
const char* broker_un = BROKER_UN; // Username
const char* broker_pw = BROKER_PW; // Password
const char* id = ESP_ID; // MQTT_Broker_NPITI


DHTesp dht;
Servo cortina;

bool cortinaAberta = true;

int cortinaPosicao = 0;

bool coolerLigado = false;
bool umidificadorLigado = false;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando-se a rede: ");
  Serial.println(ssid);

  // Inicia a conexão Wi-Fi
  WiFi.begin(ssid, wifi_pw);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi conectado!");
  Serial.print("IP do ESP32 na rede virtual: ");
  Serial.println(WiFi.localIP()); // Aqui você verá o IP 10.13.37.x
}

void connect_broker() {
  while (!client.connected()) {
    Serial.print("Tentando conectar ao Broker MQTT...");
    
    if (client.connect(id, broker_un, broker_pw)) {
      Serial.println(" conectado com sucesso!");
      client.subscribe("sensores");
    } else {
      Serial.print(" falhou, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 1 segundos");
      delay(1000);
    }
  }
}


void setup() {
  Serial.begin(115200);

  cortina.attach(CORTINAPIN);
  cortina.write(90);

  dht.setup(DHTPIN, DHTesp::DHT22);

  setup_wifi();
  
  client.setServer(mqtt_server, mqtt_port);

  pinMode(COOLERPIN, OUTPUT);
  pinMode(UMIDIFICADORPIN, OUTPUT);
}

void loop() {
  if (!client.connected()) {
    connect_broker();
  }
  client.loop(); 

  TempAndHumidity data = dht.getTempAndHumidity();

  if (isnan(data.temperature) || isnan(data.humidity)) {
    Serial.println("Erro ao ler o DHT22");
    delay(2000);
    return;
  }

  if (data.temperature > TEMPMAX) {
    digitalWrite(COOLERPIN, HIGH);
    coolerLigado = true;
  } else {
    digitalWrite(COOLERPIN, LOW);
    coolerLigado = false;
  }

  if (data.humidity < UMIMIN) {
    digitalWrite(UMIDIFICADORPIN, HIGH);
  } else {
    digitalWrite(UMIDIFICADORPIN, LOW);
  }

  int luzInterna = map(analogRead(INTLDRPIN), 0, 4095, 255, 0);

  int luzExterna = map(analogRead(EXTLDRPIN), 0, 4095, 255, 0);

  if (luzExterna > LUZMAX && cortinaAberta) {
    cortina.write(0);
    cortinaPosicao = 0;
    cortinaAberta = false;
  }
  else if (luzExterna <= LUZMAX && !cortinaAberta) {
    cortina.write(90);
    cortinaPosicao = 90;
    cortinaAberta = true;
  }

  Serial.println("-------------- LEITURAS --------------");

  Serial.print("Temperatura (°C): ");
  Serial.println(data.temperature);

  Serial.print("Umidade (%): ");
  Serial.println(data.humidity);

  Serial.print("Luz Interna (0-255): ");
  Serial.println(luzInterna);

  Serial.print("Luz Externa (0-255): ");
  Serial.println(luzExterna);

  Serial.print("Cooler: ");
  Serial.println(data.temperature > TEMPMAX ? "LIGADO" : "DESLIGADO");

  Serial.print("Umidificador: ");
  Serial.println(data.humidity < UMIMIN ? "LIGADO" : "DESLIGADO");

  Serial.print("Cortina: ");
  Serial.println(cortinaAberta ? "ABERTA" : "FECHADA");

  Serial.println("--------------------------------------");
  Serial.println();

  std::string lum_interna_payload = std::to_string(luzInterna);
  std::string lum_externa_payload = std::to_string(luzExterna);
  std::string temp_payload = std::to_string(data.temperature);
  std::string umi_payload = std::to_string(data.humidity);
  std::string cortina_payload = std::to_string(cortinaPosicao);
  std::string cooler_payload = std::to_string(coolerLigado);

  client.publish("romulo_e_samuel/luminosidade-interna", lum_interna_payload.c_str());
  client.publish("romulo_e_samuel/luminosidade-externa", lum_externa_payload.c_str());
  client.publish("romulo_e_samuel/umidade", umi_payload.c_str());
  client.publish("romulo_e_samuel/temperatura", temp_payload.c_str());
  client.publish("romulo_e_samuel/cortina", cortina_payload.c_str());
  client.publish("romulo_e_samuel/cooler", cooler_payload.c_str());

  delay(1000);
}
