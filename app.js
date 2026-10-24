/**
 * Beaconfield International Academy - Interactive Client Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Header Sticky Effect & Active Navigation ---
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for active navigation item
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 2. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // --- 3. Theme Toggle (Dark / Light Mode) ---
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('beaconfield-theme') || 'light';

  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      const isDark = document.body.classList.contains('theme-dark');
      localStorage.setItem('beaconfield-theme', isDark ? 'dark' : 'light');
      showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled');
    });
  }

  // --- 4. Academics Division Filter Tabs ---
  const divisionTabs = document.querySelectorAll('.division-tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  divisionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      divisionTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      programCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-division') === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. Campus Showcase Gallery Filter ---
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryItems.forEach((item) => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Interactive Tuition & Fee Calculator ---
  const gradeSelect = document.getElementById('calcGrade');
  const residencySelect = document.getElementById('calcResidency');
  const transportCheck = document.getElementById('calcTransport');
  const diningCheck = document.getElementById('calcDining');
  const scholarshipCheck = document.getElementById('calcScholarship');

  const baseFeeDisplay = document.getElementById('dispBaseFee');
  const residenceFeeDisplay = document.getElementById('dispResidenceFee');
  const transportFeeDisplay = document.getElementById('dispTransportFee');
  const diningFeeDisplay = document.getElementById('dispDiningFee');
  const scholarshipRow = document.getElementById('dispScholarshipRow');
  const scholarshipDiscountDisplay = document.getElementById('dispScholarship');
  const totalTuitionDisplay = document.getElementById('dispTotalTuition');

  function calculateTuition() {
    if (!gradeSelect) return;

    // Base tuition according to grade
    const gradeTuitionMap = {
      kindergarten: 8900,
      primary: 12400,
      middle: 14800,
      highschool: 18500,
      ibdiploma: 21200
    };

    // Residency option
    const residencyMap = {
      day: 0,
      weekly: 5500,
      full: 9800
    };

    const selectedGrade = gradeSelect.value;
    const baseTuition = gradeTuitionMap[selectedGrade] || 12400;

    const selectedResidency = residencySelect.value;
    const residencyCost = residencyMap[selectedResidency] || 0;

    const transportCost = transportCheck.checked ? 1600 : 0;
    const diningCost = diningCheck.checked ? 1350 : 0;

    let subtotal = baseTuition + residencyCost + transportCost + diningCost;
    let scholarshipDiscount = 0;

    if (scholarshipCheck.checked) {
      scholarshipDiscount = Math.round(baseTuition * 0.15); // 15% merit discount on tuition
      scholarshipRow.style.display = 'flex';
      scholarshipDiscountDisplay.textContent = `-$${scholarshipDiscount.toLocaleString()}`;
    } else {
      scholarshipRow.style.display = 'none';
    }

    const total = subtotal - scholarshipDiscount;

    // Update UI values
    baseFeeDisplay.textContent = `$${baseTuition.toLocaleString()}`;
    residenceFeeDisplay.textContent = `$${residencyCost.toLocaleString()}`;
    transportFeeDisplay.textContent = `$${transportCost.toLocaleString()}`;
    diningFeeDisplay.textContent = `$${diningCost.toLocaleString()}`;
    totalTuitionDisplay.textContent = `$${total.toLocaleString()}`;
  }

  // Bind calculator events
  if (gradeSelect) {
    [gradeSelect, residencySelect, transportCheck, diningCheck, scholarshipCheck].forEach((elem) => {
      elem.addEventListener('change', calculateTuition);
    });
    // Initial run
    calculateTuition();
  }

  // --- 7. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach((other) => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 8. Modal Management ---
  const modals = document.querySelectorAll('.modal-backdrop');
  const modalOpenBtns = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach((modal) => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  // Curriculum modal details loader
  const curriculumBtns = document.querySelectorAll('.btn-curriculum');
  const curriculumModal = document.getElementById('curriculumModal');
  const curriculumTitle = document.getElementById('curriculumModalTitle');
  const curriculumContent = document.getElementById('curriculumModalContent');

  const curriculumData = {
    early: {
      title: 'Early Childhood & Kindergarten (Ages 3-5)',
      content: `
        <p><strong>Philosophy:</strong> Reggio Emilia inspired inquiry with social-emotional foundations and bilingual immersion.</p>
        <ul style="margin: 1rem 0 1.5rem 1.25rem; line-height: 1.8;">
          <li>Foundational early literacy, phonics, and storytelling</li>
          <li>Number sense, tactile play, and early spatial reasoning</li>
          <li>Music, movement, visual arts, and nature exploration</li>
          <li>Social-emotional regulation and community empathy</li>
        </ul>
        <div style="background: var(--color-bg-muted); padding: 1rem; border-radius: 8px;">
          <strong>Class Size:</strong> Maximum 14 students with 2 full-time educators.
        </div>
      `
    },
    primary: {
      title: 'Primary School (Grades 1-5)',
      content: `
        <p><strong>Philosophy:</strong> Cambridge Primary & IB Primary Years Programme (PYP) combining academic rigor with joyful discovery.</p>
        <ul style="margin: 1rem 0 1.5rem 1.25rem; line-height: 1.8;">
          <li>Singapore Mathematics methodology and logic puzzles</li>
          <li>Interactive STEAM lab experiments & introductory coding (Scratch)</li>
          <li>World languages: Spanish, Mandarin, or French pathways</li>
          <li>Performing arts, choir, orchestra, and physical education</li>
        </ul>
        <div style="background: var(--color-bg-muted); padding: 1rem; border-radius: 8px;">
          <strong>Student-Faculty Ratio:</strong> 9:1 with individualized learning roadmaps.
        </div>
      `
    },
    middle: {
      title: 'Middle School (Grades 6-8)',
      content: `
        <p><strong>Philosophy:</strong> Fostering independent critical inquiry, leadership, and emotional intelligence through transitional adolescent years.</p>
        <ul style="margin: 1rem 0 1.5rem 1.25rem; line-height: 1.8;">
          <li>Integrated Sciences: Physics, Chemistry, Biology & Robotics</li>
          <li>Global Perspectives, World History & Model UN</li>
          <li>Advanced Algebra & Geometry honors track</li>
          <li>Competitive athletics, digital design, and public debate</li>
        </ul>
        <div style="background: var(--color-bg-muted); padding: 1rem; border-radius: 8px;">
          <strong>Advisory System:</strong> Daily dedicated advisory circle for academic mentoring.
        </div>
      `
    },
    high: {
      title: 'Upper School & IB Diploma (Grades 9-12)',
      content: `
        <p><strong>Philosophy:</strong> Rigorous university preparatory curriculum featuring 28 Advanced Placement (AP) and IB Diploma courses.</p>
        <ul style="margin: 1rem 0 1.5rem 1.25rem; line-height: 1.8;">
          <li>Full International Baccalaureate (IB) Diploma & AP Capstone</li>
          <li>Advanced Computer Science, AI Ethics & University Dual Enrollment</li>
          <li>4-year personalized College Counseling & Ivy/Russell Group prep</li>
          <li>Capstone Independent Research thesis & community action (CAS)</li>
        </ul>
        <div style="background: var(--color-bg-muted); padding: 1rem; border-radius: 8px;">
          <strong>College Acceptance:</strong> 100% university acceptance rate with $4.8M+ merit scholarships awarded.
        </div>
      `
    }
  };

  curriculumBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const prog = btn.getAttribute('data-prog');
      if (curriculumData[prog]) {
        curriculumTitle.textContent = curriculumData[prog].title;
        curriculumContent.innerHTML = curriculumData[prog].content;
        openModal('curriculumModal');
      }
    });
  });

  // --- 9. Toast Notifications System ---
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 50);

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --- 10. Form Submissions ---
  // Application Form
  const applyForm = document.getElementById('applyForm');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentName = document.getElementById('applyStudentName').value;
      const modal = document.getElementById('applyModal');
      closeModal(modal);
      applyForm.reset();
      showToast(`Application received for ${studentName}! Our Admissions Officer will contact you within 24 hours.`);
    });
  }

  // Tour Booking Form
  const tourForm = document.getElementById('tourForm');
  if (tourForm) {
    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = document.getElementById('tourDate').value;
      tourForm.reset();
      showToast(`Campus Tour confirmed for ${date || 'the selected date'}! We look forward to welcoming you.`);
    });
  }

  // Portal Login Form
  const portalForm = document.getElementById('portalForm');
  if (portalForm) {
    portalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('portalId').value;
      const modal = document.getElementById('portalModal');
      closeModal(modal);
      portalForm.reset();
      showToast(`Welcome back, ${id}! Connecting to secure school portal...`);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      newsletterForm.reset();
      showToast(`Thank you! ${email} has been subscribed to Beaconfield Gazette.`);
    });
  }

  // RSVP Buttons for Events
  const rsvpBtns = document.querySelectorAll('.btn-rsvp');
  rsvpBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const eventTitle = btn.getAttribute('data-event') || 'Event';
      btn.textContent = 'Registered ✓';
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-secondary');
      btn.disabled = true;
      showToast(`You have successfully RSVP'd for ${eventTitle}!`);
    });
  });
});
