import {calendarDateFormat} from '../Security/getDateformat.js';


export function disableNonAttendanceDates(dateInput, attendances) {
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
