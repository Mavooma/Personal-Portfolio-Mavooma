document.addEventListener('DOMContentLoaded', function() {
    setupLoader();
    setupNameToggle();
    setupScrollAnimation();

    // Navbar toggle
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarLinks = document.querySelector('.navbar-links');

    if (toggleButton && navbarLinks) {
        toggleButton.addEventListener('click', () => {
            navbarLinks.classList.toggle('collapsed');
            navbarLinks.classList.toggle('expanded');
        });
    }

    // Portfolio + video logic
    handleOnclickRedirect();

    // ✅ Auto-show intro video modal on first visit
    autoShowIntroVideo();

    // Mobile card popup
    const cards = document.querySelectorAll('.card');
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (isTouch) {
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Don’t toggle if the user tapped a button/link
                if (e.target.closest('.btn, a, button')) return;

                const wasActive = card.classList.contains('active');
                cards.forEach(c => c.classList.remove('active'));
                if (!wasActive) card.classList.add('active');
            });
        });

        // Tap outside closes popup
        document.addEventListener(
            'click',
            function(e) {
                if (!e.target.closest('.card')) {
                    cards.forEach(c => c.classList.remove('active'));
                }
            },
            { passive: true }
        );
    }
});

/* -----------------------------
   Loader
----------------------------- */
function setupLoader() {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        const portfolio = document.querySelector('.portfolio');
        if (loader) loader.style.display = 'none';
        if (portfolio) portfolio.classList.remove('hidden');
    }, 5000);
}

/* -----------------------------
   Toggle names
----------------------------- */
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

/* -----------------------------
   Scroll animation
----------------------------- */
function setupScrollAnimation() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver(
        function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    faders.forEach(fader => appearOnScroll.observe(fader));
}

/* -----------------------------
   Dummy Form Logic
----------------------------- */
// Helper: show + auto-hide success messages
function showSuccessMessage(element) {
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000); // hides after 3 seconds
}

// Contact form
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessMessage(contactSuccess);
        contactForm.reset();
    });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showSuccessMessage(newsletterSuccess);
        newsletterForm.reset();
    });
}

const qaDatabase = {
  "what is her favorite color?": "💜 My favorite color is purple.",
  "what is her favorite programming language": "💻 I really enjoy working with JavaScript and React.",
  "what is she currently studying": "📚 I’m currently focusing on front-end development and responsive design.",
  "who is vuyelwa mavuma": "🙋🏽‍♀️ Vuyelwa Mavuma is a passionate front-end developer showcasing her portfolio here."
};

const chatWindow = document.getElementById("chatWindow");
const askForm = document.getElementById("askForm");
const questionInput = document.getElementById("questionInput");

askForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;

  // Add user message
  addMessage(question, "user");

  // Simulate bot "typing..."
  setTimeout(() => {
    const answer =
      qaDatabase[question.toLowerCase()] || "❓ Sorry, I don’t know that yet!";
    addMessage(answer, "bot");
  }, 600);

  questionInput.value = "";
});

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight; // auto-scroll
}