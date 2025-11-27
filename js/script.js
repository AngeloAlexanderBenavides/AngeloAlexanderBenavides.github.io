// ============================================
// SCROLL REVEAL ANIMATION (AOS)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up")
            observer.unobserve(entry.target)
        }
    })
}, observerOptions)

document.querySelectorAll('[data-aos="fade-up"], [data-aos="fade-right"], [data-aos="fade-left"]').forEach((el) => {
    observer.observe(el)
})

// ============================================
// TYPEWRITER EFFECT
// ============================================
const phrases = [
    "Software Engineer in Training", 
    "Robotics Enthusiast", 
    "Cybersecurity Rookie",
    "Building LexBen Ecosystem"
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
    isEnd = false;
    document.getElementById("typewriter").innerHTML = currentPhrase.join('');

    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            document.getElementById("typewriter").innerHTML = currentPhrase.join('');
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j]);
            j--;
            document.getElementById("typewriter").innerHTML = currentPhrase.join('');
        }

        if (j == phrases[i].length) {
            isEnd = true;
            isDeleting = true;
        }

        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i === phrases.length) {
                i = 0;
            }
        }
    }
    const spedUp = Math.random() * (80 - 50) + 50;
    const normalSpeed = Math.random() * (300 - 200) + 200;
    const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
    setTimeout(loop, time);
}
loop();

// ============================================
// NAVBAR STICKY & HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById("navbar");

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = "0 4px 12px rgba(0, 191, 255, 0.1)";
    } else {
        navbar.style.boxShadow = "none";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// SMOOTH SCROLL OFFSET FOR FIXED NAVBAR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        if (targetId === "#") return

        const targetElement = document.querySelector(targetId)
        if (targetElement) {
            const navHeight = document.querySelector(".navbar").offsetHeight
            const elementPosition = targetElement.offsetTop - navHeight
            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            })
        }
    })
})

// ============================================
// ACTIVE NAV LINK HIGHLIGHT
// ============================================
window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section")

    sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id")
        }
    })

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").slice(1) === current) {
            link.style.color = "var(--primary)"
        } else {
            link.style.color = "var(--text-primary)"
        }
    })
})

// ============================================
// ANIMATIONS ON PAGE LOAD
// ============================================
window.addEventListener("load", () => {
    // Add subtle entrance animation
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
        heroContent.style.opacity = "1"
    }
})

// ============================================
// PARALLAX EFFECT (OPTIONAL ENHANCEMENT)
// ============================================
window.addEventListener("scroll", () => {
    const heroGrid = document.querySelector(".hero-grid")
    if (heroGrid && window.pageYOffset < window.innerHeight) {
        heroGrid.style.transform = `translateY(${window.pageYOffset * 0.5}px)`
    }
})

// ============================================
// MOBILE OPTIMIZATION
// ============================================
if (window.matchMedia("(max-width: 768px)").matches) {
    // Reduce animation complexity on mobile
    document.querySelectorAll("[data-aos]").forEach((el) => {
        el.style.animationDuration = "0.4s"
    })
}

// ============================================
// HERO SPOTLIGHT EFFECT
// ============================================
const hero = document.querySelector('.hero');
const heroBg = document.querySelector('.hero-bg');

if (hero && heroBg) {
    hero.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        
        heroBg.style.setProperty('--x', `${x}%`);
        heroBg.style.setProperty('--y', `${y}%`);
    });
}

console.log("[v0] Portfolio loaded successfully! 🚀")
