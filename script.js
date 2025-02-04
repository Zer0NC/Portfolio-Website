document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
  
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
      });
  
      // Close menu when a link is clicked
      document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('is-active');
          navMenu.classList.remove('is-active');
        });
      });
    }

    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Navbar animation
        const nav = document.querySelector('nav');
        if (nav) {
            gsap.from(nav, {
                y: '-100%',
                duration: 1,
                ease: 'power3.out'
            });
        }

        // Home section animation
        const homeContent = document.querySelector('#home .home-content');
        if (homeContent) {
            gsap.from(homeContent, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        }

        // About section animation
        const aboutContent = document.querySelector('#about .about-content');
        if (aboutContent) {
            gsap.from(aboutContent, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 80%'
                }
            });
        }

        // Projects animation
        const projects = document.querySelectorAll('.project-card');
        if (projects.length) {
            gsap.from(projects, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '#projects',
                    start: 'top 80%'
                }
            });
        }

        // Contact form animation
        const contactForm = document.querySelector('#contact-form');
        if (contactForm) {
            gsap.from(contactForm, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top 80%'
                }
            });
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering
    const tabButtons = document.querySelectorAll('.tab-button');
    const projectCards = document.querySelectorAll('.project-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Replace with your actual Discord webhook URL
            const webhookUrl = 'YOURWEBHOOK';

            const embedData = {
                embeds: [{
                    title: 'Neue Kontaktformular-Einreichung',
                    color: 0xffbf00,
                    fields: [
                        { name: 'Name', value: name },
                        { name: 'Email', value: email },
                        { name: 'Message', value: message }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            try {
                if (!webhookUrl) {
                    throw new Error('No webhook URL configured');
                }

                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(embedData),
                });

                if (response.ok) {
                    showNotification('success', 'Nachricht wurde gesendet. Ich melde mich bei dir.');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('error', `Message failed. ${error.message}`);
            }
        });
    }

    // Function to show custom notifications
    function showNotification(type, message) {
        const notificationContainer = document.createElement('div');
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.top = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.padding = '15px 20px';
        notificationContainer.style.borderRadius = '5px';
        notificationContainer.style.color = '#fff';
        notificationContainer.style.fontWeight = 'bold';
        notificationContainer.style.zIndex = '1000';
        notificationContainer.style.display = 'flex';
        notificationContainer.style.alignItems = 'center';
        notificationContainer.style.maxWidth = '300px';
        notificationContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        const icon = document.createElement('i');
        icon.style.marginRight = '10px';
        icon.style.fontSize = '1.2em';

        if (type === 'success') {
            notificationContainer.style.backgroundColor = '#1dd05d';
            icon.className = 'fa-solid fa-circle-info';
        } else {
            notificationContainer.style.backgroundColor = '#f91536';
            icon.className = 'fa-solid fa-circle-exclamation';
        }

        notificationContainer.appendChild(icon);
        notificationContainer.appendChild(document.createTextNode(message));

        document.body.appendChild(notificationContainer);

        setTimeout(() => {
            notificationContainer.style.opacity = '0';
            notificationContainer.style.transition = 'opacity 0.5s ease-out';
            setTimeout(() => {
                document.body.removeChild(notificationContainer);
            }, 500);
        }, 5000);
    }

    // Counter animation
    const counters = document.querySelectorAll(".count");

    counters.forEach((counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-count");
            const current = +counter.innerText;

            const increment = Math.ceil(target / 100);

            if (current < target) {
                counter.innerText = current + increment;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
});
