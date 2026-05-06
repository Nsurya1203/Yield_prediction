const products = [
{ id:1, name:"Nitrogen Booster", price:500, category:"poor" },
{ id:2, name:"Phosphorus Enricher", price:600, category:"poor" },
{ id:3, name:"Potassium Mix", price:650, category:"poor" },
{ id:4, name:"Balanced NPK", price:800, category:"moderate" },
{ id:5, name:"Organic Compost", price:900, category:"moderate" },
{ id:6, name:"Soil Conditioner", price:1100, category:"moderate" },
{ id:7, name:"Premium Fertilizer Pro", price:1500, category:"rich" },
{ id:8, name:"AI Soil Sensor", price:5000, category:"rich" },
{ id:9, name:"Drip Irrigation Kit", price:3500, category:"poor" },
{ id:10, name:"Advanced Irrigation Controller", price:7000, category:"rich" },
{ id:11, name:"Crop Booster Spray", price:400, category:"moderate" },
{ id:12, name:"pH Balancer", price:550, category:"poor" },
{ id:13, name:"Soil Testing Kit", price:2000, category:"moderate" },
{ id:14, name:"Smart Weather Station", price:9000, category:"rich" },
{ id:15, name:"Bio Growth Enhancer", price:750, category:"moderate" },
{ id:16, name:"Precision Seeder", price:12000, category:"rich" },
{ id:17, name:"Organic Mulch Pack", price:600, category:"poor" },
{ id:18, name:"Yield Optimizer Pro", price:2000, category:"rich" },
{ id:19, name:"Humidity Monitor", price:2500, category:"moderate" },
{ id:20, name:"Temperature Sensor", price:1800, category:"moderate" }
];

function showProducts(cluster) {

    const filtered = products.filter(p => p.category === cluster);

    if(filtered.length === 0){
    document.getElementById("catalogue").innerHTML =
    "<p style='color:white;'>No recommended products for this soil type.</p>";
    return;
   }

   const html = filtered.map(p => `
   <div class="product">
   <h3>${p.name}</h3>
   <p>Price: ₹${p.price}</p>
   </div>
   `).join("");

    document.getElementById("catalogue").innerHTML = html;
}