import {fetchData} from './fetchData.js';

export async function displayEmployees() {
  const employees = await fetchData("employees");
  const tableBody = document.getElementById("empDataBody");
  for (let i = 0; i < employees.length; i++) {
    if(employees[i].role === 'admin') {
        continue;
    }
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
      <td>
                      <div class="d-flex flex-row align-items-center gap-3">
                        <img
                          src="../Images/avatar.svg"
                          width="40"
                          class="rounded-circle"
                        />
                        <div class="d-flex flex-column ml-2">
                          <span class="d-block font-weight-bold"
                            >${employees[i].fname} ${employees[i].lname}</span
                          >
                          <small class="text-muted">${employees[i].email}</small>
                        </div>
                      </div>
                    </td>
                    <td class="jobID">${employees[i].id}</td>
                    <td>${employees[i].jobTittle}</td>
                    <td>${employees[i].role}</td>
                    <td>
                      <span class="badge bg-${employees[i].attendances[employees[i].attendances.length-1].status} status">${employees[i].attendances[employees[i].attendances.length-1].status}</span>
                    </td>
                    <td>
                      <div class="d-flex gap-2">
                        <button
                          class="actionBtn resetPassBtn"
                        >
                          <img src="../images/Key.svg" class="" />
                        </button>
                        <button
                          class="actionBtn editEmpBtn"
                        >
                          <img src="../images/PencilSimple.svg" class="" />
                        </button>

                        <button
                          class="actionBtn deleteEmpBtn"
                        >
                          <img src="../images/X.svg" class="" />
                        </button>
                      </div>
                    </td>
      `;

      tableBody.appendChild(newRow);
  };
    $('#empdataTable').DataTable();
} 


