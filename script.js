var progressBars = document.querySelectorAll(".skill-progress > div");



function initialiseBar(bar) {
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for (var bar of progressBars) {
    initialiseBar(bar);
}



function fillBar(bar) {

    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function () {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
            return;
        }
        currentWidth++;
        bar.style.width = currentWidth + '%';
    }, 5);

}



// This function uses a for loop for individual progress bars.
function checkScroll() {

    for (let bar of progressBars) {
        var barCoordinates = bar.getBoundingClientRect();
        if ((bar.getAttribute("data-visited") == "false") &&
            (barCoordinates.top <= (window.innerHeight - barCoordinates.height))) {
            bar.setAttribute("data-visited", true);
            fillBar(bar);
        } else if (barCoordinates.top > window.innerHeight) {
            bar.setAttribute("data-visited", false);
            initialiseBar(bar);
        }

    }
}



window.addEventListener("scroll", checkScroll);

var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');

for (var i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);

        // Calculate the target section's position relative to the viewport
        var targetSectionCoordinates = targetSection.getBoundingClientRect();

        // Determine whether to scroll up or down
        var scrollDirection = targetSectionCoordinates.top < 0 ? -1 : 1;

        // Define a function to scroll smoothly
        function scrollSmoothly() {
            if (Math.abs(targetSectionCoordinates.top) < 10) {
                // Stop scrolling when close to the target section
                return;
            }

            // Scroll by a larger amount in the determined direction
            window.scrollBy(0, scrollDirection * 20);

            // Update the target section's position
            targetSectionCoordinates = targetSection.getBoundingClientRect();

            // Continue scrolling
            requestAnimationFrame(scrollSmoothly);
        }

        // Start the smooth scrolling animation
        scrollSmoothly();
    });
}


