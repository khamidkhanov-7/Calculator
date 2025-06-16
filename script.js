let currentLang = 'uz';
const sound = document.getElementById("clickSound");
const historyArr = [];
const rates = {}; // dynamic kurslar
const baseCurrency = 'UZS';

// API orqali kurslarni olish
async function fetchRates() {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${baseCurrency}`);
    const data = await res.json();
    Object.assign(rates, data.conversion_rates);
    showTopRates();
  } catch (e) {
    console.error("Kurslarni yuklashda xatolik:", e);
  }
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

function toggleLang() {
  currentLang = currentLang === 'uz' ? 'ru' : 'uz';

  document.getElementById('menuTitle').textContent = currentLang === 'uz' ? 'Xizmatni tanlang:' : 'Выберите услугу:';
  document.getElementById('title').textContent = currentLang === 'uz' ? 'Kalkulyator' : 'Калькулятор';
  document.getElementById('converterTitle').textContent = currentLang === 'uz' ? 'Valyuta Konvertori' : 'Конвертер Валют';
  document.getElementById('num1').placeholder = currentLang === 'uz' ? '1-son' : '1-число';
  document.getElementById('num2').placeholder = currentLang === 'uz' ? '2-son' : '2-число';
  document.getElementById('calculateBtn').textContent = currentLang === 'uz' ? 'Hisobla' : 'Вычислить';
  document.getElementById('amount').placeholder = currentLang === 'uz' ? 'Miqdor (UZS)' : 'Сумма (UZS)';
  document.getElementById('footer').textContent = currentLang === 'uz'
    ? 'Created by Khamidkhanov Muhammadzohid'
    : 'Создано: Хамидханов Мухаммадзохид';

  const op = document.getElementById('operation').options;
  op[0].text = currentLang === 'uz' ? '➕ Qo‘shish' : '➕ Сложение';
  op[1].text = currentLang === 'uz' ? '➖ Ayirish' : '➖ Вычитание';
  op[2].text = currentLang === 'uz' ? '✖️ Ko‘paytirish' : '✖️ Умножение';
  op[3].text = currentLang === 'uz' ? '➗ Bo‘lish' : '➗ Деление';
}

function showSection(type) {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("calculator").style.display = type === 'calc' ? "block" : "none";
  document.getElementById("converter").style.display = type === 'convert' ? "block" : "none";
}

function backToMenu() {
  document.getElementById("mainMenu").style.display = "block";
  document.getElementById("calculator").style.display = "none";
  document.getElementById("converter").style.display = "none";
}

async function calculate() {
  try { await sound.play(); } catch {}
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const op = document.getElementById("operation").value;

  let result;
  switch(op) {
    case 'add': result = num1 + num2; break;
    case 'subtract': result = num1 - num2; break;
    case 'multiply': result = num1 * num2; break;
    case 'divide': result = num2 !== 0 ? num1 / num2 : '∞'; break;
  }

  const resText = `${currentLang === 'uz' ? 'Natija' : 'Результат'}: ${result}`;
  document.getElementById("result").textContent = resText;

  historyArr.unshift(`${num1} ${getSymbol(op)} ${num2} = ${result}`);
  document.getElementById("history").innerHTML =
    `<strong>${currentLang === 'uz' ? 'Tarix' : 'История'}:</strong><br>` +
    historyArr.slice(0, 10).join("<br>");
}

function getSymbol(op) {
  return { add: '+', subtract: '−', multiply: '×', divide: '÷' }[op];
}

function clearHistory() {
  historyArr.length = 0;
  document.getElementById("history").innerHTML = "";
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;
  const rate = rates[currency.toUpperCase()];
  const converted = amount / rate;

  document.getElementById("convertedResult").textContent =
    `${currentLang === 'uz' ? 'Natija' : 'Результат'}: ${converted.toFixed(2)} ${currency.toUpperCase()}`;
}

function showTopRates() {
  const topDiv = document.getElementById('topRates');
  if (!topDiv) return;

  const sorted = Object.entries(rates)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  topDiv.innerHTML = `
    <h3>${currentLang === 'uz' ? 'Top 10 Kurslar' : 'Топ 10 валют'}</h3>
    <ul>
      ${sorted.map(([code, rate]) => `<li><strong>${code}:</strong> ${rate}</li>`).join('')}
    </ul>
  `;
}

// Boshlanishda kurslarni olib kel
fetchRates();
