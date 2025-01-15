// Set the date we're counting down to
const TARGET_DATE = new Date("March 3, 2024 11:00:00").getTime();

const x = setInterval(function () {
    const now = new Date().getTime();

    const secondsRemaining = Math.floor((TARGET_DATE - now) / 1000);

    const hours = String(Math.floor(secondsRemaining / (60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor(secondsRemaining / 60) % 60).padStart(2, "0");
    const seconds = String(secondsRemaining % 60).padStart(2, "0");

    if (secondsRemaining > 0) {
        document.getElementById("date").textContent = `${hours} : ${minutes} : ${seconds}`;
    } else {
        clearInterval(x);
        document.getElementById("date").textContent = "CONTEST HAS STARTED!";
    }
}, 1000);  // Update once every second
