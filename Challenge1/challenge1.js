// Function to find the grades if a mark value is given
function findGrades () {
    // Getting the user input
    const input = prompt("Please enter your marks (0-100): ");
    const studentMarks = parseFloat(input);

    //check if the input is within the valid mark range(0-100)
    if (!isNaN(studentMarks) && studentMarks >= 0 && studentMarks <= 100) {
        //finding the grade based on marks entered
        let yourGrade;
        if (studentMarks > 79) {
            yourGrade = 'A';
        } else if (studentMarks >= 60 && studentMarks <= 79) {
            yourGrade = 'B';
        } else if (studentMarks >= 50 && studentMarks <= 59) {
            yourGrade = 'C';
        } else if (studentMarks >= 40 && studentMarks <= 49) {
            yourGrade = 'D';
        } else {
            yourGrade = 'E';
        }

        // print the result to the console
        console.log(`Your grade for ${studentMarks} is: ${yourGrade}`);
    } else {
        //if the correct mark is not entered, give an error
        console.log('Please enter a valid mark (0-100)');
        // calling the function
        findGrades();
    }
}