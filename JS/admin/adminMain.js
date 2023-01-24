import {displayEmployees} from './empData.js';
import {displayPendingUsers} from './pending.js';

(async function main() {
    await displayEmployees();
    await displayPendingUsers();
})()


