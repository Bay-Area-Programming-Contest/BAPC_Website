function scrollToSection() {
    const secondSection = document.querySelector('.WhatIsBAPC');
    secondSection.scrollIntoView({behavior: 'smooth'});
}

window.addEventListener("load", () => {
    const delayedButton = document.getElementById('delayed-button');
    setTimeout(function () {
        delayedButton.classList.add("active");
    }, 2000);
});
