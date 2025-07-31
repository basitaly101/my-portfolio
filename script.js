// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== LOCOMOTIVE SCROLL ==========
    const scroll = new LocomotiveScroll({
        el: document.querySelector('.scroll-container'),
        smooth: true
    });

    // ========== CURSOR ANIMATION ==========
    function updateCirclePosition(x, y, xscale = 1, yscale = 1) {
        document.querySelector('#minicircle').style.transform = `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;
    }

    function circleChaptaKaro() {
        let xscale = 1;
        let yscale = 1;
        let xprev = 0;
        let yprev = 0;
        let timeout;

        window.addEventListener('mousemove', function(dets) {
            clearTimeout(timeout);

            xscale = gsap.utils.clamp(0.8, 1.2, (dets.clientX - xprev) / 100);
            yscale = gsap.utils.clamp(0.8, 1.2, (dets.clientY - yprev) / 100);

            xprev = dets.clientX;
            yprev = dets.clientY;

            updateCirclePosition(dets.clientX, dets.clientY, xscale, yscale);

            timeout = setTimeout(() => {
                document.querySelector('#minicircle').style.transform =
                    `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
            }, 100);
        });
    }

    function circleMouseFollower() {
        window.addEventListener('mousemove', (dets) => {
            updateCirclePosition(dets.clientX, dets.clientY);
        });
    }

    circleChaptaKaro();
    circleMouseFollower();

    // ========== PAGE ANIMATIONS ==========
    function firstPageAnim() {
        let tl = gsap.timeline();

        tl.from('.navbar', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.inOut'
        })
        .to('.boundingelem', {
            y: 0,
            ease: 'expo.inOut',
            duration: 2,
            delay: -1,
            stagger: 0.2
        })
        .from('#herofooter', {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: 'expo.inOut'
        });
    }

    firstPageAnim();

    // ========== NAVBAR ANIMATIONS & FUNCTIONALITY ==========
    // On Load Animation
    window.addEventListener('load', () => {
        gsap.from('.navbar', {
            y: -80,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.3
        });

        gsap.from('.navbar .nav-links li', {
            y: -20,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            delay: 0.6,
            ease: 'power2.out'
        });

        gsap.from('#hamburger', {
            y: -20,
            opacity: 0,
            duration: 1,
            delay: 1,
            ease: 'power2.out'
        });
    });

    // Navbar scroll effect with background and shadow changes
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 20) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.7)';
        } else {
            navbar.style.background = 'var(--dark-bg)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        }
    });

    // Mobile Navigation with hamburger animation
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const navLinks = document.querySelectorAll('.sidebar .nav-links a');

    // Toggle sidebar with hamburger animation
    hamburger.addEventListener('click', () => {
        sidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        hamburger.classList.add('active');
    });

    // Close sidebar and reset hamburger
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.classList.remove('active');
    });

    // Close sidebar when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.classList.remove('active');
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && e.target !== hamburger) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.classList.remove('active');
        }
    });

    // ========== PROJECT HOVER EFFECTS ==========
    document.querySelectorAll('.elem').forEach((elem) => {
        let rotate = 0;
        let diffrot = 0;
        const img = elem.querySelector('img');

        elem.addEventListener('mouseleave', () => {
            gsap.to(img, {
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
        });

        elem.addEventListener('mousemove', (dets) => {
            const rect = elem.getBoundingClientRect();
            const diff = dets.clientY - rect.top;
            diffrot = dets.clientX - rotate;
            rotate = dets.clientX;

            gsap.to(img, {
                opacity: 1,
                top: diff,
                left: dets.clientX - rect.left,
                rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
                ease: 'power3.out'
            });
        });
    });

    // ========== FORM HANDLING ==========
    // Initialize EmailJS (replace with your actual credentials)
    emailjs.init('YOUR_PUBLIC_KEY');

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const params = {
                from_name: document.getElementById('client-name').value,
                email_id: document.getElementById('client-email').value,
                service_needed: document.getElementById('client-service').value,
                budget: document.getElementById('client-budget').value,
                message: document.getElementById('client-message').value
            };

            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params)
                .then(() => {
                    // Show success message
                    const statusElement = document.getElementById('form-status');
                    statusElement.textContent = 'Message sent successfully!';
                    statusElement.style.display = 'block';
                    statusElement.style.color = '#4CAF50';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        statusElement.style.display = 'none';
                    }, 5000);
                }, (error) => {
                    // Show error message
                    const statusElement = document.getElementById('form-status');
                    statusElement.textContent = 'Failed to send message. Please try again.';
                    statusElement.style.display = 'block';
                    statusElement.style.color = '#f44336';
                });
        });
    }

    // Freelance form popup
    const freelanceSubmit = document.getElementById('freelance-submit');
    if (freelanceSubmit) {
        freelanceSubmit.addEventListener('click', function() {
            const popup = document.getElementById('submit-popup');
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        });
    }
});
