// Veneer fiyatlandırma ve görsel güncelleme scripti
// Bu script, veneer sayısı ve türüne göre görselleri ve fiyatları günceller
// HTML sayfasında gerekli elementlerin var olduğunu varsayar
const prices = {
  natural: {
    2: 300,
    4: 600,
    6: 900,
    8: 1200,
    10: 1500,
  },
  zirconium: {
    2: 360,
    4: 720,
    6: 1080,
    8: 1440,
    10: 1800,
  },
};

function getImageUrl(type, pos, count) {
  return `pics/${type}/${pos === "top" ? "upper" : "lower"}${count}.png`;
}

let topCount = 2;
let bottomCount = 2;
let veneerType = "natural";

function updateUI() {
  document.getElementById("top-img").src = getImageUrl(
    veneerType,
    "top",
    topCount
  );
  document.getElementById("bottom-img").src = getImageUrl(
    veneerType,
    "bottom",
    bottomCount
  );

  let total = (topCount || 0) + (bottomCount || 0);
  let price = 0;
  if (topCount) price += prices[veneerType][topCount];
  if (bottomCount) price += prices[veneerType][bottomCount];

  document.getElementById("veneers-label").innerText = `${total} Veneers`;
  document.getElementById("veneers-price").innerText = `£ ${price}`;
}

document.querySelectorAll("#top-count-row .selector-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("#top-count-row .selector-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    topCount = parseInt(this.dataset.count);
    updateUI();
  });
});

document.querySelectorAll("#bottom-count-row .selector-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("#bottom-count-row .selector-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    bottomCount = parseInt(this.dataset.count);
    updateUI();
  });
});

document.querySelectorAll("#type-row .selector-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("#type-row .selector-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    veneerType = this.dataset.type || "natural";
    updateUI();
  });
});

function logSpecialOffer() {
  dataLayer.push({
    event: "specialOfferClick", // Bu, özel bir tıklama olayıdır.
    buttonClass: "get-quote-btn", // Ek bilgiler olarak buton sınıfını gönderebiliriz.
    buttonText: "Get Special Offers", // Buton metni gibi ek bilgiler.
  });

  // Ardından butonun varsayılan davranışını çalıştırabilirsiniz.
  window.open("https://wa.me/905449137827");
}

// Sayfa yüklendiğinde ilk güncellemeyi yap
updateUI();
