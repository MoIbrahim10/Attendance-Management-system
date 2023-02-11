import {calendarDateFormat} from '../Security/getDateformat.js';


export function disableNonAttendanceDates(dateInput, attendances) {
  const firstAttendance = attendances[0];
  const lastAttendance = attendances[attendances.length - 1];

  const firstDate = calendarDateFormat(firstAttendance.date);
  const lastDate = calendarDateFormat(lastAttendance.date);

  dateInput.setAttribute('min', firstDate);
  dateInput.setAttribute('max', lastDate);
}
