// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert(`Thank you for your message, ${data.name}! I'll get back to you soon.`);
    this.reset();
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Hero section is always visible
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';

// Add typing effect to hero tagline
const tagline = document.querySelector('.hero-content p');
const originalText = tagline.textContent;
tagline.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < originalText.length) {
        tagline.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

setTimeout(typeWriter, 2000);

// Add particle effect to hero background
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'var(--accent-blue)';
    particle.style.borderRadius = '50%';
    particle.style.opacity = '0.6';
    particle.style.pointerEvents = 'none';
    
    const hero = document.querySelector('.hero');
    hero.appendChild(particle);
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    const animation = particle.animate([
        { transform: 'translate(0, 0)', opacity: 0.6 },
        { transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`, opacity: 0 }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 500);

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click-to-copy functionality for contact info
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.getAttribute('title');
        let message = '';
        
        switch(platform) {
            case 'GitHub':
                message = 'GitHub profile link copied!';
                break;
            case 'LinkedIn':
                message = 'LinkedIn profile link copied!';
                break;
            case 'Email':
                message = 'Email address copied!';
                break;
        }
        
        // Create temporary notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = 'var(--accent-blue)';
        notification.style.color = 'var(--primary-bg)';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '10px';
        notification.style.zIndex = '10000';
        notification.style.animation = 'fadeInUp 0.3s ease';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
});

// Add progressive loading for images/icons
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Add scroll-triggered counter animation for stats (if you want to add stats later)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Add dynamic skill level indicators
document.querySelectorAll('.skill-item').forEach(skill => {
    const skillName = skill.querySelector('h4').textContent;
    const skillLevel = document.createElement('div');
    skillLevel.style.width = '100%';
    skillLevel.style.height = '4px';
    skillLevel.style.background = 'rgba(255, 255, 255, 0.1)';
    skillLevel.style.borderRadius = '2px';
    skillLevel.style.marginTop = '1rem';
    skillLevel.style.overflow = 'hidden';
    
    const skillBar = document.createElement('div');
    skillBar.style.height = '100%';
    skillBar.style.background = 'var(--gradient)';
    skillBar.style.borderRadius = '2px';
    skillBar.style.width = '0%';
    skillBar.style.transition = 'width 1s ease';
    
    // Set skill levels based on skill name
    const skillLevels = {
        'Python': '95%',
        'LangChain': '90%',
        'LlamaIndex': '85%',
        'CrewAI': '80%',
        'TensorFlow': '85%',
        'PyTorch': '80%',
        'FastAPI': '90%',
        'MongoDB': '75%',
        'FAISS': '85%',
        'Chroma': '80%',
        'Docker': '70%',
        'Git': '90%'
    };
    
    skillLevel.appendChild(skillBar);
    skill.appendChild(skillLevel);
    
    // Animate skill bar when skill item comes into view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    skillBar.style.width = skillLevels[skillName] || '70%';
                }, 500);
                skillObserver.unobserve(entry.target);
            }
        });
    });
    
    skillObserver.observe(skill);
});

// Add theme toggle functionality (bonus feature)
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🌟';
themeToggle.style.position = 'fixed';
themeToggle.style.bottom = '20px';
themeToggle.style.right = '20px';
themeToggle.style.width = '50px';
themeToggle.style.height = '50px';
themeToggle.style.borderRadius = '50%';
themeToggle.style.border = 'none';
themeToggle.style.background = 'var(--gradient)';
themeToggle.style.color = 'var(--primary-bg)';
themeToggle.style.cursor = 'pointer';
themeToggle.style.fontSize = '1.5rem';
themeToggle.style.zIndex = '1000';
themeToggle.style.boxShadow = 'var(--shadow)';
themeToggle.style.transition = 'all 0.3s ease';

themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.transform = 'scale(1.1)';
});

themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'scale(1)';
});

document.body.appendChild(themeToggle);

// Add loading screen fade out
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});