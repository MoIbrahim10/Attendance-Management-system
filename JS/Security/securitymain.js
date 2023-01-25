import { checkAttendance } from './attendance.js';
import { updateTable } from './attendance.js';
import { getEmployees } from "./getEmployees.js";
import { getTodayDate } from './getDateformat.js';
import {updateEmployeeAttendance} from './getUpdateData.js';

// let userName = localStorage.getItem('userName');


updateTable();

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  let username = document.querySelector('#username').value;
  checkAttendance(username);
});

let logoutBtn = document.querySelector('#logOut');
logoutBtn.addEventListener('click', async () => {
  await signOutusers();
  window.location.href = '/index.html';
});



async function signOutusers() {
  const employees = await getEmployees();
  let date = getTodayDate();
  employees.forEach(async employee => {
    let attendances = employee.attendances;
    let lastAttendance = attendances[attendances.length - 1];
    if (lastAttendance.date === date && lastAttendance.arrivalTime !== "" && lastAttendance.departureTime === "") {
      lastAttendance.departureTime = "17:00";
      attendances[attendances.length - 1] = lastAttendance;
      await updateEmployeeAttendance(employee.id, attendances);
    }
  });
}
