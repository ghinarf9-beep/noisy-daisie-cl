// ==========================================
// 1. LOGIKA MENU MOBILE (BURGER MENU)
// ==========================================
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ==========================================
// 2. LOGIKA MODAL DETAIL PROFIL PEMAIN
// ==========================================
const cards = document.querySelectorAll('.tilt-card');
const modal = document.getElementById('bio-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// Elemen di dalam modal yang mau diganti datanya
const modalName = document.getElementById('modal-name');
const modalNumber = document.getElementById('modal-number');
const modalPos = document.getElementById('modal-pos');
const modalImg = document.getElementById('modal-img');
const modalStat1 = document.getElementById('modal-stat1');
const modalStat2 = document.getElementById('modal-stat2');
const modalStat3 = document.getElementById('modal-stat3');

if (cards && modal && closeModalBtn) {
    // Fungsi buka modal dan isi data otomatis
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Ambil data dari atribut HTML card yang diklik
            const name = card.getAttribute('data-name');
            const number = card.getAttribute('data-number');
            const pos = card.getAttribute('data-pos');
            const img = card.getAttribute('data-img');
            const stat1 = card.getAttribute('data-stat1');
            const stat2 = card.getAttribute('data-stat2');
            const stat3 = card.getAttribute('data-stat3');

            // Masukkan data ke dalam elemen modal
            modalName.textContent = name;
            modalNumber.textContent = number;
            modalPos.textContent = pos;
            modalImg.src = img;
            modalImg.alt = name;
            modalStat1.textContent = stat1;
            modalStat2.textContent = stat2;
            modalStat3.textContent = stat3;

            // Munculkan modal (hapus class hidden, tambah flex)
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    // Fungsi tutup modal lewat tombol X
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    });

    // Fungsi tutup modal kalau klik area luar modal (background blur)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
    });
}

// ==========================================
// 3. EFEK ANIMASI KARTU 3D (TILT EFFECT)
// ==========================================
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        
        // Atur derajat kemiringan kartu
        const angleX = (yc - y) / 15; 
        const angleY = (x - xc) / 15;
        
        card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
        card.style.boxShadow = `${-angleY * 2}px ${angleX * 2}px 25px rgba(236, 72, 153, 0.3)`; // Efek glow pink pas di-hover
    });
    
    // Kembalikan posisi kartu ke semula pas kursor keluar
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.boxShadow = 'none';
    });
});