import { getEmployeeData } from './getEmployeeData.js';
import { showEmpInfo,dailyReports,monthlyReports } from './employeeReports.js';
//Retrieve and display the employee name in the navbar
let userName = localStorage.getItem('userName');
document.getElementById('employee-name').textContent = userName;

(async function displayEmployeeReports() {
  let employee = await getEmployeeData();
  showEmpInfo(employee);

  const attendances = employee.attendances;

  dailyReports(employee,attendances);
  monthlyReports(employee,attendances);

})()


let logOut = document.getElementById('logOut');
logOut.onclick =  ()=>{
  window.location.replace("../index.html");
};