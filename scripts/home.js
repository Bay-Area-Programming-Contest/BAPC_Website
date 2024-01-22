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
    let position = delayedButton.getBoundingClientRect().top;
    let curposition = position;
    setInterval(function () {
        if (bounceUp) {
            curposition += 0.01;
            delayedButton.style.top = curposition + '%';
            if (curposition >= position+1) {
                bounceUp = false;
            }
        } else {
            curposition -= 0.01;
            delayedButton.style.top = curposition + '%';
            if (curposition <= position) {
                bounceUp = true;
            }
        }
    }, 7);
});
