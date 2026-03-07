from flask import Flask, request, jsonify
from dispatch import find_nearest_driver, detect_delay
from eta_model import predict_eta

app = Flask(__name__)

@app.route("/")
def home():
    return "TravelSati Backend Running"

# Bus ETA Prediction API
@app.route("/predict_eta", methods=["POST"])
def eta():
    data = request.json
    speed = data["speed"]
    distance = data["distance"]

    eta = predict_eta(speed, distance)
    return jsonify({"ETA_minutes": eta})

# Dispatch API
@app.route("/dispatch", methods=["POST"])
def dispatch():
    data = request.json
    lat = data["lat"]
    lon = data["lon"]
    speed = data["speed"]

    if detect_delay(speed):
        return jsonify({"status": "Bus Delayed. Hold dispatch."})

    driver = find_nearest_driver(lat, lon)

    if driver:
        return jsonify({
            "status": "Driver Assigned",
            "driver_id": driver["id"],
            "driver_location": [driver["lat"], driver["lon"]]
        })
    else:
        return jsonify({"status": "No drivers available"})

if __name__ == "__main__":
    app.run(debug=True)