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
  <title>Veysel Aslan / Creative Developer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Raleway:ital,wght@0,200;0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      /* Videodaki karanlık ve sinematik renk paleti */
      --bg:#020508;
      --teal-deep:#05111a;
      --text-primary:#e8e0d0;
      --text-secondary:#8a9bb0;
      --border:rgba(255,255,255,0.1);
    }
    html{scroll-behavior:smooth;background:var(--bg);overflow-x:hidden}
    body{
      font-family:'Raleway',sans-serif;
      background:var(--bg);
      color:var(--text-primary);
      overflow-x:hidden;
      -webkit-font-smoothing:antialiased;
    }

    /* ── NAV ── */
    .nav{
      position:fixed;top:0;left:0;right:0;z-index:100;
      padding:1.5rem 4rem;
      display:flex;justify-content:space-between;align-items:center;
      background:transparent;
      transition:all .4s;
    }
    .nav.scrolled{
      backdrop-filter:blur(15px);
      background:rgba(2,5,8,0.8);
      border-bottom:1px solid var(--border);
    }
    .nav-logo{
      font-family:'Cinzel',serif;
      font-weight:700;font-size:1.1rem;
      letter-spacing:4px;text-transform:uppercase;
      color:var(--text-primary);
    }
    .nav-links{display:flex;gap:3rem;list-style:none}
    .nav-links a{
      color:var(--text-secondary);text-decoration:none;
      font-size:.75rem;font-weight:500;letter-spacing:2px;text-transform:uppercase;
      transition:color .3s;
    }
    .nav-links a:hover{color:#fff}

    /* ── PARALLAX HERO ── */
    .parallax-hero{
      position:relative;height:100vh;overflow:hidden;
      display:flex;align-items:center;justify-content:center;
      background:linear-gradient(180deg, #051320 0%, #020508 100%);
    }
    
    /* Layer 0 – Sky / Clouds */
    .layer-bg{
      position:absolute;inset:0;z-index:0;
      background:
        radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,220,255,0.1) 0%, transparent 60%);
      will-change:transform;
    }
    .layer-bg::after {
      content:''; position:absolute; top:20%; left:50%; transform:translateX(-50%);
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%);
      border-radius: 50%;
    }

    /* Layer 1 – Distant Mountains */
    .layer-mid{
      position:absolute;inset:0;z-index:1;
      will-change:transform;
      pointer-events:none;
    }

    /* Layer 2 – Foreground with Character */
    .layer-fg{
      position:absolute;inset:0;z-index:3;
      pointer-events:none;
      will-change:transform;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    /* Hero content */
    .hero-content{
      position:relative;z-index:10;
      text-align:center;
      padding:2rem;
      transform: translateY(-10vh); /* Biraz yukarı aldık */
    }
    .hero-title{
      font-family:'Cinzel',serif;
      font-size:clamp(2.5rem,7vw,6rem);
      font-weight:400;
      line-height:1.1;
      letter-spacing:2px;
      text-transform:uppercase;
      color:#fff;
      text-shadow: 0 10px 30px rgba(0,0,0,0.8);
      margin-bottom:1rem;
    }
    .hero-sub{
      font-family:'Raleway',sans-serif;
      font-size:1rem;font-weight:300;
      color:var(--text-secondary);
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-inline: auto;
      line-height: 1.6;
    }
    
    /* Videodaki Yuvarlatılmış Buton Tasarımı */
    .hero-cta{
      display:inline-flex;align-items:center;gap:.8rem;
      padding:1rem 2.5rem;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50px; /* Pill shape */
      color: #fff;
      text-decoration:none;
      font-size:.8rem;letter-spacing:2px;text-transform:uppercase;
      backdrop-filter:blur(10px);
      transition:all .3s;
    }
    .hero-cta:hover{
      background: #fff;
      color: #000;
    }

    /* ── CAVE / ABOUT SECTION ── */
    .about-section{
      min-height:100vh;
      display:flex;align-items:center;justify-content:center;
      padding:10rem 2rem;position:relative;
      background:#010204; /* Mağara içi çok karanlık */
      z-index: 5;
    }
    
    /* Videodaki Mağara Tavanı Sarkıtları Efekti */
    .cave-ceiling{
      position: absolute;
      top: -1px; /* Siyahlık boşluğu olmasın diye */
      left: 0;
      width: 100%;
      height: 150px;
      z-index: 10;
    }

    .about-content {
      text-align: center;
      max-width: 800px;
      z-index: 2;
    }
    .about-title {
      font-family:'Cinzel',serif;
      font-size:clamp(2rem,5vw,4rem);
      font-weight:400;
      color:#fff;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
    }
    .about-desc {
      color: var(--text-secondary);
      line-height: 1.8;
      font-size: 1.1rem;
    }

    /* ── CONNECT ── */
    .connect-section{
      padding:8rem 2rem;
      display:flex;flex-direction:column;align-items:center;
      background:#010204;
    }
    .connect-grid{
      display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
      gap:1.5rem;max-width:800px;width:100%;
      margin-top: 3rem;
    }
    .connect-card{
      background:rgba(255,255,255,0.03);
      border:1px solid var(--border);
      border-radius:12px;
      padding:2.5rem 2rem;
      text-decoration:none;color:inherit;
      transition:all .3s;
      text-align:center;
      display: flex; flex-direction: column; align-items: center; gap: 1rem;
    }
    .connect-card:hover{
      background:rgba(255,255,255,0.08);
      transform:translateY(-5px);
    }
    .connect-icon svg{width:30px;height:30px;fill:#fff}
    .connect-platform{font-family:'Cinzel',serif;font-size:1.2rem;letter-spacing:1px;}
    .connect-username{font-size:.85rem;color:var(--text-secondary);}

    .footer{
      padding:3rem 2rem;text-align:center;
      background:#010204;
      border-top:1px solid var(--border);
    }
    .footer p { color: var(--text-secondary); font-size: 0.8rem; letter-spacing: 2px;}

    @media(max-width:768px){
      .nav{padding:1.5rem}
      .nav-links{display:none}
      .hero-content { transform: translateY(0); }
    }
  </style>
</head>
<body>

  <nav class="nav" id="nav">
    <div class="nav-logo">V.A</div>
    <ul class="nav-links">
      <li><a href="#home">Anasayfa</a></li>
      <li><a href="#about">Hakkımda</a></li>
      <li><a href="#connect">İletişim</a></li>
    </ul>
  </nav>

  <section class="parallax-hero" id="home">
    
    <div class="layer-bg" id="layerBg"></div>

    <div class="layer-mid" id="layerMid">
      <svg width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" style="position:absolute;bottom:0;">
        <path d="M-100,800 L200,450 L400,600 L650,350 L900,550 L1150,300 L1500,650 L1500,800 Z" fill="#040c14" opacity="0.8"/>
        <path d="M-50,800 L150,550 L350,650 L550,450 L800,600 L1050,400 L1450,700 L1450,800 Z" fill="#02070c"/>
      </svg>
    </div>

    <div class="hero-content">
      <h1 class="hero-title">
        DÜNYALAR İNŞA ET,<br>
        HAYALLERİ TASARLA!
      </h1>
      <p class="hero-sub">Ben Veysel Aslan. Sınırları aşan dijital deneyimler yaratan, görsel hikaye anlatıcısı ve yaratıcı geliştiriciyim.</p>
      <a href="#about" class="hero-cta">Keşfetmeye Başla</a>
    </div>

    <div class="layer-fg" id="layerFg">
      <svg width="100%" height="60%" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
        <path d="M0,400 L0,100 L150,250 L250,50 L400,300 L450,400 Z" fill="#010204"/>
        <path d="M1440,400 L1440,80 L1300,220 L1150,60 L1000,280 L950,400 Z" fill="#010204"/>
        <g transform="translate(720, 360)">
          <path d="M-15,40 L0,-30 L15,40 Z" fill="#000"/>
          <circle cx="0" cy="-35" r="6" fill="#000"/>
          <rect x="20" y="-10" width="2" height="50" fill="#000"/>
        </g>
        <rect x="0" y="390" width="1440" height="20" fill="#010204"/>
      </svg>
    </div>
  </section>

  <section class="about-section" id="about">
    <svg class="cave-ceiling" viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,0 L1440,0 L1440,20 L1380,80 L1320,30 L1250,90 L1180,20 L1100,70 L1020,10 L950,60 L880,15 L800,85 L720,20 L650,75 L580,10 L500,90 L420,30 L350,80 L280,15 L200,70 L120,20 L50,90 L0,30 Z" fill="#010204"/>
    </svg>

    <div class="about-content">
      <h2 class="about-title">BİZİM VİTRİNİMİZ,<br>SENİN MACERAN!</h2>
      <p class="about-desc">
        İyi bir tasarım sadece görülmez, hissedilir. Karanlığın içinden yükselen aydınlık fikirlerle projelerinize hayat veriyorum. Detaylara inerek, kullanıcıda iz bırakan maceralar tasarlıyoruz.
      </p>
    </div>
  </section>

  <section class="connect-section" id="connect">
    <div class="connect-grid">
      <a href="https://www.instagram.com/veyseloffical433" target="_blank" rel="noopener" class="connect-card">
        <div class="connect-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </div>
        <div class="connect-platform">Instagram</div>
        <div class="connect-username">@veyseloffical433</div>
      </a>
      <a href="https://t.me/veyseloffical" target="_blank" rel="noopener" class="connect-card">
        <div class="connect-icon">
          <svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </div>
        <div class="connect-platform">Telegram</div>
        <div class="connect-username">@veyseloffical</div>
      </a>
    </div>
  </section>

  <footer class="footer">
    <p>© 2026 Veysel Aslan — Tüm hakları saklıdır</p>
  </footer>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    /* ── NAV SCROLL ── */
    window.addEventListener('scroll',()=>{
      document.getElementById('nav').classList.toggle('scrolled',window.scrollY>50);
    });

    /* ── PARALLAX SCROLL EFEKTLERI ── */
    // Arka plan (Gökyüzü) çok yavaş hareket eder
    gsap.to('#layerBg',{
      yPercent: 20, ease:'none',
      scrollTrigger:{trigger:'.parallax-hero', start:'top top', end:'bottom top', scrub:true}
    });

    // Orta plan (Dağlar) orta hızda hareket eder
    gsap.to('#layerMid',{
      yPercent: 40, ease:'none',
      scrollTrigger:{trigger:'.parallax-hero', start:'top top', end:'bottom top', scrub:true}
    });

    // Yazılar kaydırıldıkça yavaşça kaybolur ve yukarı çıkar
    gsap.to('.hero-content',{
      yPercent: 50, opacity: 0, ease:'none',
      scrollTrigger:{trigger:'.parallax-hero', start:'top top', end:'center top', scrub:true}
    });

    // Ön plan (Karakter ve Kayalıklar) en hızlı hareket ederek kameraya yaklaşıyormuş hissi verir
    gsap.to('#layerFg',{
      yPercent: -20, ease:'none',
      scrollTrigger:{trigger:'.parallax-hero', start:'top top', end:'bottom top', scrub:true}
    });

    /* ── YAZI ANİMASYONLARI ── */
    gsap.fromTo('.about-title, .about-desc',
      {opacity:0, y:40},
      {opacity:1, y:0, duration:1, stagger:0.2, ease:'power3.out',
       scrollTrigger:{trigger:'.about-section', start:'top 60%'}}
    );

    gsap.fromTo('.connect-card',
      {opacity:0, y:30},
      {opacity:1, y:0, duration:0.8, stagger:0.2, ease:'power3.out',
       scrollTrigger:{trigger:'.connect-section', start:'top 75%'}}
    );

    /* ── SMOOTH SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        e.preventDefault();
        const t=document.querySelector(a.getAttribute('href'));
        if(t)t.scrollIntoView({behavior:'smooth'});
      });
    });
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
