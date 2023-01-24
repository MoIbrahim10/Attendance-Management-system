import { showEmpInfo,dailyReports,monthlyReports } from '../Employee/employeeReports.js';
import { getEmployeeData } from '../Employee/getEmployeeData.js';


(async function displayEmployeeReports() {
  let employee = await getEmployeeData();

  let securityAvatar = document.getElementById('securityAvatar');
  let securityName = document.getElementById('securityName');
  securityName.innerText = `${employee.fname} ${employee.lname}`;
  securityAvatar.src = employee.avatar;
  
  showEmpInfo(employee);

  const attendances = employee.attendances;

  dailyReports(employee,attendances);
  monthlyReports(employee,attendances);

})()
