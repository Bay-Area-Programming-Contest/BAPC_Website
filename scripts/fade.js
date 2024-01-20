window.addEventListener("load", () => {
    const fadeTexts = document.querySelectorAll('.fade-in-text');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.classList.add('fade-in');
                }, entry.target.dataset.delay);
            } else {
                entry.target.classList.remove('fade-in');
            }
        });
    }, options);

    fadeTexts.forEach(function (text) {
        observer.observe(text);
    });
});
