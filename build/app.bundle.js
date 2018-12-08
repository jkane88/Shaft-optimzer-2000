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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.orders = undefined;\n\nvar _orderEntryForm = __webpack_require__(/*! ./orderEntryForm */ \"./src/orderEntryForm.js\");\n\nvar _enteredOrdersTable = __webpack_require__(/*! ./enteredOrdersTable */ \"./src/enteredOrdersTable.js\");\n\nvar _print = __webpack_require__(/*! ./print */ \"./src/print.js\");\n\nvar orders = exports.orders = [];\n\n_orderEntryForm.orderEntryForm.init();\n_enteredOrdersTable.enteredOrdersTable.init();\n_print.print.init();\n\n/**\r\n * ! Initialization:\r\n * ! This function is called immediately on load.\r\n */\n(function init() {\n    $('#workOrder').focus();\n    $('#cutsTable').hide();\n    $('#cutsTableBtns').hide();\n    $('#completedOrdersTable').hide();\n})();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/cutsTable.js":
/*!**************************!*\
  !*** ./src/cutsTable.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.addSticksToTable = addSticksToTable;\n/**\r\n * Takes an array of sticks and adds them to a given table.\r\n *\r\n * @param {*} table HTML table element.\r\n * @param {Array} sticksToCut Array of sticks to cut. Each stick should contain an array of cuts.\r\n */\nfunction addSticksToTable(table, sticksToCut) {\n    sticksToCut.forEach(function (stick, index) {\n        // Create the stick row, append the stick number.\n        var row = $('<tr>').append('<td>' + (index + 1) + '</td>');\n\n        // Add each cut to the row. Cuts that do not exist (i.e. if stick[4] == undefined),\n        // a dash is used to indicate no cut.\n        for (var i = 0; i < 6; i++) {\n            $(row).append($('<td>' + (stick[i] == undefined ? '-' : stick[0]) + '</td>'));\n        }\n\n        // Create the stick drop data element.\n        var tdDrop = $('<td>' + calculateStickDrop(stick) + '</td>');\n\n        // Add the stick drop to the row.\n        $(row).append(tdDrop);\n\n        // Add the row to the table.\n        $(table).append(row);\n    });\n}\n\n/**\r\n * Takes a stick and returns the total drop based on the stick's cuts.\r\n *\r\n * @param {Object} stick\r\n * @returns Total drop amount in inches for the given stick.\r\n */\nfunction calculateStickDrop(stick) {\n    var drop = 240;\n    stick.forEach(function (cut) {\n        return drop -= cut;\n    });\n    return drop;\n}\n\n//# sourceURL=webpack:///./src/cutsTable.js?");

/***/ }),

/***/ "./src/enteredOrdersTable.js":
/*!***********************************!*\
  !*** ./src/enteredOrdersTable.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n            value: true\n});\nexports.enteredOrdersTable = undefined;\n\nvar _app = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\nvar _optimizer = __webpack_require__(/*! ./optimizer */ \"./src/optimizer.js\");\n\nvar _cutsTable = __webpack_require__(/*! ./cutsTable */ \"./src/cutsTable.js\");\n\nvar enteredOrdersTable = exports.enteredOrdersTable = {\n            init: function init() {\n                        $('#makeCuts').on('click', function (e) {\n\n                                    // Prevent the form from submitting on click.\n                                    e.preventDefault();\n\n                                    // Return an alert if there are no orders.\n                                    if (_app.orders.length === 0) return alert('No orders to cut.');\n\n                                    var cutsTable = $('#cutOrder');\n                                    var sticksToCut = (0, _optimizer.calculateCuts)(_app.orders);\n\n                                    // Empties the cuts table of any previously calculated cuts.\n                                    $('#cutOrder').empty();\n\n                                    // Populate the cuts table.\n                                    (0, _cutsTable.addSticksToTable)(cutsTable, sticksToCut);\n\n                                    // Show the print button & completed orders table.\n                                    $('#cutsTable').show();\n                                    $('#cutsTableBtns').show();\n                        });\n\n                        // Delete a single order\n                        $(document).on('click', '.deleteOrderBtn', function () {\n\n                                    // Get the order ID from the parent element.\n                                    var orderToDelete = $(this).parent().attr('orderId');\n\n                                    // Remove the order from the orders array.\n                                    _app.orders.splice(orderToDelete, 1);\n\n                                    // Remove the order row element.\n                                    $(this).parent().remove();\n                        });\n\n                        // Delete all orders\n                        $('#clearOrders').on('click', function (e) {\n\n                                    // Prevent the form from submitting on click.\n                                    e.preventDefault();\n\n                                    // Empty the orders array.\n                                    _app.orders.length = 0;\n\n                                    // Empty the orders table.\n                                    $('#shaftOrders').empty();\n                        });\n            },\n\n            /**\r\n             * Takes a single order object, put the order info into a row, and adds the row to a given table.\r\n             *\r\n             * @param {*} table HTML table element to add the row to.\r\n             * @param {Object} order Object. Must contain id, workOrderNumber, diameter, length and quantity key/values.\r\n             */\n            addOrderRowToTable: function addOrderRowToTable(table, order) {\n                        // Create row and data elements.\n                        var trRow = $('<tr>').attr('orderId', order.id);\n                        var tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);\n                        var tdShaftDiameter = $('<td>').text(order.diameter);\n                        var tdShaftLength = $('<td>').text(order.length);\n                        var tdShaftQuantity = $('<td>').text(order.quantity);\n\n                        // Delete button and icon.\n                        var deleteBtn = $('<button>').addClass('btn deleteOrderBtn mt-1');\n                        var deleteIcon = $('<i>').addClass('fas fa-trash');\n\n                        // Add the icon to the delete button.\n                        $(deleteBtn).append(deleteIcon);\n\n                        // Append data elements and delete button to the row.\n                        $(trRow).append(tdWorkOrderNumber, tdShaftDiameter, tdShaftLength, tdShaftQuantity, deleteBtn);\n\n                        // Append the completed row to the table.\n                        $(table).append(trRow);\n            }\n};\n\n//# sourceURL=webpack:///./src/enteredOrdersTable.js?");

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

/***/ "./src/orderEntryForm.js":
/*!*******************************!*\
  !*** ./src/orderEntryForm.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n            value: true\n});\nexports.orderEntryForm = undefined;\n\nvar _app = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\nvar _enteredOrdersTable = __webpack_require__(/*! ./enteredOrdersTable */ \"./src/enteredOrdersTable.js\");\n\nvar orderEntryForm = exports.orderEntryForm = {\n            init: function init() {\n                        $('#submitOrder').on('click', function (e) {\n                                    // Prevent the form from submitting on click.\n                                    e.preventDefault();\n\n                                    // Create the order object from input values.\n                                    var order = {\n                                                id: _app.orders.length, // Order ID becomes the last index in the orders array.\n                                                workOrderNumber: $('#workOrder').val().trim(),\n                                                diameter: parseFloat($('#shaftDiameter').val().trim()),\n                                                length: parseFloat($('#shaftLength').val().trim()),\n                                                quantity: parseFloat($('#shaftQty').val().trim())\n                                    };\n\n                                    // Add the new order to the orders array.\n                                    _app.orders.push(order);\n\n                                    // Add the new order to the orders table.\n                                    var ordersTable = $('#shaftOrders');\n                                    _enteredOrdersTable.enteredOrdersTable.addOrderRowToTable(ordersTable, order);\n\n                                    // Reset the order form.\n                                    $('#orderForm').trigger('reset');\n\n                                    // Set the diameter dropdown to the previous order diameter.\n                                    // We do this because of the form reset above.\n                                    $('#shaftDiameter').val(order.diameter);\n\n                                    // Set focus back to Work Order field.\n                                    $('#workOrder').focus();\n                        });\n            }\n};\n\n//# sourceURL=webpack:///./src/orderEntryForm.js?");

