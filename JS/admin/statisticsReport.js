
export async function showstatisticsReports(employees, date) {
  const tableBody = document.getElementById("empsStatisticsTB"); 


  // Destroy the existing DataTable if it exists
  const table = $('#emps-statistics-table').DataTable();
  if (table) {
    table.destroy();
  }
  tableBody.innerHTML = "";
  for (let i = 0; i < employees.length; i++) {
    if(employees[i].role === 'admin') {
        continue;
    }
    let {attendanceTimes, lateTimes, absentTimes} = getEmpStatistics(employees[i]);

    
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
      <td>
            <span class="d-block font-weight-bold">
                            ${employees[i].fname} ${employees[i].lname}
            </span>
      </td>
      <td>
            <span class="d-block font-weight-bold">
                            ${attendanceTimes} 
            </span>
      </td>
      <td>
            <span class="d-block font-weight-bold">
                            ${lateTimes}
            </span>
      </td>
      <td>
            <span class="d-block font-weight-bold">
                            ${absentTimes}
            </span>
      </td>`;

      tableBody.appendChild(newRow);
  }

  // initialize the DataTable
  $('#emps-statistics-table').DataTable({ responsive: true});
}


function getEmpStatistics (employee) {
  let attendanceTimes = 0;
  let lateTimes = 0;
  let absentTimes = 0;

  for (let i = 0; i < employee.attendances.length; i++) {
    if (employee.attendances[i].status === "late") {
      lateTimes++;
    } else if (employee.attendances[i].status === "absent") {
      absentTimes++;
    } else {
      attendanceTimes++;
    }
  }
  return {attendanceTimes,lateTimes,absentTimes};
}