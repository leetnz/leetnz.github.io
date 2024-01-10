

// Logo bounce animation
registerKute(() => {
    const maclogo = document.getElementById("maclogo");
    var xspeed = 4;
    var yspeed = 3;
    var xpos = Math.floor(Math.random() * 10) * xspeed;
    var ypos = Math.floor(Math.random() * 5) * yspeed;

    var angle = 0;
    const logos = ["logo-cpp", "logo-go", "logo-rust", "logo-flutter", "logo-py"];
    var logoIndex = 0;

    function switchLogo() {
        var current = document.getElementById(logos[logoIndex]);
        logoIndex = (logoIndex + 1 + Math.floor(Math.random() * (logos.length - 2))) % logos.length;
        angle += 180;
        KUTE.to(current, { rotate: angle }, {
            duration: 100,
            easing: "easingCubicIn",
            onComplete: () => {
                current.style.visibility = "hidden";
                var next = document.getElementById(logos[logoIndex]);
                next.style.visibility = "visible";
                angle += 180;
                KUTE.to(next, { rotate: angle }, { duration: 100, easing: "easingCubicOut" }).start()
            }
        }).start();
    }

    var moveTween = KUTE.to("#maclogo",
        { scale: 1 },
        { duration: 1, onComplete: updatePos }
    ).start();

    const colors = ["#fa8", "#ee4", "#4f4", "#0ff", "#bcf", "#f8f"];
    var colorIndex = 0;
    maclogo.style.stroke = colors[colorIndex];

    function updatePos() {
        const xoffset = -52;
        const yoffset = -120;

        var bounce = false;

        if ((xspeed > 0 && xpos > 576) || (xspeed < 0 && xpos < 0)) {
            xspeed = -xspeed;
            bounce = true;
        }
        if ((yspeed > 0 && ypos > 280) || (yspeed < 0 && ypos < 0)) {
            yspeed = -yspeed;
            bounce = true;
        }
        xpos += xspeed;
        ypos += yspeed;

        if (bounce) {
            switchLogo();
            colorIndex = (colorIndex + 1) % colors.length;
            maclogo.style.stroke = colors[colorIndex];
        }


        moveTween = KUTE.to("#maclogo",
            { translateX: xoffset + xpos, translateY: yoffset + ypos, scale: 1 },
            { duration: 30, onComplete: updatePos }
        ).start();
    }
});

// PCB Animation
registerKute(() => {
    const pcbInfo = [
        { id: "#pcb-base", x: 0, y: 0, offx: 0, offy: 30 },
        { id: "#pcb-c1", x: -85.568, y: -21.5, offx: -20, offy: -40 },
        { id: "#pcb-ec1", x: -288.22, y: - 20.5, offx: 0, offy: -38 },
        { id: "#pcb-j1", x: -11, y: 58.5, offx: 30, offy: -40 },
        { id: "#pcb-u1", x: 8.8, y: 2, offx: -17, offy: -65 },
        { id: "#pcb-uc", x: -210, y: 14, offx: 0, offy: -92 },
        { id: "#pcb-c2", x: -20, y: 19, offx: 0, offy: -95 },
        { id: "#pcb-c3", x: -12, y: 24, offx: 0, offy: -110 },
        { id: "#pcb-r1", x: -19, y: - 8, offx: 0, offy: -90 },
        { id: "#pcb-r2", x: 73, y: 8, offx: 10, offy: -110 },
        { id: "#pcb-r3", x: -5.9, y: 15.5, offx: -5, offy: -95 },
        { id: "#pcb-j2", x: -208.5, y: 53.5, offx: -30, offy: -110 },
    ];
    pcbInfo.forEach((c) => {
        KUTE.to(c.id,
            { translateX: c.x + c.offx, translateY: c.y + c.offy },
            { duration: 1 }
        ).start();
    });

    var pcbRect = document.getElementById("pcb").getBoundingClientRect();
    function registerPCBScroll() {
        if (window.scrollY + screen.height > pcbRect.bottom) {
            console.log("Hello");
            document.removeEventListener('scroll', registerPCBScroll);
            var firstTween;
            var lastTween;
            var nextTween;
            pcbInfo.forEach((c) => {
                if (c.id === "#pcb-base") {
                    return;
                }
                nextTween = KUTE.to(c.id,
                    { translateX: c.x, translateY: c.y },
                    { duration: 500, easing: 'easingCubicOut' });
                if (firstTween) {
                    lastTween.chain(nextTween);
                    lastTween = nextTween;
                } else {
                    firstTween = nextTween;
                    lastTween = nextTween;
                }
            });
            nextTween = KUTE.to("#pcb-base",
                { translateX: 0, translateY: 0 },
                { duration: 1000, easing: 'easingCubicOut' });
            lastTween.chain(nextTween);
            firstTween.start();
        }
    }
    document.addEventListener('scroll', registerPCBScroll, { passive: true });
});





// Observer

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('text-in-left')) {
                entry.target.classList.add('left-in-animation');
            }
            if (entry.target.classList.contains('text-in-right')) {
                entry.target.classList.add('right-in-animation');
            }
            if (entry.target.classList.contains('macbook')) {
                entry.target.classList.add('left-in-animation');
            }
            if (entry.target.classList.contains('circuitboard')) {
                entry.target.classList.add('left-in-animation');
            }
        }
    });
});

// Tell the observer which elements to track
document.querySelectorAll('.text-in-right').forEach(element => observer.observe(element));
document.querySelectorAll('.text-in-left').forEach(element => observer.observe(element));
document.querySelectorAll('.macbook').forEach(element => observer.observe(element));
document.querySelectorAll('.circuitboard').forEach(element => observer.observe(element));
