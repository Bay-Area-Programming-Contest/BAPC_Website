window.addEventListener("load", () => {
    let clientX = 0, clientY = 0;

    document.addEventListener("mousemove", (e) => {
        clientX = e.clientX;
        clientY = e.clientY;
    });

    const updateCards = () => {
        for (const card of document.getElementsByClassName("glass-card")) {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
        }
        requestAnimationFrame(updateCards);
    };

    updateCards();
});
