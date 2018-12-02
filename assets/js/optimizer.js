const maxShaftLength = 240;
const orders = require('./orders');
let sticks = [];
let lengths = [];
let currentStick = [];
let totalLengthOfCuts = 0;

// Console title
console.clear();
console.log('-'.repeat(30));
console.log('  SHAFT CALCULATOR');
console.log('-'.repeat(30) + '\n');
console.log('Orders:\n', orders)
console.log();

// Add order lengths into their own array
orders.forEach(order => {
    for (let i = 0; i < order.q; i++) {
        lengths.push(order.l);
    }
});

// Sort lengths from longest to shortest
lengths.sort(function (a, b) {
    return b - a
});

console.log('Cuts to make: ', lengths);
console.log('Total: ', lengths.length)
console.log('-'.repeat(30) + '\n');

for (let i = 0; i < lengths.length; i++) {
    if ((totalLengthOfCuts + lengths[i]) < maxShaftLength) {

        totalLengthOfCuts += lengths[i];

        currentStick.push(lengths[i]);

    } else {

        sticks.push(currentStick);
        console.log('Current stick: ', currentStick)

        console.log(`The next length (${lengths[i]}) exceeds max shaft length (240). Moving to next stick...`)
        console.log()

        // RESET
        currentStick = [];
        totalLengthOfCuts = 0;
        i--;
    }
}

console.log('-'.repeat(30) + '\n');
console.log('All sticks: ', sticks);
