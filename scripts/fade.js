// custom_script.js

document.addEventListener('DOMContentLoaded', function() {
    var fadeTexts = document.querySelectorAll('.fade-in-text');

    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('fade-in');
                }, entry.target.dataset.delay);
            } else {
                entry.target.classList.remove('fade-in');
            }
        });
    }, options);

    fadeTexts.forEach(function(text) {
        observer.observe(text);
    });
});
