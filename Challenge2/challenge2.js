// Function to calculate demerit points based on speed
function calculateDemeritPoints(speed) {
    const speedMax = 70;
    let demeritPoints = 0;


    // Check if the speed is below the limit
    if (speed < speedMax) {
        console.log("Ok");
    } else {
        // Calculate demerit points for speed limit violation
        demeritPoints = Math.floor((speed - speedMax) / 5);

        // Check if the demerit points passes the limit
        if (demeritPoints > 12) {
            console.log("License suspended");
        } else {
            console.log(`Points: ${demeritPoints}`);
        }
    }
}

// Use prompt to get input from the user
const speedInput = prompt("Enter the speed of the car:");


// Find if there is a user input or not
if (speedInput !== null) {
    // Convert the user input to a number
    const speed = parseFloat(speedInput);

    // Check if the input is valid
    if (!isNaN(speed)) {
        // Calling the function
        calculateDemeritPoints(speed);
    } else {
        console.log("Please enter a valid speed (number).");
    }
} else {
    console.log("No input.");
}