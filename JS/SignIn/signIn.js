import { validateCredentials } from "./credentials-validation.js";
import { validateForm } from "./form-validation.js";

// import { setCookie } from "./setCookie.js";
// import { getCookie } from "./getCookie.js";

const form = document.getElementById("signin-form");
const error = document.getElementById("error");
const submitButton = document.getElementById("submitButton");

// const rememberMe = getCookie('rememberMe');
// if(rememberMe === 'true') {
//   form.elements.rememberMe.checked = true;
//   form.elements.username.value = getCookie('username');
// }

// form.addEventListener("input", (event) => {
//   validateForm(form);
// });

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  validateForm(form);
  const usernameInput = form.elements.username;
  const passwordInput = form.elements.password;
  
  const { isValid, error: errorMessage } = await validateCredentials(usernameInput.value, passwordInput.value);
  if (!isValid) {
    error.textContent = errorMessage;
    return;
  }

  error.textContent = "";
  usernameInput.style.border = "1px solid #51C16A"
  passwordInput.style.border = "1px solid #51C16A"
  submitButton.style.backgroundColor = "#2000A1";

  const userRole = localStorage.getItem('userRole');

  

  
//   const rememberMeCheckbox = form.elements.rememberMe;
// rememberMeCheckbox.addEventListener('change', ()=> {
//   if (rememberMeCheckbox.checked)   setCookie(username, 'true', 30);
//   else                              setCookie('', '', -1); 
// });


  // Redirect user to employee page
  if (userRole === 'employee') window.location.href = "../../HTML/employee.html";
  else if (userRole === 'security') window.location.href = "../../HTML/security.html";
  else if (userRole === 'admin') window.location.href = "../../HTML/adminDashboard.html";
});
