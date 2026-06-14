#include <DHTesp.h>
#include <ESP32Servo.h>

#define DHTPIN 25
#define COOLERPIN 12
#define UMIDIFICADORPIN 14
#define CORTINAPIN 26
#define INTLDRPIN 33
#define EXTLDRPIN 32

#define TEMPMAX 30.0
#define UMIMIN 40.0
#define LUZMAX 200

DHTesp dht;
Servo cortina;

bool cortinaAberta = true;

void setup() {
  Serial.begin(115200);

  cortina.attach(CORTINAPIN);
  cortina.write(90);

  dht.setup(DHTPIN, DHTesp::DHT22);

  pinMode(COOLERPIN, OUTPUT);
  pinMode(UMIDIFICADORPIN, OUTPUT);
}

void loop() {
  TempAndHumidity data = dht.getTempAndHumidity();

  if (isnan(data.temperature) || isnan(data.humidity)) {
    Serial.println("Erro ao ler o DHT22");
    delay(2000);
    return;
  }

  if (data.temperature > TEMPMAX) {
    digitalWrite(COOLERPIN, HIGH);
  } else {
    digitalWrite(COOLERPIN, LOW);
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
    cortinaAberta = false;
  }
  else if (luzExterna <= LUZMAX && !cortinaAberta) {
    cortina.write(90);
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

  delay(1000);
}
