// TODO----------------------------------------------------------------------------
//*TODO: refactor (IN PROGRESS)
// TODO: reset Cuts table before loading new cuts
// TODO: Table Per Diameter if orders are mixed
// TODO: Require all form inouts and disable "Enter Orders" button until complete
// TODO: show orders that are complete in print form
// TODO: Allow for more than 4 cuts (dynamically create cut table)
// TODO: ---
// TODO: (HTML) change diameter dropdown to radio buttons? For quicker change
// TODO----------------------------------------------------------------------------

const maxShaftLength = 240;
let totalDrop = 0;
let orders = [];

//============================
// EVENT HANDLERS
//============================

/**
 * On 'Enter Order' button clicked:
 */
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
    $('#shaftOrders').append(addOrderRow(order));

    // Reset the order form.
    $('#orderForm').trigger('reset');

    // Set the diameter dropdown to the previous order diameter.
    // We do this because of the form reset above.
    $('#shaftDiameter').val(order.diameter);
});

/**
 * On 'Make Cuts' button clicked:
 */
$('#makeCuts').on('click', function (e) {

    // Prevent the form from submitting on click.
    e.preventDefault();

    // Return an alert if there are no orders.
    if (orders.length === 0) return alert('No orders to cut.');

    // Empties the cuts table of any previously calculated cuts.
    $('#cutOrder').empty();
    // TODO: ** refactor down in this function **
    let sticksToCut = calculateCuts(orders);

    totalDrop = 0;
    const cutTable = $('#cutOrder');
    addSticksToTable(cutTable, sticksToCut);
    showCompletedOrdersTable(orders);
    $('#completedOrdersTable').show();

    // TODO: remove
    // sticksToCut.forEach(function (stick, index) {
    //     let row = $('<tr>').append(`<td>${index + 1}</td>`);

    //     stick.forEach(function (cut) {
    //         let td = $(`<td> ${cut}</td>`);
    //         $(row).append(td);
    //     });

    //     if (stick.length < 4) {
    //         for (let i = 0; i < 4 - stick.length; i++) {
    //             $(row).append('<td>-</td>');
    //         }
    //     }

    //     let stickDrop = calculateStickDrop(stick);
    //     totalDrop += stickDrop;
    //     $(row).append(`<td>${stickDrop}</td>`)
    //     $('#cutOrder').append(row);
    // });

    // $('#totalDrop').text(`Total drop: ${totalDrop}`);

    // Show the print button
    $('#printBtn').show();
});

// TODO: move down by other functions
function addSticksToTable (table, sticksToCut) {
    sticksToCut.forEach((stick, index) => {
        let row = $('<tr>').append(`<td>${index + 1}</td>`);

        // TODO: make dry
        let cut1 = $(`<td>${(stick[0] == undefined) ? '-':stick[0]}</td>`);
        let cut2 = $(`<td>${(stick[1] == undefined) ? '-':stick[1]}</td>`);
        let cut3 = $(`<td>${(stick[2] == undefined) ? '-':stick[2]}</td>`);
        let cut4 = $(`<td>${(stick[3] == undefined) ? '-':stick[3]}</td>`);
        let cut5 = $(`<td>${(stick[4] == undefined) ? '-':stick[4]}</td>`);
        let cut6 = $(`<td>${(stick[5] == undefined) ? '-':stick[5]}</td>`);

        let stickDrop = 0;
        stick.forEach(cut => stickDrop += cut);
        let drop = $(`<td>${240 - stickDrop}</td>`);
        
        $(row).append(cut1, cut2, cut3, cut4, cut5, cut6, drop);

        $(table).append(row);
    });
}

/**
 * On 'Clear Orders' clicked:
 */
$('#clearOrders').on('click', function (e) {

    // Prevent the form from submitting on click.
    e.preventDefault();

    // Empty the orders array.
    orders.length = 0;

    // Empty the orders table.
    $('#shaftOrders').empty();
});

/**
 * On 'Clear Cuts' clicked:
 */
$('#clearCutsTable').on('click', function (e) {

    // Prevent the form from submitting on click.
    e.preventDefault();

    // TODO: will need to reset stick/current sticks array or something.

    // Empty the orders table.
    $('#cutsTable').empty();
});

