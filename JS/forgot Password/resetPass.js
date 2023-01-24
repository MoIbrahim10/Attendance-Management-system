import { fetchData } from "../admin/fetchData.js";

(async () => {
  const employees = await fetchData("employees");
  const emails = getEmployeesEmail(employees);
  checkEmail(emails);
})();

function getEmployeesEmail(employees) {
  return employees.map((employee) => employee.email);
}

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const errorMessages = document.getElementById("errorMessages");
const resetButton = document.getElementById("resetButton");

function checkEmail(emails) {
  emailInput.addEventListener("change", (e) => {
    const inputValue = e.target.value;
    if (emails.includes(inputValue)) {
      resetButton.disabled = false;
      resetButton.style.backgroundColor = "#2000A1";
    } else {
      resetButton.disabled = true;
    }
  });

  resetButton.addEventListener("click", () => {
    if (validatePassword()) {
      updatePassword(emailInput.value, passwordInput.value);
    }
  });
}

function validatePassword() {
  if (passwordInput.value.length < 8) {
    passwordInput.style.border = "1px solid #cc2929";
    errorMessages.innerHTML = "Password must be at least 8 characters";
    return false;
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.style.border = "1px solid #cc2929";
    errorMessages.innerHTML = "Passwords do not match";
    return false;
  }
  passwordInput.style.border = "1px solid #51c16a";
  confirmPasswordInput.style.border = "1px solid #51c16a";
  errorMessages.innerHTML = "";
  return true;
}

async function updatePassword(email, newPassword) {
  try {
    const employees = await fetchData("employees");
    const employee = employees.find((employee) => employee.email === email);
    const employeeId = employee.id;
    const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: "PATCH",
      body: JSON.stringify({ password: newPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const resetPassWrapper = document.getElementById("resetPassWrapper");
    if (data.success) {
      resetPassWrapper.innerHTML = "Password updated successfully";
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
    } else {
      resetPassWrapper.innerHTML = "Error updating password! please try again later.";
      window.location.reload();   
    }
  } catch (err) {
    console.error(err);
  }
}
