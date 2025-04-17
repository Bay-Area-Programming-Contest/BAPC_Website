window.addEventListener("load", function () {
    let animationFrameId = null;

    document.addEventListener("mousemove", (e) => {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(() => {
                for (const card of document.getElementsByClassName("glass-card")) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty("--mouse-x", `${x}px`);
                    card.style.setProperty("--mouse-y", `${y}px`);
                }
                animationFrameId = null;
            });
        }
    });
});