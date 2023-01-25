
export async function showDailyReports(employees, date) {
  const tableBody = document.getElementById("dailyReportsTableBody"); 


  // Destroy the existing DataTable if it exists
  const table = $('#emp-daily-report-table').DataTable();
  if (table) {
    table.destroy();
  }
  tableBody.innerHTML = "";

  for (let i = 0; i < employees.length; i++) {
    if(employees[i].role === 'admin') {
        continue;
    }
    let lastAttendance = getAttendanceByDate(employees[i],date);
    if(lastAttendance.arrivalTime ==="") {
    lastAttendance.arrivalTime ="--:--";
    lastAttendance.departureTime ="--:--";
    }
    else if(lastAttendance.departureTime==="")  lastAttendance.departureTime ="17:00";


      const newRow = document.createElement('tr');
      newRow.innerHTML = `
      <td>
            <span class="d-block font-weight-bold">
                            ${employees[i].fname} ${employees[i].lname}
            </span>
      </td>
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
  }

  // initialize the DataTable
  $('#emp-daily-report-table').DataTable({ responsive: true,stateSave: true,});
} 


export function getAttendanceByDate(employee,date) {
  const attendances = employee.attendances;
  for (let i = 0; i < attendances.length; i++) {
    if (attendances[i].date === date) {
      return attendances[i];
    }
  }

  return { date: date, arrivalTime: "", departureTime: "", status: "absent" };
}
