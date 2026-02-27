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