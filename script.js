const translations = {
  uz: {
    title: "Kalkulyator Pro",
    menuTitle: "Xizmatni tanlang:",
    calcBtn: "🧮 Kalkulyator",
    convertBtn: "💱 Valyuta Konvertori",
    lifeBtn: "📅 Yashash Hisoblagichi",
    titleCalc: "Kalkulyator",
    calculateBtn: "Hisobla",
    clearHistoryBtn: "🧹 Tarixni tozalash",
    backBtn: "⬅️ Ortga",
    converterTitle: "Valyuta Konvertori",
    convertButton: "Konvertatsiya",
    lifeTitle: "📅 Yashash Hisoblagichi",
    birthLabel: "Tug‘ilgan sanangizni kiriting:",
    lifeCalculateBtn: "Hisobla",
    footer: "Created by Khamidkhanov Muhammadzohid"
  },
  ru: {
    title: "Калькулятор Про",
    menuTitle: "Выберите сервис:",
    calcBtn: "🧮 Калькулятор",
    convertBtn: "💱 Конвертер валют",
    lifeBtn: "📅 Калькулятор жизни",
    titleCalc: "Калькулятор",
    calculateBtn: "Вычислить",
    clearHistoryBtn: "🧹 Очистить историю",
    backBtn: "⬅️ Назад",
    converterTitle: "Конвертер валют",
    convertButton: "Конвертировать",
    lifeTitle: "📅 Калькулятор жизни",
    birthLabel: "Введите дату рождения:",
    lifeCalculateBtn: "Вычислить",
    footer: "Created by Khamidkhanov Muhammadzohid"
  },
  en: {
    title: "Calculator Pro",
    menuTitle: "Choose Service:",
    calcBtn: "🧮 Calculator",
    convertBtn: "💱 Currency Converter",
    lifeBtn: "📅 Life Calculator",
    titleCalc: "Calculator",
    calculateBtn: "Calculate",
    clearHistoryBtn: "🧹 Clear History",
    backBtn: "⬅️ Back",
    converterTitle: "Currency Converter",
    convertButton: "Convert",
    lifeTitle: "📅 Life Calculator",
    birthLabel: "Enter your birth date:",
    lifeCalculateBtn: "Calculate",
    footer: "Created by Khamidkhanov Muhammadzohid"
  }
};

function changeLang(lang) {
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("menuTitle").innerText = translations[lang].menuTitle;
  document.getElementById("calcBtn").innerText = translations[lang].calcBtn;
  document.getElementById("convertBtn").innerText = translations[lang].convertBtn;
  document.getElementById("lifeBtn").innerText = translations[lang].lifeBtn;
  document.getElementById("titleCalc").innerText = translations[lang].titleCalc;
  document.getElementById("calculateBtn").innerText = translations[lang].calculateBtn;
  document.getElementById("clearHistoryBtn").innerText = translations[lang].clearHistoryBtn;
  document.getElementById("backBtn").innerText = translations[lang].backBtn;
  document.getElementById("converterTitle").innerText = translations[lang].converterTitle;
  document.getElementById("convertButton").innerText = translations[lang].convertButton;
  document.getElementById("backBtn2").innerText = translations[lang].backBtn;
  document.getElementById("lifeTitle").innerText = translations[lang].lifeTitle;
  document.getElementById("birthLabel").innerText = translations[lang].birthLabel;
  document.getElementById("lifeCalculateBtn").innerText = translations[lang].lifeCalculateBtn;
  document.getElementById("backBtn3").innerText = translations[lang].backBtn;
  document.getElementById("footer").innerText = translations[lang].footer;
}

function showSection(section) {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("calculator").style.display = section === "calc" ? "block" : "none";
  document.getElementById("converter").style.display = section === "convert" ? "block" : "none";
  document.getElementById("lifeCalc").style.display = section === "life" ? "block" : "none";
}

function backToMenu() {
  document.getElementById("calculator").style.display = "none";
  document.getElementById("converter").style.display = "none";
  document.getElementById("lifeCalc").style.display = "none";
  document.getElementById("mainMenu").style.display = "block";
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

function calculate() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const op = document.getElementById("operation").value;
  let res = "";

  if (isNaN(num1) || isNaN(num2)) {
    res = "Sonlarni to‘liq kiriting!";
  } else {
    switch (op) {
      case "add": res = num1 + num2; break;
      case "subtract": res = num1 - num2; break;
      case "multiply": res = num1 * num2; break;
      case "divide": res = num2 !== 0 ? num1 / num2 : "Nolga bo‘lish mumkin emas!"; break;
    }
  }

  document.getElementById("result").innerText = res;
  if (res !== "") {
    const history = document.getElementById("history");
    const entry = document.createElement("div");
    entry.innerText = `${num1} ${op} ${num2} = ${res}`;
    history.appendChild(entry);
  }
}

function clearHistory() {
  document.getElementById("history").innerHTML = "";
}

function calculateAge() {
  const birthDate = new Date(document.getElementById("birthDate").value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  document.getElementById("lifeResult").innerText = `Sizning yosh: ${age} yil`;
}
