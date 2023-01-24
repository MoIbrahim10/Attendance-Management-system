// signup-form.js

import { validateForm } from "./form-validation.js";
import { validateEmail } from "./email-validation.js";
import {emailError} from "./signUpErrorMsgSelector.js";
import { postToPendingDB } from "./postToPendingdb.js";

const form = document.getElementById("signup-form");
const body = document.querySelector("body");
const submitButton = document.getElementById("submit-button");


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  validateForm(form);
  submitButton.style.backgroundColor = "#2000A1";

  const emailInput = form.elements.email;
  const { isValid: emailIsValid, error: emailErrorMessage } = await validateEmail(emailInput.value);
  if (!emailIsValid) {
    emailInput.style.border = "1px solid #BD0000";
    emailError.textContent = emailErrorMessage;
    return;
  }
  if(emailInput.value!=""){
  emailInput.style.border = "1px solid #51C16A";
  emailError.textContent = "";
  }
  
  const termsCondionionCheckBox = form.elements.termsAndConditions;
  const termsConditionsError = document.getElementById("termsConditions-error");
  if (!termsCondionionCheckBox.checked) {
    termsConditionsError.textContent = "Please accept the terms and conditions";
    return;
  }

  const data = {
    id: "",
    fname: form.elements.fname.value,
    lname: form.elements.lname.value,
    email: form.elements.email.value,
    address: form.elements.address.value,
    age: form.elements.age.value,
    avatar: "../Images/avatar.svg"
  };

  const isSent = await postToPendingDB(data);
  localStorage.setItem('email', data.email);


  // Redirect to success page if the form submission is successful
  if (isSent) window.location.href = "../../HTML/afterRegistration.html" ;
  else        window.location.href = "../../errorPage.html";
  
});
