document.addEventListener('DOMContentLoaded', () => {
  const pageLoader = document.getElementById('pageLoader');
  const beginButton = document.getElementById('beginButton');
  const openLetterBtn = document.getElementById('openLetterBtn');
  const envelope = document.getElementById('envelope');
  const surpriseButton = document.getElementById('surpriseButton');
  const surpriseReveal = document.getElementById('surpriseReveal');
  const birthdayMessage = document.getElementById('birthdayMessage');
  const lifeText = document.getElementById('lifeText');
  const letterText = document.getElementById('letterText');

  const hideLoader = () => {
    if (!pageLoader) return;
    pageLoader.style.opacity = '0';
    setTimeout(() => {
      if (pageLoader.parentNode) pageLoader.parentNode.removeChild(pageLoader);
    }, 1200);
  };

  window.addEventListener('error', (event) => {
    console.error('Page error:', event.error || event.message);
    hideLoader();
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    hideLoader();
  });

  const voiceAudio = document.getElementById('voiceAudio');
  const playVoice = document.getElementById('playVoice');
  const pauseVoice = document.getElementById('pauseVoice');
  const voiceSeek = document.getElementById('voiceSeek');
  const voiceCurrent = document.getElementById('voiceCurrent');
  const voiceDuration = document.getElementById('voiceDuration');
  const playerState = document.getElementById('playerState');

  const musicToggle = document.getElementById('musicToggle');
  const musicVolume = document.getElementById('musicVolume');
  const backgroundMusic = new Audio('audio/background.mp3');
  let musicReady = false;

  const bestDate = new Date('2026-12-31T00:00:00');

  const typeStrings = [
    'She is my closest friend and brightest smile.',
    'She brings warmth to every ordinary day.',
    'She is the melody that keeps me smiling.',
    'She makes every moment feel special.'
  ];

  const letterLines = [
    'From the day you entered my world,',
    'everything became more beautiful.',
    '',
    'Your smile brings me peace.',
    'Your laugh turns any day brighter.',
    'Your friendship makes me stronger.',
    '',
    'Thank you for every beautiful memory,',
    'every smile,',
    'every hug,',
    'every moment.',
    '',
    'You are my happiness.',
    'My peace.',
    'My comfort.',
    'My Laddu Ma.',
    'My Thangamaee.',
    '',
    'Happy Birthday My Close Friend ❤️',
    '',
    'May this year give you everything you\'ve hoped for.',
    '',
    'No matter where life takes us,',
    'I will always treasure our bond.',
    '',
    'I cherish you endlessly.',
    '',
    'என் அம்பு, உங்கள் நட்பே எனக்கு எல்லாவற்றிலும் மேலானது.',
    'உங்கள் சிரிப்பும், உங்கள் புரிதலும் என் மனதில் நிலைக்கும்.',
    'சிறந்த நண்பருக்கான பிறந்தநாள் வாழ்த்துக்கள்!' 
  ];

  const revealMessage = () => {
    const lines = letterLines.map((line) => `<span>${line}</span>`).join('<br>');
    letterText.innerHTML = lines;
  };

  const updateCountdown = () => {
    const now = new Date();
    const diff = bestDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      birthdayMessage.innerHTML = '🎉 Happy Birthday Ammu 🎉';
      celebrate();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  };

  const celebrate = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#ffabce', '#ff6fb5', '#d89df7', '#ffffff']
    });

    const burst = () => {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 120,
        origin: { x: Math.random(), y: Math.random() * 0.2 }
      });
    };

    for (let i = 0; i < 4; i++) {
      setTimeout(burst, i * 500);
    }
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
  revealMessage();
  setTimeout(() => {
    hideLoader();
  }, 4500);

  try {
    AOS.init({ duration: 900, once: true, easing: 'ease-in-out' });
  } catch (error) {
    console.warn('AOS failed to initialize', error);
  }

  try {
    const typed = new Typed('#lifeText', {
      strings: typeStrings,
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2200,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  } catch (error) {
    console.warn('Typed.js failed to initialize', error);
    lifeText.textContent = typeStrings[0];
  }

  try {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical'
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (error) {
    console.warn('Lenis failed to initialize', error);
  }

  beginButton.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });

  openLetterBtn.addEventListener('click', () => {
    envelope.classList.toggle('open');
  });

  surpriseButton?.addEventListener('click', () => {
    if (!surpriseReveal) return;
    surpriseReveal.classList.add('active');
    surpriseReveal.scrollIntoView({ behavior: 'smooth' });
    celebrate();
    createFireworks();
  });

  const createFireworks = () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60 + Math.random() * 60,
          spread: 75,
          origin: { x: Math.random(), y: Math.random() * 0.3 }
        });
      }, i * 300);
    }
  };

  playVoice.addEventListener('click', () => {
    voiceAudio.play();
    playerState.textContent = 'Playing';
  });

  pauseVoice.addEventListener('click', () => {
    voiceAudio.pause();
    playerState.textContent = 'Paused';
  });

  voiceAudio.addEventListener('loadedmetadata', () => {
    voiceDuration.textContent = formatTime(voiceAudio.duration);
  });

  voiceAudio.addEventListener('timeupdate', () => {
    voiceCurrent.textContent = formatTime(voiceAudio.currentTime);
    const percent = (voiceAudio.currentTime / voiceAudio.duration) * 100;
    voiceSeek.value = percent || 0;
  });

  voiceSeek.addEventListener('input', () => {
    voiceAudio.currentTime = (voiceSeek.value / 100) * voiceAudio.duration;
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.7;

  musicToggle.addEventListener('click', () => {
    if (!musicReady) {
      backgroundMusic.play().catch(() => {});
      musicReady = true;
    }
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      backgroundMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    }
  });

  musicVolume.addEventListener('input', () => {
    backgroundMusic.volume = musicVolume.value;
  });

  const particlesConfig = {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color: { value: ['#ffffff', '#ff7dc1', '#c96fff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.35, random: true },
      size: { value: 4, random: true },
      move: { enable: true, speed: 1.2, direction: 'top', random: true, out_mode: 'out' }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false } } },
    retina_detect: true
  };

  particlesJS('heroParticles', particlesConfig);

  const tiltElements = document.querySelectorAll('[data-tilt]');
  VanillaTilt.init(tiltElements, {
    max: 14,
    speed: 450,
    glare: true,
    'max-glare': 0.18
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.section-header', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: { trigger: '.section-header', start: 'top 85%' }
  });

  gsap.from('.gallery-card', {
    opacity: 0,
    y: 40,
    duration: 0.95,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '#memories', start: 'top 80%' }
  });

  gsap.from('.timeline-item', {
    opacity: 0,
    x: -45,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.13,
    scrollTrigger: { trigger: '#timeline', start: 'top 85%' }
  });

  gsap.from('.flip-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '#why', start: 'top 80%' }
  });

  setTimeout(() => {
    pageLoader.style.opacity = '0';
    setTimeout(() => pageLoader.remove(), 1200);
  }, 2800);
});
