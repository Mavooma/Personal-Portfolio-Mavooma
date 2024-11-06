document.addEventListener('DOMContentLoaded', function() {
    setupToggleMenu();
    setupLoader();
    setupNameToggle();
    setupScrollAnimation();
    setupVideoHandlers();
    setupProjectLinks();
});

// Toggle the visibility of the navbar links on mobile
function setupToggleMenu() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function () {
            const navbarLinks = document.getElementById('navbarLinks');
            if (navbarLinks) navbarLinks.classList.toggle('show'); // Toggle CSS class
            console.log('Toggle clicked');
        });
    }
}

// JavaScript to hide the loader after 5 seconds
function setupLoader() {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        const portfolio = document.querySelector('.portfolio');
        if (loader) loader.style.display = 'none'; // Hide loader if it exists
        if (portfolio) portfolio.classList.remove('hidden'); // Show portfolio if it exists
    }, 5000); // Adjust time as needed
}

// Toggle between names every 2 seconds
function setupNameToggle() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        let names = ['Vuyelwa', 'Mavooma'];
        let index = 0;

        function toggleName() {
            nameElement.textContent = names[index];
            index = (index + 1) % names.length;
        }

        toggleName();
        setInterval(toggleName, 2000);
    }
}

// Animate elements on scroll
function setupScrollAnimation() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    faders.forEach(fader => appearOnScroll.observe(fader));
}

// Flag to check if video has been shown
let videoShown = false;
let redirectUrl = "";

// Handle the intro video modal and redirection
function setupVideoHandlers() {
    const closeVideoButton = document.getElementById('closeVideo');
    if (closeVideoButton) {
        closeVideoButton.addEventListener('click', closeIntroVideo);
    }
}

// Function to show the intro video modal
function showIntroVideo(url) {
    const introVideoModal = document.querySelector('.intro-video');
    const video = introVideoModal ? introVideoModal.querySelector('video') : null;

    if (!videoShown && introVideoModal && video) {
        introVideoModal.classList.remove('hidden');
        videoShown = true;
        redirectUrl = url;
        video.play();
        video.addEventListener('ended', redirectAfterVideo, { once: true });
    }
}

// Redirect after video ends
function redirectAfterVideo() {
    if (redirectUrl) {
        window.location.href = redirectUrl;
        videoShown = false;
    }
}

// Close the intro video modal
function closeIntroVideo() {
    const introVideoModal = document.querySelector('.intro-video');
    const video = introVideoModal ? introVideoModal.querySelector('video') : null;

    if (introVideoModal) introVideoModal.classList.add('hidden');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    redirectUrl = "";
    videoShown = false;
}

// Add event listeners to all project buttons
function setupProjectLinks() {
    const projectButtons = document.querySelectorAll('.project-link');
    projectButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showIntroVideo(this.href);
        });
    });
}
