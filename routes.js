const Router = require('json-server-router').Router
const router = new Router()

router.action('updateAttendance', (req, res) => {
  router.patch('/employees/:id/attendances/:date', (req, res) => {
    const {id, date} = req.params;
    const {arrivalTime, departureTime, status} = req.body;
    const employee = db.get('employees').find({id: id}).value();
  
    if (!employee) {
      return res.status(404).json({error: 'Employee not found'});
    }
  
    let attendanceIndex = -1;
    employee.attendances.forEach((attendance, index) => {
      if (attendance.date === date) {
        attendanceIndex = index;
      }
    });
  
    if (attendanceIndex === -1) {
      return res.status(404).json({error: 'Attendance not found'});
    }
  
    employee.attendances[attendanceIndex].arrivalTime = arrivalTime;
    employee.attendances[attendanceIndex].departureTime = departureTime;
    employee.attendances[attendanceIndex].status = status;
  
    db.get('employees')
      .find({id: id})
      .assign(employee)
      .write();
  
    return res.status(200).json({message: 'Attendance updated successfully'});
  });
})

module.exports = router