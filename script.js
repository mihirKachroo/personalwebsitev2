// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
body.classList.toggle('light-mode', currentTheme === 'light');

// Update theme toggle icon based on current theme
const sunIcon = themeToggle.querySelector('.sun-icon');
const moonIcon = themeToggle.querySelector('.moon-icon');

if (currentTheme === 'light') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
} else {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    // Update icon visibility
    if (isLightMode) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
});

// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav links
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show selected page
        const targetPage = link.getAttribute('data-page');
        const targetPageElement = document.getElementById(`${targetPage}-page`);
        if (targetPageElement) {
            targetPageElement.classList.add('active');
        }
    });
});

// Name link functionality
const nameLink = document.querySelector('.name-link');
if (nameLink) {
    nameLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Switch to about page
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        document.querySelector('[data-page="about"]').classList.add('active');
        
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById('about-page').classList.add('active');
    });
}

// CTA button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Switch to projects page
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        document.querySelector('[data-page="projects"]').classList.add('active');
        
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById('projects-page').classList.add('active');
    });
}

// Search functionality for projects
const searchInput = document.querySelector('.search-bar input');
const projectCards = document.querySelectorAll('.project-card');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Refresh icon animation
const refreshIcon = document.querySelector('.refresh-icon');
if (refreshIcon) {
    refreshIcon.addEventListener('click', () => {
        refreshIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            refreshIcon.style.transform = 'rotate(0deg)';
        }, 500);
    });
}

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add some interactive hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-3px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Alt + K for theme toggle
    if (e.altKey && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Alt + 1, 2, 3 for page navigation
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('[data-page="about"]').click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('[data-page="projects"]').click();
                break;
            case '3':
                e.preventDefault();
                document.querySelector('[data-page="writing"]').click();
                break;
        }
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Personal website loaded successfully!');
    
    // Add a subtle animation to the signature
    const signature = document.querySelector('.signature-text');
    if (signature) {
        signature.style.opacity = '0';
        signature.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            signature.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            signature.style.opacity = '1';
            signature.style.transform = 'translateY(0)';
        }, 1000);
    }
});
