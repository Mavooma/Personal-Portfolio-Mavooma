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

// Get modal and close button elements
const introVideoModal = document.getElementById("introVideoModal");
const closeVideoButton = document.getElementById("closeVideo");

// Select all portfolio links
const portfolioLinks = document.querySelectorAll(".project .btn");

// Function to show the video modal
function showVideoModal(event) {
    event.preventDefault(); // Prevent the default link behavior
    introVideoModal.classList.remove("hidden"); // Show the modal
}

// Attach event listeners to each portfolio link to show the video modal on click
portfolioLinks.forEach((link) => {
    link.addEventListener("click", showVideoModal);
});

// Hide modal when clicking the close button
closeVideoButton.addEventListener("click", () => {
    introVideoModal.classList.add("hidden");
});

