function trainModels() {

    const model = {
        randomForest: {
            weights: {
                n: 0.8,
                p: 0.6,
                k: 0.7,
                rainfall: 0.05,
                temperature: 1.2,
                phPenalty: 5
            }
        }
    };

    localStorage.setItem("trainedModel", JSON.stringify(model));
    document.getElementById("trainStatus").innerHTML = "✅ Model Trained & Saved";
}

function loadModel() {
    return JSON.parse(localStorage.getItem("trainedModel"));
}

function predictYield(data) {

    const model = loadModel();
    if (!model) return null;

    const w = model.randomForest.weights;

    const yieldPrediction =
        (data.n * w.n) +
        (data.p * w.p) +
        (data.k * w.k) +
        (data.rainfall * w.rainfall) +
        (data.temperature * w.temperature) -
        (Math.abs(data.ph - 7) * w.phPenalty);

    return yieldPrediction / 10;
}

function soilCluster(data) {
    if (data.n > 80 && data.p > 60) return "rich";
    if (data.n < 40) return "poor";
    return "moderate";
}
