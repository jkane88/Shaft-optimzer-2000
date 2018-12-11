export const print = {
    init: () => {
        $('#printBtn').on('click', function (e) {

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
