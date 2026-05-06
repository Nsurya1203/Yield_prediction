/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    handlePredictionForm();
    displayCartPage();
    displayTransactionPage();

    // ⭐ NEW — show prediction history
    displayHistory();
});


/* =========================
   MODEL TRAINING
========================= */

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
        },
        trainedAt: new Date().toLocaleString()
    };

    localStorage.setItem("trainedModel", JSON.stringify(model));

    const status = document.getElementById("trainStatus");
    if (status) {
        status.innerHTML = "Model Trained Successfully at " + model.trainedAt;
    }
}


/* =========================
   PREDICTION HANDLER
========================= */

function handlePredictionForm() {

    const form = document.getElementById("predictionForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const data = {
            n: parseFloat(document.getElementById("n").value),
            p: parseFloat(document.getElementById("p").value),
            k: parseFloat(document.getElementById("k").value),
            ph: parseFloat(document.getElementById("ph").value),
            rainfall: parseFloat(document.getElementById("rainfall").value),
            temperature: parseFloat(document.getElementById("temperature").value),
            humidity: parseFloat(document.getElementById("humidity").value)
        };

        const prediction = predictYield(data);

        if (prediction === null) {
            alert("Please Train Model First");
            return;
        }

        const cluster = soilCluster(data);

        /* Soil Health */
        const soilScore = calculateSoilHealth(data);
        const soilText = document.getElementById("soilScoreText");
        if (soilText) soilText.innerHTML = "<strong>Soil Health Score:</strong> " + soilScore.toFixed(0) + "/100";

        /* Reset feature sections before new prediction */
       const features = [
       "soilFeature",
       "cropFeature",
       "bestCropFeature",
       "suggestFeature",
       "productFeature"
];

features.forEach(function(id){
    const el = document.getElementById(id);
    if(el !== null){
        el.style.display = "none";
    }
});

        /* Prediction result */
        const resultDiv = document.getElementById("predictionResult");

        if (resultDiv) {
            resultDiv.innerHTML = `
                <h3>🌾 AI Prediction Result</h3>
                <p><strong>Predicted Yield:</strong> ${prediction.toFixed(2)} kg/ha</p>
            `;
        }

        /* Show feature buttons */
       const featureButtons = document.getElementById("featureButtons");
if (featureButtons) {
    featureButtons.style.display = "grid";
}
 

        /* ⭐ FIX — define crops OUTSIDE */
        const crops = recommendCrops(cluster);

        const cropList = document.getElementById("cropList");
        if (cropList) {
            cropList.innerHTML = crops.map(c => `<li>${c}</li>`).join("");
        }

        /* Best crop */
        const bestCrop = predictBestCrop(data);
        const bestCropEl = document.getElementById("bestCrop");
        if (bestCropEl) bestCropEl.innerHTML = "<strong>🌾 " + bestCrop + "</strong>";

        /* Suggestions */
        const sug = generateSuggestions(data);
        const sugList = document.getElementById("suggestionList");
        if (sugList) {
            sugList.innerHTML = sug.map(s => `<li>${s}</li>`).join("");
        }

        /* ⭐ SAVE HISTORY */
        savePredictionHistory(data, prediction, cluster, soilScore, crops, bestCrop);
        displayHistory();

        showProducts(cluster);
    });
}


/* =========================
   CART MANAGEMENT
========================= */

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cartCount");
    if (cartCount) cartCount.innerText = cart.length;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Added to Cart");
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCartPage();
    updateCartCount();
}


/* =========================
   CART PAGE DISPLAY
========================= */

function displayCartPage() {

    const cartContainer = document.getElementById("cartItems");
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    const html = cart.map((item, index) => {
        total += item.price;

        return `
            <div class="cart-item">
                <p><strong>${item.name}</strong></p>
                <p>₹ ${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
                <hr>
            </div>
        `;
    }).join("");

    cartContainer.innerHTML = html;

    const totalAmount = document.getElementById("totalAmount");
    if (totalAmount) totalAmount.innerHTML = "<strong>Total: ₹ " + total + "</strong>";
}


/* =========================
   CHECKOUT PROCESS
========================= */

