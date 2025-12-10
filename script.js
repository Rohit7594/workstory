document.addEventListener('DOMContentLoaded', () => {
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

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Enhanced header glassmorphism on scroll
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // Particle Animation System
    // ========================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = this.getRandomColor();
            }

            getRandomColor() {
                const colors = [
                    'rgba(99, 102, 241, ',   // Indigo
                    'rgba(168, 85, 247, ',   // Purple
                    'rgba(236, 72, 153, ',   // Pink
                    'rgba(59, 130, 246, '    // Blue
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.opacity + ')';
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const numParticles = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            const maxDistance = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            connectParticles();
            animationId = requestAnimationFrame(animate);
        }

        // Initialize
        resizeCanvas();
        initParticles();
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // ========================================
    // Cursor Glow Effect
    // ========================================
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });

    // Smooth cursor follow
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
});


// Chatbot functionality
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

// Toggle chat window
chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// ------------------------------------------------------
// Chatbot Responses
// ------------------------------------------------------
const responses = {
    experience: "Rohit has 8+ years of experience as a Data Scientist, currently working as Sr. Data Scientist at Teamlease (Client: Deloitte). He has worked on Generative AI, LangGraph, AWS Bedrock, and various ML/AI projects.",

    skills: "Rohit is a Data Scientist specializing in Machine Learning and Generative AI. His core expertise includes building LLM-powered applications with LangChain, LangGraph, and RAG architectures, deploying AI solutions on AWS (Bedrock, S3, EC2), and developing production-ready ML models using Python, TensorFlow, and PyTorch. He's proficient in FastAPI for ML deployment, SQL for data engineering, and modern AI frameworks for creating scalable, intelligent systems.",

    contact: "You can reach Rohit at rohitsaroj29@gmail.com or connect on LinkedIn: https://www.linkedin.com/in/rohitsaroj/. He is also active on Medium with 1.5K+ followers.",

    education: "Rohit holds a PGDBM in Operation Management from NMIMS, Mumbai (2022) and a B.E. in Instrumentation Engineering from Rajiv Gandhi Institute of Technology, Mumbai (2016).",

    current: "Rohit is currently working as Sr. Data Scientist at Teamlease (Client: Deloitte) since August 2025, developing a Generative AI-powered chatbot using LangGraph and Claude 3.5.",

    projects: "Rohit has worked on various projects including RAG-based applications, clinical cohort building with LangGraph, wind energy forecasting models, and CNN-based AI models for turbine analysis.",

    certifications: "Rohit has certifications in Prompt Design in Vertex AI (Google), SQL for Data Science (Great Learning), The Data Science Course 2022 (Udemy), and Generative AI with Langchain (Udemy).",

    about: "Rohit is a Sr. Data Scientist with strong expertise in Generative AI, LLMs, ML engineering, and data-driven solutions. He builds scalable AI systems and has deep experience with AWS, LangGraph, and end-to-end product development.",

    location: "Rohit is currently based in Delhi NCR, India, and has worked across multiple cities including Mumbai, Chennai, and New Delhi throughout his career.",

    personality: "To learn about Rohit's personality and work style, check out his LinkedIn recommendations where colleagues and managers share their experiences working with him: https://www.linkedin.com/in/rohitsaroj/#:~:text=Recommendations,Recommendations",

    greeting: "Hello! I'm Rohit's virtual assistant 🤖. How can I help you today?",

    howAreYou: "I'm doing great, thank you for asking! 😊 I'm here and ready to help you learn more about Rohit. What would you like to know?",

    thanks: "You're welcome! Let me know if you'd like to explore Rohit's experience, projects, skills, or anything else 😊",

    compliment: "Thank you! Rohit appreciates your kind words 😊",

    identity: "I'm a simple rule-based chatbot built to introduce you to Rohit and his work. Ask me anything about him!",

    default: "I'm not sure I fully understood that, but I can help you explore Rohit's experience, skills, education, projects, certifications, and more. What would you like to know?"
};


// ------------------------------------------------------
// Helper function: checks if message contains any keyword
// ------------------------------------------------------
function containsAny(message, keywords) {
    return keywords.some(k => message.includes(k));
}


