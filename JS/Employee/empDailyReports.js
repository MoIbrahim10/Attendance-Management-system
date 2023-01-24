import {getAttendanceByDate} from '../admin/EmpsdailyReports.js';

export async function showDailyReports(employee, date) {
  const tableBody = document.getElementById("dailyReportsTableBody"); 

  // Destroy the existing DataTable if it exists
  const table = $('#emp-daily-report-table').DataTable();
  if (table) {
    table.destroy();
  }
  tableBody.innerHTML = "";


  let lastAttendance = getAttendanceByDate(employee,date);

  if(lastAttendance.arrivalTime ==="") {
    lastAttendance.arrivalTime ="--:--";
    lastAttendance.departureTime ="--:--";
  }
  else if(lastAttendance.departureTime==="")  lastAttendance.departureTime ="17:00";

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
  <td>
        <span class="d-block font-weight-bold">
                        ${lastAttendance.date} 
        </span>
  </td>
  <td>
        <span class="d-block font-weight-bold">
                        ${lastAttendance.arrivalTime}
        </span>
  </td>
  <td>
        <span class="d-block font-weight-bold">
                        ${lastAttendance.departureTime}
        </span>
  </td>
  <td>
        <span class="badge bg-${lastAttendance.status} status ">
                        ${lastAttendance.status}
        </span>      
  </td>`;

  tableBody.appendChild(newRow);

  // initialize the DataTable
  $('#emp-daily-report-table').DataTable({ responsive: true, paging: false, searching: false, info: false });

} 
