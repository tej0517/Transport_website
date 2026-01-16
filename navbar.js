// navbar.js
function toggleSidebar() {
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
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const body = document.querySelector('body');
    if (sidebar) {
        sidebar.classList.remove('open');
        body.style.overflowY = 'auto'; // Enable vertical scrolling
    }
}

// Make functions available globally
window.toggleSidebar = toggleSidebar;
window.hideSidebar = hideSidebar;