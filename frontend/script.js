const form = document.getElementById('form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const typeInput = document.getElementById('type');
const transactionsUl = document.getElementById('transactions');

const inDisplay = document.getElementById('in');
const outDisplay = document.getElementById('out');
const totalDisplay = document.getElementById('total');

let chart;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const transaction = {
    description: descInput.value,
    amount: parseFloat(amountInput.value),
    date: dateInput.value,
    type: typeInput.value
  };

  await fetch('http://localhost:3000/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction)
  });

  form.reset();
  loadTransactions();
});

async function loadTransactions() {
  const res = await fetch('http://localhost:3000/api/transactions');
  const data = await res.json();

  let totalIn = 0, totalOut = 0;
  transactionsUl.innerHTML = '';

  data.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `${t.date} - ${t.description} (${t.type}): R$ ${t.amount.toFixed(2)}`;
    transactionsUl.appendChild(li);

    if (t.type === 'entrada') totalIn += t.amount;
    else totalOut += t.amount;
  });

  const saldo = totalIn - totalOut;
  inDisplay.textContent = totalIn.toFixed(2);
  outDisplay.textContent = totalOut.toFixed(2);
  totalDisplay.textContent = saldo.toFixed(2);

  updateChart(totalIn, totalOut);
}

function updateChart(entrada, saida) {
  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Entradas', 'Saídas'],
      datasets: [{
        data: [entrada, saida],
        backgroundColor: ['#00C49F', '#FF8042']
      }]
    }
  });
}

loadTransactions();
