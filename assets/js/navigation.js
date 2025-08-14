/* =====================================
   NAVIGATION FUNCTIONALITY - Extracted from your current website
   ===================================== */

// Load navigation component into all pages
function loadNavigation() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.innerHTML = `
            <div class="nav-container">
                <div class="logo">DieBuddy</div>
                <div class="nav-links" id="navLinks">
                    <a href="../index.html" onclick="handleNavigation(event, '../index.html')">Home</a>
                    <a href="features.html" onclick="handleNavigation(event, 'features.html')">Features</a>
                    <a href="contact.html" onclick="handleNavigation(event, 'contact.html')">Contact</a>
                    <a href="privacy.html" onclick="handleNavigation(event, 'privacy.html')">Privacy Policy</a>
                </div>
                <div class="mobile-menu-toggle" id="mobileMenuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        // Set up mobile menu toggle
        setupMobileMenu();
        
        // Highlight current page
        highlightCurrentPage();
    }
}

// Handle navigation clicks with smooth transitions
function handleNavigation(event, url) {
    event.preventDefault();
    
    // Add loading state
    document.body.style.opacity = '0.8';
    
    // Navigate after brief transition
    setTimeout(() => {
        window.location.href = url;
    }, 150);
}

// Set up mobile menu functionality
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(currentPage) || 
           (currentPage === '' && href.includes('index.html')))) {
            link.style.color = '#b22222';
            link.style.fontWeight = 'bold';
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadNavigation();
    setupSmoothScrolling();
    
    // Add page transition effects
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
});

// Handle browser back/forward buttons for SPA-like behavior
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        // Handle state changes if implementing SPA functionality
        console.log('Navigation state changed:', event.state.page);
    }
});
