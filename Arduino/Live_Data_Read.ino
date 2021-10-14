#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME280 bme;

void setup() {
  Serial.begin(9600);

  if (!bme.begin(0x76)) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
}

void loop() {
//  Serial.print("Temperature = ");
//  Serial.print(bme.readTemperature());
//  Serial.println("*C");
//
//  Serial.print("Pressure = ");
//  Serial.print(bme.readPressure() / 100.0F);
//  Serial.println("hPa");
//
//  Serial.print("Approx. Altitude = ");
//  Serial.print(bme.readAltitude(SEALEVELPRESSURE_HPA));
//  Serial.println("m");
//  
//  Serial.print("Humidity = ");
//  Serial.print(bme.readHumidity());
//  Serial.println("%");
//
//  Serial.println("Printing Averages:");
  

float avgTemp = 0, avgHum = 0, avgPres = 0;
int total = 15;
float minTemp = 0, maxTemp = 0;
const int capacity = JSON_OBJECT_SIZE(6);
StaticJsonDocument<capacity> weather;

for (int i = 0; i <= total; i++) {
    float temperature = bme.readTemperature();
    float pressure = bme.readPressure() / 100.0F;
    float humidity = bme.readHumidity();
    
    avgTemp += temperature;
    avgPres += pressure;
    avgHum += humidity;
}

   if(avgTemp/total >= maxTemp){
    maxTemp = avgTemp/total;
   }else{
    minTemp = avgTemp/total;
    }

    weather["Temperature"] = avgTemp/total;
    weather["Pressure"] = avgPres/total;
    weather["Humidity"] = avgHum/total;
    weather["Altitude"] = bme.readAltitude(SEALEVELPRESSURE_HPA);
    weather["MinTemp"] = minTemp;
    weather["MaxTemp"] = maxTemp;

    serializeJson(weather, Serial);
    
//    Serial.print(avgTemp/total);
//     Serial.println();
//    Serial.print(avgPres/total);
//     Serial.println();
//    Serial.print(avgHum/total);
//     Serial.println();
    
   
 
  Serial.println();
  delay(900000);
}
