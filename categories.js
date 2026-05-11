// categories.js — Hanedan Sahaf Kategorileri
const categoriesData = [
  { id: "roman", name: "Roman", icon: "fa-book-open", count: 8, color: "#6B1F2A" },
  { id: "tarih", name: "Tarih", icon: "fa-landmark", count: 5, color: "#7D6608" },
  { id: "felsefe", name: "Felsefe", icon: "fa-brain", count: 3, color: "#1F618D" },
  { id: "siir", name: "Şiir", icon: "fa-feather-pointed", count: 3, color: "#D35400" },
  { id: "bilim", name: "Bilim", icon: "fa-flask", count: 2, color: "#1B2631" },
  { id: "biyografi", name: "Biyografi", icon: "fa-user-pen", count: 2, color: "#5B2C6F" },
  { id: "cocuk", name: "Çocuk", icon: "fa-child-reaching", count: 3, color: "#E74C3C" },
  { id: "nadir", name: "Nadir Eserler", icon: "fa-gem", count: 1, color: "#C9A84C" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = categoriesData;
}
