const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('employees.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());

server.use((req, res, next) => {
  if (req.method === 'PATCH' && req.path.startsWith('/employees/') && req.path.includes('/attendances/')) {
    const id = req.path.split('/')[1];
    const date =  req.path.split('/')[3];
    let data = router.db.getState().employees;
    const employee = data.find(e => e.id === parseInt(id));
    if (!employee) {
      return res.status(404).json({ message: `Employee with  ${id} not found` });
    }
    const attendanceIndex = employee.attendances.findIndex(a => a.date === date);
    if (attendanceIndex === -1) {
      return res.status(404).json({ message: `Attendance for ${id} date ${date} not found` });
    }
    employee.attendances[attendanceIndex] = req.body;
    router.db.setState({ employees: data });
    return res.json(employee.attendances[attendanceIndex]);
  } else if (req.method === 'GET' && req.path.startsWith('/employees/') && req.path.includes('/attendances/')) {
    const id = req.path.split('/')[2];
    const date = req.path.split('/')[4];
    let data = router.db.getState().employees;
    const employee = data.find(e => e.id === parseInt(id));
    if (!employee) {
    return res.status(404).json({ message:` Employee with id ${id} not found `});
    }
    const attendanceIndex = employee.attendances.findIndex(a => a.date === date);
    if (attendanceIndex === -1) {
    return res.status(404).json({ message: `Attendance for date ${date} not found `});
    }
    return res.json(employee.attendances[attendanceIndex]);
    } else {
    next();
    }
    });
    
    server.use(router);
    
    server.listen(3000, () => {
    console.log('JSON Server is running');
    });