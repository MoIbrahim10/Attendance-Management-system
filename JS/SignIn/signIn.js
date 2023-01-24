import { validateCredentials } from "./credentials-validation.js";


const form = document.getElementById("signin-form");
const usernameInput = form.elements.username;
const passwordInput = form.elements.password;
const error = document.getElementById("error");
const submitButton = document.getElementById("submitButton");


const rememberMeCheckbox = document.querySelector('.checkmark');

rememberMeCheckbox.addEventListener('click', () => {
  rememberMeCheckbox.classList.toggle('checked');
});


const savedUsername = localStorage.getItem('username');
const savedPassword = localStorage.getItem('password');
const savedRememberMe = localStorage.getItem('rememberMe');

if (savedRememberMe === 'true') {
  rememberMeCheckbox.classList.add('checked');
  usernameInput.value = savedUsername;
  passwordInput.value = savedPassword;
  updateSubmitButton();

}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const { isValid, error: errorMessage } = await validateCredentials(usernameInput.value, passwordInput.value);
  if (!isValid) {
    error.textContent = errorMessage;
    return;
  }

  error.textContent = "";
  usernameInput.style.border = "1px solid #51C16A"
  passwordInput.style.border = "1px solid #51C16A"

  const userRole = localStorage.getItem('userRole');

  if (rememberMeCheckbox.classList.contains('checked')) {
    localStorage.setItem('username', usernameInput.value);
    localStorage.setItem('password', passwordInput.value);
    localStorage.setItem('rememberMe', true);
  } else {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
  }


  // Redirect user to employee page
  if (userRole === 'employee') window.location.href = "../../HTML/employee.html";
  else if (userRole === 'security') window.location.href = "../../HTML/security.html";
  else if (userRole === 'admin') window.location.href = "../../HTML/adminDashboard.html";
});


usernameInput.addEventListener("input", () => {
  if (usernameInput.value === "") {
    usernameInput.style.border = "1px solid #BD0000";
  } else {
    updateSubmitButton();
  }
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.value === "") {
    passwordInput.style.border = "1px solid #BD0000";
  } else {
    updateSubmitButton();
  }
});


function updateSubmitButton() {
  if (usernameInput.value !== "" && passwordInput.value !== "") {
    submitButton.style.backgroundColor = "#2000A1";
  } else {
    submitButton.style.backgroundColor = "";
  }
}
