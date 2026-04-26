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
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,200;14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --bg:#0a0a0a;
      --surface:#121212;
      --surface-light:#1c1c1c;
      --text-primary:#f5f5f5;
      --text-secondary:#a1a1a1;
      --accent:#d4a853;
      --accent-glow:rgba(212,168,83,0.4);
      --border:rgba(255,255,255,0.08);
      --gradient-1:linear-gradient(135deg,#d4a853 0%,#f0c96d 50%,#b8923d 100%);
      --gradient-dark:linear-gradient(180deg,rgba(10,10,10,0) 0%,rgba(10,10,10,1) 100%)
    }
    html{scroll-behavior:smooth;background:var(--bg)}
    body{
      font-family:'Inter',sans-serif;
      background:var(--bg);
      color:var(--text-primary);
      overflow-x:hidden;
      cursor:none;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale
    }
    .cursor{
      position:fixed;
      width:8px;
      height:8px;
      background:var(--accent);
      border-radius:50%;
      pointer-events:none;
      z-index:99999;
      transform:translate(-50%,-50%);
      transition:width .2s,height .2s,background .2s;
      mix-blend-mode:difference
    }
    .cursor-follower{
      position:fixed;
      width:36px;
      height:36px;
      border:2px solid rgba(212,168,83,.7);
      border-radius:50%;
      pointer-events:none;
      z-index:99998;
      transform:translate(-50%,-50%);
      transition:all .15s ease-out
    }
    .cursor.hover{
      width:35px;
      height:35px;
      background:rgba(212,168,83,.2);
      mix-blend-mode:normal;
      border:1px solid var(--accent)
    }
    .cursor-follower.hover{
      width:50px;
      height:50px;
      background:rgba(212,168,83,.05)
    }
    #bg-canvas{
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:-1;
      opacity:.6
    }
    .nav{
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index:100;
      padding:2rem 4rem;
      display:flex;
      justify-content:space-between;
      align-items:center;
      mix-blend-mode:difference;
      color:#fff;
      transition:all .4s ease
    }
    .nav-logo{
      font-family:'Space Grotesk',sans-serif;
      font-weight:600;
      font-size:1.2rem;
      letter-spacing:2px;
      text-transform:uppercase
    }
    .nav-links{
      display:flex;
      gap:3rem;
      list-style:none
    }
    .nav-links a{
      color:rgba(255,255,255,.8);
      text-decoration:none;
      font-size:.85rem;
      font-weight:400;
      letter-spacing:1px;
      transition:color .3s;
      text-transform:uppercase
    }
    .nav-links a:hover{color:var(--accent)}
    .hero{
      position:relative;
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      overflow:hidden;
      background:var(--bg)
    }
    .hero-content{
      text-align:center;
      z-index:10;
      position:relative;
      padding:2rem
    }
    .hero-badge{
      display:inline-block;
      padding:.6rem 1.8rem;
      border:1px solid rgba(212,168,83,.3);
      border-radius:50px;
      font-size:.75rem;
      letter-spacing:4px;
      text-transform:uppercase;
      color:var(--accent);
      margin-bottom:2.5rem;
      backdrop-filter:blur(20px);
      background:rgba(212,168,83,.05)
    }
    .hero-title{
      font-family:'Space Grotesk',sans-serif;
      font-size:clamp(4.5rem,12vw,10rem);
      font-weight:700;
      line-height:.9;
      letter-spacing:-.03em;
      color:#f5f5f5;
      margin-bottom:1.5rem
    }
    .hero-title .gold{
      background:var(--gradient-1);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text;
      display:block
    }
    .hero-subtitle{
      font-size:1.1rem;
      font-weight:300;
      color:var(--text-secondary);
      letter-spacing:3px;
      text-transform:uppercase;
      margin-top:1rem
    }
    .hero-scroll{
      position:absolute;
      bottom:3rem;
      left:50%;
      transform:translateX(-50%);
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:1rem;
      color:rgba(255,255,255,.5);
      font-size:.7rem;
      letter-spacing:3px;
      text-transform:uppercase
    }
    .hero-scroll-line{
      width:1px;
      height:50px;
      background:linear-gradient(to bottom,var(--accent),transparent);
      animation:scrollPulse 2s ease-in-out infinite
    }
    @keyframes scrollPulse{
      0%,100%{opacity:.3;height:50px}
      50%{opacity:1;height:70px}
    }
    .glass-section{
      position:relative;
      padding:8rem 2rem;
      display:flex;
      justify-content:center;
      align-items:center;
      min-height:100vh;
      background:var(--bg)
    }
    .glass-card{
      background:rgba(255,255,255,.03);
      backdrop-filter:blur(40px);
      -webkit-backdrop-filter:blur(40px);
      border:1px solid var(--border);
      border-radius:2rem;
      padding:5rem 3rem;
      max-width:800px;
      width:100%;
      text-align:center;
      position:relative;
      overflow:hidden
    }
    .glass-card::before{
      content:'';
      position:absolute;
      top:-50%;
      left:-50%;
      width:200%;
      height:200%;
      background:radial-gradient(circle at 30% 20%,rgba(212,168,83,.04) 0%,transparent 50%);
      pointer-events:none
    }
    .glass-card-quote{
      font-family:'Space Grotesk',sans-serif;
      font-size:clamp(1.8rem,4vw,3rem);
      font-weight:500;
      line-height:1.3;
      color:#f0f0f0;
      margin-bottom:2rem;
      position:relative;
      z-index:1
    }
    .glass-card-quote .highlight{
      background:var(--gradient-1);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text
    }
    .glass-card-author{
      font-size:.85rem;
      letter-spacing:4px;
      text-transform:uppercase;
      color:rgba(212,168,83,.7);
      position:relative;
      z-index:1
    }
    .connect-section{
      padding:10rem 2rem;
      background:var(--bg);
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      min-height:100vh;
      position:relative
    }
    .connect-grid{
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
      gap:2rem;
      max-width:1000px;
      width:100%;
      margin:4rem auto 0
    }
    .connect-card{
      background:var(--surface);
      border:1px solid var(--border);
      border-radius:1.5rem;
      padding:2.5rem 2rem;
      text-decoration:none;
      color:inherit;
      transition:all .4s cubic-bezier(.16,1,.3,1);
      position:relative;
      overflow:hidden;
      display:flex;
      flex-direction:column;
      align-items:center;
      text-align:center;
      gap:1.5rem
    }
    .connect-card::after{
      content:'';
      position:absolute;
      inset:0;
      background:radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(212,168,83,.1) 0%,transparent 60%);
      opacity:0;
      transition:opacity .4s ease
    }
    .connect-card:hover::after{opacity:1}
    .connect-card:hover{
      border-color:rgba(212,168,83,.3);
      transform:translateY(-4px);
      box-shadow:0 20px 50px rgba(0,0,0,.5),0 0 30px rgba(212,168,83,.1)
    }
    .connect-icon{
      width:60px;
      height:60px;
      border-radius:50%;
      background:var(--surface-light);
      display:flex;
      align-items:center;
      justify-content:center;
      position:relative;
      z-index:1;
      border:1px solid var(--border)
    }
    .connect-icon svg{
      width:24px;
      height:24px;
      fill:var(--accent)
    }
    .connect-platform{
      font-family:'Space Grotesk',sans-serif;
      font-weight:600;
      font-size:1.3rem;
      letter-spacing:-.5px;
      position:relative;
      z-index:1
    }
    .connect-username{
      font-size:.9rem;
      color:var(--text-secondary);
      position:relative;
      z-index:1
    }
    .connect-arrow{
      position:relative;
      z-index:1;
      font-size:1.2rem;
      color:var(--accent);
      transition:transform .3s ease
    }
    .connect-card:hover .connect-arrow{transform:translate(4px,-4px)}
    .section-label{
      font-size:.75rem;
      letter-spacing:5px;
      text-transform:uppercase;
      color:var(--accent);
      margin-bottom:1rem
    }
    .section-title{
      font-family:'Space Grotesk',sans-serif;
      font-size:clamp(2.5rem,6vw,4.5rem);
      font-weight:700;
      letter-spacing:-.03em;
      line-height:.9;
      text-align:center
    }
    .section-title .gold{
      background:var(--gradient-1);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text;
      display:block
    }
    .footer{
      padding:4rem 2rem;
      text-align:center;
      border-top:1px solid var(--border);
      background:var(--bg)
    }
    .footer-text{
      font-family:'Space Grotesk',sans-serif;
      font-size:1.5rem;
      font-weight:600;
      letter-spacing:-1px;
      margin-bottom:1rem
    }
    .footer-text .gold{
      background:var(--gradient-1);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text
    }
    .footer-copy{
      font-size:.75rem;
      color:var(--text-secondary);
      letter-spacing:2px;
      text-transform:uppercase
    }
    ::selection{background:rgba(212,168,83,.3);color:#fff}
    @media(max-width:768px){
      .nav{padding:1.5rem}
      .nav-links{display:none}
      .glass-card{padding:3rem 1.5rem;border-radius:1.5rem}
      .connect-grid{grid-template-columns:1fr}
      .hero-title{font-size:3.5rem}
    }
  </style>
</head>
<body>
  <div class="cursor" id="cursor"></div>
  <div class="cursor-follower" id="cursorFollower"></div>
  <canvas id="bg-canvas"></canvas>

  <nav class="nav">
    <div class="nav-logo">VA</div>
    <ul class="nav-links">
      <li><a href="#home">Anasayfa</a></li>
      <li><a href="#about">Hakkımda</a></li>
      <li><a href="#connect">İletişim</a></li>
    </ul>
  </nav>

  <section class="hero" id="home">
    <div class="hero-content">
      <div class="hero-badge">Creative Developer</div>
      <h1 class="hero-title">
        Veysel<br>
        <span class="gold">Aslan</span>
      </h1>
      <p class="hero-subtitle">Sınırları Aş, İz Bırak</p>
    </div>
    <div class="hero-scroll">
      <span>Keşfet</span>
      <div class="hero-scroll-line"></div>
    </div>
  </section>

  <section class="glass-section" id="about">
    <div class="glass-card">
      <p class="glass-card-quote">
        "İyi bir <span class="highlight">tasarım</span> sadece görülmez.<br>
        Hissedilir, yaşanır ve <span class="highlight">hatırlanır.</span>"
      </p>
      <p class="glass-card-author">— Veysel Aslan</p>
    </div>
  </section>

  <section class="connect-section" id="connect">
    <p class="section-label">Bağlantı Kur</p>
    <h2 class="section-title">
      Birlikte<br>
      <span class="gold">Çalışalım.</span>
    </h2>
    <div class="connect-grid">
      <a href="https://www.instagram.com/veyseloffical433?igsh=cjZjbG9yNHIyc3B2&utm_source=qr" target="_blank" rel="noopener" class="connect-card" id="card-instagram">
        <div class="connect-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </div>
        <div class="connect-platform">Instagram</div>
        <div class="connect-username">@veyseloffical433</div>
        <span class="connect-arrow">↗</span>
      </a>

      <a href="https://t.me/veyseloffical" target="_blank" rel="noopener" class="connect-card" id="card-telegram">
        <div class="connect-icon">
          <svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </div>
        <div class="connect-platform">Telegram</div>
        <div class="connect-username">@veyseloffical</div>
        <span class="connect-arrow">↗</span>
      </a>
    </div>
  </section>

  <footer class="footer">
    <p class="footer-text"><span class="gold">Veysel</span> Aslan</p>
    <p class="footer-copy">© 2026 — Tüm hakları saklıdır</p>
  </footer>

  <script>
    // Custom Cursor
    const cursor=document.getElementById('cursor');
    const cursorFollower=document.getElementById('cursorFollower');
    let mouseX=0,mouseY=0,cursorX=0,cursorY=0;

    document.addEventListener('mousemove',e=>{
      mouseX=e.clientX;
      mouseY=e.clientY;
      cursor.style.left=mouseX+'px';
      cursor.style.top=mouseY+'px';
    });

    function animateCursor(){
      cursorX+=(mouseX-cursorX)*0.15;
      cursorY+=(mouseY-cursorY)*0.15;
      cursorFollower.style.left=cursorX+'px';
      cursorFollower.style.top=cursorY+'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .connect-card, .glass-card').forEach(el=>{
      el.addEventListener('mouseenter',()=>{
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
      });
      el.addEventListener('mouseleave',()=>{
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
      });
    });

    // Mouse tracking for cards
    document.querySelectorAll('.connect-card').forEach(card=>{
      card.addEventListener('mousemove',e=>{
        const rect=card.getBoundingClientRect();
        const x=((e.clientX-rect.left)/rect.width)*100;
        const y=((e.clientY-rect.top)/rect.height)*100;
        card.style.setProperty('--mouse-x',x+'%');
        card.style.setProperty('--mouse-y',y+'%');
      });
    });

    // Canvas particles
    const canvas=document.getElementById('bg-canvas');
    const ctx=canvas.getContext('2d');
    let width,height;

    function resize(){
      width=canvas.width=window.innerWidth;
      height=canvas.height=window.innerHeight;
    }
    window.addEventListener('resize',resize);
    resize();

    const particles=[];
    const particleCount=120;

    class Particle{
      constructor(){
        this.reset();
        this.y=Math.random()*height;
      }
      reset(){
        this.x=Math.random()*width;
        this.y=-10;
        this.size=Math.random()*1.5+0.5;
        this.speedY=Math.random()*0.4+0.1;
        this.speedX=(Math.random()-0.5)*0.3;
        this.opacity=Math.random()*0.5+0.1;
        this.hue=Math.random()*20+35;
      }
      update(){
        this.y+=this.speedY;
        this.x+=this.speedX;
        if(this.y>height+10){this.reset();this.y=-10}
        if(this.x<-10)this.x=width+10;
        if(this.x>width+10)this.x=-10;
      }
      draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle='hsla('+this.hue+',60%,65%,'+this.opacity+')';
        ctx.fill();
      }
    }

    for(let i=0;i<particleCount;i++)particles.push(new Particle());

    function drawParticles(){
      ctx.clearRect(0,0,width,height);
      const gradient=ctx.createRadialGradient(width/2,height/2,0,width/2,height/2,Math.max(width,height)*0.7);
      gradient.addColorStop(0,'rgba(212,168,83,0.03)');
      gradient.addColorStop(1,'rgba(10,10,10,0)');
      ctx.fillStyle=gradient;
      ctx.fillRect(0,0,width,height);
      particles.forEach(p=>{p.update();p.draw(ctx)});
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const dx=particles[i].x-particles[j].x;
          const dy=particles[i].y-particles[j].y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist<100){
            ctx.beginPath();
            ctx.moveTo(particles[i].x,particles[i].y);
            ctx.lineTo(particles[j].x,particles[j].y);
            ctx.strokeStyle='rgba(212,168,83,'+(0.06*(1-dist/100))+')';
            ctx.lineWidth=0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
      anchor.addEventListener('click',function(e){
        e.preventDefault();
        const target=document.querySelector(this.getAttribute('href'));
        if(target)target.scrollIntoView({behavior:'smooth'});
      });
    });

    // Reveal animations on scroll
    const observerOptions={threshold:0.15,rootMargin:'0px 0px -50px 0px'};
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.style.opacity='1';
          entry.target.style.transform='translateY(0)';
        }
      });
    },observerOptions);

    document.querySelectorAll('.glass-card, .connect-card, .hero-content, .section-title').forEach(el=>{
      el.style.opacity='0';
      el.style.transform='translateY(40px)';
      el.style.transition='opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      observer.observe(el);
    });

    setTimeout(()=>{
      const hero=document.querySelector('.hero-content');
      if(hero){hero.style.opacity='1';hero.style.transform='translateY(0)';}
    },200);
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
