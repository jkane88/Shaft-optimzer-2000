import { calculateCuts } from './optimizer';
import { print } from './print';
print.init();

//============================
// GLOBAL VARIABLES
//============================
let orders = [];

//============================
// UI ELEMENTS
//============================
const submitOrderBtn = $('#submitOrder');
const ordersTableBody = $('#shaftOrders');
const orderForm = $('#orderForm');
const diameterDropdown = $('#shaftDiameter');
const clearOrdersBtn = $('#clearOrders');
const makeCutsBtn = $('#makeCuts');
const cutsTables = $('#cutsTable');


//============================
// INITIALIZATION
//============================
// ! This function is called immediately on load
(function init() {

    // Set focus to the order entry form for improved UX.
    $('#workOrder').focus();

    // Hide irrelevant elements. These are shown when they're needed.
    $('#cutsTable').hide();
    $('#cutsTableBtns').hide();
    $('#completedOrdersTable').hide();
})();

//============================
// EVENT LISTENERS
//============================

$(submitOrderBtn).on('click', function (e) {

    // Prevent the form from reloading the page.
    e.preventDefault();

    // Create the order object from the form inputs.
    const order = {
        id: orders.length, // Order ID becomes the last index in the orders array.
        workOrderNumber: $('#workOrder').val().trim(),
        diameter: parseFloat($('#shaftDiameter').val().trim()),
        length: parseFloat($('#shaftLength').val().trim()),
        quantity: parseFloat($('#shaftQty').val().trim()),
        stressProof: $('input[name=materialOptions]:checked').val() === "stressProof" ? "Y" : "N"
    };

    addOrder(order);
    updateOrdersTable();
    resetOrderForm();
});

// On 'MAKE CUTS' clicked:
$(makeCutsBtn).on('click', function () {

    // Return an alert if there are no orders.
    if (orders.length === 0) return alert('No orders to cut.');
    const filteredOrders = filterOrdersByDiameter(orders);
    createTablesByDiameter(filteredOrders);

    // Show the print button & completed orders table.
    $('#cutsTable').show();
    $('#cutsTableBtns').show();
})

// On 'Trash can' clicked:
$(document).on('click', '.deleteOrderBtn', function () {

    // Get the order ID from the parent element.
    const orderToDelete = $(this).parent().attr('orderId');

    // Remove the order from the orders array.
    orders.splice(orderToDelete, 1);

    // Remove the order row element.
    $(this).parent().remove();
});

// On 'CLEAR ORDERS' clicked:
$(clearOrdersBtn).on('click', function () {

    // Empty the orders array.
    deleteAllOrders();

    // Empty the orders table.
    $(ordersTableBody).empty();
});

// On 'CLEAR CUTS' Clicked:
$('#clearCutsTable').on('click', function () {

    //Empty Cuts Table
    $(cutsTables).empty();

    //Reset Order Form
    $(orderForm).trigger('reset');

    //Set Focus on Word Order Field
    $('#workOrder').focus();

    //Hide Print & Clear Cuts btns 
    $('#cutsTableBtns').hide();
    
})
//============================
// FUNCTIONS
//============================
function deleteAllOrders() {
    orders.length = 0;
}

function resetOrderForm() {

    // Store the selected diameter option before resetting the form.
    const previousDiameter = $(diameterDropdown).val();

    // Reset the order form.
    $(orderForm).trigger('reset');

    // Set the diameter dropdown to the previous order diameter option.
    $(diameterDropdown).val(previousDiameter);

    // Set focus back to Work Order field.
    $('#workOrder').focus();
}

function addOrder(order) {
    orders.push(order);
}

function updateOrdersTable() {

    // Reset the orders table.
    $(ordersTableBody).empty();

    // Add each order to the orders table.
    orders.forEach(order => {
        let newOrderRow = createOrderRow(order);
        $(ordersTableBody).append(newOrderRow);
    });
}

function createOrderRow(order) {

    // Create row and data elements.
    const trRow = $('<tr>').attr('orderId', order.id);
    const tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);
    const tdShaftDiameter = $('<td>').text(order.diameter);
    const tdShaftQuantity = $('<td>').text(order.quantity);
    const tdShaftLength = $('<td>').text(order.length);
    const tdStressProof = $('<td>').text(order.stressProof);

    // Delete button and icon.
    const deleteBtn = $('<button>').addClass('btn deleteOrderBtn mt-1');
    const deleteIcon = $('<i>').addClass('fas fa-trash');

    // Add the icon to the delete button.
    $(deleteBtn).append(deleteIcon);

    // Append data elements and delete button to the row.
    $(trRow).append(
        tdWorkOrderNumber,
        tdShaftDiameter,
        tdShaftLength,
        tdShaftQuantity,
        tdStressProof,
        deleteBtn
    );

    return trRow;
}

