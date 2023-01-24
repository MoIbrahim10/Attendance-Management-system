import {editInfo} from "./editInfo.js";

let body = document.getElementsByClassName("mainWrapper")[0];
let deleteEmpBg = document.getElementById("deleteEmpBg");
let ResetPassBg = document.getElementById("ResetPassBg");
let updateEmpBg = document.getElementById("updateEmpBg");

let saveEditEmpPopUpBtn = document.getElementById("saveChanges");
let confirmResetPassPopUpBtn = document.getElementById("confirmResetPassPopUp");
let confirmDeleteEmpPopUpBtn = document.getElementById("confirmDeleteEmpPopUp");


let closeDeleteEmpPopUpBtn = document.getElementById("closeDeleteEmpPopUp");
let closeResetPassPopUpBtn = document.getElementById("closeResetPassPopUp");
let closeEditEmpPopUpBtn = document.getElementById("closeEditEmpPopUp");
let currentId;



const table = document.getElementById("empdataTable");
table.addEventListener("click", (event) => {
  if (event.target.matches(".resetPassBtn")) {
    currentId = event.target.getAttribute("data-id");
    openResetPassPopUp();
  } else if (event.target.matches(".editEmpBtn")) {
    currentId = event.target.getAttribute("data-id");
    openUpdateEmpPopUp();
  } else if (event.target.matches(".deleteEmpBtn")) {
    currentId = event.target.getAttribute("data-id");
    openDeleteEmpPopUp();
  }
});




export function openDeleteEmpPopUp() {
  let deleteEmpBg = document.getElementById("deleteEmpBg");
  body.classList.add("blurbody");
  deleteEmpBg.classList.add("centerItems");
}

export function openResetPassPopUp() {
  let ResetPassBg = document.getElementById("ResetPassBg");
  body.classList.add("blurbody");
  ResetPassBg.classList.add("centerItems");
}

export function openUpdateEmpPopUp() {
  let updateEmpBg = document.getElementById("updateEmpBg");
  body.classList.add("blurbody");
  updateEmpBg.classList.add("centerItems");
}



saveEditEmpPopUpBtn.addEventListener("click", () => {
  editInfo(currentId);
  closePopUp(updateEmpBg);
});
confirmResetPassPopUpBtn.addEventListener("click", () => {
  resetPassword(currentId);
  closePopUp(ResetPassBg);
});
confirmDeleteEmpPopUpBtn.addEventListener("click", () => {
  deleteEmployee(currentId);
  closePopUp(deleteEmpBg);
});


async function deleteEmployee(id) {
  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}



async function resetPassword(id) {
  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: "12345678",
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}




// When the user clicks anywhere outside of the pop up, close it
window.onclick = function (event) {
  if (event.target == deleteEmpBg || event.target == ResetPassBg) {
    body.classList.remove("blurbody");
    deleteEmpBg.classList.remove("centerItems");
    ResetPassBg.classList.remove("centerItems");
  }
};



closeDeleteEmpPopUpBtn.onclick = () => {closePopUp(deleteEmpBg);}
closeResetPassPopUpBtn.onclick = () => {closePopUp(ResetPassBg);}
closeEditEmpPopUpBtn.onclick = () => {closePopUp(updateEmpBg);}
function closePopUp(element) {
  body.classList.remove("blurbody");
  element.classList.remove("centerItems");
}












