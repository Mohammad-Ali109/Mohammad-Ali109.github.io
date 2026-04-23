// ======================================================
// Web3Forms Configuration
// 1. Go to https://web3forms.com
// 2. Enter mdali102837@gmail.com and click "Create Access Key"
// 3. Check your Gmail inbox for the key
// 4. Paste it below replacing YOUR_ACCESS_KEY
// ======================================================
const WEB3FORMS_ACCESS_KEY = "28dd7414-9eed-4bb1-8e4c-71452d3224ef";

document.addEventListener('DOMContentLoaded', () => {

    // --- Contact Form (Web3Forms) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const btnText    = document.getElementById('btnText');
            const btnIcon    = document.getElementById('btnIcon');
            const btnLoader  = document.getElementById('btnLoader');
            const submitBtn  = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');

            // Show loading state
            btnText.style.display   = 'none';
            btnIcon.style.display   = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.disabled      = true;
            formStatus.textContent  = '';

            const formData = {
                access_key : WEB3FORMS_ACCESS_KEY,
                name       : document.getElementById('name').value,
                email      : document.getElementById('email').value,
                message    : document.getElementById('message').value,
                subject    : "New Portfolio Contact from " + document.getElementById('name').value,
                from_name  : "Portfolio Website"
            };

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method  : 'POST',
                    headers : { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body    : JSON.stringify(formData)
                });
                const result = await response.json();

                if (result.success) {
                    formStatus.style.color  = '#38bdf8';
                    formStatus.textContent  = '✅ Message sent! I\'ll reply to you soon.';
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                console.error('Web3Forms error:', error);
                formStatus.style.color  = '#f87171';
                formStatus.textContent  = '❌ Failed to send. Please email mdali102837@gmail.com directly.';
            } finally {
                btnText.style.display   = 'inline';
                btnIcon.style.display   = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled      = false;
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Sticky Navbar & Active Link ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const words = [
        "Data Analyst",
        "Business Intelligence Developer",
        "Statistical Modeller",
        "Bioinformatician"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);

    // --- Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    function startCounting() {
        if (hasCounted) return;

        const statsSection = document.querySelector('.about-stats');
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + "+";
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCounter();
            });
            hasCounted = true;
        }
    }
    window.addEventListener('scroll', startCounting);

    // --- Skill Bars Animation ---
    const progressSpans = document.querySelectorAll('.progress-line span');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos - 100) {
            progressSpans.forEach(span => {
                span.style.width = span.getAttribute('data-width');
            });
            skillsAnimated = true;
        }
    }
    window.addEventListener('scroll', animateSkills);

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for transition
                }
            });
        });
    });

    // --- Initialize Particles.js ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#38bdf8"
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#818cf8",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
});
