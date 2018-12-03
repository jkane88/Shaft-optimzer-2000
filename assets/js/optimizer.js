const maxShaftLength = 240;
const orders = require('./orders');
let sticks = [];
let cuts = [];
let currentStick = [];
let totalLengthOfCuts = 0;

// Console title
console.clear();
console.log('-'.repeat(30));
console.log('  SHAFT CALCULATOR');
console.log('-'.repeat(30) + '\n');
console.log('Orders:\n', orders);
console.log();

// Add order lengths into their own array
// orders.forEach(order => {
//     for (let i = 0; i < order.q; i++) {
//         cuts.push(order.l);
//     }
// });

// Sort lengths from longest to shortest
// cuts.sort(function (a, b) {
//     return b - a
// });

console.log()
console.log('-'.repeat(30) + '\n');

//--------------------------------------

console.log('Diameter: ', orders[0].d);
orders.forEach(order => {
    for (let i = 0; i < order.q; i++) {
        cuts.push(order.l);
    }
});

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

        let drop = 240;
        sticks.push(currentStick);
        currentStick.forEach(cut => drop -= cut);

        console.log('Current stick: ', currentStick, 'stick drop: ', drop);

        // RESET
        drop = 0;
        currentStick = [];
        totalLengthOfCuts = 0;
        if (i++ !== cuts.length) i -= 2;
    }
}


console.log('\n' + '-'.repeat(30) + '\n');

