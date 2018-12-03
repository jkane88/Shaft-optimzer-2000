// TODO: refactor
// TODO: reset Cuts table before loading new cuts

const maxShaftLength = 240;
let orders = [];
let orderId = 0;
let totalDrop = 0;
let sticks = [];
let cuts = [];
let currentStick = [];
let totalLengthOfCuts = 0;

// Hide the print button on page load
$('#printBtn').hide();

$('#printBtn').on('click', function () {
    $('#cutsTable').css('margin-top', '100px').printThis({
        header: `
        <h4>Total stick: ${sticks.length * 240} (${sticks.length} sticks) |
        Total drop: ${totalDrop} |
        Yield: ${ Math.floor((1 - (totalDrop / (sticks.length * 240))) * 100) }%</h4>
        `
    });
});

$('#submitOrder').on('click', function (e) {
    e.preventDefault();

    let workOrder = $('#workOrder').val();
    const shaftDiameter = $('#shaftDiameter').val();
    const shaftLength = $('#shaftLength').val();
    const shaftQty = $('#shaftQty').val();

    if (!workOrder) workOrder = '-';

    orders.push({
        o: workOrder,
        d: shaftDiameter,
        l: parseFloat(shaftLength),
        q: parseFloat(shaftQty)
    });

    orderId++;

    $('#shaftOrders').append(`
        <tr orderId=${orderId}>
            <td>${workOrder}</td>
            <td>${shaftDiameter}</td>
            <td>${shaftLength}</td>
            <td>${shaftQty}</td>
            <td>
                <button class="btn deleteOrderBtn" orderId=${orderId}>
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `);

    $('#orderForm').trigger('reset');
});

$('#makeCuts').on('click', function (e) {
    e.preventDefault();

    let sticks = calculateCuts(orders);
    totalDrop = 0;

    sticks.forEach((stick, index) => {
        let row = $('<tr>').append(`<td>${index + 1}</td>`)

        stick.forEach((cut, index) => {
            let td = $(`<td> ${cut}</td>`);
            $(row).append(td);
        });

        if (stick.length < 4) {
            for (let i = 0; i < 4 - stick.length; i++) {
                $(row).append('<td>-</td>');
            }
        }

        let stickDrop = calculateStickDrop(stick);
        totalDrop += stickDrop;
        $(row).append(`<td>${stickDrop}</td>`)
        $('#cutOrder').append(row);
    });

    $('#totalDrop').text(`Total drop: ${totalDrop}`);

    // Show the print button
    $('#printBtn').show();
});

$(document).on('click', '.deleteOrderBtn', function () {
    let orderToDelete = $(this).attr('orderId');
    $(this).parent().parent().remove();
});

function calculateCuts(ordersToCut) {

    ordersToCut.forEach(order => {
        for (let i = 0; i < order.q; i++) {
            cuts.push(order.l);
        }
    });

    // Sort lengths from longest to shortest
    cuts.sort(function (a, b) {
        return b - a
    });

    for (let i = 0; i <= cuts.length; i++) {
        if ((totalLengthOfCuts + cuts[i]) < maxShaftLength) {
            totalLengthOfCuts += cuts[i];
            currentStick.push(cuts[i]);
        } else {

            // Find next best cut
            for (let j = i; j < cuts.length; j++) {
                if (totalLengthOfCuts + cuts[j] < maxShaftLength) {
                    totalLengthOfCuts += cuts[j];
                    currentStick.push(cuts[j]);
                    cuts.splice(j, 1);
                }
            }

            sticks.push(currentStick);

            // RESET
            currentStick = [];
            totalLengthOfCuts = 0;
            if (i++ !== cuts.length) i -= 2;
        }
    }

    return sticks;
}

function calculateStickDrop(stick) {
    let drop = 240;
    stick.forEach(cut => drop -= cut);
    return drop;
}