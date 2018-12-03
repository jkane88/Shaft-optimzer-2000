let orders = [];
let orderId = 0;

$('#submitOrder').on('click', function (e) {
    e.preventDefault();

    const workOrder = $('#workOrder').val();
    const shaftDiameter = $('#shaftDiameter').val();
    const shaftLength = $('#shaftLength').val();
    const shaftQty = $('#shaftQty').val();

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
            <td><button class="deleteOrderBtn" orderId=${orderId}>X</button></td>
        </tr>
    `);

    $('#orderForm').trigger('reset');
});

$('#makeCuts').on('click', function (e) {
    e.preventDefault();

    let sticks = calculateCuts(orders);
    let totalDrop = 0;

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

});

$(document).on('click', '.deleteOrderBtn', function() {
    let orderToDelete = $(this).attr('orderId');
    $(this).parent().parent().remove();
})

const maxShaftLength = 240;
let sticks = [];
let cuts = [];
let currentStick = [];
let totalLengthOfCuts = 0;
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

function calculateStickDrop (stick) {
    let drop = 240;
    stick.forEach(cut => drop -= cut);
    return drop;
}