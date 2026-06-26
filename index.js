// Get elements
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const body = document.body;

        // Open menu
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            body.classList.add('menu-open');
        });

        // Close menu function
        function closeMenuFunc() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    

        // Close menu on X button
        closeMenu.addEventListener('click', closeMenuFunc);

        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMenuFunc);
        // overlay.addEventListener('click', closeMenuFunc);

        // Close menu when clicking a link (optional, for better UX)
        const navLinks = sidebar.querySelectorAll('nav li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    closeMenuFunc();
                }
            });
        });

        // Function to animate counting
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 4); // 60fps (16ms per frame)
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 4);
}

// Intersection Observer to trigger animation when section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target, 1000); // 1 second duration - FAST!
            });
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe the stats section
const statsSection = document.querySelector('.stats-section');
observer.observe(statsSection);