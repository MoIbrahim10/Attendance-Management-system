import {getAttendancesByDateRange} from '../admin/EmpsMonthlyReports.js';

export async function showMonthlyReports(employee, startDate, endDate) {
      const tableBody = document.getElementById("monthlyReportTB");

      // Destroy the existing DataTable if it exists
      const table = $('#emp-monthly-report-table').DataTable();
      if (table) {
            table.destroy();
      }
      tableBody.innerHTML = "";
      let attendances = getAttendancesByDateRange(employee, startDate, endDate);
      for (let j = 0; j < attendances.length; j++) {
      if(attendances[j].arrivalTime ==="") {
            attendances[j].arrivalTime ="--:--";
            attendances[j].departureTime ="--:--";
      }
      else if(attendances[j].departureTime==="")  attendances[j].departureTime ="17:00";
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
            <td>
                  <span class="d-block font-weight-bold">
                              ${attendances[j].date} 
                  </span>
            </td>
            <td>
                  <span class="d-block font-weight-bold">
                              ${attendances[j].arrivalTime}
                  </span>
            </td>
            <td>
                  <span class="d-block font-weight-bold">
                              ${attendances[j].departureTime}
                  </span>
            </td>
            <td>
                  <span class="badge bg-${attendances[j].status} status ">
                              ${attendances[j].status}
                  </span>      
            </td>`;
      tableBody.appendChild(newRow);
      }
      // initialize the DataTable
      $('#emp-monthly-report-table').DataTable({ responsive: true,stateSave: true });
} 
