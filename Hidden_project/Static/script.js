const powerButton = document.getElementById('powerButton');
const screen = document.getElementById('screen');

powerButton.addEventListener('click', function() {
    if (screen.style.display === 'none' || screen.style.display === '') {
        screen.style.display = 'block'; // Turn on the TV
        setTimeout(function() {
            screen.classList.add('green-flash'); // Add green flash effect
            setTimeout(function() {
                screen.style.display = 'none'; // Turn off the TV after the green flash
                screen.classList.remove('green-flash'); // Remove the green flash effect for next time
            }, 500); // Duration of green flash (matches CSS animation)
        }, 2000); // 2 seconds of static before the flash
    } else {
        screen.style.display = 'none'; // Turn off the TV if it's already on
    }
});