function proceedCheckout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is Empty");
        return;
    }

    const transaction = {
        id: "TXN" + Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        paymentMethod: "Credit/Debit Card",
        status: "Successful"
    };

    localStorage.setItem("lastTransaction", JSON.stringify(transaction));
    localStorage.removeItem("cart");

    updateCartCount();
    window.location.href = "transaction.html";
}


/* =========================
   TRANSACTION PAGE
========================= */

function displayTransactionPage() {

    const container = document.getElementById("transactionDetails");
    if (!container) return;

    const transaction = JSON.parse(localStorage.getItem("lastTransaction"));

    if (!transaction) {
        container.innerHTML = "<p>No Transaction Found.</p>";
        return;
    }

    const itemsHTML = transaction.items.map(item => `
        <p>${item.name} - ₹ ${item.price}</p>
    `).join("");

    container.innerHTML = `
        <h3>Transaction ID: ${transaction.id}</h3>
        <p><strong>Date:</strong> ${transaction.date}</p>
        <hr>
        ${itemsHTML}
        <hr>
        <h3>Total Paid: ₹ ${transaction.total}</h3>
        <p><strong>Payment Method:</strong> ${transaction.paymentMethod}</p>
        <p><strong>Status:</strong> ${transaction.status}</p>
    `;
}


/* =========================
   PRODUCT DISPLAY
========================= */

function showProducts(cluster) {

const catalogue = document.getElementById("catalogue");
if (!catalogue) return;

const filtered = products.filter(p => p.category === cluster);

if (filtered.length === 0) {
catalogue.innerHTML = "<p style='color:white;'>No products available</p>";
return;
}

const html = filtered.map(product => `
<div class="product">
<h4>${product.name}</h4>
<p>₹ ${product.price}</p>
<p style="font-size:13px;color:#666;">Recommended agricultural input</p>
</div>
`).join("");

catalogue.innerHTML = html;

}


/* =========================
   SOIL HEALTH
========================= */

function calculateSoilHealth(data) {

    let score = 0;

    score += Math.min(data.n, 100) * 0.25;
    score += Math.min(data.p, 100) * 0.2;
    score += Math.min(data.k, 100) * 0.2;
    score += Math.max(0, 25 - Math.abs(data.ph - 7) * 5);

    return Math.min(100, score);
}

let soilChartInstance = null;



/* =========================
   CROP RECOMMENDATION
========================= */

function recommendCrops(cluster){

const crops = {

poor:[
"Millets","Groundnut","Lentils","Peas","Mustard",
"Carrot","Barley"
],

moderate:[
"Maize","Cotton","Soybean","Sunflower",
"Tomato","Potato","Onion","Chilli","Garlic",
"Cabbage","Cauliflower"
],

rich:[
"Rice","Wheat","Sugarcane","Banana","Mango",
"Coffee","Tea"
]

};

return crops[cluster] || [];

}


/* =========================
   BEST CROP PREDICTION
========================= */

