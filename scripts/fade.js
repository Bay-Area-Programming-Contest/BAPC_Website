// Select all the text boxes
const textBoxes = document.querySelectorAll('.fade-in-text');

// Calculate the center of the screen
const screenCenter = window.innerHeight / 2;
const cutoff = 0.7;

window.addEventListener('scroll', () => {
  // Iterate over each text box
  textBoxes.forEach(textBox => {
    // Calculate the distance of the text box from the center of the screen
    console.log(textBox.getBoundingClientRect().top, textBox);
    const distanceFromCenter = Math.abs(screenCenter - (textBox.getBoundingClientRect().top + textBox.getBoundingClientRect().height / 2));
    if(distanceFromCenter < cutoff * screenCenter) {
      textBox.style.opacity = 1;
        return;
    }
    const distanceFromCutOff = distanceFromCenter - cutoff * screenCenter;
    // add some padding to the cutoff
    // Normalize this distance to a value between 0 and 1
    const opacity = (1 - distanceFromCutOff / ((1 - cutoff) * screenCenter));


    // Set the opacity of the text box
    textBox.style.opacity = opacity;
  });
});