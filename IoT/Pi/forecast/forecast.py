# Importing the necessary libraries

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model
import json

# Data Preprocessing Function
def prepare_data(data, n_steps):
    X, y = [], []
    for i in range(len(data)):
        end = i + n_steps
        if end >= len(data):
            break
        X.append(data[i:end])
        y.append(data[end])
    return np.array(X), np.array(y)

# Function to Create the RNN Model

def createModel(n_steps, n_features):
    model = Sequential()
    model.add(LSTM(35, activation='relu', return_sequences=True, input_shape=(n_steps, n_features)))
    model.add(LSTM(35, activation='relu'))
    model.add(Dense(4))
    model.compile(optimizer = 'adam', loss = 'mse')
    return model

# Model Fit Max Temperature
def modelFitMax(n_steps, n_features):
    from tensorflow.keras.models import load_model
    train = pd.read_csv('../data/traindata.csv')
    #Data Preprocessing
    max_training_data = train['Maximum']
    max_training_data = np.array(max_training_data)
    X, y = prepare_data(max_training_data, n_steps)
    
    # Defining the feature vector and the output vector
    X, y = np.array(X), np.array(y)
    n_features = 1
    
    # Reshape the Feature Matrix
    X = X.reshape(X.shape[0], X.shape[1], n_features)
    
    #Create the Model
    model = createModel(n_steps, n_features)
    
    #Fitting the Model
    model.fit(X, y, epochs=1000, verbose=0)
    
    model.save('../models/modelMax.h5')

# Max Temperature Predicting Function
def predictTemperatureMax(n_steps, n_features):
    # Loading the model
    model = load_model('../models/modelMax.h5')
    #Testing the Fitted weights
    x_input = np.array([30, 30, 31, 32, 30])
    temp_input = list(x_input)
    output = []
    i = 0
    while(i < n_steps):
        if len(temp_input) > n_steps:
            x_input = np.array(temp_input[1:])
            x_input = x_input.reshape((1, n_steps, n_features)) 
            yhat = model.predict(x_input, verbose=0)
            temp_input.append(yhat[0][0])
            temp_input = temp_input[1:]
            output.append(yhat[0][0])
            i+=1
        else:
            x_input = x_input.reshape((1, n_steps, n_features))
            yhat = model.predict(x_input, verbose=0)
            temp_input.append(yhat[0][0])
            output.append(yhat[0][0])
            i+=1
    return output
    
#     #Plot the Graph between Real Temperature and Predicted Temperature for the next n_steps days for visualization
#     plt.plot(real_temperatures)
#     plt.plot(output)
#     plt.xticks([1, 2, 3, 4])  
#     plt.yticks(np.linspace(15, 40, 5))


# Model Fit Min Temperature
def modelFitMin(n_steps, n_features):
    #Reading the data
    train = pd.read_csv('../data/traindata.csv')
    
    #Data Preprocessing
    min_training_data = train['Minimum']
    min_training_data = np.array(min_training_data)
    X, y = prepare_data(min_training_data, n_steps)
    
    # Defining the feature vector and the output vector
    X, y = np.array(X), np.array(y)
    n_features = 1
    
    # Reshape the Feature Matrix
    X = X.reshape(X.shape[0], X.shape[1], n_features)
    
    #Create the Model
    model = createModel(n_steps, n_features)
    
    #Fitting the Model
    model.fit(X, y, epochs=1000, verbose=0)
    
    # Save the Model
    model.save('../models/modelMin.h5')

# Min Temperature Predicting Function
def predictTemperatureMin(n_steps, n_features):
    # Loading the model
    model = load_model('../models/modelMin.h5')
    
    #Testing the Fitted weights
    x_input = np.array([24, 23, 22, 24, 21])
    temp_input = list(x_input)
    output = []
    i = 0
    while(i < n_steps):
        if len(temp_input) > n_steps:
            x_input = np.array(temp_input[1:])
            x_input = x_input.reshape((1, n_steps, n_features))
            yhat = model.predict(x_input, verbose=0)
            temp_input.append(yhat[0][0])
            temp_input = temp_input[1:]
            output.append(yhat[0][0])
            i+=1
        else:
            x_input = x_input.reshape((1, n_steps, n_features))
            yhat = model.predict(x_input, verbose=0)
            temp_input.append(yhat[0][0])
            output.append(yhat[0][0])
            i+=1
#     return output
    output = list(output)
    return output