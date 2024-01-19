document.addEventListener('DOMContentLoaded', function() {
    const collapsibleBtns = document.querySelectorAll('.collapsible-btn');

    collapsibleBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const card = btn.closest('.collapsible');
            const content = card.querySelector('.card-content');
            const toggleIcon = btn.querySelector('.toggle-icon');

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
        const maxHeight = element.scrollHeight;
        const duration = 100; // Set the duration of the animation in milliseconds
        const interval = 10; // Set the interval for each step in milliseconds
        const steps = duration / interval;
        const stepHeight = maxHeight / steps;

        let currentHeight = 0;
        const intervalId = setInterval(function() {
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
        const maxHeight = element.scrollHeight;
        const duration = 100; // Set the duration of the animation in milliseconds
        const interval = 10; // Set the interval for each step in milliseconds
        const steps = duration / interval;
        const stepHeight = maxHeight / steps;

        let currentHeight = maxHeight;
        const intervalId = setInterval(function() {
            currentHeight -= stepHeight;
            element.style.maxHeight = currentHeight + 'px';

            if (currentHeight <= 0) {
                clearInterval(intervalId);
                element.style.maxHeight = null; // Hide the content by setting max-height to null
            }
        }, interval);
    }
});
