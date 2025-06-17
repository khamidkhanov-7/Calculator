// Tarixni LocalStorage ga saqlash
function saveHistory(item) {
  let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
  history.unshift(item);
  if (history.length > 20) history = history.slice(0, 20);
  localStorage.setItem('calcHistory', JSON.stringify(history));
  updateHistory();
}

function updateHistory() {
  const historyDiv = document.getElementById('history');
  let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
  historyDiv.innerHTML = history.map(item => `<div>${item}</div>`).join('');
}

function clearHistory() {
  localStorage.removeItem('calcHistory');
  updateHistory();
}

document.addEventListener('DOMContentLoaded', updateHistory);
