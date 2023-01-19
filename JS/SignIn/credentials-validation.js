// import { getUserRole } from "./getUserRole";

export async function validateCredentials(username, password) {
  try {
    const response = await fetch(`http://localhost:3000/employees?userName=${username}&password=${password}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.length === 0) {
      return { isValid: false, error: "Invalid username or password" };
    }
    localStorage.setItem('userRole', data[0].role);
    localStorage.setItem('userName', data[0].userName);

    return { isValid: true };

  } catch (err) {
    console.log(err);
    return { isValid: false, error: "An error occurred while checking the credentials" };
  }
}