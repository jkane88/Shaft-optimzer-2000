export const print = {
    init: () => {
        $('#printBtn').on('click', function () {

            // TODO: Build the page header. Reference below:
            // let header = '<h4>';
            // header += `Total stick: ${sticks.length * 240} (${sticks.length} sticks) | `;
            // header += `Total drop: ${totalDrop} | `;
            // header += `Yield: ${ Math.floor((1 - (totalDrop / (sticks.length * 240))) * 100)}%`;
            // header += '</h4>';

            // Triggers a print preview only for the cutsTable element, with the above header.
            $('#cutsTable, #enteredOrdersTable').printThis({
                header: null,
                beforePrint: () => {
                    $('#enteredOrdersTable').find('th:last-child').hide();
                    $('#enteredOrdersTable').find('button').hide();
                    $('#enteredOrdersTable').addClass('mb-5');
                },
                afterPrint: () => {
                    $('#enteredOrdersTable').find('th:last-child').show();
                    $('#enteredOrdersTable').find('button').show();
                }
            });
        });
    }
}
