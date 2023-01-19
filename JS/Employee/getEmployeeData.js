export function getEmployeeData() {
  return fetch('http://localhost:3000/employees')
    .then(response => response.json())
    .then(data => {
        const employee = data.find(emp => emp.userName === localStorage.getItem('userName'));
        return employee;
    });
}
