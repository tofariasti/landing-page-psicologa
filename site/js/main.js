/*========================================
  LANDING PAGE - PSICÓLOGA
  JavaScript Principal
  Dra. Ana Clara Oliveira
========================================*/

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out'
    });
  }
  
  // Inicializar todas as funcionalidades
  initMobileMenu();
  initScrollHeader();
  initSmoothScroll();
  initCounters();
  initFAQ();
  initWhatsAppModal();
  initWhatsAppFloat();
  initParticles();
  initTestimonialsSlider();
  initScrollAnimations();
});

// ========== MENU MOBILE ==========
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show');
    });
  }
  
  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  }
  
  // Fechar menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });
  
  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('show');
    }
  });
}

// ========== HEADER SCROLL ==========
function initScrollHeader() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== CONTADORES ANIMADOS ==========
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const speed = 200; // Velocidade da animação
  
  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target;
    }
  };
  
  // Observar quando os contadores entram na viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// ========== FAQ ACCORDION ==========
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq__item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Fechar todos os itens
      faqItems.forEach(faq => {
        faq.classList.remove('active');
      });
      
      // Abrir o item clicado se não estava ativo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ========== MODAL WHATSAPP ==========
function initWhatsAppModal() {
  const modal = document.getElementById('whatsappModal');
  const openButtons = document.querySelectorAll('#openWhatsAppForm');
  const closeButton = document.getElementById('closeModal');
  const overlay = modal ? modal.querySelector('.modal__overlay') : null;
  const form = document.getElementById('whatsappForm');
  
  // Abrir modal
  openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Fechar modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Processar formulário
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const serviceType = document.getElementById('serviceType').value;
      const period = document.getElementById('period').value;
      const message = document.getElementById('message').value.trim();
      
      // Validação básica
      if (!name || !email || !phone || !serviceType || !period || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Mapear tipos de serviço
      const serviceTypes = {
        'individual': 'Terapia Individual',
        'casal': 'Terapia de Casal',
        'familiar': 'Terapia Familiar',
        'online': 'Atendimento Online'
      };
      
      const periods = {
        'manha': 'Manhã (8h - 12h)',
        'tarde': 'Tarde (13h - 17h)',
        'noite': 'Noite (18h - 20h)',
        'sabado': 'Sábado'
      };
      
      // Montar mensagem do WhatsApp
      const whatsappMessage = `Olá! Gostaria de agendar uma consulta.

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}
*Tipo de Atendimento:* ${serviceTypes[serviceType]}
*Preferência de Horário:* ${periods[period]}

*Mensagem:*
${message}`;
      
      // Número do WhatsApp (substituir pelo número real)
      const phoneNumber = '5511987654321';
      
      // Codificar mensagem para URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Abrir WhatsApp
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');
      
      // Fechar modal e limpar formulário
      closeModal();
      form.reset();
    });
  }
}

