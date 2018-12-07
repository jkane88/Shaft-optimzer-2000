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
eval("\n\n// TODO----------------------------------------------------------------------------\n//*TODO: refactor (IN PROGRESS)\n// TODO: reset Cuts table before loading new cuts\n// TODO: Table Per Diameter if orders are mixed\n// TODO: Require all form inouts and disable \"Enter Orders\" button until complete\n// TODO: show orders that are complete in print form\n// TODO: Allow for more than 4 cuts (dynamically create cut table)\n// TODO: ---\n// TODO: (HTML) change diameter dropdown to radio buttons? For quicker change\n// TODO----------------------------------------------------------------------------\n\nvar maxShaftLength = 240;\nvar totalDrop = 0;\nvar orders = [];\n\n//============================\n// EVENT HANDLERS\n//============================\n\n/**\n * On 'Enter Order' button clicked:\n */\n$('#submitOrder').on('click', function (e) {\n\n    // Prevent the form from submitting on click.\n    e.preventDefault();\n\n    // Create the order object from input values.\n    var order = {\n        id: orders.length, // Order ID becomes the last index in the orders array.\n        workOrderNumber: $('#workOrder').val().trim(),\n        diameter: parseFloat($('#shaftDiameter').val().trim()),\n        length: parseFloat($('#shaftLength').val().trim()),\n        quantity: parseFloat($('#shaftQty').val().trim())\n    };\n\n    // Add the new order to the orders array.\n    orders.push(order);\n\n    // Add the new order to the orders table.\n    $('#shaftOrders').append(addOrderRow(order));\n\n    // Reset the order form.\n    $('#orderForm').trigger('reset');\n\n    // Set the diameter dropdown to the previous order diameter.\n    // We do this because of the form reset above.\n    $('#shaftDiameter').val(order.diameter);\n});\n\n/**\n * On 'Make Cuts' button clicked:\n */\n$('#makeCuts').on('click', function (e) {\n\n    // Prevent the form from submitting on click.\n    e.preventDefault();\n\n    // Return an alert if there are no orders.\n    if (orders.length === 0) return alert('No orders to cut.');\n\n    // Empties the cuts table of any previously calculated cuts.\n    $('#cutOrder').empty();\n    // TODO: ** refactor down in this function **\n    var sticksToCut = calculateCuts(orders);\n\n    totalDrop = 0;\n    var cutTable = $('#cutOrder');\n    addSticksToTable(cutTable, sticksToCut);\n    showCompletedOrdersTable(orders);\n    $('#completedOrdersTable').show();\n\n    // TODO: remove\n    // sticksToCut.forEach(function (stick, index) {\n    //     let row = $('<tr>').append(`<td>${index + 1}</td>`);\n\n    //     stick.forEach(function (cut) {\n    //         let td = $(`<td> ${cut}</td>`);\n    //         $(row).append(td);\n    //     });\n\n    //     if (stick.length < 4) {\n    //         for (let i = 0; i < 4 - stick.length; i++) {\n    //             $(row).append('<td>-</td>');\n    //         }\n    //     }\n\n    //     let stickDrop = calculateStickDrop(stick);\n    //     totalDrop += stickDrop;\n    //     $(row).append(`<td>${stickDrop}</td>`)\n    //     $('#cutOrder').append(row);\n    // });\n\n    // $('#totalDrop').text(`Total drop: ${totalDrop}`);\n\n    // Show the print button\n    $('#printBtn').show();\n});\n\n// TODO: move down by other functions\nfunction addSticksToTable(table, sticksToCut) {\n    sticksToCut.forEach(function (stick, index) {\n        var row = $('<tr>').append('<td>' + (index + 1) + '</td>');\n\n        // TODO: make dry\n        var cut1 = $('<td>' + (stick[0] == undefined ? '-' : stick[0]) + '</td>');\n        var cut2 = $('<td>' + (stick[1] == undefined ? '-' : stick[1]) + '</td>');\n        var cut3 = $('<td>' + (stick[2] == undefined ? '-' : stick[2]) + '</td>');\n        var cut4 = $('<td>' + (stick[3] == undefined ? '-' : stick[3]) + '</td>');\n        var cut5 = $('<td>' + (stick[4] == undefined ? '-' : stick[4]) + '</td>');\n        var cut6 = $('<td>' + (stick[5] == undefined ? '-' : stick[5]) + '</td>');\n\n        var stickDrop = 0;\n        stick.forEach(function (cut) {\n            return stickDrop += cut;\n        });\n        var drop = $('<td>' + (240 - stickDrop) + '</td>');\n\n        $(row).append(cut1, cut2, cut3, cut4, cut5, cut6, drop);\n\n        $(table).append(row);\n    });\n}\n\n/**\n * On 'Clear Orders' clicked:\n */\n$('#clearOrders').on('click', function (e) {\n\n    // Prevent the form from submitting on click.\n    e.preventDefault();\n\n    // Empty the orders array.\n    orders.length = 0;\n\n    // Empty the orders table.\n    $('#shaftOrders').empty();\n});\n\n/**\n * On 'Clear Cuts' clicked:\n */\n$('#clearCutsTable').on('click', function (e) {\n\n    // Prevent the form from submitting on click.\n    e.preventDefault();\n\n    // TODO: will need to reset stick/current sticks array or something.\n\n    // Empty the orders table.\n    $('#cutsTable').empty();\n});\n\n/**\n * On 'Print' clicked:\n */\n$('#printBtn').on('click', function () {\n\n    // Build the page header.\n    // let header = '<h4>';\n    // header += `Total stick: ${sticks.length * 240} (${sticks.length} sticks) | `;\n    // header += `Total drop: ${totalDrop} | `;\n    // header += `Yield: ${ Math.floor((1 - (totalDrop / (sticks.length * 240))) * 100)}%`;\n    // header += '</h4>';\n\n    // Triggers a print preview only for the cutsTable element, with the above header.\n    $('#cutsTable').printThis();\n});\n\n/**\n * On order delete (trash icon) clicked:\n */\n$(document).on('click', '.deleteOrderBtn', function () {\n\n    // Get the order ID from the parent element.\n    var orderToDelete = $(this).parent().attr('orderId');\n\n    // Remove the order from the orders array.\n    orders.splice(orderToDelete, 1);\n\n    // Remove the row element.\n    $(this).parent().remove();\n});\n\n//============================\n// FUNCTIONS\n//============================\n\nfunction showCompletedOrdersTable(orders) {\n    var table = $('#completedOrders');\n\n    orders.forEach(function (order) {\n        var trRow = $('<tr>').attr('orderId', order.id);\n        var tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);\n        var tdShaftDiameter = $('<td>').text(order.diameter);\n        var tdShaftLength = $('<td>').text(order.length);\n        var tdShaftQuantity = $('<td>').text(order.quantity);\n\n        $(trRow).append(tdWorkOrderNumber, tdShaftDiameter, tdShaftLength, tdShaftQuantity);\n\n        $(table).append(trRow);\n    });\n}\n\nfunction addOrderRow(order) {\n\n    // Row & table data elements.\n    var trRow = $('<tr>').attr('orderId', order.id);\n    var tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);\n    var tdShaftDiameter = $('<td>').text(order.diameter);\n    var tdShaftLength = $('<td>').text(order.length);\n    var tdShaftQuantity = $('<td>').text(order.quantity);\n\n    // Delete button\n    var deleteBtn = $('<button>').addClass('btn deleteOrderBtn');\n    var deleteIcon = $('<i>').addClass('fas fa-trash');\n\n    // Add the icon to the button.\n    $(deleteBtn).append(deleteIcon);\n\n    // Append table data elements and delete button to the row.\n    $(trRow).append(tdWorkOrderNumber, tdShaftDiameter, tdShaftLength, tdShaftQuantity, deleteBtn);\n\n    // Return the completed row element.\n    return trRow;\n}\n\nfunction calculateCuts(ordersToCut) {\n    var sticks = [];\n    var cuts = [];\n    var totalLengthOfCuts = 0;\n    var currentStick = [];\n\n    // Get the cut lengths from each order, store in cuts array.\n    ordersToCut.forEach(function (order) {\n        for (var i = 0; i < order.quantity; i++) {\n            cuts.push(order.length);\n        }\n    });\n\n    // Sort lengths from longest to shortest. (Setup for greedy method)\n    cuts.sort(function (a, b) {\n        return b - a;\n    });\n\n    // TODO: document\n    for (var i = 0; i <= cuts.length; i++) {\n        if (totalLengthOfCuts + cuts[i] < maxShaftLength) {\n            totalLengthOfCuts += cuts[i];\n            currentStick.push(cuts[i]);\n        } else {\n\n            // Find next best cut to make to minimize current stick drop.\n            for (var j = i; j < cuts.length; j++) {\n                if (totalLengthOfCuts + cuts[j] < maxShaftLength) {\n                    totalLengthOfCuts += cuts[j];\n                    currentStick.push(cuts[j]);\n                    cuts.splice(j, 1);\n                }\n            }\n\n            sticks.push(currentStick);\n\n            // Reset.\n            currentStick = [];\n            totalLengthOfCuts = 0;\n            if (i++ !== cuts.length) i -= 2;\n        }\n    }\n\n    // TODO: ? return an object with sticks array AND yield info?\n    return sticks;\n}\n\nfunction calculateStickDrop(stick) {\n    var drop = 240;\n    stick.forEach(function (cut) {\n        return drop -= cut;\n    });\n    return drop;\n}\n\nfunction resetOrders() {\n    [orders, sticks, cuts, currentStick].forEach(function (array) {\n        return array.length = 0;\n    });\n}\n\n/**\n * ! Initialization:\n * ! This function is called immediately on load.\n */\n(function init() {\n\n    $('#printBtn').hide();\n    $('#completedOrdersTable').hide();\n})();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });