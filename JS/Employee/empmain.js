import { disableNonAttendanceDates, getLastAttendance, getMonthlyAttendance, getAttendanceByDate, getAttendanceByDateRange } from './employee.js';
import { getEmployeeData } from './getEmployeeData.js';

//Retrieve and display the employee name in the navbar
let userName = localStorage.getItem('userName');
document.getElementById('employee-name').textContent = userName;

//retrieve and display the employee's data in the profile section
getEmployeeData().then(employee => {
  document.getElementById('name').textContent = `${employee.fname} ${employee.lname}`;
  document.getElementById('email').textContent = employee.email;
  document.getElementById('age').textContent = employee.age;
  document.getElementById('address').textContent = employee.address;
  document.getElementById('jobTittle').textContent = employee.jobTittle;

})
//Retrieve and display the employee's last attendance date in the daily report
getLastAttendance().then(lastAttendance => {

  if(lastAttendance.arrivalTime ==="") {
    lastAttendance.arrivalTime ="--:--";
    lastAttendance.departureTime ="--:--";
  }
  else if(lastAttendance.departureTime==="")  lastAttendance.departureTime ="17:00";
  
  document.getElementById('date').textContent = lastAttendance.date;
  document.getElementById('arrival-time').textContent = lastAttendance.arrivalTime;
  document.getElementById('departure-time').textContent = lastAttendance.departureTime;
  document.getElementById('status').innerHTML = `<span class="badge bg-success status ${lastAttendance.status}">${lastAttendance.status}</span>`;
});

//Retrieve and display the employee's attendance data for the current month in the monthly report
getMonthlyAttendance().then(monthlyAttendance => {
  const attendanceTable = document.getElementById('monthlyReportTB');
  monthlyAttendance.forEach(attendance => {
    const row = document.createElement('tr');
    
  if(attendance.arrivalTime ==="") {
    attendance.arrivalTime ="--:--";
    attendance.departureTime ="--:--";
  }
  else if(attendance.departureTime==="")  attendance.departureTime ="17:00";

    row.innerHTML = `<td>${attendance.date}</td><td>${attendance.arrivalTime}</td><td>${attendance.departureTime}</td><td><span class="badge bg-success status ${attendance.status}">${attendance.status}</span></td>`;
    attendanceTable.appendChild(row);
  });
});


const dateInput = document.getElementById('daily-report-date');
disableNonAttendanceDates(dateInput);

//Retrieve and display the employee's attendance data for a specific date in the daily report
dateInput.addEventListener('change', (e)=> {
const selectedDateString = e.target.value;
let dateObject = new Date(selectedDateString);
let formattedDate = `${(dateObject.getMonth() + 1)}/${ dateObject.getDate()}/${dateObject.getFullYear()}`;

getAttendanceByDate(formattedDate).then(attendance => {
  if(attendance.arrivalTime ==="") {
    attendance.arrivalTime ="--:--";
    attendance.departureTime ="--:--";
  }
  else if(attendance.departureTime==="")  attendance.departureTime ="17:00";

  document.getElementById('date').textContent = attendance.date;
  document.getElementById('arrival-time').textContent = attendance.arrivalTime;
  document.getElementById('departure-time').textContent = attendance.departureTime;
  document.getElementById('status').innerHTML = `<span class="badge bg-success status ${attendance.status}">${attendance.status}</span>`;
});
});


//Retrieve and display the employee's attendance data for a specific date range in the monthly report

let startDateInput = document.getElementById('monthly-report-start-date');
let endDateInput = document.getElementById('monthly-report-end-date');

disableNonAttendanceDates(startDateInput);
disableNonAttendanceDates(endDateInput);

startDateInput.addEventListener('change', async (e) => {
  let startDate = e.target.value;
  //start date should be less than end date
  let date = new Date(startDate);
  date.setDate(date.getDate() + 1);
  endDateInput.min = date.toISOString().slice(0, 10);

  endDateInput.addEventListener('change', async (e) => {
    let endDate = e.target.value;
    let filteredAttendance = await getAttendanceByDateRange(startDate, endDate);
    let table = document.getElementById("emp-monthly-report-table");
    let tbody = table.getElementsByTagName("tbody")[0];

    // Clear the existing table rows
    tbody.innerHTML = "";

    // Loop through the filtered attendance records and create table rows
    filteredAttendance.forEach(attendance => {
      let row = document.createElement("tr");
      let dateCell = document.createElement("td");
      let arrivalTimeCell = document.createElement("td");
      let departureTimeCell = document.createElement("td");
      let statusCell = document.createElement("td");
      if(attendance.arrivalTime ==="") {
        attendance.arrivalTime ="--:--";
        attendance.departureTime ="--:--";
      }
      else if(attendance.departureTime==="")  attendance.departureTime ="17:00";
    
      dateCell.textContent = attendance.date;
      arrivalTimeCell.textContent = attendance.arrivalTime;
      departureTimeCell.textContent = attendance.departureTime;
      statusCell.innerHTML = `<span class="badge bg-success status ${attendance.status}">${attendance.status}</span>`;
      row.appendChild(dateCell);
      row.appendChild(arrivalTimeCell);
      row.appendChild(departureTimeCell);
      row.appendChild(statusCell);

      tbody.appendChild(row);
    });
  });
});




let logOut = document.getElementById('logOut');
logOut.onclick =  ()=>{
  window.location.replace("../index.html");
};