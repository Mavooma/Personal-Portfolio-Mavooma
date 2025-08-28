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

/* Loader */
function setupLoader() {
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        const portfolio = document.querySelector('.portfolio');
        if (loader) loader.style.display = 'none';
        if (portfolio) portfolio.classList.remove('hidden');
    }, 5000);
}

/* Toggle names */
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

/* Scroll animation */
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

/*  Dummy Form Logic */
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
  "what is her favorite color": "💜 My favorite color is purple.",
  "what is her favorite programming language": "💻 I really enjoy working with JavaScript and React.",
  "what is she currently studying": "📚 I’m currently focusing on front-end development and responsive design.",
  "who is vuyelwa mavuma": "🙋🏽‍♀️ Vuyelwa Mavuma is a passionate front-end developer showcasing her portfolio here.",
  "what is her favorite hobby": "🎨 I love designing and creating interactive web experiences.",
  "what projects has she worked on": "🛠️ I’ve worked on web portfolios, email templates, virtual assistant platforms, and more.",
  "does she enjoy coding": "💡 Absolutely! Coding allows me to bring ideas to life and solve problems creatively.",
  "what are her strengths": "⚡ I’m detail-oriented, creative, and enjoy building responsive, user-friendly websites.",
  "what are her goals": "🚀 My goal is to become a senior front-end developer and contribute to innovative web projects.",
  "what is her experience with javascript": "🖥️ I have hands-on experience building interactive web apps using JavaScript, React, and APIs.",
  "does she like working in teams": "🤝 Yes! I enjoy collaborating with others and learning from different perspectives.",
  "what is her favorite framework": "⚛️ React is my favorite framework because of its flexibility and component-based architecture.",
  "what motivates her": "🌟 I’m motivated by learning new technologies and creating websites that people enjoy using.",
  "what kind of websites does she build": "💻 I build portfolios, responsive websites, and interactive web apps.",
  "how does she approach problem-solving": "🧩 I break problems into smaller parts, research solutions, and test until I find the best approach.",
  "does she enjoy design": "🎨 Yes! I love combining aesthetics with functionality in web design.",
  "what inspires her": "✨ I’m inspired by innovative web projects, creative developers, and the endless possibilities of coding.",
  "what is her preferred development tool": "🛠️ I mostly work with VS Code because it’s lightweight and has great extensions for web development.",
  "how can someone contact her": "📧 You can reach me via the contact form or email listed in my portfolio."
};

const chatWindow = document.getElementById("chatWindow");
const askForm = document.getElementById("askForm");
const questionInput = document.getElementById("questionInput");

// Function to handle bot response naturally
function FunctionKitBotResponse(input) {
  const cleanedInput = input.trim().toLowerCase().replace(/\?$/, ""); // Remove trailing question mark

  // First, try exact match
  if (qaDatabase[cleanedInput]) {
    return qaDatabase[cleanedInput];
  }

  // Optional: keyword-based matching
  for (let key in qaDatabase) {
    if (cleanedInput.includes(key)) {
      return qaDatabase[key];
    }
  }

  return "❓ Sorry, I don’t know that yet!";
}

askForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;

  // Add user message
  addMessage(question, "user");

  // Simulate bot "typing..."
  setTimeout(() => {
    const answer = FunctionKitBotResponse(question);
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

document.addEventListener("DOMContentLoaded", function () {
  // Select all major content blocks
  const revealElements = document.querySelectorAll(
    "section, .card, .text-content, .image-content, article, img, h2, h3, p"
  );

  // Add the 'reveal' class to each
  revealElements.forEach(el => el.classList.add("reveal"));

  // Intersection Observer
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => appearOnScroll.observe(el));
});
