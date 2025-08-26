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

// Portfolio click + intro video modal
function handleOnclickRedirect() {
    const projectLinks = document.querySelectorAll('.card-project, .card-project-demo'); // both buttons
    const videoModalEl = document.getElementById('videoModal');
    const videoModal = new bootstrap.Modal(videoModalEl, {
        backdrop: 'static',
        keyboard: false
    });
    const video = document.getElementById('introVideo');
    const closeBtn = document.querySelector('.dismiss-btn');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.href;

            const visited = localStorage.getItem('visited');

            if (visited) {
                window.location.href = targetUrl;
            } else {
                localStorage.setItem('visited', 'true');

                video.currentTime = 0;
                video.play();
                videoModal.show();

                video.addEventListener('ended', () => {
                    window.location.href = targetUrl;
                }, { once: true });

                closeBtn.addEventListener('click', () => {
                    window.location.href = targetUrl;
                }, { once: true });
            }
        });
    });
}
