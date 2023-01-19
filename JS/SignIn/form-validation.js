// form-validation.js

export function validateForm(form) {
  const username = form.elements.username;
  const password = form.elements.password;
  
    /** Validate Name **/
    if (username.value === "")       username.style.border = "1px solid #BD0000";   
    // else    username.style.border = "1px solid #51C16A";

    /** Validate Password **/
    if (password.value === "")       password.style.border = "1px solid #BD0000";
    // else    password.style.border = "1px solid #51C16A";
  
}
