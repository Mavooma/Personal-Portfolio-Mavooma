document.addEventListener('DOMContentLoaded', function() {
    setupLoader();
    setupNameToggle();
    setupScrollAnimation();

    // Select the toggle button and the navbar links container
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarLinks = document.querySelector('.navbar-links');

    // Add a click event listener to toggle the 'collapsed' class
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('collapsed');
        navbarLinks.classList.toggle('expanded');
    });
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

const handleOnclickRedirect = () => {

    const projects = document.querySelectorAll('.card-project');
    projects.forEach(project => {
    project.addEventListener('click', function() {

        // Check if the user has visited the site before
        const videoIntroStatus = localStorage.getItem('visited');


        if(videoIntroStatus){ //check if visited exists or not
            
            window.location.href = 'https://github.com/techgirlshub/TechGirlsHub-Website';
        }
        else {
                         
            localStorage.setItem('visited', 'true');
            const videoModal = new bootstrap.Modal(document.getElementById('videoModal'), {
                backdrop: 'static', // This prevents closing the modal when clicking on the backdrop
                keyboard: false // Prevents closing the modal with the keyboard (Esc key)
            });
            const video = document.getElementById('introVideo');
            
            // Reset video to the beginning when opening modal
            video.currentTime = 0;
            video.play();

            // Show the modal
            videoModal.show();

            // Ensure video ends
            video.addEventListener('ended', function() {
                // Redirect to the landing page
                window.location.href = 'https://github.com/techgirlshub/TechGirlsHub-Website';
            }, { once: true }); // Using `once` to ensure it only runs once
        }
    });
});
}

handleOnclickRedirect();

const dismissModal = () => {

    const closeModal = document.querySelector('.dismiss-btn');
    closeModal.addEventListener('click', function (){
        window.location.href = 'https://github.com/techgirlshub/TechGirlsHub-Website';
    });
}

dismissModal();

// Add event listener to the contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('.submit-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Get form data
    const formData = new FormData(this);

    // Send form data using fetch
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Thank you! Your message has been sent successfully.');
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
