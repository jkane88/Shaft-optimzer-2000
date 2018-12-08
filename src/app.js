import { orderEntryForm } from './orderEntryForm';
import { enteredOrdersTable } from './enteredOrdersTable';
import { print } from './print';

export let orders = [];

orderEntryForm.init();
enteredOrdersTable.init();
print.init();

/**
 * ! Initialization:
 * ! This function is called immediately on load.
 */
(function init() {
    $('#workOrder').focus();
    $('#cutsTable').hide();
    $('#cutsTableBtns').hide();
    $('#completedOrdersTable').hide();
})();