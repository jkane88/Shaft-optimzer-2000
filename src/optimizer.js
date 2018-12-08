/**
 * Takes an array of orders, sorts them, and calculates the optimal cuts to make
 * to minimize drop.
 *
 * @param {Array} ordersToCut
 * @returns Array of optimized sticks/cuts.
 */
 export function calculateCuts(ordersToCut) {
    const maxShaftLength = 240; // Shaft length in inches.
    const sticks = []; // The array of optimized sticks.
    const cuts = []; // The array of cuts that will be added to each stick.
    let totalLengthOfCuts = 0; // This get accumulated with each cut and compared against maxShaftLength.
    let currentStick = []; // The array of cuts to make on the current stick.

    // Get the cut lengths from each order,
    // then put each cut into the cuts array.
    ordersToCut.forEach(order => {
        for (let i = 0; i < order.quantity; i++) {
            cuts.push(order.length);
        }
    });

    // Sort lengths from longest to shortest. (Setup for greedy method)
    cuts.sort((a, b) => b - a);

    // Algorithm steps:
    // 1. Run through each cut, starting from the longest length.
    // 2. If the next cut in the sequence **DOES NOT exceed** the max shaft length...
    //      - Add the cut to the current stick. Move to next cut in the sequence.
    // 3. If the next cut in the sequence **DOES exceed** the max shaft length...
    //      - Try to find a shorter cut from the remaining cuts to minimize stick drop...
    //          - On success: go to 2 with current stick.
    //          - On failure: Add the current stick to the array of sticks. Go to 2 with a new stick, reset counters.
    // 4. Return the array of sticks, each stick has an array of optimal cuts.

    // Step 1:
    for (let i = 0; i <= cuts.length; i++) {

        // Step 2:
        if ((totalLengthOfCuts + cuts[i]) < maxShaftLength) {
            totalLengthOfCuts += cuts[i];
            currentStick.push(cuts[i]);
        } else {

            // Step 3 (forward-looking):
            for (let j = i; j < cuts.length; j++) {
                if (totalLengthOfCuts + cuts[j] < maxShaftLength) {

                    // Step 3 success:
                    totalLengthOfCuts += cuts[j];
                    currentStick.push(cuts[j]);
                    cuts.splice(j, 1);
                }
            }

            // Step 3 failure:
            sticks.push(currentStick);
            currentStick = []; // Reset
            totalLengthOfCuts = 0; // Reset

            // If next iteration goes out of range, rollback iterator.
            // **This is required to ensure all cuts are included.
            if (i++ !== cuts.length) i -= 2;
        }
    }

    // Return the array of optimized sticks/cuts.
    return sticks;
}
