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
eval("\n\n// ! TODO: refactor (IN PROGRESS)\n// TODO: reset Cuts table before loading new cuts\n// TODO: Table Per Diameter if orders are mixed\n// TODO: Require all form inouts and disable \"Enter Orders\" button until complete\n// TODO: show orders that are complete in print form\n// TODO: Allow for more than 4 cuts (dynamically create cut table)\n\nvar maxShaftLength = 240;\nvar orders = [];\nvar orderId = 0;\nvar totalDrop = 0;\nvar sticks = [];\nvar cuts = [];\nvar currentStick = [];\nvar totalLengthOfCuts = 0;\n\n// Hide the print button on page load\n$('#printBtn').hide();\n\n// On print button click:\n// $('#printBtn').on('click', function () {\n//     $('#cutsTable').css('margin-top', '100px').printThis({\n//         header: `\n//         <h4>Total stick: ${sticks.length * 240} (${sticks.length} sticks) |\n//         Total drop: ${totalDrop} |\n//         Yield: ${ Math.floor((1 - (totalDrop / (sticks.length * 240))) * 100)}%</h4>\n//         `\n//     });\n\n// });\n\n// On submit order click:\n$('#submitOrder').on('click', function (e) {\n\n    // Prevent the form from submitting on click.\n    e.preventDefault();\n\n    // Create the order object from input values.\n    var order = {\n        id: orderId,\n        workOrderNumber: $('#workOrder').val().trim(),\n        shaftDiameter: parseFloat($('#shaftDiameter').val().trim()),\n        shaftLength: parseFloat($('#shaftLength').val().trim()),\n        shaftQuantity: parseFloat($('#shaftQty').val().trim())\n    };\n\n    // Add the new order to the orders array.\n    orders.push(order);\n\n    orderId++;\n\n    $('#shaftOrders').append(addOrderRow(order));\n\n    // $('#shaftOrders').append(`\n    //     <tr orderId=${orderId}>\n    //         <td>${workOrder}</td>\n    //         <td>${shaftDiameter}</td>\n    //         <td>${shaftLength}</td>\n    //         <td>${shaftQty}</td>\n    //         <td>\n    //             <button class=\"btn deleteOrderBtn\" orderId=${orderId}>\n    //                 <i class=\"fas fa-trash\"></i>\n    //             </button>\n    //         </td>\n    //     </tr>\n    // `);\n\n    $('#orderForm').trigger('reset');\n    $('#shaftDiameter').prop('disabled', true);\n    $('#shaftDiameter').val(shaftDiameter);\n});\n\nfunction addOrderRow(order) {\n\n    // Row element & table data elements.\n    var trRow = $('<tr>').attr('orderId', order.id);\n    var tdWorkOrderNumber = $('<td>').text(order.workOrderNumber);\n    var tdShaftDiameter = $('<td>').text(order.shaftDiameter);\n    var tdShaftLength = $('<td>').text(order.shaftLength);\n    var tdShaftQuantity = $('<td>').text(order.shaftQuantity);\n\n    // Append table data elements to the row.\n    $(trRow).append(tdWorkOrderNumber, tdShaftDiameter, tdShaftLength, tdShaftQuantity);\n\n    // Return the completed row.\n    return trRow;\n}\n\n$('#makeCuts').on('click', function (e) {\n    e.preventDefault();\n    if (orders.length === 0) return;\n    var sticks = calculateCuts(orders);\n    totalDrop = 0;\n\n    sticks.forEach(function (stick, index) {\n        var row = $('<tr>').append('<td>' + (index + 1) + '</td>');\n\n        stick.forEach(function (cut) {\n            var td = $('<td> ' + cut + '</td>');\n            $(row).append(td);\n        });\n\n        if (stick.length < 4) {\n            for (var i = 0; i < 4 - stick.length; i++) {\n                $(row).append('<td>-</td>');\n            }\n        }\n\n        var stickDrop = calculateStickDrop(stick);\n        totalDrop += stickDrop;\n        $(row).append('<td>' + stickDrop + '</td>');\n        $('#cutOrder').append(row);\n    });\n\n    $('#totalDrop').text('Total drop: ' + totalDrop);\n\n    // Show the print button\n    $('#printBtn').show();\n    $('#shaftOrders').empty();\n    // TODO: Fix diameter entry Bug\n    $('#shaftDiameter').prop('disabled', false);\n    resetOrderTable();\n});\n// TODO: Fix Diameter bug after deleting orders\n$(document).on('click', '.deleteOrderB=tn', function () {\n    var orderToDelete = $(this).attr('orderId');\n    $(this).parent().parent().remove();\n    orders.splice(orderToDelete - 1, 1);\n    console.log(orders);\n    if (orders.length === 0) {\n        $('#shaftDiameter').prop('disabled', false);\n    }\n});\n\nfunction calculateCuts(ordersToCut) {\n\n    ordersToCut.forEach(function (order) {\n        for (var i = 0; i < order.q; i++) {\n            cuts.push(order.l);\n        }\n    });\n\n    // Sort lengths from longest to shortest\n    cuts.sort(function (a, b) {\n        return b - a;\n    });\n\n    for (var i = 0; i <= cuts.length; i++) {\n        if (totalLengthOfCuts + cuts[i] < maxShaftLength) {\n            totalLengthOfCuts += cuts[i];\n            currentStick.push(cuts[i]);\n        } else {\n\n            // Find next best cut\n            for (var j = i; j < cuts.length; j++) {\n                if (totalLengthOfCuts + cuts[j] < maxShaftLength) {\n                    totalLengthOfCuts += cuts[j];\n                    currentStick.push(cuts[j]);\n                    cuts.splice(j, 1);\n                }\n            }\n\n            sticks.push(currentStick);\n\n            // RESET\n            currentStick = [];\n            totalLengthOfCuts = 0;\n            if (i++ !== cuts.length) i -= 2;\n        }\n    }\n\n    return sticks;\n}\n\nfunction calculateStickDrop(stick) {\n    var drop = 240;\n    stick.forEach(function (cut) {\n        drop -= cut;\n    });\n    return drop;\n}\n\nfunction resetOrderTable() {\n    orders = [];\n    orderId = 0;\n    sticks = [];\n    cuts = [];\n    currentStick = [];\n}\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });