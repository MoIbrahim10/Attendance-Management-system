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
        <div class="d-flex gap-0 gap-md-2" id="pendingActionsSec">
          <button class="ApprvDeclinBtn approveBtn">
          <span class="text">Approve</span
          ><span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.814 3.216 8.7 8.428 15-15.285z"
              />
            </svg>
          </span>
        </button>
        <button class="ApprvDeclinBtn declineBtn">
        <span class="text">Decline</span
        ><span class="icon"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
            ></path>
          </svg>
        </span>
      </button>
        </div>
      </td>
`;
      pendingTableBody.appendChild(newRow);

  });

  const approveBtns = document.getElementsByClassName("approveBtn");
  const declineBtns = document.getElementsByClassName("declineBtn");

  for (let i = 0; i < approveBtns.length; i++) {
    approveBtns[i].setAttribute("data-index", i);
  }
  for (let i = 0; i < declineBtns.length; i++) {
    declineBtns[i].setAttribute("data-index", i);
  }

  pendingTableBody.addEventListener("click", async (event) => {
    if (event.target.matches(".approveBtn")) {
      
      const index = event.target.getAttribute("data-index");
      const username = generateUsername(pending[index].fname, pending[index].lname);
      const password = generatePassword();
  
      let pendingUserData = {...pending[index], id: null};
  
      sendApprovalEmail(pending[index].email, username, password, pending[index].fname, pending[index].lname);
  
      // Add user to the employees database
      const response = await addEmployee({
        ...pendingUserData,
        userName: username,
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
  
      await removePendingUser(pending[index].id); 
    } else if (event.target.matches(".declineBtn")) {
      const index = event.target.getAttribute("data-index");
      await removePendingUser(pending[index].id);
    }
  });

  
  
  
  

    
  // for (let i = 0; i < approveBtns.length; i++) {
  //   approveBtns[i].addEventListener("click", async ()=> {
  //     alert("Approve");
  //     const username = generateUsername(pending[i].fname, pending[i].lname);
  //     const password = generatePassword();
  
  //     let pendingUserData = {...pending[i], id: null};

  //     sendApprovalEmail(pending[i].email, username, password, pending[i].fname, pending[i].lname);

  //     // Add user to the employees database
  //     const response = await addEmployee({
  //       ...pendingUserData,
  //       userName: username,
  //       password: password,
  //       jobTittle: "Engineer",
  //       role: "employee",
  //       attendances: [
  //         {
  //           "date": getTodayDate(),
  //           "arrivalTime": "",
  //           "departureTime": "",
  //           "status": ""
  //         },]
  //     });

  //     await removePendingUser(pending[i].id); 
  //   });
  // }
  

  // for (let i = 0; i < declineBtns.length; i++) {
  //   declineBtns[i].addEventListener("click", async () => { 
  //         await removePendingUser(pending[i].id);
  //     });
  // }
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
    Subject: "TechWave Solutions Credintials",
    Body: `Hello ${fname} ${lname},<br><br>Your account has been approved.<br><br>Your <strong>
    user name is:</strong>  ${username} and Your <strong>password</strong>  is: ${password} you now can use these data to sign in at our website at http://127.0.0.1:5501/index.html <br><br>Best Regards,<br>Mohamed Ibrahim`,
  }).then((message) => alert(message));

}
