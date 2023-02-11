import {fetchData} from './fetchData.js';
import {showDailyReports} from './EmpsdailyReports.js';
import {showMonthlyReports} from './EmpsMonthlyReports.js';
import {showstatisticsReports} from './statisticsReport.js';
import {calendarDateFormat,MDYDateFormat} from '../Security/getDateformat.js';
import {disableNonAttendanceDates} from './disableNonAttendanceDates.js';
import {showEmpsAttendaces} from './editEmpAttendance.js';


(async function displayEmployeesReports() {
  const employees = await fetchData("employees");

  showstatisticsReports(employees);
  const attendances = employees[0].attendances;

  dailyReports(employees,attendances);
  monthlyReports(employees,attendances);
  showEmpsAttendaces();
  
})();

export function dailyReports(employees,attendances){

  const dateInput = document.getElementById("daily-report-date");

  disableNonAttendanceDates(dateInput,attendances);

  const lastAttendance = attendances[attendances.length - 1];
  const lastDate = calendarDateFormat(lastAttendance.date);

  dateInput.value = lastDate;
  showDailyReports(employees, MDYDateFormat(lastDate));

  dateInput.addEventListener('change', async (e)=> {
    const date = MDYDateFormat(e.target.value);
    showDailyReports(employees, date);
  });
}





export function monthlyReports(employees,attendances){

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
  showMonthlyReports(employees, MDYDateFormat(startDateInput.value),MDYDateFormat(endDateInput.value));

   //Retrieve and display the employee's attendance data for a range of dates in the monthly report
  startDateInput.addEventListener('change', async (e)=> {
    const startDate = MDYDateFormat(e.target.value);
    const endDate = MDYDateFormat(endDateInput.value);
    showMonthlyReports(employees, startDate,endDate);

       //start date should be less than end date
    let date = new Date(startDateInput.value);
    date.setDate(date.getDate() + 1);
    endDateInput.min = date.toISOString().slice(0, 10);

  });
  
  endDateInput.addEventListener('change', async (e)=> {
    const startDate = MDYDateFormat(startDateInput.value);
    const endDate = MDYDateFormat(e.target.value);
    showMonthlyReports(employees, startDate,endDate);
  });  
}




