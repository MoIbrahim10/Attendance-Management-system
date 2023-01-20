import { getEmployees } from "./getEmployees.js";
import { getTodayDate } from './getDateformat.js';

export async function getEmployeeByUsername(username) {
  try {
    const response = await fetch(`http://localhost:3000/employees?userName=${username}`);
    const employee = await response.json();
    return employee[0];
  } catch (error) {
    console.log(error);
  }
}

export async function updateEmployeeAttendance(employeeId, attendance) {
  try {
    const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: "PATCH",
      body: JSON.stringify({ attendances: attendance }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}



export async function updateAllEmployeesAttendance() {
  try {
    const employees = await getEmployees();
    let date = getTodayDate();
    employees.forEach(async employee => {
      let attendances = employee.attendances;
      attendances.push({ date: date, arrivalTime: "", departureTime: "", status: "absent" });
      await updateEmployeeAttendance(employee.id, attendances);
    });
  } catch (error) {
    console.log(error);
  }
}
