// Toggle the visibility of the navbar links on mobile
const navbarToggle = document.querySelector('.navbar-toggle');
if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
        const navbarLinks = document.querySelector('.navbar-links');
        if (navbarLinks) {
            navbarLinks.classList.toggle('active'); // Show or hide navbar links
        }
    });
}

// JavaScript to hide the loader after 5 seconds
setTimeout(() => {
    const loader = document.querySelector('.loader');
    const portfolio = document.querySelector('.portfolio');
    if (loader) loader.style.display = 'none'; // Hide loader if it exists
    if (portfolio) portfolio.classList.remove('hidden'); // Show portfolio if it exists
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
            if (!entry.isIntersecting) return;
            entry.target.classList.add('fade-in-visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Flag to check if video has been shown
let videoShown = false;
let redirectUrl = ""; // To store the URL for redirection

// Function to show the intro video modal
function showIntroVideo(url) {
    const introVideoModal = document.querySelector('.intro-video');
    const video = introVideoModal ? introVideoModal.querySelector('video') : null;

    // Show video only if not shown or closed previously
    if (!videoShown && introVideoModal && video) {
        introVideoModal.classList.remove('hidden'); // Show the video modal
        videoShown = true; // Set the flag to true
        redirectUrl = url; // Store the URL for redirection

        video.play(); // Play the video

        // Wait for the video to finish before redirecting
        video.addEventListener('ended', redirectAfterVideo, { once: true });
    }
}

// Function to redirect after video ends and reset videoShown
function redirectAfterVideo() {
    if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect after video ends
        videoShown = false; // Reset the flag for future clicks
    }
}

// Function to close the video modal
const closeVideoButton = document.getElementById('closeVideo');
if (closeVideoButton) {
    closeVideoButton.addEventListener('click', function() {
        const introVideoModal = document.querySelector('.intro-video');
        const video = introVideoModal ? introVideoModal.querySelector('video') : null;

        if (introVideoModal) {
            introVideoModal.classList.add('hidden'); // Hide the video modal
        }
        if (video) {
            video.pause(); // Pause the video when closing
            video.currentTime = 0; // Reset to the beginning
        }
        redirectUrl = ""; // Clear the redirect URL
        videoShown = false; // Reset the flag so the video can be shown again
    });
}

// Add event listeners to all project buttons
const projectButtons = document.querySelectorAll('.project-link'); // Select all project buttons
projectButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action
        showIntroVideo(this.href); // Pass the button's link to the function
    });
});
