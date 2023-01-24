// signup-form.js

import { validateForm } from "./form-validation.js";
import { validateEmail } from "./email-validation.js";
import {emailError} from "./signUpErrorMsgSelector.js";
import { postToPendingDB } from "./postToPendingdb.js";
import { UploadImagefn } from "../uploadImg.js";

const form = document.getElementById("signup-form");
const termsCondionionCheckBox = form.elements.termsAndConditions;
const submitButton = document.getElementById("submit-button");
let imagwUpload = document.getElementById("uploadedImg");

  UploadImagefn();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  validateForm(form);

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
    avatar: `../../Images/Employees${imagwUpload.alt}`,
  };

  const isSent = await postToPendingDB(data);
  localStorage.setItem('email', data.email);


  // Redirect to success page if the form submission is successful
  if (isSent) window.location.href = "../../HTML/afterRegistration.html" ;
  else        window.location.href = "../../errorPage.html";
  
});



form.elements.fname.addEventListener("input", () => {
  if (form.elements.fname.value === "") {
    form.elements.fname.style.border = "1px solid #BD0000";
  } else {
    updateSubmitButton();
  }
});
form.elements.lname.addEventListener("input", () => {
  if (form.elements.lname.value === "") {
    form.elements.lname.style.border = "1px solid #BD0000";
  } else {
    updateSubmitButton();
  }
});
form.elements.address.addEventListener("input", () => {
  if (form.elements.address.value === "") {
    form.elements.address.style.border = "1px solid #BD0000";
  } else {
    updateSubmitButton();
  }
});
form.elements.email.addEventListener("input", () => {
  if (form.elements.email.value === "") {
    form.elements.email.style.border = "1px solid #BD0000";
  } else {
    updateSubmitButton();
  }
});
form.elements.age.addEventListener("input", () => {
  if (form.elements.age.value === "") {
    form.elements.age.style.border = "1px solid #BD0000";
  } else {
    updateSubmitButton();
  }
});



function updateSubmitButton() {
  if (form.elements.fname.value !== "" 
    && form.elements.lname.value !== "" 
    && form.elements.address.value !== "" 
    && form.elements.email.value !== "" 
    && form.elements.age.value !== "")
    {submitButton.style.backgroundColor = "#2000A1";} 
    else {submitButton.style.backgroundColor = "";}
}