function predictBestCrop(data){

if(!data) return "Unknown";

const crops = {

Rice:{n:130,p:90,k:50,ph:6.5,rain:150,temp:30,hum:70},
Wheat:{n:90,p:70,k:40,ph:6.8,rain:80,temp:15,hum:40},
Maize:{n:70,p:60,k:50,ph:6.5,rain:100,temp:25,hum:60},
Cotton:{n:50,p:45,k:30,ph:7,rain:80,temp:28,hum:50},
Groundnut:{n:40,p:30,k:30,ph:6.5,rain:90,temp:27,hum:55},
Millets:{n:30,p:20,k:25,ph:6.5,rain:50,temp:30,hum:40},
Sugarcane:{n:140,p:80,k:100,ph:7,rain:200,temp:28,hum:80},
Soybean:{n:40,p:50,k:40,ph:6.5,rain:90,temp:26,hum:65},
Barley:{n:70,p:50,k:35,ph:6.7,rain:70,temp:18,hum:45},
Sunflower:{n:60,p:50,k:45,ph:6.8,rain:70,temp:24,hum:50},
Tomato:{n:100,p:80,k:90,ph:6.5,rain:100,temp:24,hum:65},
Potato:{n:120,p:80,k:110,ph:5.5,rain:90,temp:18,hum:60},
Onion:{n:100,p:60,k:50,ph:6.5,rain:80,temp:22,hum:60},
Chilli:{n:80,p:60,k:60,ph:6.5,rain:70,temp:27,hum:55},
Garlic:{n:90,p:60,k:60,ph:6.5,rain:60,temp:20,hum:50},
Cabbage:{n:120,p:80,k:90,ph:6.5,rain:90,temp:20,hum:65},
Cauliflower:{n:120,p:80,k:90,ph:6.5,rain:85,temp:18,hum:60},
Carrot:{n:60,p:50,k:70,ph:6.3,rain:70,temp:18,hum:55},
Peas:{n:40,p:50,k:40,ph:6.5,rain:60,temp:18,hum:50},
Lentils:{n:35,p:45,k:35,ph:6.5,rain:50,temp:20,hum:45},
Mustard:{n:80,p:60,k:50,ph:6.5,rain:60,temp:22,hum:40},
Tea:{n:150,p:80,k:140,ph:5.5,rain:250,temp:25,hum:85},
Coffee:{n:130,p:70,k:120,ph:6,rain:200,temp:24,hum:80},
Banana:{n:140,p:80,k:120,ph:6.5,rain:180,temp:30,hum:75},
Mango:{n:120,p:60,k:100,ph:6.5,rain:120,temp:28,hum:70}

};

let bestCrop = null;
let smallestDistance = Infinity;

for(const crop in crops){

const c = crops[crop];

const distance =
Math.abs(data.n - c.n) * 2 +
Math.abs(data.p - c.p) * 2 +
Math.abs(data.k - c.k) * 2 +
Math.abs(data.ph - c.ph) * 12 +
Math.abs(data.rainfall - c.rain) +
Math.abs(data.temperature - c.temp) * 6 +
Math.abs(data.humidity - c.hum);

if(distance < smallestDistance){
smallestDistance = distance;
bestCrop = crop;
}

}

return bestCrop;

}

/* =========================
   IMPROVEMENT SUGGESTIONS
========================= */

function generateSuggestions(data) {

    const suggestions = [];

    if (data.n < 50) suggestions.push("Increase Nitrogen using urea or organic manure.");
    if (data.p < 40) suggestions.push("Apply phosphorus fertilizer for better root growth.");
    if (data.k < 40) suggestions.push("Add potassium fertilizer for crop strength.");

    if (data.ph < 6) suggestions.push("Soil is acidic. Add lime to raise pH.");
    if (data.ph > 7.5) suggestions.push("Soil is alkaline. Add organic matter to reduce pH.");

    if (data.rainfall < 50) suggestions.push("Low rainfall detected. Consider irrigation.");
    if (data.temperature < 18) suggestions.push("Low temperature may affect growth. Choose tolerant crops.");

    /* If everything is good, show smart farming tips */

if(suggestions.length === 0){

suggestions.push("Monitor soil nutrients regularly.");
suggestions.push("Maintain proper irrigation schedule.");
suggestions.push("Use organic compost for sustainable farming.");
}
    return suggestions;
}

/* =========================
   ⭐ SAVE PREDICTION HISTORY
========================= */

function savePredictionHistory(data, prediction, cluster, soilScore, crops, bestCrop) {

    let history = JSON.parse(localStorage.getItem("predictionHistory")) || [];

    const record = {
        date: new Date().toLocaleString(),
        inputs: data,
        yield: prediction,
        soil: cluster,
        soilScore: soilScore,
        crops: crops,
        bestCrop: bestCrop
    };

    history.unshift(record); // latest first

    localStorage.setItem("predictionHistory", JSON.stringify(history));
}

/* =========================
   ⭐ DISPLAY HISTORY
========================= */

