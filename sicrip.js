
const STORAGE_KEY = "topilmalar_elonlari_v1";

let elonlar = [
  {
    nom: "Qora rangli hamyon",
    tur: "Topildi",
    joy: "Toshkent shahri",
    izoh: "Namoyish uchun misol"
  },
  {
    nom: "Avtomobil kaliti",
    tur: "Yo‘qoldi",
    joy: "Samarqand shahri",
    izoh: "Namoyish uchun misol"
  },
  {
    nom: "Maktab sumkasi",
    tur: "Topildi",
    joy: "Buxoro shahri",
    izoh: "Namoyish uchun misol"
  }
];

try {
  const saqlangan = localStorage.getItem(STORAGE_KEY);
  if (saqlangan) {
    elonlar = JSON.parse(saqlangan);
  }
} catch (error) {
  console.warn("Saqlangan e’lonlarni o‘qib bo‘lmadi.");
}

function xavfsiz(matn) {
  return String(matn).replace(/[&<>"']/g, belgi => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[belgi]);
}

function saqla() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(elonlar));
  } catch (error) {
    console.warn("E’lonlar saqlanmadi.");
  }
}

function chiz() {
  const qidiruv = document
    .getElementById("qidiruv")
    .value.trim().toLocaleLowerCase();

  const tur = document.getElementById("tur").value;

  const natijalar = elonlar.filter(elon => {
    const matn = (
      elon.nom + " " + elon.joy + " " + elon.izoh
    ).toLocaleLowerCase();

    return (
      (tur === "Barchasi" || elon.tur === tur) &&
      matn.includes(qidiruv)
    );
  });

  document.getElementById("royxat").innerHTML =
    natijalar.map(elon => `
      <article class="card">
        <div class="emoji">
          ${elon.tur === "Topildi" ? "📦" : "🔎"}
        </div>
        <p>
          <span class="tag ${elon.tur === "Yo‘qoldi" ? "lost" : ""}">
            ${xavfsiz(elon.tur)}
          </span>
        </p>
        <h3>${xavfsiz(elon.nom)}</h3>
        <p class="muted">📍 ${xavfsiz(elon.joy)}</p>
        <p class="muted">${xavfsiz(elon.izoh || "")}</p>
      </article>
    `).join("");

  document.getElementById("boshqa")
    .classList.toggle("hidden", natijalar.length > 0);
}

document.getElementById("qidiruv")
  .addEventListener("input", chiz);

document.getElementById("tur")
  .addEventListener("change", chiz);

document.getElementById("forma")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const yangiElon = {
      nom: document.getElementById("nom").value.trim(),
      tur: document.getElementById("elonTuri").value,
      joy: document.getElementById("joy").value.trim(),
      izoh: document.getElementById("izoh").value.trim()
    };

    if (!yangiElon.nom || !yangiElon.joy) return;

    elonlar.unshift(yangiElon);
    saqla();
    chiz();

    this.reset();

    document.getElementById("xabar").textContent =
      "E’lon muvaffaqiyatli qo‘shildi!";

    document.getElementById("elonlar")
      .scrollIntoView({ behavior: "smooth" });
  });

chiz();
