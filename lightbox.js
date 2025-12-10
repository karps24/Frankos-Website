(function () {
      const gallery = document.querySelector('.gallery-grid');
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = lightbox.querySelector('.lightbox-img');
      const caption = lightbox.querySelector('.lightbox-caption');
      const closeBtn = lightbox.querySelector('.lightbox-close');

      // Open when clicking a thumbnail link
      gallery.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor || !gallery.contains(anchor)) return;
        e.preventDefault();
        const href = anchor.getAttribute('href');
        const alt = anchor.querySelector('img')?.getAttribute('alt') || '';
        openLightbox(href, alt);
      });

      function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        caption.textContent = alt;
        lightbox.classList.add('visible');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // ensure zoom state reset
        lightboxImg.classList.remove('zoomed');
      }

      function closeLightbox() {
        lightbox.classList.remove('visible');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lightboxImg.src = '';
        lightboxImg.classList.remove('zoomed');
      }

      // Close when clicking overlay (but not when clicking image)
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) closeLightbox();
      });

      // Toggle zoom when clicking the image
      lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.classList.toggle('zoomed');
      });

      // Close on Escape
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (lightbox.classList.contains('visible')) closeLightbox();
        }
      });

      // Make thumbnails focusable for keyboard users
      gallery.querySelectorAll('a').forEach(a => {
        a.setAttribute('tabindex', '0');
      });
    })();