const stocks = [
  { name: "TechCorp", price: 120 },
  { name: "BioHealth", price: 80 },
  { name: "AutoFast", price: 45 },
  { name: "EcoEnergy", price: 60 },
];

function updateStocks() {
  const tbody = document.getElementById("stockTable");
  tbody.innerHTML = "";

  stocks.forEach(stock => {
    const change = (Math.random() * 10 - 5).toFixed(2); // variation -5 à +5
    stock.price = Math.max(1, (parseFloat(stock.price) + parseFloat(change))).toFixed(2);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${stock.name}</td>
      <td>${stock.price}</td>
      <td class="${change >= 0 ? 'up' : 'down'}">${change >= 0 ? '+' : ''}${change}</td>
    `;
    tbody.appendChild(row);
  });
}

updateStocks();
setInterval(updateStocks, 5000);
