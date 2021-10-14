# Importing the necessary libraries
import json
import time
from datetime import datetime
import pyexcel as pe
import serial
import csv
import firebase_admin
from firebase_admin import credentials, db
from forecast import forecast


# Connecting to Firebase Realtime Databse
cred = credentials.Certificate("./.secrets/intellimausam-2e6fa-firebase-adminsdk-qwxsc-a21d93e5d6.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://intellimausam-2e6fa-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

weather = dict()

if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.flush()

    while True:
        
        # Reading the Live Data recieved from Arduino
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            weather = json.loads(line)
            print(weather) 

            # Sending Live Data to Firebase
            ref = db.reference('/')

            data_ref = ref.child('live_data')
            data_ref.set({
                "Temperature": weather.get('Temperature'),
                "Pressure": weather.get('Pressure'),
                "Humidity": weather.get('Humidity'),
                "Altitude": weather.get('Altitude')
            })

        # Finding the current time and day
        now = datetime.now()
        currentTime = now.strftime("%H:%M:%S")
        day = now.strftime("%A")
        
        # Checking the time to update the 5-day forecast
        if(currentTime == "23:55:00"):    
            
            # Delete Second row
            sheet = pe.load('/data/traindata.csv')
            del sheet.row[1]
            sheet.save_as('/data/traindata.csv')
            
            # Append new data in the end
            with open('/data/traindata.csv','a') as fd:
                writer = csv.writer(fd)
                writer.writerow([weather.get('MaxTemp'),weather.get('MinTemp')])
            print("Training Data Updated")
            
            # CHecking for Monday and updating the RNN Model for the upcoming week
            if(day == "Monday"):
                forecast.modelFitMax(5,1)
                forecast.modelFitMin(5,1)
            
            # Generating the Forecast
            maxtemp = forecast.predictTemperatureMax(5,1);
            mintemp = forecast.predictTemperatureMin(5,1);

            # Structuring the Forecast JSON
            prediction = {"Day1" : {"max" : 0, "min" : 0}, "Day2" : {"max" : 0, "min" : 0}, "Day3" : {"max" : 0, "min" : 0},
                   "Day4" : {"max" : 0, "min" : 0}, "Day5" : {"max" : 0, "min" : 0}}

            for day in range(5):
                index = "Day" + str(day+1)
                prediction[index]["max"] = round(maxtemp[day])
                prediction[index]["min"] = round(mintemp[day])

            # Sending the Forecast to the Firebase
            data_ref = ref.child('forecast')
            
            if(currentTime == "23:59:59"):
                data_ref.set(prediction)
            
            time.sleep(60)