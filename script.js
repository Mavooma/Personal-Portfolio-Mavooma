document.addEventListener('DOMContentLoaded', function() {
    setupLoader();
    setupNameToggle();
    setupScrollAnimation();

    // Navbar toggle
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarLinks = document.querySelector('.navbar-links');
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('collapsed');
        navbarLinks.classList.toggle('expanded');
    });

    // Portfolio + video logic
    handleOnclickRedirect();

    // ✅ Auto-show intro video modal on first visit
    autoShowIntroVideo();

    // Mobile card popup
    const cards = document.querySelectorAll('.card');
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (isTouch) {
        cards.forEach(card => {
            card.addEventListener('click', function (e) {
                // Don’t toggle if the user tapped a button/link
                if (e.target.closest('.btn, a, button')) return;

                const wasActive = card.classList.contains('active');
                cards.forEach(c => c.classList.remove('active'));
                if (!wasActive) card.classList.add('active');
            });
        });

        // Tap outside closes popup
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.card')) {
                cards.forEach(c => c.classList.remove('active'));
            }
        }, { passive: true });
    }
});

// Loader
function setupLoader() {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        const portfolio = document.querySelector('.portfolio');
        if (loader) loader.style.display = 'none';
        if (portfolio) portfolio.classList.remove('hidden');
    }, 5000);
}

// Toggle names
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

// Scroll animation
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
