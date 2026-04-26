export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== '/' && url.pathname !== '/index.html') {
      return new Response('Not Found', { status: 404 });
    }

    const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workers / Creative Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;900&family=Raleway:wght@300;400&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <style>
    :root {
      --bg: #03070a;
      --accent: #00d2ff;
      --text: #e0e6ed;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: var(--bg); 
      color: var(--text); 
      font-family: 'Raleway', sans-serif; 
      overflow-x: hidden;
    }

    /* NAV */
    .nav {
      position: fixed; top: 0; width: 100%; padding: 2rem 5%;
      display: flex; justify-content: space-between; align-items: center;
      z-index: 1000; transition: 0.5s;
    }
    .nav.scrolled { background: rgba(3,7,10,0.9); backdrop-filter: blur(10px); padding: 1rem 5%; }
    .logo { font-family: 'Cinzel', serif; font-weight: 900; font-size: 1.5rem; letter-spacing: 2px; }

    /* PARALLAX CONTAINER */
    .viewport {
      position: relative;
      height: 300vh; /* Derinlik için uzun tutuyoruz */
      background: #03070a;
    }

    .section {
      position: sticky; top: 0; height: 100vh;
      width: 100%; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
    }

    /* KATMANLAR (Layers) */
    .layer {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 120%; /* Hareket payı */
      background-size: cover; background-position: center bottom;
      will-change: transform;
    }

    /* Arka Plan (Yıldızlar/Gök) */
    .layer-bg {
      z-index: 1;
      background: radial-gradient(circle at 50% 40%, #0a192f 0%, #03070a 80%);
    }

    /* Uzak Dağlar / Yapılar */
    .layer-mid {
      z-index: 2;
      display: flex; align-items: flex-end; justify-content: center;
    }
    .mountain-svg { width: 120%; height: 60%; fill: #050d16; }

    /* ANA BAŞLIK */
    .hero-content {
      position: relative; z-index: 3; text-align: center;
    }
    .hero-title {
      font-family: 'Cinzel', serif; font-size: clamp(3rem, 10vw, 8rem);
      line-height: 0.9; text-transform: uppercase;
      text-shadow: 0 0 30px rgba(0,0,0,0.9);
    }
    .hero-title span { color: var(--accent); }

    /* ÖN PLAN (Kayalıklar ve Karakter) */
    .layer-fg {
      z-index: 4;
      display: flex; align-items: flex-end; justify-content: center;
    }
    .foreground-svg { width: 110%; height: 50%; fill: #010204; }

    /* İkinci Bölüm (Mağara İçi) */
    .content-section {
      position: relative; z-index: 10;
      padding: 10rem 5%; background: #010204;
      min-height: 100vh; text-align: center;
    }
    .card-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem; margin-top: 4rem;
    }
    .worker-card {
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
      padding: 3rem; border-radius: 20px; transition: 0.3s;
    }
    .worker-card:hover { border-color: var(--accent); transform: translateY(-10px); }

  </style>
</head>
<body>

  <nav class="nav" id="mainNav">
    <div class="logo">WORKERS<span>.</span></div>
    <div style="font-size: 0.8rem; letter-spacing: 3px;">CREATIVE STUDIO</div>
  </nav>

  <div class="viewport">
    <div class="section">
      <div class="layer layer-bg" id="l-bg"></div>

      <div class="layer layer-mid" id="l-mid">
        <svg class="mountain-svg" viewBox="0 0 1440 400">
          <path d="M0,400 L200,150 L400,300 L700,50 L1000,350 L1200,100 L1440,400 Z"></path>
        </svg>
      </div>

      <div class="hero-content" id="l-text">
        <h1 class="hero-title">THE<br><span>WORKERS</span></h1>
        <p style="letter-spacing: 5px; margin-top: 20px; opacity: 0.7;">BEYOND THE HORIZON</p>
      </div>

      <div class="layer layer-fg" id="l-fg">
        <svg class="foreground-svg" viewBox="0 0 1440 400">
          <path d="M0,400 L0,50 L300,300 L500,400 Z"></path>
          <path d="M1440,400 L1440,20 L1100,250 L900,400 Z"></path>
          <rect x="710" y="300" width="20" height="60" rx="10"></rect>
          <circle cx="720" cy="290" r="10"></circle>
        </svg>
      </div>
    </div>
  </div>

  <div class="content-section" id="about">
    <h2 style="font-family: 'Cinzel'; font-size: 3rem;">Neler Yapıyoruz?</h2>
    <div class="card-grid">
      <div class="worker-card">
        <h3>Tasarım</h3>
        <p>Sınırları zorlayan, modern ve karanlık estetiğe sahip arayüzler.</p>
      </div>
      <div class="worker-card">
        <h3>Kodlama</h3>
        <p>Cloudflare Workers üzerinde çalışan, ışık hızında projeler.</p>
      </div>
      <div class="worker-card">
        <h3>Strateji</h3>
        <p>Markanızı dijital dünyada en tepeye taşıyacak planlar.</p>
      </div>
    </div>
  </div>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    // NAV SCROLL EFEKTİ
    window.addEventListener('scroll', () => {
      document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 100);
    });

    // VİDEODAKİ O MEŞHUR PARALLAX MEKANİĞİ
    
    // 1. Arka plan çok hafif hareket eder (Derinlik hissi)
    gsap.to("#l-bg", {
      y: "10%",
      scrollTrigger: { trigger: ".viewport", start: "top top", end: "bottom top", scrub: true }
    });

    // 2. Orta plan dağlar biraz daha hızlı
    gsap.to("#l-mid", {
      y: "-15%",
      scrollTrigger: { trigger: ".viewport", start: "top top", end: "bottom top", scrub: true }
    });

    // 3. Yazı yukarı doğru kaybolur
    gsap.to("#l-text", {
      y: "-150%",
      opacity: 0,
      scrollTrigger: { trigger: ".viewport", start: "top top", end: "50% top", scrub: true }
    });

    // 4. ÖN PLAN (Karakter) ÇOK HIZLI YUKARI ÇIKAR (Kamera yaklaşma efekti)
    gsap.to("#l-fg", {
      scale: 1.2,
      y: "-30%",
      scrollTrigger: { trigger: ".viewport", start: "top top", end: "bottom top", scrub: true }
    });

    // Kartlar için giriş animasyonu
    gsap.from(".worker-card", {
      y: 100, opacity: 0, duration: 1, stagger: 0.2,
      scrollTrigger: { trigger: ".content-section", start: "top 80%" }
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    });
  },
};
