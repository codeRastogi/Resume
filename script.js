// Initialize progress bars
const progressBars = document.querySelectorAll(".skill-progress > div");

function initialiseBar(bar) {
    const initialWidth = parseFloat(bar.getAttribute("data-bar-width")) || 0;
    bar.style.width = initialWidth + '%';
}

progressBars.forEach(initialiseBar);

// Fill progress bars smoothly
function fillBar(bar) {
    const targetWidth = parseFloat(bar.getAttribute("data-bar-width")) || 0;
    let currentWidth = 0;
    const animationDuration = 1000; // Adjust as needed

    function animate() {
        currentWidth += (targetWidth - currentWidth) * 0.05; // Easing function
        bar.style.width = currentWidth + '%';
        if (Math.abs(targetWidth - currentWidth) < 0.1) {
            clearInterval(interval);
        }
    }

    const interval = setInterval(animate, animationDuration / 60);
}

// Check scroll position to fill progress bars
function checkScroll() {
    progressBars.forEach(bar => {
        const barCoordinates = bar.getBoundingClientRect();
        if (!bar.getAttribute("data-visited") && barCoordinates.top <= window.innerHeight - barCoordinates.height) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }
    });
}

window.addEventListener("scroll", checkScroll);

// Smooth scroll for navigation menu
const navMenuAnchorTags = document.querySelectorAll('.nav-menu a');

navMenuAnchorTags.forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const targetSectionID = this.textContent.trim().toLowerCase();
        const targetSection = document.getElementById(targetSectionID);
        if (!targetSection) return;

        const targetSectionCoordinates = targetSection.getBoundingClientRect();
        const scrollDirection = targetSectionCoordinates.top < 0 ? -1 : 1;

        function scrollSmoothly() {
            if (Math.abs(targetSectionCoordinates.top) < 10) return;
            window.scrollBy(0, scrollDirection * 20);
            requestAnimationFrame(scrollSmoothly);
        }

        scrollSmoothly();
    });
});
