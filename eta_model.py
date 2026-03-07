import numpy as np
from sklearn.linear_model import LinearRegression

# Train simple ETA prediction model
X = np.array([
    [40, 10],
    [30, 15],
    [20, 20],
    [10, 30],
    [50, 8]
])  # [speed, distance]

y = np.array([15, 20, 30, 45, 12])  # ETA minutes

model = LinearRegression()
model.fit(X, y)

def predict_eta(speed, distance):
    return round(model.predict([[speed, distance]])[0], 2)