// ------------------------------------------------------
// Main Chatbot Logic
// ------------------------------------------------------
function getResponse(message) {
    const msg = message.toLowerCase();

    // Greetings (check first for pure greetings only)
    if (/^(hello|hi|hey|greetings|good morning|good evening|whats up|sup)$/i.test(msg.trim())) {
        return responses.greeting;
    }

    // Experience (check before other keywords) - includes "professionally"
    if (containsAny(msg, ['experience', 'exp', 'background', 'career', 'journey', 'professional', 'professionally', 'professinally', 'roles', 'work history'])) {
        return responses.experience;
    }

    // Skills
    if (containsAny(msg, ['skill', 'skills', 'tech', 'technology', 'stack', 'tools', 'expertise', 'knowledge', 'familiar'])) {
        return responses.skills;
    }

    // General "How is Rohit" (without specific context)
    if (msg.includes('how is rohit') && !msg.includes('personally') && !msg.includes('professionally') && !msg.includes('professinally')) {
        return responses.about;
    }

    // Personality / Nature / About me (check before general "how")
    if (containsAny(msg, ['personality', 'personally', 'nature', 'character', 'person', 'how is he', 'what is he like', 'about him', 'recommendation', 'how he is'])) {
        return responses.personality;
    }

    // Medium / Followers
    if (containsAny(msg, ['medium', 'followers', 'following', 'blog', 'articles', 'writes'])) {
        return responses.contact;
    }

    // Location / Where is he from
    if (containsAny(msg, ['where', 'location', 'based', 'from', 'city', 'place', 'live', 'lives'])) {
        return responses.location;
    }

    // Connection requests / Phone / Contact number
    if (containsAny(msg, ['connect me', 'connet', 'introduce', 'meet', 'talk to', 'speak with', 'phone', 'number', 'call', 'whatsapp'])) {
        return responses.contact;
    }

    // Contact
    if (containsAny(msg, ['contact', 'reach', 'email', 'linkedin', 'get in touch', 'message'])) {
        return responses.contact;
    }

    // Education
    if (containsAny(msg, ['education', 'degree', 'study', 'qualification', 'academics', 'college', 'university'])) {
        return responses.education;
    }

    // Current role
    if (containsAny(msg, ['current', 'now', 'doing', 'today', 'role', 'position', 'job'])) {
        return responses.current;
    }

    // Projects
    if (containsAny(msg, ['project', 'projects', 'work on', 'built', 'created', 'developed', 'case study'])) {
        return responses.projects;
    }

    // Certifications
    if (containsAny(msg, ['certificate', 'certification', 'certifications', 'course', 'training'])) {
        return responses.certifications;
    }

    // "Who is Rohit" / About / Tell me about
    if (containsAny(msg, ['who is rohit', 'about rohit', 'tell me about rohit', 'tell me about', 'about'])) {
        return responses.about;
    }

    // How are you (asking the bot)
    if (containsAny(msg, ['how are you', 'how r u', 'how are u', 'hows it going', 'how do you do'])) {
        return responses.howAreYou;
    }

    // Bot identity
    if (containsAny(msg, ['who are you', 'what are you', 'bot', 'assistant'])) {
        return responses.identity;
    }

    // Thanks
    if (containsAny(msg, ['thank', 'thanks', 'thank you'])) {
        return responses.thanks;
    }

    // Compliments
    if (containsAny(msg, ['nice', 'cool', 'wow', 'amazing', 'great', 'awesome'])) {
        return responses.compliment;
    }

    // Default fallback
    return responses.default;
}


function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const contentWithLinks = content.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #a5b4fc; text-decoration: underline;">${url}</a>`;
    });

    contentDiv.innerHTML = contentWithLinks;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message';
    typingDiv.id = 'typing';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content typing-indicator';
    contentDiv.innerHTML = '<span></span><span></span><span></span>';

    typingDiv.appendChild(contentDiv);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing');
    if (typing) {
        typing.remove();
    }
}

function handleSend() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, true);
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate bot thinking time
    setTimeout(() => {
        removeTypingIndicator();
        const response = getResponse(message);
        addMessage(response);
    }, 800);
}

chatSend.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
