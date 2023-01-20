import { getEmployeeByUsername, updateEmployeeAttendance,updateAllEmployeesAttendance } from './getUpdateData.js';

import { getTime, getTodayDate } from './getDateformat.js';


export async function checkAttendance(username) {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let errorMessage = document.getElementById("wrongUsername");
  let userNameInput = document.getElementById("username");
  if(currentHour >= 8 && currentHour < 24) {
    let employee = await getEmployeeByUsername(username)
      if(employee) {
        userNameInput.style.border = "1px solid #51C16A";
        errorMessage.innerHTML = "";
        let attendances = employee.attendances;
        let todayDate = getTodayDate();
        let lastAttendance = attendances[attendances.length - 1];
        if (lastAttendance.date === todayDate) {
          if (lastAttendance.arrivalTime === "") {
            lastAttendance.arrivalTime = getTime();
            if (currentHour >= 9 && currentMinute > 15)   lastAttendance.status = "late";
            else                                          lastAttendance.status = "present";
          } else {
            lastAttendance.departureTime = getTime();
          }
        } else {
          await updateAllEmployeesAttendance();
          let todayStatus;
          if (currentHour >= 9 && currentMinute > 15)   todayStatus = "late";
          else                                          todayStatus = "present";
          attendances.push({
            date: todayDate,
            arrivalTime: getTime(),
            departureTime: "",
            status: todayStatus
          });
        }
        await updateEmployeeAttendance(employee.id, attendances);

        let todayAttendance = localStorage.getItem(todayDate);
        if (!todayAttendance) {todayAttendance = [];} 
        else {todayAttendance = JSON.parse(todayAttendance);}

        // Check if employee has already attended today
        let existingAttendance = todayAttendance.find(att => att.username === employee.userName);
        if (!existingAttendance) {
          todayAttendance.push({          
            name: employee.fname + " " + employee.lname,
            username: employee.userName,
            arrivalTime: employee.attendances[employee.attendances.length - 1].arrivalTime,
            departureTime: employee.attendances[employee.attendances.length - 1].departureTime,
            status: employee.attendances[employee.attendances.length - 1].status
          });
        }
        localStorage.setItem(todayDate, JSON.stringify(todayAttendance));
      }else {
        userNameInput.style.border = "1px solid #CC2929";
        errorMessage.innerHTML = "Sorry, username is incorrect";
      }
  }else {
    document.getElementById("error-message").innerHTML = "Sorry, it's out of working hour, please come back tomorrow";
  }
}



export function updateTable() {
  let todayDate = getTodayDate();
  const todayAttendance = JSON.parse(localStorage.getItem(todayDate)) || [];
  const tableBody = document.getElementById("attendance-table-body");

  todayAttendance.forEach((employee, index) => {
    const newRow = document.createElement('tr');

    // Create and append the number column
    const numCol = document.createElement('th');
    numCol.scope = 'row';
    numCol.innerText = index + 1;
    newRow.appendChild(numCol);

    // Create and append the name column
    const nameCol = document.createElement('td');
    nameCol.innerText = employee.name;
    newRow.appendChild(nameCol);

    // Create and append the arrival time column
    const arrvTimeCol = document.createElement('td');
    arrvTimeCol.innerText = employee.arrivalTime;
    newRow.appendChild(arrvTimeCol);

    // Create and append the departure time column
    const deptTimeCol = document.createElement('td');
    deptTimeCol.innerText = employee.departureTime || '-';
    newRow.appendChild(deptTimeCol);

    // Create and append the status column
    const statusCol = document.createElement('td');
    statusCol.innerHTML =`<span class="${employee.status}-status badge">${employee.status}</span>` ;
    statusCol.classList.add("Emp_status");
    newRow.appendChild(statusCol);

    // Append the new row to the table
    tableBody.appendChild(newRow);
  });
}



 // const tableBody = document.getElementById("attendance-table-body");
  // const newRow = document.createElement('tr');
  // const numCol = document.createElement('th');

  // numCol.scope = 'row';
  // numCol.innerText = tableBody.children.length + 1;
  // newRow.appendChild(numCol);
  // const nameCol = document.createElement('td');
  // nameCol.innerText = `${employee.fname} ${employee.lname}`;
  // newRow.appendChild(nameCol);
  // const arrvTimeCol = document.createElement('td');
  // arrvTimeCol.innerText = employee.attendances[employee.attendances.length - 1].arrivalTime;
  // newRow.appendChild(arrvTimeCol);
  // const deptTimeCol = document.createElement('td');
  // deptTimeCol.innerText = employee.attendances[employee.attendances.length - 1].departureTime || '-';
  // newRow.appendChild(deptTimeCol);
  // const statusCol = document.createElement('td');
  // statusCol.innerText = employee.attendances[employee.attendances.length - 1].status;
  // newRow.appendChild(statusCol);
  // tableBody.appendChild(newRow);

  // localStorage.setItem("username", JSON.stringify(newRow));





