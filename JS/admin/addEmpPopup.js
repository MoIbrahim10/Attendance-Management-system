import {validateEmail} from "../SignUp/formValidation/validateEmail.js";


let sendInvite = document.getElementById("sendInvite");
let emailInput = document.getElementById("EmailInvite");
let closeInvitePopup = document.getElementById("closeInvitePopup");
let emailError = document.getElementById("email-error");


let AddEmpBg = document.getElementById("AddEmp");

let reportsIcon = document.getElementsByClassName("reports")[0];
let homeIcon = document.getElementsByClassName("home")[0];
let EditInfoIcon = document.getElementsByClassName("editAdminInfo")[0];

let activeIcon;
if (document.URL.includes("EmployeesReports")) {
activeIcon = reportsIcon;
} else if (document.URL.includes("adminEditInfo")) {
activeIcon = EditInfoIcon;
} else {
activeIcon = homeIcon;
}




addEmployee.onclick = function () {
  body.classList.add("blurbody");
  activeIcon.classList.add("inactiveNav");
  addEmployee.children[0].classList.add("activeNav");
  AddEmpBg.classList.add("centerItems");
};

closeInvitePopup.onclick = () =>{
  closePopUp();
}

sendInvite.onclick =  () => {
  const { isValid:isValidEmail, error:emailMsgError } = validateEmail(emailInput.value);
  if (!isValidEmail) {
    emailInput.style.border = "1px solid #BD0000";
    emailError.textContent = emailMsgError;
  }
  
  else{
    emailError.textContent = "";
    emailInput.style.border = "1px solid #51C16A";
    sendApprovalEmail(emailInput.value);
    closePopUp();
  }
  }

  function closePopUp() {
    body.classList.remove("blurbody");
    activeIcon.classList.remove("inactiveNav");
    addEmployee.children[0].classList.remove("activeNav");
    AddEmpBg.classList.remove("centerItems");
  }



function sendApprovalEmail(email) {
  Email.send({
    SecureToken: "7d499b9e-7101-425b-923c-c8fe6fcaeac9",
    To: email,
    From: "techwavesolutionjs@gmail.com",
    Subject: "TechWave Solutions Invitation",
    Body: `Hello there we are inviting you to join our team at TechWave solutions, please make sure to sign up with your data at http://127.0.0.1:5501/HTML/SignUp.html to join our family <br><br>Best Regards,<br>Mohamed Ibrahim`,
  })
}