function displayHistory(){

const container = document.getElementById("historyList");
if(!container) return;

let history = JSON.parse(localStorage.getItem("predictionHistory")) || [];

const selectedDate = document.getElementById("dateFilter")?.value;
const cropFilter = document.getElementById("cropFilter")?.value || "all";

/* Apply Filters */

history = history.filter(h=>{

let dateMatch = true;
let cropMatch = true;

if(selectedDate){

const recordDate = new Date(h.date).toISOString().split("T")[0];
dateMatch = recordDate === selectedDate;

}

if(cropFilter !== "all"){
cropMatch = h.bestCrop === cropFilter;
}

return dateMatch && cropMatch;

});


if(history.length === 0){
container.innerHTML="<p>No matching records found.</p>";
return;
}

const html = history.map((h,index)=>`
<div style="margin-bottom:20px;padding:15px;border:1px solid #eee;border-radius:10px;position:relative;">

<div style="display:flex;justify-content:space-between;align-items:center;">
<strong>${h.date}</strong>
<button onclick="deleteRecord(${index})" 
style="background:#e53935;color:white;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">
Delete
</button>
</div>

<br>

<b>Inputs</b><br>
N: ${h.inputs.n} |
P: ${h.inputs.p} |
K: ${h.inputs.k} |
pH: ${h.inputs.ph}<br>
Rainfall: ${h.inputs.rainfall} |
Temp: ${h.inputs.temperature} |
Humidity: ${h.inputs.humidity}<br><br>

<b>Prediction</b><br>
Yield: ${h.yield.toFixed(2)} kg/ha<br>
Soil: ${h.soil}<br>
Soil Score: ${h.soilScore.toFixed(0)}<br>
Best Crop: ${h.bestCrop}

</div>
`).join("");

container.innerHTML = html;

}

/* Delete specific record */

function deleteRecord(index){

let confirmDelete = confirm("Are you sure you want to delete this prediction record?");

if(!confirmDelete){
return;
}

let history = JSON.parse(localStorage.getItem("predictionHistory")) || [];

history.splice(index,1);

localStorage.setItem("predictionHistory", JSON.stringify(history));

displayHistory();

}

/* Clear filters */

function clearFilters(){

document.getElementById("dateFilter").value="";
document.getElementById("cropFilter").value="all";

displayHistory();

}

/* Toggle features */

function toggleFeature(id) {
const el = document.getElementById(id);
if (!el) return;

if (el.style.display === "none" || el.style.display === "") {
el.style.display = "block";
} else {
el.style.display = "none";
}
}

function exportHistoryPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

let history = JSON.parse(localStorage.getItem("predictionHistory")) || [];

if(history.length === 0){
alert("No prediction history available");
return;
}

let yStart = 45;
let boxHeight = 45;
let boxGap = 10;
let recordCount = 0;
let pageNumber = 1;

function addHeader(){
doc.setFontSize(18);
doc.text("AgriAI Smart Farming Report",20,20);

doc.setFontSize(12);
doc.text("Prediction History Export",20,28);

doc.line(20,32,190,32);
}

function addFooter(){
doc.setFontSize(10);
doc.text(`Page ${pageNumber}`,180,290,{align:"right"});
}

addHeader();

history.forEach((h,index)=>{

if(recordCount === 4){
addFooter();
doc.addPage();
pageNumber++;

addHeader();
recordCount = 0;
yStart = 45;
}

let y = yStart + (recordCount * (boxHeight + boxGap));

/* Rectangle box */

doc.roundedRect(20,y,170,boxHeight,3,3);

/* Title */

doc.setFontSize(12);
doc.text(`Prediction #${index+1}`,25,y+8);

/* Inputs */

doc.setFontSize(10);

doc.text(
`Inputs: N:${h.inputs.n}  P:${h.inputs.p}  K:${h.inputs.k}  pH:${h.inputs.ph}`,
25,y+16
);

doc.text(
`Rainfall:${h.inputs.rainfall}  Temp:${h.inputs.temperature}  Humidity:${h.inputs.humidity}`,
25,y+22
);

/* Prediction */

doc.text(
`Yield:${h.yield.toFixed(2)} kg/ha`,
25,y+30
);

doc.text(
`Soil:${h.soil}  |  Soil Score:${h.soilScore.toFixed(2)}  |  Best Crop:${h.bestCrop}`,
25,y+36
);

doc.text(`Date: ${h.date}`,25,y+42);

recordCount++;

});

addFooter();

doc.save("AgriAI_Prediction_Report.pdf");

}