function filterOrdersByDiameter(orders) {
    let d150 = [];
    let d175 = [];
    let d200 = [];
    let d225 = [];
    let d250 = [];
    let d300 = [];
    let d150sp = [];
    let d175sp = [];
    let d200sp = [];
    let d225sp = [];
    let d250sp = [];
    let d300sp = [];

    orders.forEach(order => {
        switch (order.diameter) {
            case 1.5:
                if (order.stressProof === "Y")
                    d150sp.push(order);
                else
                    d150.push(order);
                break;
            case 1.75:
                if (order.stressProof === "Y")
                    d175sp.push(order);
                else
                    d175.push(order);
                break;
            case 2:
                if (order.stressProof === "Y")
                    d200sp.push(order);
                else
                    d200.push(order);
                break;
            case 2.25:
                if (order.stressProof === "Y")
                    d225sp.push(order);
                else
                    d225.push(order);
                break;
            case 2.50:
                if (order.stressProof === "Y")
                    d250sp.push(order);
                else
                    d250.push(order);
                break;
            case 3:
                if (order.stressProof === "Y")
                    d300sp.push(order);
                else
                    d300.push(order);
                break;
            default:
                break;
        }
    });

    return [d150, d175, d200, d225, d250, d300, d150sp, d175sp, d200sp, d225sp, d250sp, d300sp];
}

// TODO: refactor
function createTablesByDiameter(filteredOrders) {

    // Loop through the filtered orders. These are arrays of orders with matching diameters.
    filteredOrders.forEach(filteredOrder => {

        // If array length > 0 ... not to be confused with ordered shaft length.
        if (filteredOrder.length > 0) {
            let tableHeading = $(`<h4>${filteredOrder[0].diameter}" ${filteredOrder[0].stressProof === "Y" ? " - Stressproof" : ""}</h4>`);
            let table = $('<table>').addClass('table table-striped mt-2');
            let tableHeader = $(`\r
            <thead>
                <tr>
                    <th scope="col">Stick #</th>
                    <th scope="col">Cut 1</th>
                    <th scope="col">Cut 2</th>
                    <th scope="col">Cut 3</th>
                    <th scope="col">Cut 4</th>
                    <th scope="col">Cut 5</th>
                    <th scope="col">Cut 6</th>
                    <th scope="col">Drop</th>
                </tr>
            </thead>`);

            // Build the table of optimized cuts for the current diameter.
            let tableBody = $('<tbody>');
            let sticksToAdd = calculateCuts(filteredOrder);
            addSticksToTable(tableBody, sticksToAdd);
            $(table).append(tableHeader, tableBody);
            $(cutsTables).append(tableHeading, table);
        }
    })
}

function addSticksToTable(table, sticksToCut) {
    let stickDrop = 0;
    let totalYield = 0;
    let reusableMaterial = [];

    sticksToCut.forEach((stick, index) => {

        // Create the stick row, append the stick number.
        let row = $('<tr>').append(`<td>${index + 1}</td>`);

        // Add each cut to the row. Cuts that do not exist (i.e. if stick[4] == undefined),
        // a dash is used to indicate no cut.
        for (let i = 0; i < 6; i++) {
            $(row).append($(`<td>${(stick[i] == undefined) ? '-' : stick[i]}</td>`));
        }

        // Create the stick drop data element.
        let tdDrop = $(`<td>${calculateStickDrop(stick)}</td>`);
        stickDrop += calculateStickDrop(stick);
        if (calculateStickDrop(stick) > 48) reusableMaterial.push(calculateStickDrop(stick));

        // Add the stick drop to the row.
        $(row).append(tdDrop);

        // Add the row to the table.
        $(table).append(row);

    });

    totalYield = (1 - (stickDrop / (sticksToCut.length * 240))) * 100;
    let statString = `Yield: ~${parseFloat(totalYield).toFixed(0)}%`;
    $(table).append(`<p>${statString}</p>`);
}

function calculateStickDrop(stick) {
    let drop = 240;
    stick.forEach(cut => drop -= cut);
    return drop;
}
