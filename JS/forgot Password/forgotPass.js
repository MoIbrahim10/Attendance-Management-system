import { fetchData } from "../admin/fetchData.js";
(async ()=>{
const employees = await fetchData('employees');
const emails = getEmployeesemail(employees);
  checkemail(emails);

})() 


function getEmployeesemail(employees) {
  return employees.map(employee => employee.email);
}


function checkemail(emails) {
  const emailInput = document.getElementById("email");
  const resetButton = document.getElementById("resetButton");

  emailInput.addEventListener('change', (e) => {
    const inputValue = e.target.value;
    if(emails.includes(inputValue)) {
      resetButton.disabled = false;
      resetButton.style.backgroundColor = '#2000A1';
    } else {
      resetButton.disabled = true;
    }
  });

  resetButton.addEventListener('click', () => {
    let resetPassWrapper = document.getElementById("resetPassWrapper");
    resetPassWrapper.innerHTML = "An email has been sent to you!<br/>>Kindly Check your email for reset password instructions";
    sendResetPasswordEmail(emailInput.value);
  });

}

function sendResetPasswordEmail(email) {
  Email.send({
    SecureToken: "7d499b9e-7101-425b-923c-c8fe6fcaeac9",
    To: email,
    From: "techwavesolutionjs@gmail.com",
    Subject: "Password Reset Instructions",
    Body: `We have received a request to reset the password for your account. To reset your password, please click on the following link: http://127.0.0.1:5501/HTML/resetPass.html <br>
    If you did not make this request, please ignore this email or contact our support team for assistance.<br>
    Please note that this link will only be valid for 24 hours.
    Best regards,
    TechWave Solutions Team
    `,
  })
}
