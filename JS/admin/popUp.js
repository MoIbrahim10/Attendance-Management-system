let body = document.getElementsByClassName("mainWrapper")[0];

export function openDeleteEmpPopUp() {
  let deleteEmpBg = document.getElementById("deleteEmpBg");
  let deleteEmpBtns = document.getElementsByClassName("deleteEmpBtn");

  Array.from(deleteEmpBtns).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // console.log(e.target.parentElement.parentElement.parentElement.children[1].innerText);
      // console.log(this);
    body.classList.add("blurbody");
    deleteEmpBg.classList.add("centerItems");
    });
  });    
}

export function openResetPassPopUp() {
  let ResetPassBg = document.getElementById("ResetPassBg");
  let resetPassBtns = document.getElementsByClassName("resetPassBtn");

  Array.from(resetPassBtns).forEach((btn) => {
    btn.addEventListener("click", () => {
    body.classList.add("blurbody");
    ResetPassBg.classList.add("centerItems");
    });
  });
}

export function openUpdateEmpPopUp() {
  let updateEmpBg = document.getElementById("updateEmpBg");
  let editEmpBtns = document.getElementsByClassName("editEmpBtn");

  Array.from(editEmpBtns).forEach((btn) => {
    btn.addEventListener("click", () => {
    body.classList.add("blurbody");
    updateEmpBg.classList.add("centerItems");
    });
  });
}

// export function closePopUp(e) {
//   body.classList.remove("blurbody");
//   console.log(e);
//   // deleteEmpBg.classList.remove("centerItems");
// }
// // When the user clicks anywhere outside of the pop up, close it
// window.onclick = function (event) {
//   if (event.target == deleteEmpBg || event.target == ResetPassBg) {
//     body.classList.remove("blurbody");
//     deleteEmpBg.classList.remove("centerItems");
//     ResetPassBg.classList.remove("centerItems");
//   }
// };
// addEmployee.onclick = function () {
//   body.classList.add("blurbody");
//   homeIcon.classList.add("inactiveNav");
//   addEmployee.children[0].classList.add("activeNav");
//   AddEmpBg.classList.add("centerItems");
// };
// function openDeleteEmpPopUp() {
//   body.classList.add("blurbody");
//   deleteEmpBg.classList.add("centerItems");
// }
// function openResetPassPopUp() {
//   body.classList.add("blurbody");
//   ResetPassBg.classList.add("centerItems");
// }
// function openUpdateEmpPopUp() {
//   body.classList.add("blurbody");
//   updateEmpBg.classList.add("centerItems");
// }
// function closePopUp(e) {
//   body.classList.remove("blurbody");
//   console.log(e);
//   // deleteEmpBg.classList.remove("centerItems");
// }
// // function closePopUp2() {
// //   body.classList.remove("blurbody");
// //   updateEmpBg.classList.remove("centerItems");
// // }
// // function closePopUp3() {
// //   body.classList.remove("blurbody");
// //   ResetPassBg.classList.remove("centerItems");
// // }
