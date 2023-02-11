import { getEmployeeByUsername, updateEmployeeAttendance,updateAllEmployeesAttendance } from './getUpdateData.js';

import { getTime, getTodayDate } from './getDateformat.js';


export async function checkAttendance(username) {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let errorMessage = document.getElementById("wrongUsername");
  let userNameInput = document.getElementById("username");
  if(currentHour >= 8 && currentHour < 17) {
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
        let existingAttendanceIndex = todayAttendance.findIndex(att => att.username === employee.userName);
        if (existingAttendanceIndex !== -1) {
          todayAttendance[existingAttendanceIndex].departureTime = employee.attendances[employee.attendances.length - 1].departureTime;
          localStorage.setItem(todayDate, JSON.stringify(todayAttendance));
        }else{
          todayAttendance.push({          
            name: employee.fname + " " + employee.lname,
            username: employee.userName,
            arrivalTime: employee.attendances[employee.attendances.length - 1].arrivalTime,
            departureTime: employee.attendances[employee.attendances.length - 1].departureTime,
            status: employee.attendances[employee.attendances.length - 1].status
          });
          localStorage.setItem(todayDate, JSON.stringify(todayAttendance));
        }
        
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

    const numCol = document.createElement('th');
    numCol.scope = 'row';
    numCol.innerText = index + 1;
    newRow.appendChild(numCol);

    const nameCol = document.createElement('td');
    nameCol.innerText = employee.name;
    newRow.appendChild(nameCol);

    const arrvTimeCol = document.createElement('td');
    arrvTimeCol.innerText = employee.arrivalTime;
    newRow.appendChild(arrvTimeCol);

    const deptTimeCol = document.createElement('td');
    deptTimeCol.innerText = employee.departureTime || '-';
    newRow.appendChild(deptTimeCol);

    const statusCol = document.createElement('td');
    statusCol.innerHTML =`<span class="${employee.status}-status badge">${employee.status}</span>` ;
    statusCol.classList.add("Emp_status");
    newRow.appendChild(statusCol);

    tableBody.appendChild(newRow);
  });
}





