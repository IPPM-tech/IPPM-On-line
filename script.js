'use strict';

// ===== Logo Fallback =====
(function() {
  const logoImg = document.getElementById('organisationLogo');
  const fallback = document.querySelector('.logo-fallback');

  if (logoImg) {
    logoImg.addEventListener('error', function() {
      this.style.display = 'none';
      if (fallback) fallback.style.display = 'flex';
    });
  }
})();

// ===== Passport Photo – Upload & Camera =====
(function() {
  const photoInput = document.getElementById('passportPhoto');
  const preview = document.getElementById('photoPreview');
  const uploadBtn = document.getElementById('uploadPhotoBtn');
  const cameraBtn = document.getElementById('cameraPhotoBtn');
  const removeBtn = document.getElementById('removePhotoBtn');

  if (!photoInput || !preview) return;

  // Helper to update preview
  function updatePreview(file) {
    if (!file) {
      // Reset to placeholder
      preview.innerHTML = `
        <div class="placeholder">
          <span>📷</span>
          <span>Upload or capture</span>
        </div>
      `;
      removeBtn.style.display = 'none';
      photoInput.value = '';
      return;
    }

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      photoInput.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be under 2MB.');
      photoInput.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Passport preview" />`;
      removeBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  }

  // Upload button – triggers file picker
  if (uploadBtn) {
    uploadBtn.addEventListener('click', function() {
      photoInput.removeAttribute('capture');
      photoInput.click();
    });
  }

  // Camera button – triggers camera
  if (cameraBtn) {
    cameraBtn.addEventListener('click', function() {
      photoInput.setAttribute('capture', 'user'); // 'user' for front, 'environment' for rear
      photoInput.click();
    });
  }

  // File selection
  photoInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      updatePreview(this.files[0]);
    } else {
      updatePreview(null);
    }
  });

  // Remove photo
  if (removeBtn) {
    removeBtn.addEventListener('click', function() {
      updatePreview(null);
    });
  }

  // (Optional) Auto-set today's date if there is a date field
  const dateField = document.getElementById('applicationDate');
  if (dateField && !dateField.value) {
    dateField.valueAsDate = new Date();
  }
})();
