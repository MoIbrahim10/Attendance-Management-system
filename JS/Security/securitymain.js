import { checkAttendance } from './attendance.js';
import { updateTable } from './attendance.js';

updateTable();

// let storedEmployee = JSON.parse(localStorage.getItem(username));
// if (storedEmployee) {
//   updateTable(storedEmployee);
// }

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let username = document.querySelector('#username').value;
  checkAttendance(username);
});

