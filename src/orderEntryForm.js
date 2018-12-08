import { orders } from './app';
import { enteredOrdersTable } from './enteredOrdersTable';

export const orderEntryForm = {
    init: () => {
        $('#submitOrder').on('click', function (e) {
            // Prevent the form from submitting on click.
            e.preventDefault();

            // Create the order object from input values.
            const order = {
                id: orders.length, // Order ID becomes the last index in the orders array.
                workOrderNumber: $('#workOrder').val().trim(),
                diameter: parseFloat($('#shaftDiameter').val().trim()),
                length: parseFloat($('#shaftLength').val().trim()),
                quantity: parseFloat($('#shaftQty').val().trim())
            };

            // Add the new order to the orders array.
            orders.push(order);

            // Add the new order to the orders table.
            const ordersTable = $('#shaftOrders');
            enteredOrdersTable.addOrderRowToTable(ordersTable, order);

            // Reset the order form.
            $('#orderForm').trigger('reset');

            // Set the diameter dropdown to the previous order diameter.
            // We do this because of the form reset above.
            $('#shaftDiameter').val(order.diameter);

            // Set focus back to Work Order field.
            $('#workOrder').focus();
        });
    }
}
