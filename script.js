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

// Flag to check if video has been shown
let videoShown = false;

// Function to show the intro video modal
function showIntroVideo() {
    if (!videoShown) {
        const introVideoModal = document.querySelector('.intro-video');
        introVideoModal.classList.remove('hidden'); // Show the video modal
        videoShown = true; // Set the flag to true
    }
}

// Function to close the video modal
document.getElementById('closeVideo').addEventListener('click', function() {
    const introVideoModal = document.querySelector('.intro-video');
    introVideoModal.classList.add('hidden'); // Hide the video modal
    const video = introVideoModal.querySelector('video');
    if (video) {
        video.pause(); // Pause the video when closing
        video.currentTime = 0; // Reset to the beginning
    }
});

// Add event listeners to all project buttons
const projectButtons = document.querySelectorAll('.project-link'); // Select all project buttons
projectButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action
        showIntroVideo(); // Show the intro video
        // Optional: You can redirect to the GitHub or Live Demo link after a short delay
        setTimeout(() => {
            window.location.href = this.href; // Redirect to the button's link
        }, 3000); // Adjust the delay (in milliseconds) as needed
    });
});
