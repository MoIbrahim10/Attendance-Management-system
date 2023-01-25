export async function showEmpsAttendaces() {
  
  let table = $('#emp-attendance-edit-table').DataTable({
    ajax: {
      url: 'http://localhost:3000/employees',
      dataSrc: function(json) {
        let Data = [];
        json.forEach(employee => {
          employee.attendances.forEach(attendance => {
            let data = {
              "fullName": employee.fname + " " + employee.lname,
              "date": attendance.date,
              "arrivalTime": attendance.arrivalTime || '--:--',
              "departureTime": attendance.departureTime || '--:--',
              "status": attendance.status
            };
            Data.push(data);
          });
        });
        return Data;
      }
    },
    "columns": [
      {"data": "fullName"},
      {"data": "date"},
      {"data": "arrivalTime"},
      {"data": "departureTime"},
      {"data": "status"},
      {
        "data": null,
        "defaultContent": "<button class='edit-button'>Edit</button>"
      }
    ],
    searchPanes: {
      columns: [
        {
          name: 'fullName',
          label: 'Full Name'
        },
      ],
    },
    
    responsive: true,
    columnDefs: [
      {
        targets: 4,
        render: function(data, type, row) {
          if (data === "absent") {
            return `<span class="badge bg-absent status ">${data}</span>`;
          } else if (data === "late") {
            return `<span class="badge bg-late status ">${data}</span>`;
          } else if (data === "present") {
            return `<span class="badge bg-present status ">${data}</span>`;
          }
          return data;
        }
      }
    ]
  });
  
  $('#editEmpAttendancesTB').on('click', '.edit-button', function () {
    let data = table.row($(this).parents('tr')).data();
    let employeeId = data.id; 
    let date = data.date; 

  $(this).text('Save').removeClass('edit-button').addClass('save-button');
  $(this).parents('tr').find('td').not(':last').attr('contenteditable', true);
  $(this).parents('tr').find('td').not(':last-child').addClass('editable');
  });

  $('#editEmpAttendancesTB').on('click', '.save-button', function () {
    let data = table.row($(this).parents('tr')).data();
    let employeeId = data.id;
    let date = data.date;
  
    // Collect the updated data from the cells
    let updatedData = {
      "date": date,
      "arrivalTime": $(this).parents('tr').find('td:nth-child(3)').text(),
      "departureTime": $(this).parents('tr').find('td:nth-child(4)').text(),
      "status": $(this).parents('tr').find('td:nth-child(5)').text()
    };
  
    // Send the PATCH request to update the data
    $.ajax({
      url: `http://localhost:3000/employees/${employeeId}/attendances/${date}`,
      method: 'PATCH',
      data: updatedData,
      success: function(response) {
        // Update the table data
        table.row($(this).parents('tr')).data(updatedData);
  
        // Convert the save button back to an edit button
        $(this).text('Edit').removeClass('save-button').addClass('edit-button');
  
        // Make the cells in the row non-editable
        $(this).parents('tr').find('td').not(':last').removeAttr('contenteditable');
      }
    });
  });
//   const tableBody = document.getElementById("editEmpAttendancesTB");

//   // Destroy the existing DataTable if it exists
//   const table = $('#emp-attendance-edit-table').DataTable();
//   if (table) {
//     table.destroy();
//   }
//   tableBody.innerHTML = "";

//   for (let i = 0; i < employees.length; i++) {

//     for (let j = 0; j < attendances.length; j++) {
//       if(attendances[j].arrivalTime ==="") {
//         attendances[j].arrivalTime ="--:--";
//         attendances[j].departureTime ="--:--";
//       }
//       else if(attendances[j].departureTime==="")  attendances[j].departureTime ="17:00";

//       const newRow = document.createElement('tr');
//       newRow.innerHTML = `
//       <td>
//             <span class="d-block font-weight-bold">
//                             ${employees[i].fname} ${employees[i].lname}
//             </span>
//       </td>
//       <td>
//             <span class="d-block font-weight-bold">
//                             ${attendances[j].date} 
//             </span>
//       </td>
//       <td>
//             <span class="d-block font-weight-bold">
//                             ${attendances[j].arrivalTime}
//             </span>
//       </td>
//       <td>
//             <span class="d-block font-weight-bold">
//                             ${attendances[j].departureTime}
//             </span>
//       </td>
//       <td>
//             <span class="badge bg-${attendances[j].status} status ">
//                             ${attendances[j].status}
//             </span>      
//       </td>`;

//       tableBody.appendChild(newRow);
//     }
//   }
//   // initialize the DataTable
//   $('#emp-attendance-edit-table').DataTable({ responsive: true, stateSave: true,dom: 'Pfrtip'
// });
} 