// ========== BOTÃO FLUTUANTE WHATSAPP ==========
function initWhatsAppFloat() {
  const floatButton = document.getElementById('whatsappFloat');
  
  if (floatButton) {
    floatButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Abrir modal de contato
      const modal = document.getElementById('whatsappModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}

// ========== PARTÍCULAS DE FUNDO ==========
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  
  if (!particlesContainer) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Tamanho aleatório
    const size = Math.random() * 4 + 2;
    
    // Duração da animação aleatória
    const duration = Math.random() * 20 + 10;
    
    // Delay aleatório
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(155, 126, 214, 0.6), transparent);
      border-radius: 50%;
      animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
      pointer-events: none;
    `;
    
    particlesContainer.appendChild(particle);
  }
  
  // Adicionar animação via CSS
  if (!document.getElementById('particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========== SLIDER DE DEPOIMENTOS ==========
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonials-slider');
  const prevBtn = document.querySelector('.testimonials__prev');
  const nextBtn = document.querySelector('.testimonials__next');
  
  if (!slider || !prevBtn || !nextBtn) return;
  
  const cards = slider.querySelectorAll('.testimonial__card');
  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  
  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  function updateSlider() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem
    const offset = currentIndex * (cardWidth + gap);
    
    cards.forEach((card, index) => {
      card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      card.style.transform = `translateX(-${offset}px)`;
      
      // Fade out para cards fora da view
      if (index >= currentIndex && index < currentIndex + cardsPerView) {
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0.3';
      }
    });
  }
  
  function nextSlide() {
    if (currentIndex < cards.length - cardsPerView) {
      currentIndex++;
      updateSlider();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }
  
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Auto-play
  let autoplayInterval = setInterval(nextSlide, 5000);
  
  // Pausar auto-play ao interagir
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });
  
  // Reajustar ao redimensionar
  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    currentIndex = 0;
    updateSlider();
  });
  
  // Inicializar
  updateSlider();
  
  // Touch/Swipe support para mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }
}

// ========== ANIMAÇÕES DE SCROLL ==========
function initScrollAnimations() {
  // Adicionar classe aos elementos quando entram na viewport
  const animateElements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

// ========== MÁSCARA DE TELEFONE ==========
function initPhoneMask() {
  const phoneInput = document.getElementById('phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 0) {
        if (value.length <= 2) {
          value = `(${value}`;
        } else if (value.length <= 7) {
          value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length <= 11) {
          value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else {
          value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
      }
      
      e.target.value = value;
    });
  }
}

// Inicializar máscara de telefone
initPhoneMask();

// ========== VALIDAÇÃO DE E-MAIL ==========
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========== PERFORMANCE ==========
// Lazy loading para imagens
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback para navegadores que não suportam lazy loading nativo
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ========== EASTER EGG - DESENVOLVEDOR ==========
console.log('%c🧠 Landing Page - Psicóloga', 'font-size: 20px; font-weight: bold; color: #9b7ed6;');
console.log('%cDesenvolvido por Tiago Farias', 'font-size: 14px; color: #5a5a6e;');
console.log('%c🌐 https://tofariasti.github.io/', 'font-size: 12px; color: #9b7ed6;');

// ========== ANALYTICS (OPCIONAL) ==========
// Rastrear cliques nos CTAs
document.querySelectorAll('.btn--primary, .btn--whatsapp').forEach(btn => {
  btn.addEventListener('click', () => {
    const btnText = btn.textContent.trim();
    console.log(`CTA clicado: ${btnText}`);
    
    // Aqui você pode enviar para Google Analytics, Meta Pixel, etc.
    // Exemplo: gtag('event', 'click', { event_category: 'CTA', event_label: btnText });
  });
});

// ========== PREVENÇÃO DE SPAM NO FORMULÁRIO ==========
let lastSubmitTime = 0;
const minSubmitInterval = 5000; // 5 segundos entre submissões

function canSubmit() {
  const now = Date.now();
  if (now - lastSubmitTime < minSubmitInterval) {
    alert('Por favor, aguarde alguns segundos antes de enviar novamente.');
    return false;
  }
  lastSubmitTime = now;
  return true;
}

// ========== ACESSIBILIDADE ==========
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Pular para o conteúdo principal';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
`;
skipLink.addEventListener('focus', function() {
  this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
  this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ========== MODO ESCURO (FUTURO) ==========
// Preparação para implementação futura de modo escuro
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
  console.log('Usuário prefere modo escuro (preparado para implementação futura)');
}

// ========== UTILITÁRIOS ==========
// Debounce para eventos de resize
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar debounce no resize
window.addEventListener('resize', debounce(() => {
  console.log('Window resized');
}, 250));

// ========== SERVICE WORKER (PWA - FUTURO) ==========
// Preparação para transformar em PWA no futuro
if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('/sw.js').then(registration => {
  //   console.log('ServiceWorker registrado:', registration);
  // });
}

// ========== EXPORT PARA TESTES ==========
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateEmail,
    canSubmit,
    debounce
  };
}
