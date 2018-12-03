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
console.log('Total: ', lengths.length);
console.log()
console.log('-'.repeat(30) + '\n');

for (let i = 0; i <= lengths.length; i++) {
    if ((totalLengthOfCuts + lengths[i]) < maxShaftLength) {

        totalLengthOfCuts += lengths[i];

        currentStick.push(lengths[i]);

    } else {

        sticks.push(currentStick);
        let drop = 240;
        currentStick.forEach(cut => drop -= cut);
        console.log('Current stick: ', currentStick, 'stick drop: ', drop)

        // RESET
        currentStick = [];
        totalLengthOfCuts = 0;
        drop = 0;
        if (i++ !== lengths.length) i -= 2;
    }
}

console.log('\n' + '-'.repeat(30) + '\n');
