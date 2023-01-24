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
  validateInput(isValidfName, fNameMsgError, fnameInput, errorMsgs.fnameError);


    /** Validate Last Name **/
  const { isValid:isValidlName, error:lNameMsgError } = validateName(lnameInput.value);
  validateInput(isValidlName, lNameMsgError, lnameInput, errorMsgs.lnameError);

    /** Validate Address **/
  const { isValid:isValidlAddress, error:addressMsgError } = validateAddress(addressInput.value);
  validateInput(isValidlAddress, addressMsgError, addressInput, errorMsgs.addressError);
  

    /** Validate Age **/
  const { isValid:isValidAge, error:ageMsgError } = validateAge(ageInput.value);
  validateInput(isValidAge, ageMsgError, ageInput, errorMsgs.ageError);
    
  /** Validate Email **/
  const { isValid:isValidEmail, error:emailMsgError } = validateEmail(emailInput.value);
  validateInput(isValidEmail, emailMsgError, emailInput, errorMsgs.emailError);  
    
}





function validateInput(isValid, errorMessage, inputElement, errorMessageElement) {
  if (!isValid) {
    inputElement.style.border = "1px solid #BD0000";
    errorMessageElement.textContent = errorMessage;
  } else {
    inputElement.style.border = "1px solid #51C16A";
    errorMessageElement.textContent = "";
  }
}

