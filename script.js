const stocks = [
  { name: "TechCorp", price: 120, owned: 0, buyThreshold: 100, sellThreshold: 130 },
  { name: "BioHealth", price: 80, owned: 0, buyThreshold: 65, sellThreshold: 95 },
  { name: "AutoFast", price: 45, owned: 0, buyThreshold: 35, sellThreshold: 55 },
  { name: "EcoEnergy", price: 60, owned: 0, buyThreshold: 50, sellThreshold: 75 },
];

let balance = 1000;

function updateStocks() {
  const tbody = document.getElementById("stockTable");
  tbody.innerHTML = "";

  stocks.forEach(stock => {
    const change = (Math.random() * 10 - 5).toFixed(2); // -5 à +5
    stock.price = Math.max(1, (parseFloat(stock.price) + parseFloat(change))).toFixed(2);

    // AUTO ACHAT
    if (stock.price <= stock.buyThreshold && balance >= stock.price) {
      stock.owned++;
      balance -= stock.price;
      console.log(`Achat de 1 ${stock.name} à ${stock.price} €`);
    }

    // AUTO VENTE
    if (stock.owned > 0 && stock.price >= stock.sellThreshold) {
      balance += stock.price * stock.owned;
      console.log(`Vente de ${stock.owned} ${stock.name} à ${stock.price} €`);
      stock.owned = 0;
    }

    // VENTE D'URGENCE SI CHUTE FORTEMENT (-4 ou moins)
    if (stock.owned > 0 && change <= -4) {
      balance += stock.price * stock.owned;
      console.log(`VENTE URGENTE de ${stock.owned} ${stock.name} à ${stock.price} € (chute rapide)`);
      stock.owned = 0;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${stock.name}</td>
      <td>${stock.price}</td>
      <td class="${change >= 0 ? 'up' : 'down'}">${change >= 0 ? '+' : ''}${change}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("balance").textContent = balance.toFixed(2);
}

updateStocks();
setInterval(updateStocks, 5000);
