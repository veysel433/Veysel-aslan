# Veysel Aslan — Personal Website

Modern, premium dark-themed personal portfolio website. Deployed on Cloudflare Workers.

## Features

- **Modern Typography**: Space Grotesk + Inter font pairing
- **Glassmorphism Cards**: Frosted glass effects with backdrop blur
- **Custom Cursor**: Smooth animated cursor with hover states (desktop only)
- **Noise Texture**: Subtle film grain overlay for premium feel
- **Aurora Background**: Animated gradient orbs in hero section
- **Grid Overlay**: Subtle masked grid pattern in hero
- **GSAP Animations**: Scroll-triggered reveal animations
- **Spotlight Effect**: Mouse-tracking radial glow on contact cards
- **Responsive Design**: Fully optimized for mobile and desktop
- **Smooth Scrolling**: Custom anchor navigation

## Deploy to Cloudflare Workers

### Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/sign-up) oluşturun
2. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) yükleyin:
   ```bash
   npm install -g wrangler
   ```
3. Cloudflare'a giriş yapın:
   ```bash
   wrangler login
   ```

### Deploy Steps

1. Bu dosyaları bilgisayarınıza kopyalayın (`worker.js` ve `wrangler.toml`)

2. Terminalde proje klasörüne gidin:
   ```bash
   cd veysel-aslan
   ```

3. Deploy edin:
   ```bash
   wrangler deploy
   ```

4. Deploy sonrası size bir URL verilecektir. Örnek:
   ```
   https://veysel-aslan.your-subdomain.workers.dev
   ```

### Custom Domain Ekleme

1. Cloudflare Dashboard'a gidin
2. Workers & Pages > Your Worker > Settings > Triggers
3. "Add Custom Domain" butonuna tıklayın
4. Domaininizi girin ve onaylayın

### Güncelleme

Kodda değişiklik yaptıktan sonra tekrar deploy edin:
```bash
wrangler deploy
```

## File Structure

```
├── worker.js        # Ana uygulama (HTML + CSS + JS)
├── wrangler.toml    # Cloudflare Workers yapılandırması
└── README.md        # Bu dosya
```

## Contact

- Instagram: [@veyseloffical433](https://instagram.com/veyseloffical433)
- Telegram: [@veyseloffical](https://t.me/veyseloffical)

---

© 2026 Veysel Aslan — Tüm Hakları Saklıdır.
