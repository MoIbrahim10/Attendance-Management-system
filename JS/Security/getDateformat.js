export function getTime() {
  let currentTime = new Date();
  let time = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).substring(0, 5);
  return time;
}

export function getTodayDate() {
  let currentTime = new Date();
  let date = (currentTime.getMonth()+1) + '/' + currentTime.getDate() + '/' + currentTime.getFullYear();
  return date;
}


export function calendarDateFormat(dateString) {
  const date = new Date(dateString);
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (month.length === 1) {
    month = "0" + month;
  }
  if (day.length === 1) {
    day = "0" + day;
  }
  return date.getFullYear() + "-" + month + "-" + day;
}

export function MDYDateFormat(date) {
  const year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8);
    if (month[0] === "0") {
        month = month.slice(1);
    }
    if (day[0] === "0") {
        day = day.slice(1);
    }
    return `${month}/${day}/${year}`;
}

