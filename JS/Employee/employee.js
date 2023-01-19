import { getEmployeeData } from './getEmployeeData.js';


export function getAttendanceDates() {
  return getEmployeeData().then(employee => {
    const attendanceDates = employee.attendances.map(attendance => attendance.date);
    return attendanceDates;
  });
}


export function disableNonAttendanceDates(dateInput) {
  getAttendanceDates().then(attendanceDates => {
    let minDate =  changeDateFormat(attendanceDates[0]);
    dateInput.min = minDate;
    let maxDate =  changeDateFormat(attendanceDates[attendanceDates.length - 1])
    dateInput.max = maxDate;
  });
}



export function getLastAttendance() {
  return getEmployeeData().then(employee => {
    const lastAttendance = employee.attendances.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    return lastAttendance;
  });
}


export function getMonthlyAttendance() {
  return getEmployeeData().then(employee => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const monthlyAttendance = employee.attendances.filter(attendance => {
      const attendanceDate = new Date(attendance.date);
      return attendanceDate.getMonth() === currentMonth && attendanceDate.getFullYear() === currentYear;
    });
    return monthlyAttendance;
  });
}


export function getAttendanceByDate(date) {
  return getEmployeeData().then(employee => {
    const attendance = employee.attendances.find(attendance => attendance.date === date);
    return attendance;
  });
}


export function getAttendanceByDateRange(startDate, endDate) {
  return getEmployeeData().then(employee => {
    const attendance = employee.attendances.filter(attendance => {
      const attendanceDate = changeDateFormat(attendance.date);
      return attendanceDate >= startDate && attendanceDate <= endDate;
    });
    return attendance;
  });
}



function changeDateFormat(data) {
  let dateObject = new Date(data);
  let formattedDate = `${dateObject.getFullYear()}-${("0" + (dateObject.getMonth() + 1)).slice(-2)}-${("0" + dateObject.getDate()).slice(-2)}`;
  return formattedDate;
}