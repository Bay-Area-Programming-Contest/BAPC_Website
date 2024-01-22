// Select all the text boxes
const textBoxes = document.querySelectorAll('.fade-in-text');

// Calculate the center of the screen
const screenCenter = window.innerHeight / 2;

window.addEventListener('scroll', () => {
  // Iterate over each text box
  textBoxes.forEach(textBox => {
    // Calculate the distance of the text box from the center of the screen
    console.log(textBox.getBoundingClientRect().top, textBox);
    const distanceFromCenter = Math.abs(screenCenter - (textBox.getBoundingClientRect().top - textBox.getBoundingClientRect().height / 2));

    // Normalize this distance to a value between 0 and 1
    const opacity = 1 - Math.min(distanceFromCenter / screenCenter, 1);

    // Set the opacity of the text box
    textBox.style.opacity = opacity;
  });
});