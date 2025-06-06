// Helper to pad numbers to 2 digits
function pad(num) {
  return num.toString().padStart(2, '0');
}

// Calculate ISO week number
function getWeekNumber(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function updateTime() {
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  const weekEl = document.getElementById('week');

  const now = new Date();

  // 24-hour time format
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  timeEl.textContent = `${hours}:${minutes}:${seconds}`;

  // Localized date string based on browser language
  const locale = navigator.language || 'en-US';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(locale, options);

  // Week number
  weekEl.textContent = `Week ${getWeekNumber(now)}`;
}

setInterval(updateTime, 1000);
updateTime();
