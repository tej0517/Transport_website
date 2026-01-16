// transport.js - Footer and Navbar loader with common functionality

document.addEventListener('DOMContentLoaded', function() {
    // Load Navbar and Footer
    loadNavbar();
    loadFooter();
});

/**
 * Function to load the navbar from navbar.html
 */
function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load navbar');
                }
                return response.text();
            })
            .then(html => {
                navbarContainer.innerHTML = html;
                console.log('Navbar loaded successfully');
                
                // Initialize navbar behavior after loading
                initNavbarBehavior();
                
                // Load sidebar functions AFTER navbar is loaded
                setTimeout(loadSidebarFunctions, 100);
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
                navbarContainer.innerHTML = '<p class="text-center text-muted py-3">Navbar could not be loaded.</p>';
            });
    }
}

/**
 * Function to load the footer from footer.html
 */
function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    
    if (footerContainer) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load footer');
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
                console.log('Footer loaded successfully');
                
                // Initialize any footer-specific scripts after loading
                initFooterScripts();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerContainer.innerHTML = '<p class="text-center text-muted py-3">Footer could not be loaded.</p>';
            });
    }
}

/**
 * Load sidebar toggle functions
 */
function loadSidebarFunctions() {
    // Make sure functions are defined globally
    if (typeof window.toggleSidebar === 'undefined') {
        window.toggleSidebar = function() {
            const sidebar = document.querySelector('.sidebar');
            const body = document.querySelector('body');
            if (sidebar) {
                sidebar.classList.toggle('open');
                
                if (sidebar.classList.contains('open')) {
                    body.style.overflowY = 'hidden'; // Disable vertical scrolling
                } else {
                    body.style.overflowY = 'auto'; // Enable vertical scrolling
                }
            }
        };
    }
    
    if (typeof window.hideSidebar === 'undefined') {
        window.hideSidebar = function() {
            const sidebar = document.querySelector('.sidebar');
            const body = document.querySelector('body');
            if (sidebar) {
                sidebar.classList.remove('open');
                body.style.overflowY = 'auto'; // Enable vertical scrolling
            }
        };
    }
    
    console.log('Sidebar functions loaded');
}

/**
 * Initialize navbar behavior - active states
 */
function initNavbarBehavior() {
    // Highlight active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-section a');
    
    navLinks.forEach(link => {
        // Remove active from all
        link.classList.remove('active');
        
        // Add active if matches current page
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === 'index.html' && href === './') ||
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Handle Partner dropdown active state
    const partnerPages = ['travelweb-partner.html', 'travelweb-partner-fleet.html'];
    if (partnerPages.includes(currentPage)) {
        const partnerDropdown = document.querySelector('.dropdown a');
        if (partnerDropdown) {
            partnerDropdown.classList.add('active');
        }
    }
}

/**
 * Initialize any scripts that need to run after footer is loaded
 */
function initFooterScripts() {
    // Add current year to copyright if element exists
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Add active class to current page link in footer navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const footerLinks = document.querySelectorAll('#footer-container a');
    
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || href === './' + currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// =============================aboutus carousel js========================
// Only run if we're on the aboutus page
if (window.location.pathname.includes('travelweb-aboutus.html')) {
    const track = document.querySelector('.aboutus-carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.dot');

    let index = 0;

    function updateCarousel() {
        if (track) {
            track.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
    }

    if (dots && track) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                index = dot.getAttribute('data-index');
                updateCarousel();
            });
        });
    }
}