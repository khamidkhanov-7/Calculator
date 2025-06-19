document.addEventListener('DOMContentLoaded', function () {
  let expr = "", curRates = {}, historyArr = [];
  const display = document.getElementById('display');
  const langs = ["uz", "ru", "en"];
  let langIndex = 0;

  // Mode toggle
  document.getElementById('modeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  // Language toggle
  document.getElementById('langToggle').addEventListener('click', function () {
    langIndex = (langIndex + 1) % langs.length;
    this.textContent = "🌐 " + langs[langIndex].toUpperCase();
  });

  // Menu toggle
  document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('menuPanel').classList.toggle('hidden');
  });

  // Menu buttons
  document.querySelector("#menuPanel button[onclick*='converter']").addEventListener("click", function () {
    showSection("converter");
  });

  document.querySelector("#menuPanel button[onclick*='age']").addEventListener("click", function () {
    showSection("age");
  });

  document.querySelector("#menuPanel button[onclick*='hideMenu']").addEventListener("click", hideMenu);

  // Main calculator functions
  window.append = function (c) {
    if (display.textContent === '0') display.textContent = '';
    display.textContent += c;
    expr += c;
  };

  window.clearAll = function () {
    expr = ''; display.textContent = '0';
  };

  window.deleteLast = function () {
    expr = expr.slice(0, -1);
    display.textContent = expr || '0';
  };

  window.calculate = function () {
    try {
      const res = eval(expr.replace(/%/g, '/100'));
      recordHistory(expr + ' = ' + res);
      display.textContent = res;
      expr = res.toString();
    } catch {
      display.textContent = 'Xato';
      expr = '';
    }
  };

  function recordHistory(item) {
    historyArr.unshift(item);
    if (historyArr.length > 10) historyArr.pop();
    document.getElementById('history').innerHTML = historyArr.join('<br>');
  }

  window.clearHistory = function () {
    historyArr = [];
    document.getElementById('history').innerHTML = '';
  };

  // Currency converter
  async function loadRates() {
    const r = await fetch("https://v6.exchangerate-api.com/v6/b619ef166163799d5ee3d2b9/latest/USD");
    const d = await r.json();
    curRates = d.conversion_rates;
    const from = document.getElementById('fromCur');
    const to = document.getElementById('toCur');
    [from, to].forEach(s => {
      s.innerHTML = Object.keys(curRates).map(c => `<option>${c}</option>`).join('');
    });
    from.value = 'USD'; to.value = 'UZS';
  }

  window.convertCur = function () {
    const a = parseFloat(document.getElementById('amount').value);
    const f = document.getElementById('fromCur').value;
    const t = document.getElementById('toCur').value;
    if (isNaN(a) || !curRates[f] || !curRates[t]) return;
    const usd = a / curRates[f];
    const conv = (usd * curRates[t]).toFixed(4);
    const now = new Date().toLocaleString();
    document.getElementById('curResult').textContent = `${a} ${f} = ${conv} ${t} (${now})`;
  };

  // Age calculator
  window.calculateAge = function () {
    const dob = new Date(document.getElementById('birthdate').value);
    if (!dob.getTime()) return;
    const diff = Date.now() - dob.getTime();
    const y = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const d = Math.floor(diff / (1000 * 60 * 60 * 24)) - y * 365;
    document.getElementById('ageResult').textContent = `Sizning yoshingiz: ${y} yil, ${d} kun`;
  };

  // Section switching
  window.showSection = function (section) {
    document.getElementById('menuPanel').classList.add('hidden');
    document.getElementById('mainSection').classList.add('hidden');
    document.getElementById('converterSection').classList.add('hidden');
    document.getElementById('ageSection').classList.add('hidden');

    if (section === 'converter') document.getElementById('converterSection').classList.remove('hidden');
    if (section === 'age') document.getElementById('ageSection').classList.remove('hidden');
  };

  window.hideMenu = function () {
    document.getElementById('menuPanel').classList.add('hidden');
  };

  window.backToMain = function () {
    document.getElementById('converterSection').classList.add('hidden');
    document.getElementById('ageSection').classList.add('hidden');
    document.getElementById('mainSection').classList.remove('hidden');
  };

  // Load exchange rates
  loadRates();
});