/***/ }),

/***/ "./src/print.js":
/*!**********************!*\
  !*** ./src/print.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar print = exports.print = {\n    init: function init() {\n        $('#printBtn').on('click', function () {\n\n            // TODO: Build the page header. Reference below:\n            // let header = '<h4>';\n            // header += `Total stick: ${sticks.length * 240} (${sticks.length} sticks) | `;\n            // header += `Total drop: ${totalDrop} | `;\n            // header += `Yield: ${ Math.floor((1 - (totalDrop / (sticks.length * 240))) * 100)}%`;\n            // header += '</h4>';\n\n            // Triggers a print preview only for the cutsTable element, with the above header.\n            $('#cutsTable, #enteredOrdersTable').printThis({\n                header: null,\n                beforePrint: function beforePrint() {\n                    $('#enteredOrdersTable').find('th:last-child').hide();\n                    $('#enteredOrdersTable').find('button').hide();\n                    $('#enteredOrdersTable').addClass('mb-5');\n                },\n                afterPrint: function afterPrint() {\n                    $('#enteredOrdersTable').find('th:last-child').show();\n                    $('#enteredOrdersTable').find('button').show();\n                }\n            });\n        });\n    }\n};\n\n//# sourceURL=webpack:///./src/print.js?");

/***/ })

/******/ });