export async function getEmployees() {
  const response = await fetch('http://localhost:3000/employees');
  const data = await response.json();
  return data;
}
