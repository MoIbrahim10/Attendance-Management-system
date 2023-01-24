import { checkAttendance } from './attendance.js';
import { updateTable } from './attendance.js';


// let userName = localStorage.getItem('userName');


updateTable();

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let username = document.querySelector('#username').value;
  checkAttendance(username);
});

