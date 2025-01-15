window.addEventListener("load", () => {
    const textBoxes = document.querySelectorAll('.fade-in-text');

    const screenCenter = window.innerHeight / 2;
    const cutoff = 0.7;

    function fade() {
        textBoxes.forEach(textBox => {
            const distanceFromCenter = Math.abs(screenCenter - (textBox.getBoundingClientRect().top + textBox.getBoundingClientRect().height / 2));
            if (distanceFromCenter < cutoff * screenCenter) {
                textBox.style.opacity = "1";
            } else {
                // Add some padding to the cutoff
                const distanceFromCutOff = distanceFromCenter - cutoff * screenCenter;

                // Normalize this distance to a value between 0 and 1
                textBox.style.opacity = (1 - distanceFromCutOff / ((1 - cutoff) * screenCenter)).toString();
            }
        });
    }

    fade();
    window.addEventListener('scroll', fade);
});