let model;

async function loadModel() {
  if (typeof tf === 'undefined') {
    console.error("TensorFlow.js not loaded");
    return;
  }
  model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
}

loadModel();

async function predict() {
  const rain = document.getElementById("rain").value;
  const temp = document.getElementById("temp").value;

  if (!rain || !temp) {
    alert("Please enter both rainfall and temperature");
    return;
  }

  if (typeof tf === 'undefined') {
    alert("TensorFlow.js is loading, please wait and try again");
    return;
  }

  const rainVal = parseFloat(rain);
  const tempVal = parseFloat(temp);

  const input = tf.tensor2d([[rainVal, tempVal]]);
  const output = model.predict(input);
  const result = await output.data();

  document.getElementById("result").innerText =
    "Predicted Yield: " + result[0].toFixed(2);

  input.dispose();
  output.dispose();
}
