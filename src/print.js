
export const print = {
    init: () => {
        $('#printBtn').on('click', function (e) {

            // Triggers a print preview only for the cutsTable element, with the above header.
            $('.print-this').printThis({
                importCSS: true,
                importStyle: true,
                loadCSS: "/assets/css/style.css",
                header: "<h1>ORDERS TO CUT</h1>",
                beforePrint: () => {
                    $('#enteredOrdersTable').find('th:last-child').hide();
                    $('#enteredOrdersTable').find('button').hide();
                    $('#enteredOrdersTable').addClass('mb-5');
                    //Style this cursed document 

                },
                afterPrint: () => {
                    $('#enteredOrdersTable').find('th:last-child').show();
                    $('#enteredOrdersTable').find('button').show();
                }
            });
        });
    }
}
