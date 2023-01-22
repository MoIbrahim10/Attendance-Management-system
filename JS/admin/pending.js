import {fetchData} from './fetchData.js';
import {getTodayDate} from '../Security/getDateformat.js';
export async function displayPendingUsers() {
  const pending = await fetchData("pending");
  const pendingTableDiv = document.getElementById("pendingTableDiv");
  const pendingTableBody = document.getElementById("pendingTableBody");
  let noPendingDiv = document.getElementById("noPendingDiv");
  if(pending.length !== 0) {
  noPendingDiv.style.display = "none";
  pendingTableDiv.style.display = "block";
  pending.forEach(pendingUser => {
    const newRow = document.createElement('tr');
      newRow.innerHTML = `
      <td>
        <div class="d-flex flex-row align-items-center gap-3">
          <img
            src="../Images/avatar.svg"
            width="40"
            class="rounded-circle"
          />
          <span class="d-block font-weight-bold">${pendingUser.fname} ${pendingUser.lname}</span>
        </div>
      </td>
      <td>23</td>
      <td>${pendingUser.email}</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-success approveBtn">
            Approve
          </button>
          <button class="btn btn-danger declineBtn">
            Decline
          </button>
        </div>
      </td>
`;
      pendingTableBody.appendChild(newRow);

  });

  const declineBtns = document.getElementsByClassName("declineBtn");
  const approveBtns = document.getElementsByClassName("approveBtn");

  for (let i = 0; i < approveBtns.length; i++) {
    approveBtns[i].addEventListener("click", async ()=> {
      const username = generateUsername(pending[i].fname, pending[i].lname);
      const password = generatePassword();
  
      let pendingUserData = {...pending[i], id: null};

      sendApprovalEmail(pending[i].email, username, password, pending[i].fname, pending[i].lname);

      // Add user to the employees database
      const response = await addEmployee({
        ...pendingUserData,
        username: username,
        password: password,
        jobTittle: "Engineer",
        role: "employee",
        attendances: [
          {
            "date": getTodayDate(),
            "arrivalTime": "",
            "departureTime": "",
            "status": ""
          },]
      });

      await removePendingUser(pending[i].id); 
    });
  }
  

  for (let i = 0; i < declineBtns.length; i++) {
    declineBtns[i].addEventListener("click", async () => { 
          await removePendingUser(pending[i].id);
      });
  }
}
    $("#pendingTable").DataTable({ responsive: true });
} 

function generateUsername(firstName, lastName) {
  const firstLetter = firstName.charAt(0);
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return `${firstLetter}_${lastName}${randomNumbers}`;
}

function generatePassword() {
  const password = Math.random().toString(36).slice(-10);
  return password;
}


async function addEmployee(employee) {
  const response = await fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return response.json();
}

async function removePendingUser(id) {
  const response = await fetch(`http://localhost:3000/pending/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

function sendApprovalEmail(email, username, password, fname, lname) {
  Email.send({
    SecureToken: "7d499b9e-7101-425b-923c-c8fe6fcaeac9",
    To: email,
    From: "techwavesolutionjs@gmail.com",
    Subject: "TechWave Solution Credintials",
    Body: `Hello ${fname} ${lname},<br><br>Your account has been approved.<br><br>Your <strong>
    user name is:</strong>  ${username} and Your <strong>password</strong>  is: ${password} you now can use these data to sign in at our website at http://127.0.0.1:5501/index.html <br><br>Best Regards,<br>Mohamed Ibrahim`,
  }).then((message) => alert(message));

}
