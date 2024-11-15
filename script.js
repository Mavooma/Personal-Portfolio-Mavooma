document.addEventListener('DOMContentLoaded', function() {
    setupLoader();
    setupNameToggle();
    setupScrollAnimation();
    setupVideoHandlers();
    setupProjectLinks();
    const modal = document.getElementById('introVideoModal');
    const closeButton = document.getElementById('closeModal');
    const player = document.getElementById('youtubePlayer');

    // Function to close the modal
    function closeModal() {
        modal.classList.add('hidden');
        // Stop the video when closing the modal
        if (player) {
            player.src = player.src;
        }
    }

    // Add click event listener to close button
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Optional: Close modal when clicking outside the video content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Select the toggle button and the navbar links container
const toggleButton = document.querySelector('.navbar-toggler');
const navbarLinks = document.querySelector('.navbar-links');

// Add a click event listener to toggle the 'collapsed' class
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('collapsed');
    navbarLinks.classList.toggle('expanded');
});

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
let isRedirecting = false;

// Setup event listeners for video modal
function setupVideoHandlers() {
    const closeVideoButton = document.getElementById('closeModal');
        closeVideoButton.addEventListener('click', closeIntroVideo);
}

// Show the intro video modal
function showIntroVideo(url) {
    if (videoShown) return;

    const modal = document.getElementById('introVideoModal');
    if (modal) {
        modal.classList.remove('hidden');
        videoShown = true; 
        redirectUrl = url;
        
        // Add a "Continue to Project" button
        const videoContent = modal.querySelector('.video-content');
        if (!videoContent.querySelector('.continue-btn')) {
            const continueBtn = document.createElement('button');
            continueBtn.className = 'btn continue-btn';
            continueBtn.textContent = 'Continue to Project';
            continueBtn.onclick = handleRedirect;
            videoContent.appendChild(continueBtn);
        }
        
        // Reinitialize the player each time we show the video
        if (player) {
            player.destroy();
            player = null;
        }
        initializePlayer();
    } 
}

// Update the player initialization
function initializePlayer() {
    const videoId = 'Fm9pd648vH4';
    
    // Create a new iframe element
    const iframe = document.createElement('iframe');
    iframe.id = 'youtubePlayer';
    iframe.width = '560';
    iframe.height = '315';
    
    // Replace any existing player
    const container = document.querySelector('.video-container');
    container.innerHTML = '';
    container.appendChild(iframe);
    
    // Initialize new player with autoplay explicitly set to 0
    player = new YT.Player('youtubePlayer', {
        height: '315',
        width: '560',
        videoId: videoId,
        playerVars: {
            'autoplay': 0,  // This ensures no autoplay
            'controls': 1,
            'rel': 0,
            'playsinline': 1,
            'mute': 0       // Ensure the video isn't muted
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

// This function is triggered when the player's state changes
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED && redirectUrl) {
        window.location.href = redirectUrl;
    }
}

// Update close video function to handle redirect separately
function closeIntroVideo() {
    const modal = document.getElementById('introVideoModal');
    modal.classList.add('hidden');
    player?.stopVideo(); // Stop video when modal is closed
}

// Add this new function to handle the redirect button click
function handleRedirect() {
    isRedirecting = true;
    closeIntroVideo();
}

// Set up event listeners on project links
function setupProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const url = this.getAttribute('href');

            if (!videoShown) {
                showIntroVideo(url);
            } else {
                window.location.href = url;
            }
        });
    });
}

// Call this to initialize the necessary event listeners
function init() {
    setupVideoHandlers();
    setupProjectLinks();
}

// Run initialization
init();

// Add this function to handle form submission
function sendEmail(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = document.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Get form data
    const formData = new FormData(document.getElementById('contactForm'));

    // Send form data using fetch
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Thank you! Your message has been sent successfully.');
            document.getElementById('contactForm').reset();
        } else {
            alert(data.message || 'Something went wrong. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });

    return false;
}

// Add event listener to the form
document.getElementById('contactForm').addEventListener('submit', sendEmail);

// Add newsletter form handling
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Signing up...';
    submitButton.disabled = true;

    // Get form data
    const formData = new FormData(this);

    // Send form data using fetch
    fetch('process_newsletter.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        } else {
            alert(data.message || 'Something went wrong. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});