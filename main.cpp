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

// Variáveis globais mutáveis com os valores padrão iniciais:
float tempMax = 21.0;
float umiMin = 40.0;
int luzMax = 150;

// Variáveis de estado e controle manual
bool modoManual = false; 
bool coolerManualCmd = false;
int cortinaManualPosicao = 90;

#define WIFI_NAME "Wokwi-GUEST"
#define WIFI_PW ""
#define END_IP_BROKER "broker.emqx.io"
#define PORT_BROKER 1883
#define BROKER_UN ""
#define BROKER_PW ""
#define ESP_ID "romulo_e_samuel"

const char* ssid = WIFI_NAME;
const char* wifi_pw = WIFI_PW;

const char* mqtt_server = END_IP_BROKER;
const int mqtt_port = PORT_BROKER;
const char* broker_un = BROKER_UN;
const char* broker_pw = BROKER_PW;
const char* id = ESP_ID;

DHTesp dht;
Servo cortina;

bool cortinaAberta = true;
int cortinaPosicao = 0;
bool coolerLigado = false;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando-se a rede: ");
  Serial.println(ssid);

  WiFi.begin(ssid, wifi_pw);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi conectado!");
  Serial.print("IP do ESP32 na rede virtual: ");
  Serial.println(WiFi.localIP());
}

void connect_broker() {
  while (!client.connected()) {
    Serial.print("Tentando conectar ao Broker MQTT...");
    if (client.connect(id, broker_un, broker_pw)) {
      Serial.println(" conectado com sucesso!");
      client.subscribe("sensores");

      // Inscrição nos tópicos para receber mensagens do Node-RED
      client.subscribe("romulo_e_samuel/config/#"); 
      client.subscribe("romulo_e_samuel/cmd/#"); 

      // --- NOVO: Publicação dos limiares padrão imediatamente após conectar ---
      Serial.println(">> Sincronizando limiares iniciais com o Node-RED...");
      client.publish("romulo_e_samuel/confirmacao/temp_max", std::to_string(tempMax).c_str());
      client.publish("romulo_e_samuel/confirmacao/umi_min", std::to_string(umiMin).c_str());
      client.publish("romulo_e_samuel/confirmacao/luz_max", std::to_string(luzMax).c_str());
      client.publish("romulo_e_samuel/config/modo", modoManual ? "1" : "0");
      
    } else {
      Serial.print(" falhou, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 1 segundos");
      delay(1000);
    }
  }
}

void processMessage(char* topic, byte* payload, unsigned int length) {
  std::string message((char*)payload, length);
  std::string topicStr(topic);

  Serial.println("\n========= EVENTO MQTT =========");
  Serial.print("Tópico: ");
  Serial.println(topic);
  Serial.print("Valor Bruto Recebido: ");
  Serial.println(message.c_str());

  // 1. Processamento das Configurações de Limiares e Modo com Confirmação Imediata
  if (topicStr == "romulo_e_samuel/config/modo") {
    modoManual = (message == "1");
    Serial.print(">> ALTERAÇÃO DE MODO: O sistema agora está operando em modo ");
    Serial.println(modoManual ? "MANUAL." : "AUTOMÁTICO.");
  } 
  else if (topicStr == "romulo_e_samuel/config/temp_max") {
    float antigoLimiar = tempMax;
    tempMax = std::stof(message);
    Serial.print(">> NOVO LIMIAR DE TEMPERATURA: Atualizado de ");
    Serial.print(antigoLimiar);
    Serial.print(" °C para ");
    Serial.print(tempMax);
    Serial.println(" °C");
    // Confirma de volta para atualizar o Gauge no Node-RED
    client.publish("romulo_e_samuel/confirmacao/temp_max", message.c_str());
  } 
  else if (topicStr == "romulo_e_samuel/config/umi_min") {
    float antigoLimiar = umiMin;
    umiMin = std::stof(message);
    Serial.print(">> NOVO LIMIAR DE UMIDADE: Atualizado de ");
    Serial.print(antigoLimiar);
    Serial.print(" % para ");
    Serial.print(umiMin);
    Serial.println(" %");
    // Confirma de volta para atualizar o Gauge no Node-RED
    client.publish("romulo_e_samuel/confirmacao/umi_min", message.c_str());
  } 
  else if (topicStr == "romulo_e_samuel/config/luz_max") {
    int antigoLimiar = luzMax;
    luzMax = std::stoi(message);
    Serial.print(">> NOVO LIMIAR DE LUMINOSIDADE: Atualizado de ");
    Serial.print(antigoLimiar);
    Serial.print(" para ");
    Serial.println(luzMax);
    // Confirma de volta para atualizar o Gauge no Node-RED
    client.publish("romulo_e_samuel/confirmacao/luz_max", message.c_str());
  }
  // 2. Processamento dos Comandos Manuais
  else if (topicStr == "romulo_e_samuel/cmd/cooler") {
    coolerManualCmd = (message == "1");
    Serial.print(">> COMANDO MANUAL - COOLER: ");
    Serial.println(coolerManualCmd ? "Ligar solicitado." : "Desligar solicitado.");
    if (!modoManual) {
      Serial.println("[Aviso] O comando foi guardado, mas NÃO surtirá efeito físico pois o modo atual é AUTOMÁTICO.");
    }
  } 
  else if (topicStr == "romulo_e_samuel/cmd/cortina") {
    cortinaManualPosicao = std::stoi(message);
    Serial.print(">> COMANDO MANUAL - CORTINA: Ângulo solicitado de ");
    Serial.print(cortinaManualPosicao);
    Serial.println("°");
    if (!modoManual) {
      Serial.println("[Aviso] O comando foi guardado, mas NÃO surtirá efeito físico pois o modo atual é AUTOMÁTICO.");
    }
  }
  Serial.println("===============================\n");
}