/**
 * On 'Print' clicked:
 */
$('#printBtn').on('click', function () {

    // Build the page header.
    // let header = '<h4>';
    // header += `Total stick: ${sticks.length * 240} (${sticks.length} sticks) | `;
    // header += `Total drop: ${totalDrop} | `;
    // header += `Yield: ${ Math.floor((1 - (totalDrop / (sticks.length * 240))) * 100)}%`;
    // header += '</h4>';

    // Triggers a print preview only for the cutsTable element, with the above header.
    $('#cutsTable').printThis();
});

/**
 * On order delete (trash icon) clicked:
 */
$(document).on('click', '.deleteOrderBtn', function () {

    // Get the order ID from the parent element.
    const orderToDelete = $(this).parent().attr('orderId');

    // Remove the order from the orders array.
    orders.splice(orderToDelete, 1);

    // Remove the row element.
    $(this).parent().remove();
});

//============================
// FUNCTIONS
//============================

function showCompletedOrdersTable (orders) {
    let table = $('#completedOrders');

    orders.forEach(order => {
        const trRow = $('<tr>').attr('orderId', order.id);
        const tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);
        const tdShaftDiameter = $('<td>').text(order.diameter);
        const tdShaftLength = $('<td>').text(order.length);
        const tdShaftQuantity = $('<td>').text(order.quantity);

        $(trRow).append(
            tdWorkOrderNumber,
            tdShaftDiameter,
            tdShaftLength,
            tdShaftQuantity,
        );

        $(table).append(trRow);
    
    });
}

function addOrderRow(order) {

    // Row & table data elements.
    const trRow = $('<tr>').attr('orderId', order.id);
    const tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);
    const tdShaftDiameter = $('<td>').text(order.diameter);
    const tdShaftLength = $('<td>').text(order.length);
    const tdShaftQuantity = $('<td>').text(order.quantity);

    // Delete button
    const deleteBtn = $('<button>').addClass('btn deleteOrderBtn');
    const deleteIcon = $('<i>').addClass('fas fa-trash');

    // Add the icon to the button.
    $(deleteBtn).append(deleteIcon);

    // Append table data elements and delete button to the row.
    $(trRow).append(
        tdWorkOrderNumber,
        tdShaftDiameter,
        tdShaftLength,
        tdShaftQuantity,
        deleteBtn
    );

    // Return the completed row element.
    return trRow;
}

function calculateCuts(ordersToCut) {
    const sticks = [];
    const cuts = [];
    let totalLengthOfCuts = 0;
    let currentStick = [];

    // Get the cut lengths from each order, store in cuts array.
    ordersToCut.forEach(function (order) {
        for (let i = 0; i < order.quantity; i++) {
            cuts.push(order.length);
        }
    });


    // Sort lengths from longest to shortest. (Setup for greedy method)
    cuts.sort(function (a, b) {
        return b - a
    });

    // TODO: document
    for (let i = 0; i <= cuts.length; i++) {
        if ((totalLengthOfCuts + cuts[i]) < maxShaftLength) {
            totalLengthOfCuts += cuts[i];
            currentStick.push(cuts[i]);
        } else {

            // Find next best cut to make to minimize current stick drop.
            for (let j = i; j < cuts.length; j++) {
                if (totalLengthOfCuts + cuts[j] < maxShaftLength) {
                    totalLengthOfCuts += cuts[j];
                    currentStick.push(cuts[j]);
                    cuts.splice(j, 1);
                }
            }

            sticks.push(currentStick);

            // Reset.
            currentStick = [];
            totalLengthOfCuts = 0;
            if (i++ !== cuts.length) i -= 2;
        }
    }

    // TODO: ? return an object with sticks array AND yield info?
    return sticks;
}

function calculateStickDrop(stick) {
    let drop = 240;
    stick.forEach(cut => drop -= cut);
    return drop;
}

function resetOrders() {
    [orders, sticks, cuts, currentStick].forEach(array => array.length = 0);
}

/**
 * ! Initialization:
 * ! This function is called immediately on load.
 */
(function init() {

    $('#printBtn').hide();
    $('#completedOrdersTable').hide();

})();