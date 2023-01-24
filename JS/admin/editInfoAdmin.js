import {editInfo} from "./editInfo.js";
let saveChangesBtn = document.getElementById("saveChanges");

saveChangesBtn.onclick = function() {
editInfo(1);
}