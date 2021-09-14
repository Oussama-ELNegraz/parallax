let sections = [
    ["header"   , "flow" ],
    ["#design"  , "top"  ],
    ["#usefull" , "flow" ],
    ["#services", "flow" ],
    ["footer"   , "flow" ]
];
let index = 0;
let onWheel = true;


function wheel(sec1, sec2,onwheel) {
    sec1.classList.remove("reset");
    sec2.classList.remove("reset");
    // Hide Text
    sec1.querySelector("*").style.transition = "0.5s";
    sec1.querySelector("*").style.opacity = "0";
    sec2.querySelector("*").style.opacity = "0";
    // Zoom Out Background    
    sec1.classList.remove('zoom-in');
    sec1.classList.add('zoom-out');
    // Hide Section 1
    sec1.style.transition = "3s";
    sec1.style.opacity = "0";  
    // Show Section 2
    sec2.style.zIndex = 2;        
    sec2.style.transition = "3s opacity";
    sec2.style.opacity = "1";
    // Zoom In Backgournd
    sec2.classList.remove('zoom-out');
    sec2.classList.add('zoom-in');
    setTimeout(() => {        
        // Show Text
        setTimeout(() => {
            sec2.querySelector("*").style.transition = "0.5s";
            sec2.querySelector("*").style.opacity = "1";
            // Default Value
            sec1.style.zIndex = 1;
            setTimeout(() => onWheel = true, 1000);
        }, 1000);
    }, 500);
}

function translate(sec1, sec2,onwheel,direction = "top") {
    sec2.classList.remove("reset");
    // Hide Text
    sec1.querySelector("*").style.transition = "0.5s";
    sec1.querySelector("*").style.opacity = "0";
    sec2.querySelector("*").style.opacity = "0";
    // Zoom In & Out Background    
    sec1.classList.remove('zoom-in');
    sec1.classList.add('zoom-out');
    sec2.classList.remove('zoom-out');
    sec2.style.backgroundSize = "100%";
    setTimeout(() => {
        sec1.backgroundSize = "100%";
        // Show Section 2
        sec2.style.opacity = 1;
        sec1.style.zIndex = 1;        
        sec2.style.zIndex = 2;
        sec2.style.transition = "3s margin";
        if(direction == "top") sec2.style.marginTop = "-100vh";  else  sec2.style.marginTop = "100vh";   
        // Show Text
        setTimeout(() => {
            sec2.classList.add('zoom-in');
            sec2.backgroundSize= "120%";
            sec2.querySelector("*").style.transition = "0.5s";
            sec2.querySelector("*").style.opacity = "1";
            // Default Value
            sec2.classList.add("reset");
            sec1.style.opacity = "0";
            setTimeout(() => onWheel = true, 1000);
        }, 3000);    
    }, 1500);    
}

function MouseWheelHandler(e) {
    // cross-browser wheel delta
    var e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    if (onWheel) {
        onWheel = false;
        if (delta > 0 && index > 0) {
            let sec1 = document.querySelector(sections[index][0]);
            index--;
            let sec2 = document.querySelector(sections[index][0]);
            
            if (sections[index + 1][1] === "top") {
                document.querySelector(sections[index][0]).style.top = "-100vh";
                document.querySelector(sections[index][0]).style.marginTop = "0";
                translate(sec1, sec2, onWheel, "bottom");
            } else
                wheel(sec1, sec2, onWheel);
            
        } else if (delta < 0 && index < sections.length - 1) {
            let sec1 = document.querySelector(sections[index][0]);
            index++;
            let sec2 = document.querySelector(sections[index][0]);

            if (sections[index][1] === "top") {
                document.querySelector(sections[index][0]).style.top = "100vh";
                document.querySelector(sections[index][0]).style.margin = "0";
                translate(sec1, sec2, onWheel);
            } else
                wheel(sec1, sec2, onWheel);
        } else onWheel = true
    } 
}
    // window.addEventListener("wheel", MouseWheelHandler, false);
    window.addEventListener("touchmove", MouseWheelHandler, false);

