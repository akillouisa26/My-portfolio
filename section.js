/* ================================================
   sections.js
   Add:
   <script src="sections.js"></script>
   before closing </body>
================================================ */

(function () {

  /* ================================================
     SCROLL REVEAL
  ================================================= */

  const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        const el = entry.target;

        const delay =
          el.style.getPropertyValue('--reveal-delay') || '0s';

        el.style.transitionDelay = delay;

        el.classList.add('active');

        revealObserver.unobserve(el);
      }

    });

  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ================================================
     PROJECT CARD TILT EFFECT
  ================================================= */

  document.querySelectorAll('.proj-card').forEach(function (card) {

    card.addEventListener('mousemove', function (e) {

      const rect = card.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      card.style.transform =
        'translateY(-8px) rotateX(' +
        (-dy * 5) +
        'deg) rotateY(' +
        (dx * 5) +
        'deg)';

    });

    card.addEventListener('mouseleave', function () {

      card.style.transform = '';

      card.style.transition =
        'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';

    });

  });


  /* ================================================
     CONTACT FORM SUCCESS MESSAGE
  ================================================= */

  const form = document.querySelector('form');
  const successMsg = document.getElementById('contactSuccess');
  const sendBtn = document.getElementById('sendBtn');

  if (form && successMsg && sendBtn) {

    form.addEventListener('submit', function () {

      sendBtn.innerHTML = 'Sending...';

      sendBtn.disabled = true;

      successMsg.style.display = 'block';

    });

  }


  /* ================================================
     NAVBAR ACTIVE LINK ON SCROLL
  ================================================= */

  var sections = document.querySelectorAll('section[id]');

  var navLinks =
    document.querySelectorAll('#mainNav .nav-link');

  var sectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        var id = entry.target.getAttribute('id');

        navLinks.forEach(function (link) {

          link.classList.remove('active-nav');

          if (link.getAttribute('href') === '#' + id) {

            link.classList.add('active-nav');

          }

        });

      }

    });

  }, { threshold: 0.4 });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  /* ================================================
     CERTIFICATE LIGHTBOX
  ================================================= */

  var certMap = {

    cert1: {
      src: 'cert1.jpg',
      caption: 'MERN Stack Development · 2024'
    },

    cert2: {
      src: 'cert2.jpg',
      caption: 'Python Programming · 2023'
    },

    cert3: {
      src: 'cert3.jpg',
      caption: 'SQL & Database · 2023'
    },

    cert4: {
      src: 'cert4.jpg',
      caption: 'Internship Completion · 2024'
    }

  };


  /* OPEN MODAL */

  window.openCert = function (title) {

  const modal = document.getElementById('certModal');
  const img = document.getElementById('certModalImg');
  const caption = document.getElementById('certModalCaption');

  const clickedImg = event.currentTarget.querySelector("img");

  img.src = clickedImg.src;
  caption.textContent = title;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

  /* CLOSE MODAL */

  window.closeCert = function () {

    var modal =
      document.getElementById('certModal');

    if (modal) {
      modal.classList.remove('open');
    }

    document.body.style.overflow = '';

  };


  /* CLOSE ON ESC */

  document.addEventListener('keydown', function (e) {

    if (e.key === 'Escape') {
      window.closeCert();
    }

  });


  /* ================================================
     ACHIEVEMENTS VIEW MORE / LESS
  ================================================= */

  window.toggleAchievements = function () {

    var extras =
      document.querySelectorAll('.ach-extra');

    var btn =
      document.getElementById('achToggleBtn');

    var btnText =
      document.getElementById('achBtnText');

    var isOpen =
      btn.classList.contains('expanded');

    /* COLLAPSE */

    if (isOpen) {

      extras.forEach(function (el) {
        el.style.display = 'none';
      });

      btnText.textContent = 'View More';

      btn.classList.remove('expanded');

      document
        .getElementById('achievements')
        .scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

    }

    /* EXPAND */

    else {

      extras.forEach(function (el, i) {

        setTimeout(function () {

          el.style.display = 'block';

          el.style.animation = 'none';

          el.offsetHeight;

          el.style.animation = '';

        }, i * 80);

      });

      btnText.textContent = 'View Less';

      btn.classList.add('expanded');

    }

  };


  /* ================================================
     CERTIFICATES VIEW MORE / LESS
  ================================================= */
window.toggleCertificates = function () {

  const extra = document.querySelectorAll(".cert-extra");
  const btnText = document.getElementById("certBtnText");
  const btn = document.getElementById("certToggleBtn");

  if (!extra.length) return;

  const isHidden =
    extra[0].style.display === "none" || extra[0].style.display === "";

  extra.forEach(el => {
    el.style.display = isHidden ? "block" : "none";
  });

  btnText.textContent = isHidden ? "View Less" : "View More";
  btn.classList.toggle("expanded");

};
fetch("https://api.visitorbadge.io/api/visitors?path=akil-portfolio&label=Visitors&countColor=%238b5e3c")
  .then(res => res.text())
  .then(svg => {
    const match = svg.match(/>\d+</g);
    if (match) {
      const count = match[match.length - 1].replace(/[><]/g, "");
      document.getElementById("vb-count").textContent = count;
    }
  })
  .catch(() => {
    document.getElementById("vb-count").textContent = "—";
  });
})();
