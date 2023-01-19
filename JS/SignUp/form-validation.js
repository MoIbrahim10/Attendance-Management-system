// form-validation.js
import { validateName } from "./formValidation/validateName.js";
import { validateAddress } from "./formValidation/validateAddress.js";
import { validateAge } from "./formValidation/validateAge.js";
import { validateEmail } from "./formValidation/validateEmail.js";
import * as errorMsgs from "./signUpErrorMsgSelector.js";

export function validateForm(form) {
  const fnameInput = form.elements.fname;
  const lnameInput = form.elements.lname;
  const addressInput = form.elements.address;
  const ageInput = form.elements.age;
  const emailInput = form.elements.email;

    /** Validate First Name **/
  const { isValid:isValidfName, error:fNameMsgError } = validateName(fnameInput.value);
  if (!isValidfName) {
    fnameInput.style.border = "1px solid red";
    errorMsgs.fnameError.textContent = fNameMsgError;
  }
  else{
    fnameInput.style.border = "1px solid green";
    errorMsgs.fnameError.textContent = "";
  }

    /** Validate Last Name **/
  const { isValid:isValidlName, error:lNameMsgError } = validateName(lnameInput.value);
  if (!isValidlName) {
    lnameInput.style.border = "1px solid red";
    errorMsgs.lnameError.textContent = lNameMsgError;
  }else{
    lnameInput.style.border = "1px solid green";
    errorMsgs.lnameError.textContent = "";
  }

    /** Validate Address **/
  const { isValid:isValidlAddress, error:addressMsgError } = validateAddress(addressInput.value);
  if (!isValidlAddress) {
    addressInput.style.border = "1px solid red";
    errorMsgs.addressError.textContent = addressMsgError;
  }else{
    addressInput.style.border = "1px solid green";
    errorMsgs.addressError.textContent = "";
  }

    /** Validate Age **/
  const { isValid:isValidAge, error:ageMsgError } = validateAge(ageInput.value);
  if (!isValidAge) {
    ageInput.style.border = "1px solid red";
    errorMsgs.ageError.textContent = ageMsgError;
  }else{
    ageInput.style.border = "1px solid green";
    errorMsgs.ageError.textContent = "";
  }
  /** Validate Email **/
  const { isValid:isValidEmail, error:emailMsgError } = validateEmail(emailInput.value);
  if (!isValidEmail) {
    emailInput.style.border = "1px solid red";
    errorMsgs.emailError.textContent = emailMsgError;
  }else{
    emailInput.style.border = "1px solid green";
    errorMsgs.emailError.textContent = "";
  }
  
}