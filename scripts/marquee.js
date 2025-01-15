window.addEventListener("load", function () {
    const speed = 1000;

    let translate = 350;
    if (window.innerWidth < 1400) {
        translate = 400;
    }
    if (window.innerWidth < 1200) {
        translate = 450;
    }
    if (window.innerWidth < 992) {
        translate = 500;
    }
    if (window.innerWidth < 768) {
        translate = 1500;
    }

    const tracks = document.getElementsByClassName("marquee-track")
    for (const track of tracks) {
        const items = track.getElementsByClassName("marquee-item")
        const marqueeFrames = [
            {transform: `translateX(${translate}%) scale(0.5)`, opacity: 0, visibility: "hidden"},
            {transform: `translateX(${translate}%) scale(0.5)`, opacity: 0.4, visibility: "visible"},
            {transform: `translateX(${translate}%) scale(0.5)`, opacity: 0.4, visibility: "visible"},
            {transform: `translateX(${translate}%) scale(0.5)`, opacity: 0.4, visibility: "visible"},
            {transform: `translateX(0) scale(1)`, opacity: 1, visibility: "visible"},
            {transform: `translateX(0) scale(1)`, opacity: 1, visibility: "visible"},
            {transform: `translateX(0) scale(1)`, opacity: 1, visibility: "visible"},
            {transform: `translateX(-${translate}%) scale(0.5)`, opacity: 0.4, visibility: "visible"},
            {transform: `translateX(-${translate}%) scale(0.5)`, opacity: 0.4, visibility: "visible"},
            {transform: `translateX(-${translate}%) scale(0.5)`, opacity: 0.4, visibility: "visible"},
            {transform: `translateX(-${translate}%) scale(0.5)`, opacity: 0, visibility: "hidden"}
        ]
        for (let i = 0; i < 3 * (items.length - 3) - 1; i++) {
            marqueeFrames.push({visibility: "hidden"})
        }

        //console.log(marqueeFrames);

        const marqueeTiming = {
            duration: (marqueeFrames.length - 1) * speed,
            easing: "linear",
            direction: "normal",
            iterations: Infinity,
            delay: 0,
        }

        items.forEach((item, idx) => {
            marqueeTiming["delay"] = -idx * (speed * 3)
            item.animate(marqueeFrames, marqueeTiming)
        })
    }
});