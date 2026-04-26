export default {
  async fetch(request, env, ctx) {
    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Veysel Aslan - Sınırları Aş, İz Bırak. Yaratıcı geliştirici ve tasarımcı kişisel portföy sitesi.">
  <meta name="keywords" content="Veysel Aslan, creative developer, tasarımcı, yazılım, portfolio">
  <meta name="author" content="Veysel Aslan">
  <meta name="language" content="Turkish">
  <title>Veysel Aslan | Creative Developer</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  
  <style>
    :root {
      --midnight: #050810;
      --teal: #0d4f5c;
      --orange: #e8722a;
      --gold: #d4a853;
      --text-light: #e0e6ed;
      --text-muted: #8a9bb3;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: 'Raleway', sans-serif;
      background-color: var(--midnight);
      color: var(--text-light);
      overflow-x: hidden;
      cursor: none;
    }
    
    /* Custom Cursor */
    .cursor-dot,
    .cursor-ring {
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  background-color 0.3s ease;
    }
    
    .cursor-dot {
      width: 10px;
      height: 10px;
      background-color: var(--orange);
      box-shadow: 0 0 10px var(--orange), 0 0 20px var(--orange);
    }
    
    .cursor-ring {
      width: 40px;
      height: 40px;
      border: 2px solid var(--teal);
      box-shadow: 0 0 15px rgba(13, 79, 92, 0.5);
    }
    
    .cursor-ring.hover {
      width: 60px;
      height: 60px;
      border-color: var(--orange);
      background-color: rgba(232, 114, 42, 0.1);
    }
    
    /* Touch Device */
    @media (pointer: coarse) {
      body { cursor: auto; }
      .cursor-dot, .cursor-ring { display: none !important; }
    }
    
    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--midnight);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--teal);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--orange);
    }
    
    /* Navigation */
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1.5rem 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .nav.scrolled {
      background: rgba(5, 8, 16, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(13, 79, 92, 0.3);
      padding: 1rem 3rem;
    }
    
    .nav-logo {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-light);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      letter-spacing: 2px;
    }
    
    .nav-logo .accent-dot {
      color: var(--orange);
      font-size: 2rem;
      line-height: 0;
    }
    
    .nav-links {
      display: flex;
      gap: 2.5rem;
      list-style: none;
    }
    
    .nav-links a {
      font-family: 'Raleway', sans-serif;
      font-weight: 400;
      font-size: 0.85rem;
      color: var(--text-muted);
      text-decoration: none;
      letter-spacing: 3px;
      text-transform: uppercase;
      transition: color 0.3s ease;
      position: relative;
    }
    
    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--orange);
      transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .nav-links a:hover {
      color: var(--orange);
    }
    
    .nav-links a:hover::after {
      width: 100%;
    }
    
    /* Hero Section */
    .hero {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .parallax-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%;
      will-change: transform;
    }
    
    /* Layer 1: Nebula Sky */
    .layer-nebula {
      background: 
        radial-gradient(ellipse at 20% 30%, rgba(13, 79, 92, 0.4) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 70%, rgba(232, 114, 42, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(212, 168, 83, 0.1) 0%, transparent 60%),
        var(--midnight);
      z-index: 1;
    }
    
    .nebula-pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba(13, 79, 92, 0.3) 0%, transparent 70%);
      animation: nebulaPulse 8s ease-in-out infinite;
    }
    
    @keyframes nebulaPulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }
    
    /* Layer 2: Mountain Silhouettes */
    .layer-mountains {
      z-index: 2;
      bottom: 0;
      top: auto;
      height: 60%;
      display: flex;
      align-items: flex-end;
    }
    
    .mountain-svg {
      width: 100%;
      height: 100%;
    }
    
    /* Layer 3: Mist Overlay */
    .layer-mist {
      z-index: 3;
      background: linear-gradient(to top, rgba(5, 8, 16, 0.9) 0%, transparent 40%);
      pointer-events: none;
    }
    
    /* Layer 4: Foreground Rocks */
    .layer-rocks {
      z-index: 4;
      bottom: 0;
      top: auto;
      height: 35%;
    }
    
    /* Layer 5: Particles */
    .layer-particles {
      z-index: 5;
      pointer-events: none;
    }
    
    #particle-canvas {
      width: 100%;
      height: 100%;
    }
    
    /* Hero Content */
    .hero-content {
      position: relative;
      z-index: 10;
      text-align: center;
      padding: 0 2rem;
    }
    
    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(3rem, 10vw, 7rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      background: linear-gradient(90deg, var(--orange), var(--gold), var(--orange), var(--gold));
      background-size: 300% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fireShimmer 4s linear infinite;
      letter-spacing: 4px;
    }
    
    @keyframes fireShimmer {
      0% { background-position: 0% 50%; }
      100% { background-position: 300% 50%; }
    }
    
    .hero-subtitle {
      font-family: 'Cinzel', serif;
      font-size: clamp(1rem, 3vw, 1.5rem);
      font-weight: 400;
      color: var(--text-muted);
      letter-spacing: 8px;
      text-transform: uppercase;
      margin-bottom: 3rem;
    }
    
    .hero-cta {
      display: inline-block;
      padding: 1rem 3rem;
      font-family: 'Raleway', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--text-light);
      text-decoration: none;
      background: linear-gradient(135deg, rgba(13, 79, 92, 0.3), rgba(232, 114, 42, 0.2));
      border: 1px solid rgba(212, 168, 83, 0.3);
      clip-path: polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }
    
    .hero-cta::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(232, 114, 42, 0.3), transparent);
      transition: left 0.5s ease;
    }
    
    .hero-cta:hover::before {
      left: 100%;
    }
    
    .hero-cta:hover {
      border-color: var(--orange);
      box-shadow: 0 0 30px rgba(232, 114, 42, 0.3);
      transform: translateY(-2px);
    }
    
    /* Scroll Indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .scroll-line {
      width: 1px;
      height: 60px;
      background: linear-gradient(to bottom, var(--orange), transparent);
      animation: scrollLine 2s ease-in-out infinite;
    }
    
    @keyframes scrollLine {
      0% { transform: scaleY(0); transform-origin: top; }
      50% { transform: scaleY(1); transform-origin: top; }
      50.1% { transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }
    
    .scroll-text {
      font-family: 'Raleway', sans-serif;
      font-size: 0.7rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    
    /* Quotes Section */
    .quotes-section {
      position: relative;
      min-height: 500vh;
      background: var(--midnight);
    }
    
    .quotes-sticky {
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .quote-container {
      position: absolute;
      max-width: 900px;
      padding: 0 2rem;
      text-align: center;
      opacity: 0;
      transform: translateY(50px);
    }
    
    .quote-text {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 600;
      line-height: 1.6;
      color: var(--text-light);
      position: relative;
    }
    
    .quote-ornament {
      font-size: 4rem;
      color: var(--teal);
      line-height: 0;
      display: block;
      margin-bottom: 2rem;
      opacity: 0.5;
    }
    
    .quote-accent {
      background: linear-gradient(90deg, var(--teal), var(--orange));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .quote-divider {
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      margin: 2rem auto;
    }
    
    .quote-topic {
      font-family: 'Raleway', sans-serif;
      font-size: 0.8rem;
      letter-spacing: 6px;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-top: 1.5rem;
    }
    
    /* About Section */
    .about-section {
      padding: 10rem 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(to bottom, var(--midnight), rgba(13, 79, 92, 0.1), var(--midnight));
    }
    
    .about-card {
      position: relative;
      max-width: 800px;
      width: 100%;
      padding: 4rem;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(212, 168, 83, 0.1);
      clip-path: polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%);
      overflow: hidden;
    }
    
    .about-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, var(--teal), var(--orange), var(--gold));
    }
    
    .about-card::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, var(--gold), var(--orange), var(--teal));
    }
    
    .about-ornament {
      position: absolute;
      top: 2rem;
      left: 2rem;
      font-family: 'Cinzel', serif;
      font-size: 8rem;
      color: rgba(13, 79, 92, 0.15);
      line-height: 0;
      pointer-events: none;
    }
    
    .about-quote {
      font-family: 'Cinzel', serif;
      font-size: clamp(1.3rem, 3vw, 1.8rem);
      font-weight: 500;
      line-height: 1.8;
      color: var(--text-light);
      text-align: center;
      position: relative;
      z-index: 1;
    }
    
    .about-accent-teal {
      color: var(--teal);
      text-shadow: 0 0 20px rgba(13, 79, 92, 0.5);
    }
    
    .about-accent-fire {
      background: linear-gradient(90deg, var(--orange), var(--gold));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Connect Section */
    .connect-section {
      padding: 8rem 2rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4rem;
    }
    
    .connect-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      letter-spacing: 4px;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .connect-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
      gap: 3rem;
      width: 100%;
      max-width: 1000px;
      justify-content: center;
    }
    
    .connect-card {
      position: relative;
      padding: 3rem 2rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(13, 79, 92, 0.2);
      clip-path: polygon(5% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%, 0% 5%);
      text-align: center;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      display: block;
    }
    
    .connect-card::before {
      content: '';
      position: absolute;
      top: var(--mouse-y, 50%);
      left: var(--mouse-x, 50%);
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, var(--glow-color, var(--teal)) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    .connect-card:hover::before {
      opacity: 0.3;
    }
    
    .connect-card:hover {
      transform: translateY(-5px);
      border-color: var(--glow-color, var(--teal));
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }
    
    .connect-card.teal {
      --glow-color: var(--teal);
    }
    
    .connect-card.orange {
      --glow-color: var(--orange);
    }
    
    .connect-icon {
      width: 70px;
      height: 70px;
      margin: 0 auto 1.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      position: relative;
    }
    
    .connect-card.teal .connect-icon {
      background: rgba(13, 79, 92, 0.2);
      border: 2px solid var(--teal);
      box-shadow: 0 0 20px rgba(13, 79, 92, 0.3);
      color: var(--teal);
    }
    
    .connect-card.orange .connect-icon {
      background: rgba(232, 114, 42, 0.2);
      border: 2px solid var(--orange);
      box-shadow: 0 0 20px rgba(232, 114, 42, 0.3);
      color: var(--orange);
    }
    
    .connect-platform {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      letter-spacing: 2px;
    }
    
    .connect-handle {
      font-family: 'Raleway', sans-serif;
      font-size: 0.9rem;
      color: var(--text-muted);
      letter-spacing: 2px;
    }
    
    /* Footer */
    .footer {
      padding: 3rem 2rem;
      text-align: center;
      border-top: 1px solid rgba(13, 79, 92, 0.2);
    }
    
    .footer-name {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(90deg, var(--orange), var(--gold), var(--orange));
      background-size: 200% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: fireShimmer 3s linear infinite;
      margin-bottom: 1rem;
      display: inline-block;
    }
    
    .footer-copy {
      font-family: 'Raleway', sans-serif;
      font-size: 0.8rem;
      color: var(--text-muted);
      letter-spacing: 2px;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .nav { padding: 1rem 1.5rem; }
      .nav-links { gap: 1.2rem; }
      .nav-links a { font-size: 0.7rem; letter-spacing: 2px; }
      .about-card { padding: 2.5rem 1.5rem; }
      .connect-grid { grid-template-columns: 1fr; }
      .hero-subtitle { letter-spacing: 4px; }
    }
  </style>
</head>
<body>

  <!-- Custom Cursor -->
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>

  <!-- Navigation -->
  <nav class="nav" id="nav">
    <a href="#" class="nav-logo">
      V<span class="accent-dot">.</span>A
    </a>
    <ul class="nav-links">
      <li><a href="#hero">Anasayfa</a></li>
      <li><a href="#quotes">Sözler</a></li>
      <li><a href="#about">Hakkımda</a></li>
      <li><a href="#connect">İletişim</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section class="hero" id="hero">
    <!-- Layer 1: Nebula -->
    <div class="parallax-layer layer-nebula" data-speed="0.1">
      <div class="nebula-pulse"></div>
    </div>
    
    <!-- Layer 2: Mountains -->
    <div class="parallax-layer layer-mountains" data-speed="0.3">
      <svg class="mountain-svg" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#0d1f2d;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#050810;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M0,400 L0,250 Q200,100 400,200 T800,150 T1200,180 L1440,120 L1440,400 Z" fill="url(#mountainGrad)" opacity="0.8"/>
        <path d="M0,400 L0,300 Q300,200 500,250 T900,200 T1440,250 L1440,400 Z" fill="#080d18" opacity="0.9"/>
      </svg>
    </div>
    
    <!-- Layer 3: Mist -->
    <div class="parallax-layer layer-mist" data-speed="0.2"></div>
    
    <!-- Layer 4: Rocks -->
    <div class="parallax-layer layer-rocks" data-speed="0.5">
      <svg class="mountain-svg" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0f1a;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#050810;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M0,300 L0,150 L50,100 L80,140 L120,80 L160,130 L200,60 L250,120 L300,50 L350,110 L400,70 L450,130 L500,90 L550,140 L600,80 L650,120 L700,60 L750,110 L800,70 L850,130 L900,90 L950,140 L1000,80 L1050,120 L1100,60 L1150,110 L1200,70 L1250,130 L1300,90 L1350,140 L1400,80 L1440,120 L1440,300 Z" fill="url(#rockGrad)"/>
      </svg>
    </div>
    
    <!-- Layer 5: Particles -->
    <div class="parallax-layer layer-particles" data-speed="0.15">
      <canvas id="particle-canvas"></canvas>
    </div>
    
    <!-- Hero Content -->
    <div class="hero-content" id="hero-content">
      <h1 class="hero-title">Veysel Aslan</h1>
      <p class="hero-subtitle">Sınırları Aş — İz Bırak</p>
      <a href="#quotes" class="hero-cta">Keşfet</a>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <span class="scroll-text">Aşağı Kaydır</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- Quotes Section -->
  <section class="quotes-section" id="quotes">
    <div class="quotes-sticky">
      <div class="quote-container" data-quote="1">
        <span class="quote-ornament">"</span>
        <p class="quote-text">
          <span class="quote-accent">Görüş</span>, karanlıkta yolunu bulabilen tek ışıktır. Gözlerin göremediğini, ruhun <span class="quote-accent">sezer</span>.
        </p>
        <div class="quote-divider"></div>
        <span class="quote-topic">Vizyon</span>
      </div>
      
      <div class="quote-container" data-quote="2">
        <span class="quote-ornament">"</span>
        <p class="quote-text">
          Sabır, <span class="quote-accent">zamanın</span> mermerine kazınan bir sanattır. Acele eden, kendini kaybeder; bekleyen, <span class="quote-accent">zaferi</span> bulur.
        </p>
        <div class="quote-divider"></div>
        <span class="quote-topic">Sabır</span>
      </div>
      
      <div class="quote-container" data-quote="3">
        <span class="quote-ornament">"</span>
        <p class="quote-text">
          <span class="quote-accent">Kararlılık</span>, düşmanın pes ettiği anda seni ayakta tutan tek şeydir. Yorul, ama <span class="quote-accent">yıkılma</span>.
        </p>
        <div class="quote-divider"></div>
        <span class="quote-topic">Azim</span>
      </div>
      
      <div class="quote-container" data-quote="4">
        <span class="quote-ornament">"</span>
        <p class="quote-text">
          Yaratıcılık, <span class="quote-accent">sınırların</span> ötesinde saklı bir hazinedir. Kuralları bil, sonra onları <span class="quote-accent">parçala</span>.
        </p>
        <div class="quote-divider"></div>
        <span class="quote-topic">Yaratıcılık</span>
      </div>
      
      <div class="quote-container" data-quote="5">
        <span class="quote-ornament">"</span>
        <p class="quote-text">
          Gelecek, <span class="quote-accent">bugün</span> attığın adımların yankısıdır. Ne ekersen, zamanın <span class="quote-accent">sahibi</span> olursun.
        </p>
        <div class="quote-divider"></div>
        <span class="quote-topic">Gelecek</span>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="about-section" id="about">
    <div class="about-card">
      <span class="about-ornament">"</span>
      <p class="about-quote">
        İyi bir tasarım sadece <span class="about-accent-teal">görülmez</span>. <span class="about-accent-fire">Hissedilir</span>, yaşanır ve <span class="about-accent-teal">hatırlanır</span>.
      </p>
    </div>
  </section>

  <!-- Connect Section -->
  <section class="connect-section" id="connect">
    <h2 class="connect-title">İletişim</h2>
    <div class="connect-grid">
      <a href="https://instagram.com/veyseloffical433" target="_blank" class="connect-card teal" data-card="instagram">
        <div class="connect-icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
        <h3 class="connect-platform">Instagram</h3>
        <p class="connect-handle">@veyseloffical433</p>
      </a>
      
      <a href="https://t.me/veyseloffical" target="_blank" class="connect-card orange" data-card="telegram">
        <div class="connect-icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </div>
        <h3 class="connect-platform">Telegram</h3>
        <p class="connect-handle">@veyseloffical</p>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <span class="footer-name">Veysel Aslan</span>
    <p class="footer-copy">© 2026 Tüm Hakları Saklıdır.</p>
  </footer>

  <script>
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Detect Touch Device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    // =====================
    // CUSTOM CURSOR
    // =====================
    if (!isTouchDevice) {
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorRing = document.querySelector('.cursor-ring');
      
      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      });
      
      function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();
      
      // Hover effects
      const interactiveElements = document.querySelectorAll('a, button, .connect-card');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
      });
    }
    
    // =====================
    // NAVIGATION SCROLL
    // =====================
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
    
    // =====================
    // PARTICLE SYSTEM
    // =====================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = isTouchDevice ? 25 : 60;
    
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
      constructor() {
        this.reset();
      }
      
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(13, 79, 92,' : 'rgba(232, 114, 42,';
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
    
    // =====================
    // PARALLAX LAYERS
    // =====================
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0;
      gsap.to(layer, {
        yPercent: speed * 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    
    // =====================
    // HERO CONTENT FADE
    // =====================
    gsap.to('.hero-content', {
      y: -150,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '50% top',
        scrub: true
      }
    });
    
    gsap.to('.scroll-indicator', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '10% top',
        end: '30% top',
        scrub: true
      }
    });
    
    // =====================
    // QUOTES SCROLLTRIGGER
    // =====================
    const quotes = document.querySelectorAll('.quote-container');
    const quotesSection = document.querySelector('.quotes-section');
    
    quotes.forEach((quote, index) => {
      const startPercent = (index / quotes.length) * 100;
      const endPercent = ((index + 1) / quotes.length) * 100;
      
      // Fade in
      gsap.fromTo(quote, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quotesSection,
            start: \`\${startPercent + 5}% top\`,
            end: \`\${startPercent + 15}% top\`,
            scrub: true
          }
        }
      );
      
      // Fade out
      gsap.to(quote, {
        opacity: 0,
        y: -50,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: quotesSection,
          start: \`\${endPercent - 15}% top\`,
          end: \`\${endPercent - 5}% top\`,
          scrub: true
        }
      });
    });
    
    // =====================
    // ABOUT CARD REVEAL
    // =====================
    gsap.from('.about-card', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
    
    // =====================
    // CONNECT CARDS STAGGER
    // =====================
    gsap.from('.connect-card', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.connect-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
    
    // =====================
    // CONNECT CARD MOUSE FOLLOW
    // =====================
    document.querySelectorAll('.connect-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
    
    // =====================
    // SMOOTH SCROLL FOR NAV
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
};
