function formatDate(dateString) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);

  const dayInWords = daysOfWeek[date.getUTCDay()];
  const dayInNumber = date.getUTCDate().toString().padStart(2, "0");

  return {
    dayInWords: dayInWords,
    dayInNumber: dayInNumber,
  };
}

const date = "2023-07-20T00:00:00.000Z";
const result = formatDate(date);

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
