import {displayEmployees} from './empData.js';
import {displayPendingUsers} from './pending.js';
import {openResetPassPopUp} from './popUp.js';
import {openUpdateEmpPopUp} from './popUp.js';
import {openDeleteEmpPopUp} from './popUp.js';

(async function main() {
    await displayEmployees();
    await displayPendingUsers();
    openResetPassPopUp();
    openUpdateEmpPopUp();
    openDeleteEmpPopUp();
})()


