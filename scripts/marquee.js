//console.log("applying animations");
window.addEventListener("load", function() {
    const speed = 1000;
    let translate = 350; 
    //console.log(window.innerWidth)
    if (window.innerWidth < 1400){
        translate = 400; 
    }
    if (window.innerWidth < 1200){
        translate = 450; 
    }
    if (window.innerWidth < 992){
        translate = 500; 
    }
    if (window.innerWidth < 768){
        translate = 1500; 
    }
    tracks = document.getElementsByClassName("marquee-track")
    for(const track of tracks){
        items = track.getElementsByClassName("marquee-item")
        let len = items.length
        //console.log(len);
        let marqueeFrames = [
            { transform: "translateX("+translate+"%) scale(0.5)", opacity: 0, visibility: "hidden" },
            { transform: "translateX("+translate+"%) scale(0.5)", opacity: 0.4, visibility: "visible" },
            { transform: "translateX("+translate+"%) scale(0.5)", opacity: 0.4, visibility: "visible" },
            { transform: "translateX("+translate+"%) scale(0.5)", opacity: 0.4, visibility: "visible" },
            { transform: "translateX(0) scale(1)", opacity: 1, visibility: "visible" },
            { transform: "translateX(0) scale(1)", opacity: 1, visibility: "visible" },
            { transform: "translateX(0) scale(1)", opacity: 1, visibility: "visible" },
            { transform: "translateX(-"+translate+"%) scale(0.5)", opacity: 0.4, visibility: "visible" },
            { transform: "translateX(-"+translate+"%) scale(0.5)", opacity: 0.4, visibility: "visible" },
            { transform: "translateX(-"+translate+"%) scale(0.5)", opacity: 0.4, visibility: "visible" },
            { transform: "translateX(-"+translate+"%) scale(0.5)", opacity: 0, visibility: "hidden" }
        ]
        for(let i=0;i<3*(len-3)-1;i++){
            marqueeFrames.push({  visibility: "hidden" })
        }

        //console.log(marqueeFrames);
        
        let marqueeTiming = {
            duration: (marqueeFrames.length-1)*speed,
            easing: "linear",
            direction: "normal",
            iterations: Infinity,
            delay: 0,
        }

        let idx = 0
        for (const item of items){
            marqueeTiming["delay"] = -idx*(speed*3)
            item.animate(marqueeFrames, marqueeTiming)
            idx++;
        }
    }
});