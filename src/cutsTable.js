import { calculateCuts } from './optimizer';

export const cutsTable = {

    createTablesByDiameter: (filteredOrders) => {

        // TODO: refactor & document
        filteredOrders.forEach(filteredOrder => {
            console.log(filteredOrder)
            if (filteredOrder.length > 0) {
                let tableHeading = $(`<h4>${filteredOrder[0].diameter}"</h4>`);
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

                let tableBody = $('<tbody>');
                let sticksToAdd = calculateCuts(filteredOrder);
                console.log(sticksToAdd)
                cutsTable.addSticksToTable(tableBody, sticksToAdd);

                $(table).append(tableHeader, tableBody);
                $('#cutsTable').append(tableHeading, table);
            }
        });
    },

    /**
     * Takes an array of sticks and adds them to a given table.
     *
     * @param {*} table HTML table element.
     * @param {Array} sticksToCut Array of sticks to cut. Each stick should contain an array of cuts.
     */
    addSticksToTable: (table, sticksToCut) => {
        sticksToCut.forEach((stick, index) => {
            // Create the stick row, append the stick number.
            let row = $('<tr>').append(`<td>${index + 1}</td>`);

            // Add each cut to the row. Cuts that do not exist (i.e. if stick[4] == undefined),
            // a dash is used to indicate no cut.
            for (let i = 0; i < 6; i++) {
                $(row).append($(`<td>${(stick[i] == undefined) ? '-':stick[i]}</td>`));
            }

            // Create the stick drop data element.
            let tdDrop = $(`<td>${calculateStickDrop(stick)}</td>`);

            // Add the stick drop to the row.
            $(row).append(tdDrop);

            // Add the row to the table.
            $(table).append(row);
        });
    }
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