void setup() {
  Serial.begin(9600);

  cortina.attach(CORTINAPIN);
  cortina.write(90);

  dht.setup(DHTPIN, DHTesp::DHT22);

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(processMessage);

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
    Serial.println("Erro ao ler o DHT22 nesta iteração. Aguardando próxima...");
  } else {
    // --- LÓGICA DE CONTROLE DO COOLER ---
    if (modoManual) {
      if (coolerManualCmd) {
        digitalWrite(COOLERPIN, LOW); 
        coolerLigado = true;
      } else {
        digitalWrite(COOLERPIN, HIGH);
        coolerLigado = false;
      }
    } else {
      if (data.temperature > tempMax) {
        digitalWrite(COOLERPIN, LOW);
        coolerLigado = true;
      } else {
        digitalWrite(COOLERPIN, HIGH);
        coolerLigado = false;
      }
    }

    // --- LÓGICA DE CONTROLE DO UMIDIFICADOR ---
    if (data.humidity < umiMin) { 
      digitalWrite(UMIDIFICADORPIN, LOW);
    } else {
      digitalWrite(UMIDIFICADORPIN, HIGH);
    }

    // --- LÓGICA DE CONTROLE DA CORTINA ---
    int luzInterna = map(analogRead(INTLDRPIN), 0, 4095, 0, 255);
    int luzExterna = map(analogRead(EXTLDRPIN), 0, 4095, 0, 255);

    if (modoManual) {
      cortina.write(cortinaManualPosicao);
      cortinaPosicao = cortinaManualPosicao;
      cortinaAberta = (cortinaPosicao < 45); 
    } else {
      if (luzExterna > luzMax && cortinaAberta) {
        cortina.write(0);
        cortinaPosicao = 0;
        cortinaAberta = false;
      } else if (luzExterna <= luzMax && !cortinaAberta) {
        cortina.write(90);
        cortinaPosicao = 90;
        cortinaAberta = true;
      }
    }

    Serial.println("-------------- LEITURAS --------------");
    Serial.print("Temperatura (°C): "); Serial.println(data.temperature);
    Serial.print("Umidade (%): "); Serial.println(data.humidity);
    Serial.print("Luz Interna (0-255): "); Serial.println(luzInterna);
    Serial.print("Luz Externa (0-255): "); Serial.println(luzExterna);
    Serial.print("Cooler: "); Serial.println(coolerLigado ? "LIGADO" : "DESLIGADO");
    Serial.print("Umidificador: "); Serial.println(data.humidity < umiMin? "LIGADO" : "DESLIGADO");
    Serial.print("Cortina: "); Serial.println(cortinaAberta ? "ABERTA" : "FECHADA");
    Serial.println("--------------------------------------");

    // Conversão de telemetria em strings
    std::string lum_interna_payload = std::to_string(luzInterna);
    std::string lum_externa_payload = std::to_string(luzExterna);
    std::string temp_payload = std::to_string(data.temperature);
    std::string umi_payload = std::to_string(data.humidity);
    std::string cortina_payload = std::to_string(cortinaPosicao);
    std::string cooler_payload = std::to_string(coolerLigado);

    // Publicação estrita de variáveis dinâmicas de telemetria em tempo real
    client.publish("romulo_e_samuel/luminosidade-interna", lum_interna_payload.c_str());
    client.publish("romulo_e_samuel/luminosidade-externa", lum_externa_payload.c_str());
    client.publish("romulo_e_samuel/umidade", umi_payload.c_str());
    client.publish("romulo_e_samuel/temperatura", temp_payload.c_str());
    client.publish("romulo_e_samuel/cortina", cortina_payload.c_str());
    client.publish("romulo_e_samuel/cooler", cooler_payload.c_str());
  }

  delay(2000);
}
