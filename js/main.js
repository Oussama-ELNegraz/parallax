const sections = [
    ["header"   , "flow" ],
    ["#design"  , "top"  ],
    ["#usefull" , "flow" ],
    ["#services", "flow" ],
    ["footer"   , "flow" ]
];
const icon = document.querySelector("nav i");
const logo = document.querySelector("nav img");
const circles = document.querySelectorAll(".progress-container .circle")
const progressBar = document.querySelector(".progress-container span")
let index = 0;
let onWheel = true;
let start;
let end;




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
    sec1.style.opacity = "0";  
    // Show Section 2
    sec2.style.zIndex = 2;        
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
    sec2.style.backgroundSize = "100% 100%";
    setTimeout(() => {
        sec1.backgroundSize = "100% 100%";
        // Show Section 2
        sec2.style.opacity = 1;
        sec1.style.zIndex = 1;        
        sec2.style.zIndex = 2;
        if(direction == "top") sec2.style.marginTop = "-100vh";  else  sec2.style.marginTop = "100vh";   
        // Show Text
        setTimeout(() => {
            sec2.classList.add('zoom-in');
            sec2.backgroundSize= "120% 120%";
            sec2.querySelector("*").style.transition = "0.5s";
            sec2.querySelector("*").style.opacity = "1";
            // Default Value
            sec2.classList.add("reset");
            sec1.style.opacity = "0";
            setTimeout(() => onWheel = true, 1000);
        }, 3000);    
    }, 1500);    
}

function MouseWheelHandler(delta , click = 0 , idx = -1) {
    if ( onWheel ) {        // This Will Change In the end to if ( onWheel )
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
        } else if (click) {
            if (index > idx) {
                let sec1 = document.querySelector(sections[index][0]);
                index = idx;
                let sec2 = document.querySelector(sections[index][0]);
                if (sections[index + 1][1] === "top") {
                    document.querySelector(sections[index][0]).style.top = "-100vh";
                    document.querySelector(sections[index][0]).style.marginTop = "0";
                    translate(sec1, sec2, onWheel, "bottom");
                } else
                    wheel(sec1, sec2, onWheel);
            } else {
                let sec1 = document.querySelector(sections[index][0]);
                index = idx;
                let sec2 = document.querySelector(sections[index][0]);
                if (sections[index][1] === "top") {
                    document.querySelector(sections[index][0]).style.top = "100vh";
                    document.querySelector(sections[index][0]).style.margin = "0";
                    translate(sec1, sec2, onWheel);
                } else
                    wheel(sec1, sec2, onWheel);
            }
        } else onWheel = true;
        updateProgressBar();
        if (index === 1) {
            icon.style.color = "#000";
            logo.setAttribute("src", "images/Dark Logo.png");
        } else {
            icon.style.color = "#FFF";
            logo.setAttribute("src", "images/Logo.png");
        }
    } 
}

function updateProgressBar() {
    circles.forEach((circle, idx) => {
        if (idx < index + 1) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
        progressBar.style.height = (100 / (sections.length - 1)) * index + "%";
    });
}

circles.forEach((circle , idx) => {
    circle.addEventListener("click", () => {
        let x;
        index != idx ? x = 1 : x = 0;
        MouseWheelHandler(0, x, idx);
    });
})


window.addEventListener("wheel", (e) => {
    // cross-browser wheel delta
    var e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    MouseWheelHandler(delta);
});  

window.addEventListener('touchstart', (e) => {
    start = e.changedTouches[0].pageY;
});
window.addEventListener('touchend', (e) => {
    end = e.changedTouches[0].pageY;
    delta = end - start;
    MouseWheelHandler(delta);
});


