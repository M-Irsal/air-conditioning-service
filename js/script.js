 // === hamburger menu ===
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

   // === smooth scrolling dengan offset yang pas di semua section ===
document.querySelectorAll('.nav-menu a, .btn-primary, .btn-outline[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      
      if (target) {
        // Dapatkan tinggi navbar
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Tentukan offset berdasarkan ukuran layar
        let offset = 20; // default tambahan
        
        if (window.innerWidth <= 768) {
          offset = 15; // lebih kecil untuk mobile
        } else {
          offset = 25; // lebih besar untuk desktop
        }
        
        // Hitung posisi target (dikurangi tinggi navbar + offset)
        const targetPosition = target.offsetTop - navbarHeight - offset;
        
        // Scroll ke posisi yang sudah dikalkulasi
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Tutup menu hamburger jika di mobile
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    }
  });
});

    // === animasi scroll fade-in ===
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    faders.forEach(el => observer.observe(el));

    // === back to top visibility ===
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if(window.scrollY > 400) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // === slideshow background hero ===
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }

    // Ganti slide setiap 5 detik
    setInterval(nextSlide, 5000);

    // === form WA integration dengan validasi ===
    document.getElementById('sendWA').addEventListener('click', function() {
      let valid = true;
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      document.getElementById('nameError').innerText = '';
      document.getElementById('phoneError').innerText = '';
      document.getElementById('addressError').innerText = '';

      if (!name) {
        document.getElementById('nameError').innerText = 'Nama harus diisi';
        valid = false;
      }
      if (!phone) {
        document.getElementById('phoneError').innerText = 'No WhatsApp harus diisi';
        valid = false;
      } else if (!/^[0-9+\-\s]{8,}$/.test(phone)) {
        document.getElementById('phoneError').innerText = 'Nomor tidak valid';
        valid = false;
      }
      if (!address) {
        document.getElementById('addressError').innerText = 'Alamat harus diisi';
        valid = false;
      }

      if (!valid) return;

      // format pesan WA
      const waNumber = '6288210749273'; // ganti dengan nomor tujuan
      const text = `Halo Paris Teknik Air Conditioner, saya ${name} ingin pesan layanan:
• Layanan: ${service}
• Alamat: ${address}
• No WA: ${phone}
• Pesan: ${message || '-'}

Mohon info lebih lanjut. Terima kasih.`;
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
    });

  // === Dropdown Pengaduan ===
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownToggle) {
  dropdownToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });
}

// Klik di luar dropdown untuk menutup
document.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    if (dropdownMenu) dropdownMenu.classList.remove('show');
  }
});

// Tutup dropdown saat klik link di dalamnya
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function() {
    dropdownMenu.classList.remove('show');
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }
  });
});

// === PENGADUAN VIA WHATSAPP SAJA ===
document.getElementById('pengaduanWA').addEventListener('click', function(e) {
  e.preventDefault();
  showPengaduanForm();
});

// Hapus event listener untuk email
// document.getElementById('pengaduanEmail')... dihapus

// === Form Pengaduan Modal (Hanya WhatsApp) ===
function showPengaduanForm() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 1.5rem; max-width: 500px; width: 90%; max-height: 90vh; overflow-y: auto;">
      <h3 style="color: var(--primary); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-phone-alt" style="color: #ef4444;"></i> 
        Form Pengaduan (WhatsApp)
      </h3>
      
      <div class="form-group">
        <label><i class="fas fa-user" style="color: var(--primary); margin-right: 0.5rem;"></i> Nama Lengkap *</label>
        <input type="text" id="modal_nama" placeholder="Contoh: Andi Setiawan" style="border-left: 3px solid var(--primary);">
      </div>
      
      <div class="form-group">
        <label><i class="fas fa-map-marker-alt" style="color: var(--primary); margin-right: 0.5rem;"></i> Alamat Lengkap *</label>
        <textarea id="modal_alamat" rows="2" placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan, Kota" style="border-left: 3px solid var(--primary);"></textarea>
      </div>
      
      <div class="form-group">
        <label><i class="fab fa-whatsapp" style="color: var(--primary); margin-right: 0.5rem;"></i> No. WhatsApp *</label>
        <input type="tel" id="modal_kontak" placeholder="08123456789" style="border-left: 3px solid var(--primary);">
      </div>
      
      <div class="form-group">
        <label><i class="fas fa-exclamation-circle" style="color: #ef4444; margin-right: 0.5rem;"></i> Jenis Pengaduan</label>
        <select id="modal_jenis" style="border-left: 3px solid #ef4444;">
          <option>Teknisi tidak datang tepat waktu</option>
          <option>Hasil service tidak memuaskan</option>
          <option>AC masih belum dingin</option>
          <option>Kebocoran setelah service</option>
          <option>Harga tidak sesuai</option>
          <option>Suku cadang bermasalah</option>
          <option>Lainnya</option>
        </select>
      </div>
      
      <div class="form-group">
        <label><i class="fas fa-comment-dots" style="color: #ef4444; margin-right: 0.5rem;"></i> Detail Pengaduan *</label>
        <textarea id="modal_pesan" rows="4" placeholder="Jelaskan detail pengaduan Anda..." style="border-left: 3px solid #ef4444;"></textarea>
      </div>
      
      <div style="display: flex; gap: 1rem; margin-top: 2rem;">
        <button class="btn-primary" id="modal_kirim" style="flex: 2; background-color: #25D366;">
          <i class="fab fa-whatsapp"></i> 
          Kirim via WhatsApp
        </button>
        <button class="btn-outline" id="modal_batal" style="flex: 1; background: white; color: var(--text); border: 1px solid var(--gray-mid);">
          <i class="fas fa-times"></i> Batal
        </button>
      </div>
      
      <div style="margin-top: 1rem; padding: 0.75rem; background: #fff5f5; border-radius: 0.75rem; font-size: 0.85rem; color: #ef4444; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-info-circle"></i>
        <span>Setiap pengaduan akan kami proses maksimal 1x24 jam. Kami akan datang kembali GRATIS jika kesalahan dari pihak kami.</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('modal_batal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  document.getElementById('modal_kirim').addEventListener('click', () => {
    // Ambil nilai dari form
    const nama = document.getElementById('modal_nama').value.trim();
    const alamat = document.getElementById('modal_alamat').value.trim();
    const kontak = document.getElementById('modal_kontak').value.trim();
    const jenis = document.getElementById('modal_jenis').value;
    const pesan = document.getElementById('modal_pesan').value.trim();
    
    // Validasi
    if (!nama || !alamat || !kontak || !pesan) {
      alert('Harap isi semua field yang bertanda * (Nama, Alamat, Kontak, dan Detail Pengaduan)!');
      return;
    }
    
    // Validasi no WhatsApp sederhana
    if (kontak.length < 10) {
      alert('Nomor WhatsApp tidak valid! Minimal 10 digit.');
      return;
    }
    
    // Kirim via WhatsApp
    const text = `Halo Paris Teknik Air Conditioner, saya ingin menyampaikan pengaduan:

*Nama:* ${nama}
*Alamat:* ${alamat}
*No WA:* ${kontak}
*Jenis Pengaduan:* ${jenis}
*Detail:* ${pesan}

Mohon segera ditindaklanjuti. Terima kasih.`;
    
    const waNumber = '6288210749273';
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
    document.body.removeChild(modal);
  });
}