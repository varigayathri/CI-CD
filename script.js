// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('CI/CD Demo App initialized');
    
    // Initialize all functionality
    initNavigation();
    initClickCounter();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all nav links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Click counter functionality
function initClickCounter() {
    let clickCount = 0;
    const clickBtn = document.getElementById('clickBtn');
    const clickCountDisplay = document.getElementById('clickCount');
    
    if (clickBtn && clickCountDisplay) {
        // Load saved count from localStorage
        const savedCount = localStorage.getItem('clickCount');
        if (savedCount) {
            clickCount = parseInt(savedCount);
            clickCountDisplay.textContent = `Clicks: ${clickCount}`;
        }
        
        clickBtn.addEventListener('click', function() {
            clickCount++;
            clickCountDisplay.textContent = `Clicks: ${clickCount}`;
            
            // Save to localStorage
            localStorage.setItem('clickCount', clickCount.toString());
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show celebration for milestones
            if (clickCount % 10 === 0) {
                showCelebration();
            }
        });
    }
}

// Celebration animation
function showCelebration() {
    const celebration = document.createElement('div');
    celebration.textContent = '🎉 Milestone reached! 🎉';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 1000;
        animation: celebrationPop 2s ease-out forwards;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    // Add celebration animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrationPop {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(celebration);
    
    // Remove after animation
    setTimeout(() => {
        document.body.removeChild(celebration);
        document.head.removeChild(style);
    }, 2000);
}

// Initialize animations and interactions
function initAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// Utility functions
function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

function logActivity(message) {
    console.log(`[${getCurrentTime()}] ${message}`);
}

// Add some interactive features
document.addEventListener('keydown', function(e) {
    // Easter egg: Press 'D' for debug info
    if (e.key.toLowerCase() === 'd') {
        logActivity('Debug mode activated');
        console.log('App State:', {
            currentSection: document.querySelector('.section.active')?.id || 'none',
            clickCount: localStorage.getItem('clickCount') || '0',
            timestamp: new Date().toISOString()
        });
    }
});

// Simple form validation example (if needed later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        getCurrentTime
    };
}
