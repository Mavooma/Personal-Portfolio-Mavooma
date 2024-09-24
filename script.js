document.addEventListener('DOMContentLoaded', function() {
    // Toggling names
    const nameElement = document.querySelector('.name'); // Use querySelector for class
    let names = ['Vuyelwa', 'Mavooma'];
    let index = 0;

    function toggleName() {
        nameElement.textContent = names[index];
        index = (index + 1) % names.length; // Switch between names
    }

    // Initial call
    toggleName();
    
    // Change name every 2 seconds
    setInterval(toggleName, 2000);

    // Animate on scroll effect
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,  // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Adjust for earlier/later trigger
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
