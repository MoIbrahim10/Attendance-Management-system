import { showDailyReports } from './empDailyReports.js';
import { showMonthlyReports } from './empMonthlyReports.js';
import {calendarDateFormat,MDYDateFormat} from '../Security/getDateformat.js';
import {disableNonAttendanceDates} from '../admin/disableNonAttendanceDates.js';


export function showEmpInfo(employee){
  document.getElementById('name').textContent = `${employee.fname} ${employee.lname}`;
  document.getElementById('email').textContent = employee.email;
  document.getElementById('age').textContent = employee.age;
  document.getElementById('address').textContent = employee.address;
  document.getElementById('jobTittle').textContent = employee.jobTittle;
}


export function dailyReports(employee,attendances){

  const dateInput = document.getElementById("daily-report-date");

  disableNonAttendanceDates(dateInput,attendances);

  const lastAttendance = attendances[attendances.length - 1];
  const lastDate = calendarDateFormat(lastAttendance.date);

  dateInput.value = lastDate;
  showDailyReports(employee, MDYDateFormat(lastDate));

  //Retrieve and display the employee's attendance data for a specific date in the daily report
  dateInput.addEventListener('change', async (e)=> {
    const date = MDYDateFormat(e.target.value);
    showDailyReports(employee, date);
  });
}

export function monthlyReports(employee,attendances){

  const startDateInput = document.getElementById("monthly-report-start-date");
  const endDateInput = document.getElementById("monthly-report-end-date");

  disableNonAttendanceDates(startDateInput,attendances);
  disableNonAttendanceDates(endDateInput,attendances);

  const fisrtAttendance = attendances[0];
  const fisrtdate = calendarDateFormat(fisrtAttendance.date);
  const lastAttendance = attendances[attendances.length - 1];
  const lastDate = calendarDateFormat(lastAttendance.date);

  startDateInput.value = fisrtdate;
  endDateInput.value = lastDate;
  showMonthlyReports(employee, MDYDateFormat(startDateInput.value),MDYDateFormat(endDateInput.value));

   //Retrieve and display the employee's attendance data for a range of dates in the monthly report
  startDateInput.addEventListener('change', async (e)=> {
    const startDate = MDYDateFormat(e.target.value);
    const endDate = MDYDateFormat(endDateInput.value);
    showMonthlyReports(employee, startDate,endDate);

       //start date should be less than end date
    let date = new Date(startDateInput.value);
    date.setDate(date.getDate() + 1);
    endDateInput.min = date.toISOString().slice(0, 10);

  });
  
  endDateInput.addEventListener('change', async (e)=> {
    const startDate = MDYDateFormat(startDateInput.value);
    const endDate = MDYDateFormat(e.target.value);
    showMonthlyReports(employee, startDate,endDate);
  });  
}
