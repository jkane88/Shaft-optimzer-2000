/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _optimizer = __webpack_require__(/*! ./optimizer */ \"./src/optimizer.js\");\n\nvar _print = __webpack_require__(/*! ./print */ \"./src/print.js\");\n\n_print.print.init();\n\n//============================\n// GLOBAL VARIABLES\n//============================\nvar orders = [];\n\n//============================\n// UI ELEMENTS\n//============================\nvar submitOrderBtn = $('#submitOrder');\nvar ordersTableBody = $('#shaftOrders');\nvar orderForm = $('#orderForm');\nvar diameterDropdown = $('#shaftDiameter');\nvar clearOrdersBtn = $('#clearOrders');\nvar makeCutsBtn = $('#makeCuts');\nvar cutsTables = $('#cutsTable');\n\n//============================\n// INITIALIZATION\n//============================\n// ! This function is called immediately on load\n(function init() {\n\n    // Set focus to the order entry form for improved UX.\n    $('#workOrder').focus();\n\n    // Hide irrelevant elements. These are shown when they're needed.\n    $('#cutsTable').hide();\n    $('#cutsTableBtns').hide();\n    $('#completedOrdersTable').hide();\n})();\n\n//============================\n// EVENT LISTENERS\n//============================\n\n$(submitOrderBtn).on('click', function (e) {\n\n    // Prevent the form from reloading the page.\n    e.preventDefault();\n\n    // Create the order object from the form inputs.\n    var order = {\n        id: orders.length, // Order ID becomes the last index in the orders array.\n        workOrderNumber: $('#workOrder').val().trim(),\n        diameter: parseFloat($('#shaftDiameter').val().trim()),\n        length: parseFloat($('#shaftLength').val().trim()),\n        quantity: parseFloat($('#shaftQty').val().trim())\n    };\n\n    addOrder(order);\n    updateOrdersTable();\n    resetOrderForm();\n});\n\n// On 'MAKE CUTS' clicked:\n$(makeCutsBtn).on('click', function () {\n\n    // Return an alert if there are no orders.\n    if (orders.length === 0) return alert('No orders to cut.');\n\n    var filteredOrders = filterOrdersByDiameter(orders);\n    createTablesByDiameter(filteredOrders);\n\n    // Show the print button & completed orders table.\n    $('#cutsTable').show();\n    $('#cutsTableBtns').show();\n});\n\n// On 'Trash can' clicked:\n$(document).on('click', '.deleteOrderBtn', function () {\n\n    // Get the order ID from the parent element.\n    var orderToDelete = $(this).parent().attr('orderId');\n\n    // Remove the order from the orders array.\n    orders.splice(orderToDelete, 1);\n\n    // Remove the order row element.\n    $(this).parent().remove();\n});\n\n// On 'CLEAR ORDERS' clicked:\n$(clearOrdersBtn).on('click', function () {\n\n    // Empty the orders array.\n    deleteAllOrders();\n\n    // Empty the orders table.\n    $(ordersTableBody).empty();\n});\n\n//============================\n// FUNCTIONS\n//============================\nfunction deleteAllOrders() {\n    orders.length = 0;\n}\n\nfunction resetOrderForm() {\n\n    // Store the selected diameter option before resetting the form.\n    var previousDiameter = $(diameterDropdown).val();\n\n    // Reset the order form.\n    $(orderForm).trigger('reset');\n\n    // Set the diameter dropdown to the previous order diameter option.\n    $(diameterDropdown).val(previousDiameter);\n\n    // Set focus back to Work Order field.\n    $('#workOrder').focus();\n}\n\nfunction addOrder(order) {\n    orders.push(order);\n}\n\nfunction updateOrdersTable() {\n\n    // Reset the orders table.\n    $(ordersTableBody).empty();\n\n    // Add each order to the orders table.\n    orders.forEach(function (order) {\n        var newOrderRow = createOrderRow(order);\n        $(ordersTableBody).append(newOrderRow);\n    });\n}\n\nfunction createOrderRow(order) {\n\n    // Create row and data elements.\n    var trRow = $('<tr>').attr('orderId', order.id);\n    var tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);\n    var tdShaftDiameter = $('<td>').text(order.diameter);\n    var tdShaftQuantity = $('<td>').text(order.quantity);\n    var tdShaftLength = $('<td>').text(order.length);\n\n    // Delete button and icon.\n    var deleteBtn = $('<button>').addClass('btn deleteOrderBtn mt-1');\n    var deleteIcon = $('<i>').addClass('fas fa-trash');\n\n    // Add the icon to the delete button.\n    $(deleteBtn).append(deleteIcon);\n\n    // Append data elements and delete button to the row.\n    $(trRow).append(tdWorkOrderNumber, tdShaftDiameter, tdShaftLength, tdShaftQuantity, deleteBtn);\n\n    // Return the completed row element;\n    return trRow;\n}\n\nfunction filterOrdersByDiameter(orders) {\n    var d175 = [];\n    var d200 = [];\n    var d225 = [];\n    var d250 = [];\n\n    orders.forEach(function (order) {\n        switch (order.diameter) {\n            case 1.75:\n                d175.push(order);\n                break;\n            case 2:\n                d200.push(order);\n                break;\n            case 2.25:\n                d225.push(order);\n                break;\n            case 2.50:\n                d250.push(order);\n                break;\n\n            default:\n                break;\n        }\n    });\n\n    return [d175, d200, d225, d250];\n}\n\n// TODO: refactor\nfunction createTablesByDiameter(filteredOrders) {\n\n    // Loop through the filtered orders. These are arrays of orders with matching diameters.\n    filteredOrders.forEach(function (filteredOrder) {\n\n        // If array length > 0 ... not to be confused with ordered shaft length.\n        if (filteredOrder.length > 0) {\n            var tableHeading = $('<h4>' + filteredOrder[0].diameter + '\"</h4>');\n            var table = $('<table>').addClass('table table-striped mt-2');\n            var tableHeader = $('\\r\\n            <thead>\\n                <tr>\\n                    <th scope=\"col\">Stick #</th>\\n                    <th scope=\"col\">Cut 1</th>\\n                    <th scope=\"col\">Cut 2</th>\\n                    <th scope=\"col\">Cut 3</th>\\n                    <th scope=\"col\">Cut 4</th>\\n                    <th scope=\"col\">Cut 5</th>\\n                    <th scope=\"col\">Cut 6</th>\\n                    <th scope=\"col\">Drop</th>\\n                </tr>\\n            </thead>');\n\n            // Build the table of optimized cuts for the current diameter.\n            var tableBody = $('<tbody>');\n            var sticksToAdd = (0, _optimizer.calculateCuts)(filteredOrder);\n            addSticksToTable(tableBody, sticksToAdd);\n            $(table).append(tableHeader, tableBody);\n            $(cutsTables).append(tableHeading, table);\n        }\n    });\n}\n\nfunction addSticksToTable(table, sticksToCut) {\n    var stickDrop = 0;\n    var totalYield = 0;\n    var reusableMaterial = [];\n\n    sticksToCut.forEach(function (stick, index) {\n\n        // Create the stick row, append the stick number.\n        var row = $('<tr>').append('<td>' + (index + 1) + '</td>');\n\n        // Add each cut to the row. Cuts that do not exist (i.e. if stick[4] == undefined),\n        // a dash is used to indicate no cut.\n        for (var i = 0; i < 6; i++) {\n            $(row).append($('<td>' + (stick[i] == undefined ? '-' : stick[i]) + '</td>'));\n        }\n\n        // Create the stick drop data element.\n        var tdDrop = $('<td>' + calculateStickDrop(stick) + '</td>');\n        stickDrop += calculateStickDrop(stick);\n        if (calculateStickDrop(stick) > 48) reusableMaterial.push(calculateStickDrop(stick));\n\n        // Add the stick drop to the row.\n        $(row).append(tdDrop);\n\n        // Add the row to the table.\n        $(table).append(row);\n    });\n\n    totalYield = (1 - stickDrop / (sticksToCut.length * 240)) * 100;\n    var statString = 'Yield: ~' + parseFloat(totalYield).toFixed(0) + '%';\n    $(table).append('<p>' + statString + '</p>');\n}\n\nfunction calculateStickDrop(stick) {\n    var drop = 240;\n    stick.forEach(function (cut) {\n        return drop -= cut;\n    });\n    return drop;\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/optimizer.js":
/*!**************************!*\
  !*** ./src/optimizer.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.calculateCuts = calculateCuts;\n/**\r\n * Takes an array of orders, sorts them, and calculates the optimal cuts to make\r\n * to minimize drop.\r\n *\r\n * @param {Array} ordersToCut\r\n * @returns Array of optimized sticks/cuts.\r\n */\nfunction calculateCuts(ordersToCut) {\n    var maxShaftLength = 240; // Shaft length in inches.\n    var sticks = []; // The array of optimized sticks.\n    var cuts = []; // The array of cuts that will be added to each stick.\n    var totalLengthOfCuts = 0; // This get accumulated with each cut and compared against maxShaftLength.\n    var currentStick = []; // The array of cuts to make on the current stick.\n\n    // Get the cut lengths from each order,\n    // then put each cut into the cuts array.\n    ordersToCut.forEach(function (order) {\n        for (var i = 0; i < order.quantity; i++) {\n            cuts.push(order.length);\n        }\n    });\n\n    // Sort lengths from longest to shortest. (Setup for greedy method)\n    cuts.sort(function (a, b) {\n        return b - a;\n    });\n\n    // Algorithm steps:\n    // 1. Run through each cut, starting from the longest length.\n    // 2. If the next cut in the sequence **DOES NOT exceed** the max shaft length...\n    //      - Add the cut to the current stick. Move to next cut in the sequence.\n    // 3. If the next cut in the sequence **DOES exceed** the max shaft length...\n    //      - Try to find a shorter cut from the remaining cuts to minimize stick drop...\n    //          - On success: go to 2 with current stick.\n    //          - On failure: Add the current stick to the array of sticks. Go to 2 with a new stick, reset counters.\n    // 4. Return the array of sticks, each stick has an array of optimal cuts.\n\n    // Step 1:\n    for (var i = 0; i <= cuts.length; i++) {\n\n        // Step 2:\n        if (totalLengthOfCuts + cuts[i] < maxShaftLength) {\n            totalLengthOfCuts += cuts[i];\n            currentStick.push(cuts[i]);\n        } else {\n\n            // Step 3 (forward-looking):\n            for (var j = i; j < cuts.length; j++) {\n                if (totalLengthOfCuts + cuts[j] < maxShaftLength) {\n\n                    // Step 3 success:\n                    totalLengthOfCuts += cuts[j];\n                    currentStick.push(cuts[j]);\n                    cuts.splice(j, 1);\n                }\n            }\n\n            // Step 3 failure:\n            sticks.push(currentStick);\n            currentStick = []; // Reset\n            totalLengthOfCuts = 0; // Reset\n\n            // If next iteration goes out of range, rollback iterator.\n            // **This is required to ensure all cuts are included.\n            if (i++ !== cuts.length) i -= 2;\n        }\n    }\n\n    // Return the array of optimized sticks/cuts.\n    return sticks;\n}\n\n//# sourceURL=webpack:///./src/optimizer.js?");

/***/ }),

/***/ "./src/print.js":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar print = exports.print = {\n    init: function init() {\n        $('#printBtn').on('click', function (e) {\n\n            // Triggers a print preview only for the cutsTable element, with the above header.\n            $('#cutsTable, #enteredOrdersTable').printThis({\n                header: null,\n                beforePrint: function beforePrint() {\n                    $('#enteredOrdersTable').find('th:last-child').hide();\n                    $('#enteredOrdersTable').find('button').hide();\n                    $('#enteredOrdersTable').addClass('mb-5');\n                },\n                afterPrint: function afterPrint() {\n                    $('#enteredOrdersTable').find('th:last-child').show();\n                    $('#enteredOrdersTable').find('button').show();\n                }\n            });\n        });\n    }\n};\n\n//# sourceURL=webpack:///./src/print.js?");

/***/ })

/******/ });