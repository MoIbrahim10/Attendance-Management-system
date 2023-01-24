import {fetchData} from './fetchData.js';
import {showDailyReports} from './EmpsdailyReports.js';
import {showMonthlyReports} from './EmpsMonthlyReports.js';
import {showstatisticsReports} from './statisticsReport.js';
import {calendarDateFormat,MDYDateFormat} from '../Security/getDateformat.js';


(async function displayEmployeesReports() {
  const employees = await fetchData("employees");
  const dateInput = document.getElementById("daily-report-date");
  const startDateInput = document.getElementById("monthly-report-start-date");
  const endDateInput = document.getElementById("monthly-report-end-date");

  showstatisticsReports(employees);
  // Find the attendances of employee 1
  const attendances = employees[0].attendances;

  disableNonAttendanceDates(dateInput,attendances);
  disableNonAttendanceDates(startDateInput,attendances);
  disableNonAttendanceDates(endDateInput,attendances);
  

  const fisrtAttendance = attendances[0];
  const fisrtdate = calendarDateFormat(fisrtAttendance.date);
  const lastAttendance = attendances[attendances.length - 1];
  const lastDate = calendarDateFormat(lastAttendance.date);

  // Set the value of the input element 
  dateInput.value = lastDate;
  showDailyReports(employees, MDYDateFormat(lastDate));
  
  
  startDateInput.value = fisrtdate;
  endDateInput.value = lastDate;
  showMonthlyReports(employees, MDYDateFormat(startDateInput.value),MDYDateFormat(endDateInput.value));


  //Retrieve and display the employee's attendance data for a specific date in the daily report
  dateInput.addEventListener('change', async (e)=> {
    const date = MDYDateFormat(e.target.value);
    showDailyReports(employees, date);
  });




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

  
})();




function disableNonAttendanceDates(dateInput, attendances) {
  // Get the first and last attendance date
  const firstAttendance = attendances[0];
  const lastAttendance = attendances[attendances.length - 1];

  // Convert the dates to a format that can be used in the input element's `min` and `max` attributes
  const firstDate = calendarDateFormat(firstAttendance.date);
  const lastDate = calendarDateFormat(lastAttendance.date);

  // Set the `min` and `max` attributes on the input element
  dateInput.setAttribute('min', firstDate);
  dateInput.setAttribute('max', lastDate);
}
