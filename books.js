// books.js — Hanedan Sahaf Kitap Verisi
const booksData = [
  {
    id: 1, title: "İstanbul Hatırası", author: "Ahmet Ümit", publisher: "Everest", year: 2010, pages: 528,
    isbn: "9789752890001", language: "Türkçe", category: "Roman", condition: "Çok İyi",
    price: 185, oldPrice: 220, stock: 3, rating: 4.5, reviewCount: 124,
    description: "Ahmet Ümit'in polisiye türündeki başyapıtı. İstanbul'un gizemli sokaklarında geçen, unutulmaz bir hikaye.",
    coverColor: "#6B1F2A", coverGradient: "linear-gradient(135deg, #6B1F2A 0%, #2C1810 100%)"
  },
  {
    id: 2, title: "Sapiens: İnsan Türünün Kısa Bir Tarihi", author: "Yuval Noah Harari", publisher: "Kolektif", year: 2015, pages: 416,
    isbn: "9786059680002", language: "Türkçe", category: "Bilim", condition: "Mükemmel",
    price: 245, oldPrice: null, stock: 8, rating: 4.8, reviewCount: 892,
    description: "İnsanlık tarihine büyüleyici bir yolculuk. Homo sapiens'in evriminden günümüze uzanan kapsamlı bir inceleme.",
    coverColor: "#2C5F2D", coverGradient: "linear-gradient(135deg, #2C5F2D 0%, #1a3a1b 100%)"
  },
  {
    id: 3, title: "Kürk Mantolu Madonna", author: "Sabahattin Ali", publisher: "Yapı Kredi", year: 1943, pages: 160,
    isbn: "9789750800003", language: "Türkçe", category: "Roman", condition: "İyi",
    price: 95, oldPrice: 120, stock: 1, rating: 4.9, reviewCount: 2103,
    description: "Türk edebiyatının en çok sevilen romanlarından biri. Aşk, yalnızlık ve özlem üzerine dokunaklı bir anlatı.",
    coverColor: "#8B4513", coverGradient: "linear-gradient(135deg, #8B4513 0%, #5D3A1A 100%)"
  },
  {
    id: 4, title: "Nutuk", author: "Mustafa Kemal Atatürk", publisher: "İş Bankası", year: 1927, pages: 968,
    isbn: "9786053320004", language: "Türkçe", category: "Tarih", condition: "Mükemmel",
    price: 320, oldPrice: null, stock: 5, rating: 5.0, reviewCount: 567,
    description: "Cumhuriyet'in kurucusu Mustafa Kemal Atatürk'ün 19 Mayıs 1919'dan 29 Ekim 1923'e kadar olan süreci anlattığı eser.",
    coverColor: "#C0392B", coverGradient: "linear-gradient(135deg, #C0392B 0%, #7B241C 100%)"
  },
  {
    id: 5, title: "Felsefenin Kısa Tarihi", author: "Nigel Warburton", publisher: "Say", year: 2012, pages: 288,
    isbn: "9786050200005", language: "Türkçe", category: "Felsefe", condition: "Çok İyi",
    price: 165, oldPrice: 190, stock: 4, rating: 4.3, reviewCount: 89,
    description: "Felsefenin Sokrates'ten günümüze uzanan yolculuğunu anlaşılır dille aktaran bir başvuru kitabı.",
    coverColor: "#1F618D", coverGradient: "linear-gradient(135deg, #1F618D 0%, #154360 100%)"
  },
  {
    id: 6, title: "Beyaz Zambaklar Ülkesinde", author: "Grigory Petrov", publisher: "Kırmızı Kedi", year: 1923, pages: 224,
    isbn: "9786050920006", language: "Türkçe", category: "Biyografi", condition: "İyi",
    price: 75, oldPrice: null, stock: 2, rating: 4.6, reviewCount: 445,
    description: "Finlandiya'nın kalkınmasını anlatan, Türkiye için de ilham kaynağı olan klasik bir eser.",
    coverColor: "#E8F8F5", coverGradient: "linear-gradient(135deg, #E8F8F5 0%, #A9DFBF 100%)"
  },
  {
    id: 7, title: "Yeraltından Notlar", author: "Fyodor Dostoyevski", publisher: "İş Bankası", year: 1864, pages: 152,
    isbn: "9786053600007", language: "Türkçe", category: "Roman", condition: "Mükemmel",
    price: 110, oldPrice: 135, stock: 6, rating: 4.4, reviewCount: 678,
    description: "Dostoyevski'nin varoluşçu edebiyatın öncüsü sayılan, derinlikli psikolojik analiz içeren romanı.",
    coverColor: "#4A235A", coverGradient: "linear-gradient(135deg, #4A235A 0%, #2E1437 100%)"
  },
  {
    id: 8, title: "Osmanlı İmparatorluğu Tarihi", author: "Halil İnalcık", publisher: "Doğan Kitap", year: 2008, pages: 640,
    isbn: "9786051110008", language: "Türkçe", category: "Tarih", condition: "Çok İyi",
    price: 290, oldPrice: 350, stock: 3, rating: 4.7, reviewCount: 234,
    description: "Osmanlı tarihinin en önemli uzmanlarından Halil İnalcık'ın kapsamlı ve detaylı tarih anlatısı.",
    coverColor: "#7D6608", coverGradient: "linear-gradient(135deg, #7D6608 0%, #4A3B04 100%)"
  },
  {
    id: 9, title: "Şiirler", author: "Nazım Hikmet", publisher: "Yapı Kredi", year: 1967, pages: 384,
    isbn: "9789750800009", language: "Türkçe", category: "Şiir", condition: "İyi",
    price: 130, oldPrice: null, stock: 4, rating: 4.8, reviewCount: 1567,
    description: "Nazım Hikmet'in seçme şiirlerinin yer aldığı, Türk şiirinin en önemli eserlerinden biri.",
    coverColor: "#D35400", coverGradient: "linear-gradient(135deg, #D35400 0%, #A04000 100%)"
  },
  {
    id: 10, title: "Evrenin Kısa Tarihi", author: "Stephen Hawking", publisher: "Altın Kitaplar", year: 1988, pages: 256,
    isbn: "9789754050010", language: "Türkçe", category: "Bilim", condition: "Çok İyi",
    price: 155, oldPrice: 180, stock: 5, rating: 4.6, reviewCount: 432,
    description: "Stephen Hawking'in evren, zaman ve kara delikler üzerine yazdığı, milyonlarca satan bilim klasiği.",
    coverColor: "#1B2631", coverGradient: "linear-gradient(135deg, #1B2631 0%, #0E1419 100%)"
  },
  {
    id: 11, title: "Suç ve Ceza", author: "Fyodor Dostoyevski", publisher: "İş Bankası", year: 1866, pages: 688,
    isbn: "9786053600011", language: "Türkçe", category: "Roman", condition: "Mükemmel",
    price: 210, oldPrice: null, stock: 7, rating: 4.9, reviewCount: 1234,
    description: "Dünya edebiyatının en büyük romanlarından biri. Suç, vicdan ve kefaret üzerine derin bir inceleme.",
    coverColor: "#641E16", coverGradient: "linear-gradient(135deg, #641E16 0%, #3A0F0B 100%)"
  },
  {
    id: 12, title: "Tutunamayanlar", author: "Oğuz Atay", publisher: "İletişim", year: 1972, pages: 724,
    isbn: "9789754700012", language: "Türkçe", category: "Roman", condition: "İyi",
    price: 195, oldPrice: 240, stock: 2, rating: 4.7, reviewCount: 987,
    description: "Oğuz Atay'ın başyapıtı. Türk edebiyatının modern klasikleri arasında yer alan, çok katmanlı bir roman.",
    coverColor: "#5D6D7E", coverGradient: "linear-gradient(135deg, #5D6D7E 0%, #34495E 100%)"
  },
  {
    id: 13, title: "Sokrates'in Savunması", author: "Platon", publisher: "İş Bankası", year: -399, pages: 96,
    isbn: "9786053320013", language: "Türkçe", category: "Felsefe", condition: "Mükemmel",
    price: 65, oldPrice: null, stock: 9, rating: 4.5, reviewCount: 345,
    description: "Platon'un üstadı Sokrates'in mahkeme savunmasını aktardığı, felsefe tarihinin temel metinlerinden biri.",
    coverColor: "#F4D03F", coverGradient: "linear-gradient(135deg, #F4D03F 0%, #B7950B 100%)"
  },
  {
    id: 14, title: "Çocuk Kalbi", author: "Edmondo De Amicis", publisher: "İş Bankası", year: 1886, pages: 320,
    isbn: "9786053600014", language: "Türkçe", category: "Çocuk", condition: "Çok İyi",
    price: 85, oldPrice: 100, stock: 6, rating: 4.6, reviewCount: 567,
    description: "Dünya çocuk edebiyatının en sevilen klasiklerinden biri. Sevgi, dostluk ve vatanseverlik üzerine.",
    coverColor: "#E74C3C", coverGradient: "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)"
  },
  {
    id: 15, title: "İbn Haldun: Mukaddime", author: "İbn Haldun", publisher: "Dergah", year: 1377, pages: 480,
    isbn: "9789759950015", language: "Türkçe", category: "Tarih", condition: "İyi",
    price: 275, oldPrice: 320, stock: 1, rating: 4.8, reviewCount: 198,
    description: "Sosyolojinin kurucusu sayılan İbn Haldun'un tarih felsefesi üzerine yazdığı eşsiz bir eser.",
    coverColor: "#6E2C00", coverGradient: "linear-gradient(135deg, #6E2C00 0%, #3E1A00 100%)"
  },
  {
    id: 16, title: "Bülbülü Öldürmek", author: "Harper Lee", publisher: "Pegasus", year: 1960, pages: 360,
    isbn: "9786053430016", language: "Türkçe", category: "Roman", condition: "Mükemmel",
    price: 145, oldPrice: null, stock: 4, rating: 4.7, reviewCount: 876,
    description: "Pulitzer ödüllü klasik. Irkçılık ve adalet üzerine, küçük bir kızın gözünden anlatılan dokunaklı bir hikaye.",
    coverColor: "#1A5276", coverGradient: "linear-gradient(135deg, #1A5276 0%, #0E2F44 100%)"
  },
  {
    id: 17, title: "Divan-ı Hafız", author: "Hafız-ı Şirazi", publisher: "Kabalıcı", year: 1389, pages: 512,
    isbn: "9789751400017", language: "Farsça/Türkçe", category: "Şiir", condition: "İyi",
    price: 350, oldPrice: 450, stock: 1, rating: 4.9, reviewCount: 67,
    description: "Nadir bulunan, çift dilli baskı. İranlı şair Hafız'ın ölümsüz gazelleri. Koleksiyonluk bir eser.",
    coverColor: "#186A3B", coverGradient: "linear-gradient(135deg, #186A3B 0%, #0D3B22 100%)"
  },
  {
    id: 18, title: "Albert Einstein: Yaşamı ve Evreni", author: "Walter Isaacson", publisher: "Domingo", year: 2007, pages: 704,
    isbn: "9786050930018", language: "Türkçe", category: "Biyografi", condition: "Çok İyi",
    price: 225, oldPrice: 260, stock: 3, rating: 4.6, reviewCount: 312,
    description: "Einstein'ın özel hayatından bilimsel devrimlerine kadar her yönüyle kapsamlı bir biyografi.",
    coverColor: "#5B2C6F", coverGradient: "linear-gradient(135deg, #5B2C6F 0%, #341845 100%)"
  },
  {
    id: 19, title: "Alice Harikalar Diyarında", author: "Lewis Carroll", publisher: "Can Çocuk", year: 1865, pages: 128,
    isbn: "9789750710019", language: "İngilizce", category: "Çocuk", condition: "Mükemmel",
    price: 195, oldPrice: null, stock: 2, rating: 4.5, reviewCount: 543,
    description: "Orijinal İngilizce baskısı. Lewis Carroll'ın fantastik dünyasına adım atan herkes için vazgeçilmez.",
    coverColor: "#E91E63", coverGradient: "linear-gradient(135deg, #E91E63 0%, #880E4F 100%)"
  },
  {
    id: 20, title: "Meditasyonlar", author: "Marcus Aurelius", publisher: "Sever", year: 180, pages: 208,
    isbn: "9789756900020", language: "Türkçe", category: "Felsefe", condition: "Mükemmel",
    price: 90, oldPrice: null, stock: 8, rating: 4.7, reviewCount: 789,
    description: "Roma İmparatoru Marcus Aurelius'un stoacı felsefeyi yansıtan, zamansız öğütler içeren günlükleri.",
    coverColor: "#7F8C8D", coverGradient: "linear-gradient(135deg, #7F8C8D 0%, #4A5658 100%)"
  },
  {
    id: 21, title: "Osmanlı'da Şehir ve Toplum", author: "İlber Ortaylı", publisher: "Timaş", year: 2014, pages: 256,
    isbn: "9786050800021", language: "Türkçe", category: "Tarih", condition: "Çok İyi",
    price: 140, oldPrice: 165, stock: 5, rating: 4.4, reviewCount: 456,
    description: "İlber Ortaylı'nın kaleminden Osmanlı şehir hayatı, toplumsal yapı ve kültürel dinamikler.",
    coverColor: "#873600", coverGradient: "linear-gradient(135deg, #873600 0%, #4A1E00 100%)"
  },
  {
    id: 22, title: "Küçük Prens", author: "Antoine de Saint-Exupéry", publisher: "Can Yayınları", year: 1943, pages: 112,
    isbn: "9789750710022", language: "Türkçe", category: "Çocuk", condition: "İyi",
    price: 55, oldPrice: null, stock: 12, rating: 4.9, reviewCount: 3456,
    description: "Hem çocukların hem yetişkinlerin sevdiği, hayatın anlamı üzerine derin mesajlar içeren bir masal.",
    coverColor: "#3498DB", coverGradient: "linear-gradient(135deg, #3498DB 0%, #1A5276 100%)"
  },
  {
    id: 23, title: "Ruhun Durumları", author: "Cemal Süreya", publisher: "Yapı Kredi", year: 1980, pages: 192,
    isbn: "9789750800023", language: "Türkçe", category: "Şiir", condition: "Mükemmel",
    price: 115, oldPrice: 140, stock: 3, rating: 4.8, reviewCount: 678,
    description: "Cemal Süreya'nın ikinci şiir kitabı. İkinci Yeni'nin en önemli temsilcilerinden birinin usta işi.",
    coverColor: "#8E44AD", coverGradient: "linear-gradient(135deg, #8E44AD 0%, #5B2C6F 100%)"
  },
  {
    id: 24, title: "Leonardo da Vinci", author: "Walter Isaacson", publisher: "Domingo", year: 2017, pages: 624,
    isbn: "9786050930024", language: "Türkçe", category: "Biyografi", condition: "Çok İyi",
    price: 260, oldPrice: 300, stock: 4, rating: 4.7, reviewCount: 234,
    description: "Rönesans dehasının hayatı, not defterleri ve sanatsal süreci üzerine detaylı bir biyografi.",
    coverColor: "#D68910", coverGradient: "linear-gradient(135deg, #D68910 0%, #935116 100%)"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = booksData;
}
