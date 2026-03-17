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

    // ========================================
    // Scroll Progress Indicator
    // ========================================
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // ========================================
    // 3D Tilt Effect on Cards
    // ========================================
    const tiltCards = document.querySelectorAll('.skill-category, .contact-card, .timeline-content');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

            // Update spotlight position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            card.style.setProperty('--mouse-x', percentX + '%');
            card.style.setProperty('--mouse-y', percentY + '%');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
});


// ========================================
// LLM-Powered Chatbot (NVIDIA NIM via Cloudflare Worker)
// ========================================

// *** IMPORTANT: Update this URL after deploying your Cloudflare Worker ***
const CHAT_API_URL = 'https://rohit-portfolio-chat.yashie160.workers.dev';

const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');

// Conversation history for multi-turn context
let conversationHistory = [];
let isGenerating = false;

// Toggle chat window
chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        chatInput.focus();
    }
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Add a message bubble to the chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const formatted = content.replace(urlRegex, (url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    contentDiv.innerHTML = formatted;
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return contentDiv;
}

// Create an empty bot message bubble for streaming
function createStreamingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content streaming';

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return contentDiv;
}

// Typing indicator
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
    if (typing) typing.remove();
}

// Disable/enable input while generating
function setInputEnabled(enabled) {
    chatInput.disabled = !enabled;
    chatSend.disabled = !enabled;
    chatSend.style.opacity = enabled ? '1' : '0.5';
    if (enabled) chatInput.focus();
}

// Main LLM streaming function
async function sendToLLM(userMessage) {
    isGenerating = true;
    setInputEnabled(false);

    // Add user message to history
    conversationHistory.push({ role: 'user', content: userMessage });

    // Show typing indicator while waiting for first token
    showTypingIndicator();

    try {
        const response = await fetch(CHAT_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: conversationHistory }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        // Remove typing indicator after a brief human-like "thinking" pause
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));
        removeTypingIndicator();
        const streamDiv = createStreamingMessage();
        let fullResponse = '';
        let thinkingContent = '';
        let insideThinking = false;

        // Read the SSE stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Process each SSE line
            const lines = buffer.split('\n');
            buffer = lines.pop(); // Keep incomplete line in buffer

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;

                const data = line.slice(6).trim();
                if (data === '[DONE]') continue;

                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices?.[0]?.delta;

                    if (delta?.reasoning_content) {
                        // This is "thinking" content — skip displaying it
                        thinkingContent += delta.reasoning_content;
                        insideThinking = true;
                        continue;
                    }

                    if (delta?.content) {
                        insideThinking = false;
                        fullResponse += delta.content;

                        // Convert URLs to links and render
                        const urlRegex = /(https?:\/\/[^\s]+)/g;
                        const formatted = fullResponse.replace(urlRegex, (url) => {
                            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
                        });
                        streamDiv.innerHTML = formatted;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                } catch (e) {
                    // Skip unparseable chunks
                }
            }
        }

        // Finalize — remove streaming cursor
        streamDiv.classList.remove('streaming');

        // If we got no visible response, show error
        if (!fullResponse.trim()) {
            streamDiv.textContent = "I'm having trouble responding right now. Please try again!";
            fullResponse = "I'm having trouble responding right now. Please try again!";
        }

        // Add assistant response to history
        conversationHistory.push({ role: 'assistant', content: fullResponse });

        // Keep only last 6 messages to manage context window
        if (conversationHistory.length > 6) {
            conversationHistory = conversationHistory.slice(-6);
        }

    } catch (error) {
        console.error('Chat error:', error);
        removeTypingIndicator();
        addMessage("Sorry, I'm temporarily unable to connect. Please try again in a moment! 🔄");
    } finally {
        isGenerating = false;
        setInputEnabled(true);
    }
}

// Handle send
function handleSend() {
    if (isGenerating) return;

    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    chatInput.value = '';
    sendToLLM(message);
}

chatSend.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSend();
    }
});
