export async function showEmpsAttendaces() {
  
  let table = $('#emp-attendance-edit-table').DataTable({  
    buttons: [
      {
          extend: 'pdf',
          text: 'Save current page',
          exportOptions: {
              modifier: {
                  page: 'current'
              }
          }
      }
  ]
,    
  searchPanes: {
    layout: 'columns-3',
    columns: [0,1,4]
    },
dom: 'Pfrtip',
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
    columnDefs:[{
      searchPanes:{
          show: true,
      },
      targets: [0, 1],
  }],
    
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
  
    let updatedData = {
      "date": date,
      "arrivalTime": $(this).parents('tr').find('td:nth-child(3)').text(),
      "departureTime": $(this).parents('tr').find('td:nth-child(4)').text(),
      "status": $(this).parents('tr').find('td:nth-child(5)').text()
    };
  
    $.ajax({
      url: `http://localhost:3000/employees/${employeeId}/attendances/${date}`,
      method: 'PATCH',
      data: updatedData,
      success: function(response) {
        table.row($(this).parents('tr')).data(updatedData);
  
        $(this).text('Edit').removeClass('save-button').addClass('edit-button');
  
        $(this).parents('tr').find('td').not(':last').removeAttr('contenteditable');
      }
    });
  });

} 


