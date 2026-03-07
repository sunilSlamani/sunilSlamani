async function predictETA() {
    let speed = document.getElementById("speed").value;
    let distance = document.getElementById("distance").value;

    let res = await fetch("http://127.0.0.1:5000/predict_eta", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({speed: Number(speed), distance: Number(distance)})
    });

    let data = await res.json();
    document.getElementById("result").innerText =
        "Predicted ETA: " + data.ETA_minutes + " minutes";
}

async function dispatch() {
    let speed = document.getElementById("speed").value;

    let res = await fetch("http://127.0.0.1:5000/dispatch", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({lat: 12.90, lon: 77.50, speed: Number(speed)})
    });

    let data = await res.json();
    document.getElementById("result").innerText = data.status;
}