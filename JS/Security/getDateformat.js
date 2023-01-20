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
