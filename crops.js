function showCrop(crop,btn){

// remove highlight from all crop buttons
document.querySelectorAll(".crop-btn").forEach(b=>{
b.classList.remove("active");
});

// highlight the clicked crop
if(btn){
btn.classList.add("active");
}

const data = {

rice:{
html:`
<h2>🌾 Rice</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 130</p>
<p>🧪 Phosphorus: 90</p>
<p>⚡ Potassium: 50</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 150</p>
<p>🌡 Temperature: 30</p>
<p>💧 Humidity: 70</p>
</div>
`,
values:{n:130,p:90,k:50,ph:6.5,rainfall:150,temperature:30,humidity:70}
},

wheat:{
html:`
<h2>🌿 Wheat</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 90</p>
<p>🧪 Phosphorus: 70</p>
<p>⚡ Potassium: 40</p>
<p>⚖ pH: 6.8</p>
<p>🌧 Rainfall: 80</p>
<p>🌡 Temperature: 15</p>
<p>💧 Humidity: 40</p>
</div>
`,
values:{n:90,p:70,k:40,ph:6.8,rainfall:80,temperature:15,humidity:40}
},

maize:{
html:`
<h2>🌽 Maize</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 70</p>
<p>🧪 Phosphorus: 60</p>
<p>⚡ Potassium: 50</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 100</p>
<p>🌡 Temperature: 25</p>
<p>💧 Humidity: 60</p>
</div>
`,
values:{n:70,p:60,k:50,ph:6.5,rainfall:100,temperature:25,humidity:60}
},

cotton:{
html:`
<h2>🧵 Cotton</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 50</p>
<p>🧪 Phosphorus: 45</p>
<p>⚡ Potassium: 30</p>
<p>⚖ pH: 7</p>
<p>🌧 Rainfall: 80</p>
<p>🌡 Temperature: 28</p>
<p>💧 Humidity: 50</p>
</div>
`,
values:{n:50,p:45,k:30,ph:7,rainfall:80,temperature:28,humidity:50}
},

groundnut:{
html:`
<h2>🥜 Groundnut</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 40</p>
<p>🧪 Phosphorus: 30</p>
<p>⚡ Potassium: 30</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 90</p>
<p>🌡 Temperature: 27</p>
<p>💧 Humidity: 55</p>
</div>
`,
values:{n:40,p:30,k:30,ph:6.5,rainfall:90,temperature:27,humidity:55}
},

millets:{
html:`
<h2>🌱 Millets</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 30</p>
<p>🧪 Phosphorus: 20</p>
<p>⚡ Potassium: 25</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 50</p>
<p>🌡 Temperature: 30</p>
<p>💧 Humidity: 40</p>
</div>
`,
values:{n:30,p:20,k:25,ph:6.5,rainfall:50,temperature:30,humidity:40}
},

sugarcane:{
html:`
<h2>🎋 Sugarcane</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 140</p>
<p>🧪 Phosphorus: 80</p>
<p>⚡ Potassium: 100</p>
<p>⚖ pH: 6.8</p>
<p>🌧 Rainfall: 200</p>
<p>🌡 Temperature: 32</p>
<p>💧 Humidity: 75</p>
</div>
`,
values:{n:140,p:80,k:100,ph:6.8,rainfall:200,temperature:32,humidity:75}
},

soybean:{
html:`
<h2>🫘 Soybean</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 40</p>
<p>🧪 Phosphorus: 50</p>
<p>⚡ Potassium: 40</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 110</p>
<p>🌡 Temperature: 26</p>
<p>💧 Humidity: 65</p>
</div>
`,
values:{n:40,p:50,k:40,ph:6.5,rainfall:110,temperature:26,humidity:65}
},

barley:{
html:`
<h2>🌿 Barley</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 70</p>
<p>🧪 Phosphorus: 50</p>
<p>⚡ Potassium: 35</p>
<p>⚖ pH: 6.7</p>
<p>🌧 Rainfall: 70</p>
<p>🌡 Temperature: 18</p>
<p>💧 Humidity: 45</p>
</div>
`,
values:{n:70,p:50,k:35,ph:6.7,rainfall:70,temperature:18,humidity:45}
},

sunflower:{
html:`
<h2>🌻 Sunflower</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 60</p>
<p>🧪 Phosphorus: 50</p>
<p>⚡ Potassium: 45</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 90</p>
<p>🌡 Temperature: 27</p>
<p>💧 Humidity: 55</p>
</div>
`,
values:{n:60,p:50,k:45,ph:6.5,rainfall:90,temperature:27,humidity:55}
},

tomato:{
html:`
<h2>🍅 Tomato</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 100</p>
<p>🧪 Phosphorus: 80</p>
<p>⚡ Potassium: 90</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 100</p>
<p>🌡 Temperature: 24</p>
<p>💧 Humidity: 70</p>
</div>
`,
values:{n:100,p:80,k:90,ph:6.5,rainfall:100,temperature:24,humidity:70}
},

potato:{
html:`
<h2>🥔 Potato</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 120</p>
<p>🧪 Phosphorus: 80</p>
<p>⚡ Potassium: 110</p>
<p>⚖ pH: 6</p>
<p>🌧 Rainfall: 90</p>
<p>🌡 Temperature: 18</p>
<p>💧 Humidity: 65</p>
</div>
`,
values:{n:120,p:80,k:110,ph:6,rainfall:90,temperature:18,humidity:65}
},

onion:{
html:`
<h2>🧅 Onion</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 100</p>
<p>🧪 Phosphorus: 60</p>
<p>⚡ Potassium: 50</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 80</p>
<p>🌡 Temperature: 20</p>
<p>💧 Humidity: 60</p>
</div>
`,
values:{n:100,p:60,k:50,ph:6.5,rainfall:80,temperature:20,humidity:60}
},

chilli:{
html:`
<h2>🌶 Chilli</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 80</p>
<p>🧪 Phosphorus: 60</p>
<p>⚡ Potassium: 60</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 90</p>
<p>🌡 Temperature: 28</p>
<p>💧 Humidity: 65</p>
</div>
`,
values:{n:80,p:60,k:60,ph:6.5,rainfall:90,temperature:28,humidity:65}
},

garlic:{
html:`
<h2>🧄 Garlic</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 90</p>
<p>🧪 Phosphorus: 60</p>
<p>⚡ Potassium: 60</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 70</p>
<p>🌡 Temperature: 22</p>
<p>💧 Humidity: 60</p>
</div>
`,
values:{n:90,p:60,k:60,ph:6.5,rainfall:70,temperature:22,humidity:60}
},

cabbage:{
html:`
<h2>🥬 Cabbage</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 120</p>
<p>🧪 Phosphorus: 80</p>
<p>⚡ Potassium: 90</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 100</p>
<p>🌡 Temperature: 18</p>
<p>💧 Humidity: 70</p>
</div>
`,
values:{n:120,p:80,k:90,ph:6.5,rainfall:100,temperature:18,humidity:70}
},

cauliflower:{
html:`
<h2>🥦 Cauliflower</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 120</p>
<p>🧪 Phosphorus: 80</p>
<p>⚡ Potassium: 90</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 100</p>
<p>🌡 Temperature: 18</p>
<p>💧 Humidity: 70</p>
</div>
`,
values:{n:120,p:80,k:90,ph:6.5,rainfall:100,temperature:18,humidity:70}
},

carrot:{
html:`
<h2>🥕 Carrot</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 60</p>
<p>🧪 Phosphorus: 50</p>
<p>⚡ Potassium: 70</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 70</p>
<p>🌡 Temperature: 18</p>
<p>💧 Humidity: 55</p>
</div>
`,
values:{n:60,p:50,k:70,ph:6.5,rainfall:70,temperature:18,humidity:55}
},

peas:{
html:`
<h2>🟢 Peas</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 40</p>
<p>🧪 Phosphorus: 50</p>
<p>⚡ Potassium: 40</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 60</p>
<p>🌡 Temperature: 18</p>
<p>💧 Humidity: 55</p>
</div>
`,
values:{n:40,p:50,k:40,ph:6.5,rainfall:60,temperature:18,humidity:55}
},

lentils:{
html:`
<h2>🫘 Lentils</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 35</p>
<p>🧪 Phosphorus: 45</p>
<p>⚡ Potassium: 35</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 60</p>
<p>🌡 Temperature: 20</p>
<p>💧 Humidity: 50</p>
</div>
`,
values:{n:35,p:45,k:35,ph:6.5,rainfall:60,temperature:20,humidity:50}
},

mustard:{
html:`
<h2>🌼 Mustard</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 80</p>
<p>🧪 Phosphorus: 60</p>
<p>⚡ Potassium: 50</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 70</p>
<p>🌡 Temperature: 22</p>
<p>💧 Humidity: 50</p>
</div>
`,
values:{n:80,p:60,k:50,ph:6.5,rainfall:70,temperature:22,humidity:50}
},

tea:{
html:`
<h2>🍃 Tea</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 150</p>
<p>🧪 Phosphorus: 80</p>
<p>⚡ Potassium: 140</p>
<p>⚖ pH: 5</p>
<p>🌧 Rainfall: 250</p>
<p>🌡 Temperature: 25</p>
<p>💧 Humidity: 85</p>
</div>
`,
values:{n:150,p:80,k:140,ph:5,rainfall:250,temperature:25,humidity:85}
},

coffee:{
html:`
<h2>☕ Coffee</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 130</p>
<p>🧪 Phosphorus: 70</p>
<p>⚡ Potassium: 120</p>
<p>⚖ pH: 6</p>
<p>🌧 Rainfall: 200</p>
<p>🌡 Temperature: 23</p>
<p>💧 Humidity: 75</p>
</div>
`,
values:{n:130,p:70,k:120,ph:6,rainfall:200,temperature:23,humidity:75}
},

banana:{
html:`
<h2>🍌 Banana</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 140</p>
<p>🧪 Phosphorus: 90</p>
<p>⚡ Potassium: 120</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 220</p>
<p>🌡 Temperature: 30</p>
<p>💧 Humidity: 80</p>
</div>
`,
values:{n:140,p:90,k:120,ph:6.5,rainfall:220,temperature:30,humidity:80}
},

mango:{
html:`
<h2>🥭 Mango</h2>
<div class="crop-info">
<p>🌱 Nitrogen: 120</p>
<p>🧪 Phosphorus: 60</p>
<p>⚡ Potassium: 100</p>
<p>⚖ pH: 6.5</p>
<p>🌧 Rainfall: 120</p>
<p>🌡 Temperature: 32</p>
<p>💧 Humidity: 65</p>
</div>
`,
values:{n:120,p:60,k:100,ph:6.5,rainfall:120,temperature:32,humidity:65}
}

};

const cropData = data[crop];

if(!cropData){
document.getElementById("cropDetails").innerHTML="<p>Crop data not available</p>";
return;
}

document.getElementById("cropDetails").innerHTML=
cropData.html+
`<br><br> <button class="use-values-btn" onclick='useValues(${JSON.stringify(cropData.values)})'>
Use These Values → Predict Yield </button>`;
}

function useValues(values){

localStorage.setItem("cropValues",JSON.stringify(values));

window.location.href="predict.html";

}
