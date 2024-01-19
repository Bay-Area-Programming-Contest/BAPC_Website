// custom_script.js

// JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    var collapsibleBtns = document.querySelectorAll('.collapsible-btn');

    collapsibleBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = btn.closest('.collapsible');
            var content = card.querySelector('.card-content');
            var toggleIcon = btn.querySelector('.toggle-icon');

            card.classList.toggle('expanded');

            if (card.classList.contains('expanded')) {
                expandElement(content, toggleIcon);
            } else {
                collapseElement(content, toggleIcon);
            }
        });
    });

    function expandElement(element, iconElement) {
        iconElement.textContent = '\u2212'; // Change the icon to "-"
        var maxHeight = element.scrollHeight;
        var duration = 100; // Set the duration of the animation in milliseconds
        var interval = 10; // Set the interval for each step in milliseconds
        var steps = duration / interval;
        var stepHeight = maxHeight / steps;

        var currentHeight = 0;
        var intervalId = setInterval(function() {
            currentHeight += stepHeight;
            element.style.maxHeight = currentHeight + 'px';

            if (currentHeight >= maxHeight) {
                clearInterval(intervalId);
                element.style.maxHeight = null; // Allow content to grow beyond calculated max-height
            }
        }, interval);
    }

    function collapseElement(element, iconElement) {
        iconElement.textContent = '\u002B'; // Change the icon to "+"
        var maxHeight = element.scrollHeight;
        var duration = 100; // Set the duration of the animation in milliseconds
        var interval = 10; // Set the interval for each step in milliseconds
        var steps = duration / interval;
        var stepHeight = maxHeight / steps;

        var currentHeight = maxHeight;
        var intervalId = setInterval(function() {
            currentHeight -= stepHeight;
            element.style.maxHeight = currentHeight + 'px';

            if (currentHeight <= 0) {
                clearInterval(intervalId);
                element.style.maxHeight = null; // Hide the content by setting max-height to null
            }
        }, interval);
    }
});
