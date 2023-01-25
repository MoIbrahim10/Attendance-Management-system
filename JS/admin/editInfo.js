import {validateName} from "../SignUp/formValidation/validateName.js";
import {validateEmail} from "../SignUp/formValidation/validateEmail.js";
import { UploadImagefn } from "../uploadImg.js";
export function editInfo(id){
let firstNameInput = document.getElementById("fName");
let lastNameInput = document.getElementById("lName");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let roleInput = document.getElementById("role");
let jobTitleInput = document.getElementById("jobTitle");


let firstNameError = document.getElementById("fName-error");
let lastNameError = document.getElementById("lName-error");
let emailError = document.getElementById("email-error");
let passwordError = document.getElementById("password-error");
let roleError = document.getElementById("role-error");
let jobTitleError = document.getElementById("jobTittle-error");



firstNameInput.addEventListener("input", function() {
  const { isValid:isValidName, error:NameMsgError } = validateName(firstNameInput.value);
  if (!isValidName) {
    firstNameInput.style.border = "1px solid #BD0000";
    firstNameError.textContent = NameMsgError;
  }
  
  else{
    firstNameError.textContent = "";
    firstNameInput.style.border = "1px solid #51C16A";
  }
  });
  lastNameInput.addEventListener("input", function() {
  const { isValid:isValidName, error:NameMsgError } = validateName(lastNameInput.value);
  if (!isValidName) {
    lastNameInput.style.border = "1px solid #BD0000";
    lastNameError.textContent = NameMsgError;
  }
  
  else{
    lastNameError.textContent = "";
    lastNameInput.style.border = "1px solid #51C16A";
  }
  });
  emailInput.addEventListener("input", function() {
  const { isValid:isValidEmail, error:emailMsgError } = validateEmail(emailInput.value);
  if (!isValidEmail) {
    emailInput.style.border = "1px solid #BD0000";
    emailError.textContent = emailMsgError;
  }
  else{
    emailError.textContent = "";
    emailInput.style.border = "1px solid #51C16A";
  }
  });
  passwordInput.addEventListener("input", function() {
  if (passwordInput.value === "") {
    passwordInput.style.border = "1px solid #BD0000";
    passwordError.textContent = "Password is required!";
  }
  else if(passwordInput.value.length < 8){
    passwordInput.style.border = "1px solid #BD0000";
    passwordError.textContent = "Password must be at least 8 characters!";
  }
  else{
    passwordError.textContent = "";
    passwordInput.style.border = "1px solid #51C16A";
  }
  });

  roleInput.addEventListener("input", function() {
  if (roleInput.value === "") {
    roleInput.style.border = "1px solid #BD0000";
    roleError.textContent = "Role is required!";
  }
  else{
    roleError.textContent = "";
    roleInput.style.border = "1px solid #51C16A";
  }
  });
  jobTitleInput.addEventListener("input", function() {
  if (jobTitleInput.value === "") {
    jobTitleInput.style.border = "1px solid #BD0000";
    jobTitleError.textContent = "Job Title is required!";
  }
  else{
    jobTitleError.textContent = "";
    jobTitleInput.style.border = "1px solid #51C16A";
  }
  });

  const { isValid:isValidName, error:NameMsgError } = validateName(firstNameInput.value);
  const { isValid:isValidLastName, error:lastNameMsgError } = validateName(lastNameInput.value);
  const { isValid:isValidEmail, error:emailMsgError } = validateEmail(emailInput.value);
  if (firstNameInput.value === "") {
    firstNameInput.style.border = "1px solid #BD0000";
    firstNameError.textContent = "First Name is required!";
  }
  else if (!isValidName) {
    firstNameInput.style.border = "1px solid #BD0000";
    firstNameError.textContent = NameMsgError;
  }
  else if (lastNameInput.value === "") {
    lastNameInput.style.border = "1px solid #BD0000";
    lastNameError.textContent = "Last Name is required!";
  }
  else if (!isValidLastName) {
    lastNameInput.style.border = "1px solid #BD0000";
    lastNameError.textContent = lastNameMsgError;
  }
  else if (emailInput.value === "") {
    emailInput.style.border = "1px solid #BD0000";
    emailError.textContent = "Email is required!";
  }
  else if (!isValidEmail) {
    emailInput.style.border = "1px solid #BD0000";
    emailError.textContent = emailMsgError;
  }
  else if (passwordInput.value === "") {
    passwordInput.style.border = "1px solid #BD0000";
    passwordError.textContent = "Password is required!";
  }
  else if(passwordInput.value.length < 8){
    passwordInput.style.border = "1px solid #BD0000";
    passwordError.textContent = "Password must be at least 8 characters!";
  }
  else if (roleInput.value === "") {
    roleInput.style.border = "1px solid #BD0000";
    roleError.textContent = "Role is required!";
  }
  else if (jobTitleInput.value === "") {
    jobTitleInput.style.border = "1px solid #BD0000";
    jobTitleError.textContent = "Job Title is required!";
  }
  else{
    fetch(`http://localhost:3000/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: firstNameInput.value,
        lname: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        role: roleInput.value,
        jobTittle: jobTitleInput.value,
      }),
    })
  }
};