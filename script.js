// JavaScript to hide the loader after 5 seconds
setTimeout(() => {
    document.querySelector('.loader').style.display = 'none'; // Hide loader
    document.querySelector('.portfolio').classList.remove('hidden'); // Show portfolio
}, 5000); // Adjust time as needed

document.addEventListener('DOMContentLoaded', function() {
    // Toggling names
    const nameElement = document.querySelector('.name');
    if (nameElement) { // Check if nameElement exists
        let names = ['Vuyelwa', 'Mavooma'];
        let index = 0;

        function toggleName() {
            nameElement.textContent = names[index];
            index = (index + 1) % names.length;
        }

        // Initial call
        toggleName();

        // Change name every 2 seconds
        setInterval(toggleName, 2000);
    }

    // Animate on scroll effect
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Function to handle showing the video popup
function showIntroVideo() {
    // Check if the video has already been shown by looking at localStorage
    if (!localStorage.getItem('introVideoShown')) {
        document.querySelector('.intro-video').classList.remove('hidden');

        // Play the video if it exists and set it to autoplay
        const video = document.querySelector('.intro-video video');
        if (video) {
            video.play();
        }

        // Set a flag in localStorage to indicate the video has been shown
        localStorage.setItem('introVideoShown', 'true');
    }
}

// Close the video when clicking outside or on the close button
document.querySelector('.intro-video').addEventListener('click', function() {
    document.querySelector('.intro-video').classList.add('hidden');
});

// Add event listeners to all project buttons
document.querySelectorAll('.project-link').forEach(function(button) {
    button.addEventListener('click', function(event) {
        showIntroVideo();
    });
});


