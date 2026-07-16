/* =========================================================
   EDIT DI SINI SAJA — semua isi pesan romantis kamu ada di sini
   ========================================================= */

const CONFIG = {
  judulBuku: "Buat Kamu",
  subJudul: "Semoga buku kecil ini bisa bikin kamu senyum dikit",
  namaPasangan: "Kamu yang aku sayang", // muncul di sampul depan
  namaPengirim: "Dari aku, mas kamu yang jelek", // muncul di halaman penutup

  // tambah / kurangi pesan sesukanya, jumlah halaman menyesuaikan otomatis
  pesan: [
    "Maaff yaaa sayangg pagi tadi aku matiin call padahal kamu udah nungguin dan manggil aku.",
    "Aku minta maaff sama kamuuu, aku bener-bener gatau kalo kamu udah banun dan bener-bener gaada suaranyaa.",
    "Kalo kedengeran pasti aku nyaut soalnya tadi pagi sempet di atas kasur dulu karena kedinginann..",
    "Minta maaff kamu udah nungguin tapi malah kaya gitu jadinya.. aku minta maaff sayangg.",
    "Aku bener-bener ga bermaksud bikin kamu nunggu dan ga dapet apa-apa gituuu aku minta maaff sayangg.",
    "Makanya kalo aku udah bangun duluan selalu nyambut kamu pagi-pagi itu supaya semisal suara di aku ga kedengeran kamu tetep tau aku udah bangunn.",
    "Sekali lagi aku minta maaff yaaa sayangg akuuu..",
    "Aku gamau kamu ngambek lagiii cantikkk",
    "Aku sayang kamu banyak banyakk pokoknya sampe seniun niun, segalaksi, seantariksa jagat raya iniii",
    "I love youu sayanggkuuu cintakuu cantikk akuuu anak kicik akuuu🥰😘🫶❣️❣️❣️"
  ]
};

/* ========================================================= */

const bookEl = document.getElementById('book');

function buildPages(){
  const frag = document.createDocumentFragment();

  // sampul depan
  const cover = document.createElement('div');
  cover.className = 'page page-cover';
  cover.innerHTML = `
    <div class="page-content">
      <div class="seal">&#10084;</div>
      <h1 class="book-title">${CONFIG.judulBuku}</h1>
      <p class="book-subtitle">${CONFIG.subJudul}</p>
      <p class="closing-name">untuk ${CONFIG.namaPasangan}</p>
    </div>`;
  frag.appendChild(cover);

  // satu halaman per pesan
  CONFIG.pesan.forEach((teks, i) => {
    const page = document.createElement('div');
    page.className = 'page';
    page.innerHTML = `
      <div class="page-content">
        <div class="msg-mark">&#10084;</div>
        <p class="msg-text">${teks}</p>
        <span class="page-number ${i % 2 === 0 ? 'left' : 'right'}">${i + 1}</span>
      </div>`;
    frag.appendChild(page);
  });

  // penutup
  const closing = document.createElement('div');
  closing.className = 'page page-cover';
  closing.innerHTML = `
    <div class="page-content">
      <div class="seal">&#10084;</div>
      <p class="book-subtitle">Selesai</p>
      <p class="closing-name">${CONFIG.namaPengirim}</p>
      <img class="closing-mascot" src="kambing_melet.png" alt="Kambing kecil menjulurkan lidah, imut dan menggemaskan" width="120" height="120" loading="lazy">
    </div>`;
  frag.appendChild(closing);

  bookEl.appendChild(frag);
}

function initFlipbook(){
  buildPages();

  const pageFlip = new St.PageFlip(bookEl, {
    width: 340,
    height: 480,
    size: "stretch",
    minWidth: 140,
    maxWidth: 480,
    minHeight: 200,
    maxHeight: 680,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false,
    useMouseEvents: true,
    usePortrait: true, // biarkan mobile memakai mode portrait supaya buku tetap penuh dan terpusat
    swipeDistance: 25,
    flippingTime: 700
  });

  pageFlip.loadFromHTML(document.querySelectorAll('.page'));

  const hint = document.getElementById('hint');
  pageFlip.on('flip', () => {
    hint.style.display = 'none';
  });

  // zona invisible 50/50: kiri = halaman sebelumnya, kanan = halaman berikutnya
  document.getElementById('zoneLeft').addEventListener('click', () => pageFlip.flipPrev());
  document.getElementById('zoneRight').addEventListener('click', () => pageFlip.flipNext());
}

/* ---------- emot love kelap-kelip di background ---------- */
function spawnHearts(count){
  const layer = document.getElementById('heartsLayer');
  const emojis = ['\u{1F495}', '\u{2764}\u{FE0F}', '\u{1F49D}'];

  for (let i = 0; i < count; i++){
    const span = document.createElement('span');
    span.className = 'heart';
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const size = 20 + Math.random() * 40;
    const duration = 4 + Math.random() * 5;
    const delay = Math.random() * 5;

    span.style.left = Math.random() * 100 + 'vw';
    span.style.top = Math.random() * 100 + 'vh';
    span.style.fontSize = size + 'px';
    span.style.animationDuration = duration + 's';
    span.style.animationDelay = delay + 's';

    layer.appendChild(span);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  spawnHearts(22);
  initFlipbook();
});
