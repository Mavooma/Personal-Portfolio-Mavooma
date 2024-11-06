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
            if (navbarLinks) navbarLinks.classList.toggle('show');
            console.log('Toggle clicked');
        });
    }
}

// JavaScript to hide the loader after 5 seconds
function setupLoader() {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        const portfolio = document.querySelector('.portfolio');
        if (loader) loader.style.display = 'none';
        if (portfolio) portfolio.classList.remove('hidden');
    }, 5000); // Adjust time as needed
}

// Toggle between names every 2 seconds
function setupNameToggle() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const names = ['Vuyelwa', 'Mavooma'];
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
let player;

// Setup event listeners for video modal
function setupVideoHandlers() {
    const closeVideoButton = document.getElementById('closeVideo');
    if (closeVideoButton) {
        closeVideoButton.addEventListener('click', function() {
            console.log('Close button clicked');  // Debugging log
            closeIntroVideo();
        });
    }
}

// Show the intro video modal
function showIntroVideo(url) {
    const introVideoModal = document.querySelector('.intro-video');
    const iframe = introVideoModal ? introVideoModal.querySelector('iframe') : null;

    if (!videoShown && introVideoModal && iframe) {
        introVideoModal.classList.remove('hidden');
        videoShown = true;
        redirectUrl = url;

        // If player is not initialized, initialize it
        if (!player) {
            onYouTubePlayerAPIReady();
        } else {
            player.playVideo();  // If player is already initialized, just play it
        }
    }
}

// Function to close the intro video modal
function closeIntroVideo() {
    console.log("Closing intro video...");
    const introVideoModal = document.querySelector('.intro-video');
    const video = introVideoModal ? introVideoModal.querySelector('iframe') : null;

    if (introVideoModal) introVideoModal.classList.add('hidden'); // Hide modal
    if (video) {
        player.stopVideo(); // Stop the video properly
    }

    redirectUrl = "";
    videoShown = false;
}

// YouTube Player API will call this function when it's ready
function onYouTubePlayerAPIReady() {
    // Initialize the player once the API is ready
    const player = new YT.Player('youtubePlayer', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// Detect video state changes and perform actions when video ends
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        redirectAfterVideo();
    }
}

// Redirect after video ends
function redirectAfterVideo() {
    if (redirectUrl) {
        console.log("Redirecting to: " + redirectUrl); // Debugging log
        window.location.href = redirectUrl; // Redirect after video ends
        videoShown = false;
    }
}

// Set up event listeners on project links
function setupProjectLinks() {
    const projectButtons = document.querySelectorAll('.project-link');
    projectButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            showIntroVideo(this.href);
        });
    });
}