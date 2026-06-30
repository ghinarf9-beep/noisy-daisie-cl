// ==========================================
// 1. LOGIKA MODAL DETAIL PROFIL PEMAIN
// ==========================================
const cards = document.querySelectorAll('.tilt-card');
const modal = document.getElementById('bio-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

const modalName = document.getElementById('modal-name');
const modalNumber = document.getElementById('modal-number');
const modalPos = document.getElementById('modal-pos');
const modalImg = document.getElementById('modal-img');
const modalStat1 = document.getElementById('modal-stat1');
const modalStat2 = document.getElementById('modal-stat2');
const modalStat3 = document.getElementById('modal-stat3');

if (cards.length > 0 && modal && closeModalBtn) {
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const number = card.getAttribute('data-number');
            const pos = card.getAttribute('data-pos');
            const img = card.getAttribute('data-img');
            const stat1 = card.getAttribute('data-stat1');
            const stat2 = card.getAttribute('data-stat2');
            const stat3 = card.getAttribute('data-stat3');

            if (modalName) modalName.textContent = name;
            if (modalNumber) modalNumber.textContent = number;
            if (modalPos) modalPos.textContent = pos;
            if (modalImg) { modalImg.src = img; modalImg.alt = name; }
            if (modalStat1) modalStat1.textContent = stat1;
            if (modalStat2) modalStat2.textContent = stat2;
            if (modalStat3) modalStat3.textContent = stat3;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
    });
}

// ==========================================
// 2. EFEK ANIMASI KARTU 3D (TILT EFFECT)
// ==========================================
if (cards.length > 0) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 15; 
            const angleY = (x - xc) / 15;
            
            card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
            card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 25px rgba(236, 72, 153, 0.3)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

// ==========================================
// 3. LOGIKA MULTI-BAHASA (ID / EN / MY)
// ==========================================
// Fungsi untuk mengubah teks di halaman berdasarkan bahasa aktif
function applyLanguage(lang) {
    const textElements = document.querySelectorAll('.translate-text');
    
    textElements.forEach(el => {
        const textID = el.getAttribute('data-id');
        const textEN = el.getAttribute('data-en');
        const textMY = el.getAttribute('data-my');
        
        if (lang === 'en' && textEN) {
            el.textContent = textEN;
        } else if (lang === 'my' && textMY) {
            el.textContent = textMY;
        } else if (textID) {
            el.textContent = textID; // Jika Indonesia atau tidak ada terjemahan, balik ke ID
        }
    });

    // Cari tombol ganti bahasa di navbar (baik versi desktop maupun mobile)
    const langSwitches = document.querySelectorAll('.lang-switch-btn');
    langSwitches.forEach(btn => {
        if (lang === 'id') btn.textContent = '🇮🇩 ID';
        if (lang === 'en') btn.textContent = '🇬🇧 EN';
        if (lang === 'my') btn.textContent = '🇲🇾 MY';
    });
}

// Jalankan logika ganti bahasa saat halaman selesai di-load
document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('selectedLanguage') || 'id';
    applyLanguage(currentLang);

    // Dapatkan semua tombol bahasa (bisa lebih dari satu jika dipasang di desktop & mobile menu)
    const langSwitches = document.querySelectorAll('.lang-switch-btn');
    
    langSwitches.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Ambil lagi status bahasa terbaru dari localStorage
            let currentLang = localStorage.getItem('selectedLanguage') || 'id';
            
            // Rotasi bahasa: ID -> EN -> MY -> ID
            if (currentLang === 'id') {
                currentLang = 'en';
            } else if (currentLang === 'en') {
                currentLang = 'my';
            } else {
                currentLang = 'id';
            }
            
            localStorage.setItem('selectedLanguage', currentLang);
            applyLanguage(currentLang);
        });
    });
});