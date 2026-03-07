import math
import json

# Load drivers
with open("drivera.json") as f:
    drivers = json.load(f)

def distance(lat1, lon1, lat2, lon2):
    return math.sqrt((lat1 - lat2)**2 + (lon1 - lon2)**2) * 111

def find_nearest_driver(bus_lat, bus_lon):
    nearest = None
    min_dist = 9999

    for d in drivers:
        if d["available"]:
            dist = distance(bus_lat, bus_lon, d["lat"], d["lon"])
            if dist < min_dist:
                min_dist = dist
                nearest = d

    if nearest:
        nearest["available"] = False
    return nearest

def detect_delay(speed):
    return speed < 10