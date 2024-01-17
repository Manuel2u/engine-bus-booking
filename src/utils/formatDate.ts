function formatDate(dateString) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);

  const year = date.getUTCFullYear().toString();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const dayInWords = daysOfWeek[date.getUTCDay()];
  const dayInNumber = date.getUTCDate().toString().padStart(2, "0");

  return {
    year: year,
    month: month,
    dayInWords: dayInWords,
    dayInNumber: dayInNumber,
  };
}

const date = "2023-07-20T00:00:00.000+00:00";
const result = formatDate(date);

console.log(result.year); // Output: 2023
console.log(result.month); // Output: 07
console.log(result.dayInWords); // Output: Sun 07
console.log(result.dayInNumber); // Output: 07

export { formatDate };

function formatPeriod(period) {
  const [departure, arrival] = period.split("-");
  return {
    departure,
    arrival,
  };
}

const period = "9am-12am";
const formattedPeriod = formatPeriod(period);
console.log(formattedPeriod); // Output: { departure: '9am', arrival: '12am' }

export { formatPeriod };
