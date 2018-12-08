/**
 * Takes an array of sticks and adds them to a given table.
 *
 * @param {*} table HTML table element.
 * @param {Array} sticksToCut Array of sticks to cut. Each stick should contain an array of cuts.
 */
export function addSticksToTable(table, sticksToCut) {
    sticksToCut.forEach((stick, index) => {
        // Create the stick row, append the stick number.
        let row = $('<tr>').append(`<td>${index + 1}</td>`);

        // Add each cut to the row. Cuts that do not exist (i.e. if stick[4] == undefined),
        // a dash is used to indicate no cut.
        for (let i = 0; i < 6; i++) {
            $(row).append($(`<td>${(stick[i] == undefined) ? '-':stick[0]}</td>`));
        }

        // Create the stick drop data element.
        let tdDrop = $(`<td>${calculateStickDrop(stick)}</td>`);

        // Add the stick drop to the row.
        $(row).append(tdDrop);

        // Add the row to the table.
        $(table).append(row);
    });
}

/**
 * Takes a stick and returns the total drop based on the stick's cuts.
 *
 * @param {Object} stick
 * @returns Total drop amount in inches for the given stick.
 */
function calculateStickDrop(stick) {
    let drop = 240;
    stick.forEach(cut => drop -= cut);
    return drop;
}
