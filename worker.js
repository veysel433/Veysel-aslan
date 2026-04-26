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
  <title>League of Legends Parallax Effect</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <style>
    /* Temel Ayarlar ve Buz Teması */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #01060e; /* Derin buz mavisi/siyah */
      color: #ffffff;
      font-family: 'Roboto', sans-serif;
      overflow-x: hidden;
    }

    /* Videodaki Üst Logo (LEAGUE OF LEGENDS Tarzı) */
    .top-logo {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      font-family: 'Cinzel', serif;
      font-size: 2rem;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-shadow: 0 0 10px rgba(25, 197, 255, 0.5), 0 0 20px rgba(25, 197, 255, 0.3);
      pointer-events: none;
    }

    /* Ana Kaydırma Alanı - Sayfanın uzunluğunu belirler */
    .main-wrapper {
      position: relative;
      height: 300vh; /* Kaydırma miktarını artırmak için yüksekliği artırdık */
      overflow: hidden;
    }

    /* ── ARKA PLAN KATMANI (YAVAŞ HAREKET EDER) ── */
    .bg-layer {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 150%; /* Fazladan alan */
      z-index: 1;
      will-change: transform;
    }

    /* Sahne 1: Dağlar ve Portal */
    .scene-1-bg {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100vh;
      display: flex; justify-content: center; align-items: center;
      /* Dağ efekti için gradient */
      background: linear-gradient(to bottom, #031428 0%, #01060e 100%);
    }
    .portal-glow {
      width: 400px; height: 500px;
      border: 8px solid #4df8ff;
      border-radius: 50% 50% 10px 10px;
      box-shadow: 0 0 50px #19c5ff, inset 0 0 50px #19c5ff;
      background: radial-gradient(circle, rgba(25,197,255,0.4) 0%, transparent 70%);
      position: relative;
    }

    /* Sahne 2: Mağara Arka Planı */
    .scene-2-bg {
      position: absolute;
      top: 100vh; left: 0; width: 100%; height: 100vh;
      background: #000205; /* Çok daha karanlık */
      display: flex; justify-content: center; align-items: center;
    }
    /* Mağara yan duvarları (Buz sarkıtları) */
    .cave-walls {
      position: absolute; width: 100%; height: 100%;
      background: 
        radial-gradient(circle at 0% 50%, rgba(10,30,60,0.8) 0%, transparent 40%),
        radial-gradient(circle at 100% 50%, rgba(10,30,60,0.8) 0%, transparent 40%);
    }

    /* ── ÖN PLAN KATMANI (KARAKTERLER - ÇOK HIZLI HAREKET EDER) ── */
    .fg-layer {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 200%;
      z-index: 10;
      will-change: transform;
      pointer-events: none;
    }

    /* Karakter 1 (Yukarı fırlayan) */
    .char-1 {
      position: absolute;
      top: 60vh; /* Ekranın alt kısımlarından başlar */
      left: 50%;
      transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center;
    }
    /* Karakter 1'in üstünde durduğu kayalık */
    .rock-pedestal {
      width: 300px; height: 150px;
      background: #020c17;
      border-top: 5px solid #19c5ff;
      clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
      box-shadow: 0 -10px 30px rgba(25,197,255,0.2);
    }
    /* Karakter 1 Silüeti (Burayı PNG ile değiştireceksin) */
    .char-1-model {
      width: 150px; height: 250px;
      background: linear-gradient(to top, #19c5ff, transparent);
      margin-bottom: -20px;
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    }

    /* Karakter 2 (Mağaradaki parlayan karakter) */
    .char-2-scene {
      position: absolute;
      top: 150vh; /* İkinci sahnede yer alacak */
      left: 0; width: 100%; height: 100vh;
      display: flex; justify-content: center; align-items: center;
      position: relative;
    }
    /* Karakter 2 Modeli */
    .char-2-model {
      width: 200px; height: 350px;
      background: #ffffff;
      border-radius: 100px;
      box-shadow: 0 0 60px #ffffff, 0 0 100px #19c5ff;
      filter: blur(5px);
    }

    /* Videodaki Yan Metinler */
    .side-text {
      position: absolute;
      width: 250px;
      font-size: 0.85rem;
      line-height: 1.6;
      color: rgba(255,255,255,0.7);
      text-align: left;
    }
    .text-left { left: 15%; top: 50%; transform: translateY(-50%); }
    .text-right { right: 15%; top: 50%; transform: translateY(-50%); }

  </style>
</head>
<body>

  <div class="top-logo">LEAGUE OF LEGENDS</div>

  <div class="main-wrapper">
    
    <div class="bg-layer" id="bgLayer">
      <div class="scene-1-bg">
        <div class="portal-glow">
          </div>
      </div>
      <div class="scene-2-bg">
        <div class="cave-walls"></div>
      </div>
    </div>

    <div class="fg-layer" id="fgLayer">
      
      <div class="char-1">
        <div class="char-1-model">
          </div>
        <div class="rock-pedestal"></div>
      </div>

      <div class="char-2-scene">
        
        <div class="side-text text-left">
          Bu alan videodaki gibi sol taraftaki metinleri temsil eder. Buraya karakterin özellikleri, hikayesi veya projenin detayları hakkında uzun açıklamalar yazabilirsin.
        </div>
        
        <div class="char-2-model">
           </div>

        <div class="side-text text-right">
          Bu alan da sağ taraftaki metinleri temsil eder. Parallax efekti sayesinde sen aşağı kaydırdıkça bu metinler ve ortadaki karakter harika bir derinlik hissiyle ekrana gelir.
        </div>

      </div>

    </div>

  </div>

  <script>
    gsap.registerPlugin(ScrollTrigger);

    // VİDEODAKİ EFEKTİN SIRRI BURADA:
    // Arka plan (bg-layer) aşağı kaydırdıkça çok yavaş yukarı çıkar (yPercent: -20)
    gsap.to("#bgLayer", {
      yPercent: -30, 
      ease: "none",
      scrollTrigger: {
        trigger: ".main-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5 // Yumuşaklık hissi (0.5 saniye gecikme)
      }
    });

    // Ön plan (fg-layer) ise aşağı kaydırdıkça çok hızlı yukarı çıkar (yPercent: -80)
    // Bu sayede ilk karakter portalın önünden hızla uçup geçer!
    gsap.to("#fgLayer", {
      yPercent: -80,
      ease: "none",
      scrollTrigger: {
        trigger: ".main-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5 
      }
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
