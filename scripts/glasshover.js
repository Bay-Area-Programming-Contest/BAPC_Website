window.addEventListener("load", function () {
    document.getElementById("glass-card-container").onmousemove = e => {
        for (const card of document.getElementsByClassName("glass-card")) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    }
});