function scrollToSection() {
    const secondSection = document.getElementsByClassName('WhatIsBAPC')[0];
    secondSection.scrollIntoView({behavior: 'smooth'});
}

window.addEventListener("load", () => {
    // Delay the appearance of the button by 2000 milliseconds (2 seconds)
    setTimeout(function () {
        const delayedButton = document.getElementById('delayed-button');
        delayedButton.style.display = 'block'; // Show the button
        setTimeout(function () {
            delayedButton.style.opacity = '1'; // Make the button visible
        }, 50);
    }, 2000);


    // make the image bounce up and down smoothly
    const delayedButton = document.getElementById('delayed-button');
    let bounceUp = true;
    let position = 85;
    setInterval(function () {
        if (bounceUp) {
            position += 0.01;
            delayedButton.style.top = position + '%';
            if (position >= 86) {
                bounceUp = false;
            }
        } else {
            position -= 0.01;
            delayedButton.style.top = position + '%';
            if (position <= 85) {
                bounceUp = true;
            }
        }
    }, 7);
});
