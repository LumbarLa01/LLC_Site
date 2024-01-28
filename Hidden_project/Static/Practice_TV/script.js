// Wait for the HTML document to be fully loaded and parsed.
document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('screen');
    // Ensure the screen is initially off
    turnOffScreen(screen);

    const powerButton = document.getElementById('powerButton');
    // Add event listener to power button to toggle screen on click
    powerButton.addEventListener('click', () => toggleScreen(screen));
});

// Function to toggle the state of the screen (on or off).
function toggleScreen(screen) {
    // Determine if the screen is currently off
    const isOff = screen.style.display === 'none';
    if (isOff) {
        // If the screen is off, turn it on
        turnOnScreen(screen);
    } else {
        // If the screen is on, turn it off
        turnOffScreen(screen);
    }
}

// Function to turn on the screen.
function turnOnScreen(screen) {
    screen.style.display = 'block'; // Make the screen visible
    screen.classList.add('green-flash'); // Add the green flash effect
    addFallingLetters(screen); // Start the falling letters effect

    // Schedule to remove the green flash effect after 500 milliseconds
    setTimeout(() => screen.classList.remove('green-flash'), 500);

    // Schedule to turn off the screen after 3 seconds
    setTimeout(() => turnOffScreen(screen), 3000);
}

// Function to turn off the screen.
function turnOffScreen(screen) {
    screen.style.display = 'none'; // Hide the screen
    screen.classList.remove('green-flash'); // Remove the green flash effect
    removeFallingLetters(screen); // Remove the falling letters
}

// Function to add falling letters to the screen.
function addFallingLetters(screen) {
    const letterCount = 100; // Number of letters to add
    for (let i = 0; i < letterCount; i++) {
        // Create and append each letter to the screen
        screen.appendChild(createRandomLetter(screen.offsetWidth));
    }
}

// Function to create a random letter element.
function createRandomLetter(maxWidth) {
    const letter = document.createElement('div');
    letter.classList.add('letter'); // Assign class for styling
    letter.style.left = Math.random() * maxWidth + 'px'; // Set random horizontal position
    letter.style.animationDelay = Math.random() * 3 + 's'; // Set random animation start time
    letter.style.animationDuration = '1s'; // Set the animation duration
    letter.textContent = getRandomLetter(); // Set the text content to a random letter
    return letter;
}

// Function to generate a random letter from A to Z.
function getRandomLetter() {
    // Return a random uppercase letter
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

// Function to remove all falling letters from the screen.
function removeFallingLetters(screen) {
    // Select and remove each letter element from the screen
    screen.querySelectorAll('.letter').forEach(letter => letter.remove());
}