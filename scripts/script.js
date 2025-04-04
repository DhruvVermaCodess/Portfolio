// Navbar hide/show on scroll
const navbar = document.querySelector("nav");
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  navbar.classList.toggle("navbar--hidden", currentScrollY > lastScrollY);
  lastScrollY = currentScrollY;
};

window.addEventListener("scroll", handleScroll, { passive: true });

// Mouse follower functionality
const mouseFollower = document.querySelector('.mouse-follower');

gsap.set(mouseFollower, {
  xPercent: -50,
  yPercent: -50,
  scale: 0.5,
  opacity: 0.8,
});

document.addEventListener('mousemove', (e) => {
  gsap.to(mouseFollower, {
    duration: 0.4,
    x: e.clientX,
    y: e.clientY,
    opacity: 0.8, // Ensures opacity is reset on mousemove
  });
});

document.addEventListener('mouseleave', () => {
  gsap.to(mouseFollower, {
    duration: 0.4,
    opacity: 0, // Fades out when the mouse leaves
  });
});

// Grow mouse follower when hovering over videos
const videos = document.querySelectorAll('video');

videos.forEach(video => {
  video.addEventListener('mouseenter', () => {
    gsap.to(mouseFollower, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
    });
  });

  video.addEventListener('mouseleave', () => {
    gsap.to(mouseFollower, {
      scale: 0.5,
      opacity: 0.8,
      duration: 0.3,
    });
  });
});

// GSAP animations
document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin if not already registered
  if (!gsap.plugins.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  const tl = gsap.timeline();

  const animateFrom = (selector, props) => {
    tl.from(selector, { ...props, opacity: 0 });
  };

  // Animations for page elements
  animateFrom("nav p", { y: -100, duration: 0.6, stagger: 0.3, delay: 0.3 });
  animateFrom(".animated-text span", { y: 300, duration: 0.8, stagger: 0.2 });
  animateFrom(".container-1 p", { y: 100, duration: 0.6, stagger: 0.1 });

  // ScrollTrigger-based animations
  const createScrollTrigger = (selector, props) => {
    return {
      scrollTrigger: {
        trigger: selector,
        scroller: "body",
        ...props
      },
      ...props
    };
  };

  // Original scroll animations
  gsap.from("#about-section .something", createScrollTrigger("#about-section .something", { scale: 0, end: "top 70%", scrub: 1 }));
  gsap.from(".asd p", createScrollTrigger(".something p", { duration: 1, y: -200, stagger: 0.3, end: "top 50%", scrub: 1 }));
  gsap.from("#project-section h2", createScrollTrigger("#project-section h2", { duration: 1, x: -500, start: "top 90%", end: "top 30%", scrub: 1 }));
  gsap.from("#skills-section p", createScrollTrigger("#skills-section", { y: -100, duration: 1, stagger: 0.2, end: "top 5%", scrub: 1 }));
  
  // About Section Animations - For the new design
  // Animation for the title
  gsap.from(".about-title", {
    scrollTrigger: {
      trigger: ".about-header",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
  
  // Animation for the image
  gsap.from(".image-wrapper", {
    scrollTrigger: {
      trigger: ".image-container",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    x: -100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
  });
  
  // Animation for the big skills text
  gsap.to(".skill-highlight", {
    scrollTrigger: {
      trigger: ".big-skills",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "back.out(1.7)"
  });
  
  // Staggered animation for the about description paragraphs
  gsap.to(".about-description p", {
    scrollTrigger: {
      trigger: ".about-description",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "power2.out"
  });
  
  // Animation for skill categories
  gsap.to(".skill-category", {
    scrollTrigger: {
      trigger: ".skills-container",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.25,
    ease: "power2.out"
  });
  
  // Letter animation for the highlight word in the title
  gsap.from(".about-title .highlight", {
    scrollTrigger: {
      trigger: ".about-header",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    color: "#f3c77c",
    textShadow: "0 0 20px #f3c77c",
    duration: 1.5,
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true
  });
  
  // Hover effects for skill tags with GSAP
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        backgroundColor: "rgba(243, 199, 124, 0.3)",
        y: -3,
        duration: 0.3
      });
    });
    
    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        backgroundColor: "rgba(243, 199, 124, 0.1)",
        y: 0,
        duration: 0.3
      });
    });
  });
  
  // Mouse follower special effect in the about section
  const aboutSection = document.querySelector("#about-section");
  
  if (aboutSection) {
    aboutSection.addEventListener('mouseenter', () => {
      gsap.to('.mouse-follower', {
        backgroundColor: "#f3c77c",
        scale: 0.7,
        duration: 0.4
      });
    });
    
    aboutSection.addEventListener('mouseleave', () => {
      gsap.to('.mouse-follower', {
        backgroundColor: "white",
        scale: 0.5,
        duration: 0.4
      });
    });
    
    // Parallax effect on the image when scrolling
    ScrollTrigger.create({
      trigger: ".image-wrapper",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const imageWrapper = document.querySelector(".image-wrapper img");
        if (imageWrapper) {
          gsap.to(imageWrapper, {
            y: (self.progress * 30),
            ease: "none",
            duration: 0.1
          });
        }
      }
    });
  }
});

// Chatbot functionality
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");

const toggleChat = () => {
  const isHidden = window.getComputedStyle(chatContainer).display === "none";
  if (isHidden) {
    gsap.fromTo(chatContainer, { opacity: 0, y: 300 }, { opacity: 1, y: 0, display: "flex", duration: 0.5 });
    chatMessages.innerHTML = '<div class="bot-message">Want to contact me?</div>';
  } else {
    gsap.to(chatContainer, { opacity: 0, y: 50, duration: 0.5, onComplete: () => {
      chatContainer.style.display = "none";
    }});
  }
};

const closeChat = () => {
  gsap.to(chatContainer, { opacity: 0, y: 50, duration: 0.5, onComplete: () => {
    chatContainer.style.display = "none";
  }});
};

const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("yes") || lowerMessage.includes("yepp")) {
    return "What do you need: Dhruv's Email or Instagram?";
  } else if (lowerMessage.includes("no") || lowerMessage.includes("nahh")) {
    return "Okay, feel free to chat if you change your mind.";
  } else if (lowerMessage.includes("email")) {
    return "Dhruv's Email is dhruvvermaa.w@gmail.com";
  } else if (lowerMessage.includes("instagram")) {
    return "Dhruv's Instagram is @dhruv_codess";
  } else {
    return "I'm not sure how to respond to that. Can you try asking about Dhruv's contact info?";
  }
};

const sendMessage = () => {
  const message = userInput.value.trim();
  if (message) {
    chatMessages.innerHTML += `<div class="user-message">${message}</div>`;
    userInput.value = "";
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      chatMessages.innerHTML += `<div class="bot-message">${botResponse}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
  }
};

// Handle the 'Enter' key to send a message
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Add event listener for close button
document.querySelector(".close-chat").addEventListener("click", closeChat);