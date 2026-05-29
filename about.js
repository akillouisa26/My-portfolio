/* ================================================
   about.js  —  Scroll Reveal (updated)
================================================ */
(function () {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.12 }
  );

  // Original reveal elements
  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // Skill items staggered slide-in
  document.querySelectorAll('.skill-animate').forEach(function (el) {
    observer.observe(el);
  });

  // Skill section labels
  document.querySelectorAll('.reveal-skill').forEach(function (el) {
    observer.observe(el);
  });

  // Timeline items staggered slide-in
  document.querySelectorAll('.tl-animate').forEach(function (el) {
    observer.observe(el);
  });
})();