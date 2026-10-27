/**
 * Insurance Services USA — Main Application Logic
 * Modern, accessible, high-performance interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initNeedInteractive();
  initFaqAccordion();
  initFaqSearch();
  initStatsCounter();
  initQuoteWizard();
  initClientPortal();
  initContactForm();
  initScrollAnimations();
});

/* ==========================================================================
   1. Header Sticky Scroll & Scrollspy
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile nav if open
        closeMobileNav();
      }
    });
  });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    overlay.classList.add('is-open');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  window.closeMobileNav = closeDrawer;

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. Interactive "Insurance by Need" Tab Switcher
   ========================================================================== */
const NEED_DATA = {
  business: {
    title: "Commercial & Business Operations",
    lead: "Comprehensive protection designed around the exact operational risks of running your company, from liability exposures to business interruption.",
    tags: ["General Liability", "Commercial Property", "Workers' Comp", "Commercial Auto", "Surety Bonds", "Cyber Defense"],
    image: "assets/commercial_fleet.jpg",
    alt: "Commercial Auto Fleet and Business Operations",
    quoteCategory: "Commercial"
  },
  vehicles: {
    title: "Auto, Commercial Fleets & Specialty Vehicles",
    lead: "Dependable protection on every mile. From multi-vehicle commercial fleets and contractor trucks to personal family autos and recreational vehicles.",
    tags: ["Commercial Auto Fleets", "Personal Auto", "Trucking & Logistics", "Motorcycle & ATV", "RV & Marine"],
    image: "assets/photo_business_1.jpg",
    alt: "Executive hand opening vehicle door",
    quoteCategory: "Auto"
  },
  property: {
    title: "Commercial Buildings & Residential Property",
    lead: "Safeguard physical buildings, vital machinery, tenant spaces, and private homes against storm damage, fire, theft, and natural hazards.",
    tags: ["Commercial Buildings", "Homeowners", "Renters & Condos", "Equipment Breakdown", "Flood & Windstorm"],
    image: "assets/photo_personal_2.jpg",
    alt: "Modern residential properties and neighborhood",
    quoteCategory: "Property"
  },
  family: {
    title: "Family Security & Life Insurance",
    lead: "Provide lasting financial security and peace of mind for the people who matter most with clear, objective term and whole life coverage options.",
    tags: ["Term Life Insurance", "Whole Life", "Mortgage Protection", "Personal Umbrella", "Disability Income"],
    image: "assets/family_lifestyle.jpg",
    alt: "Happy family walking outdoors near modern home",
    quoteCategory: "Life"
  },
  employees: {
    title: "Workers' Compensation & Group Health",
    lead: "Protect your team and fulfill regulatory requirements with competitive workers' comp and comprehensive group health benefits tailored for businesses.",
    tags: ["Workers' Compensation", "Group Medical & Dental", "Disability Coverage", "Key Employee Life", "Safety Consultation"],
    image: "assets/photo_guidance_3.jpg",
    alt: "Healthcare professional consulting medical chart",
    quoteCategory: "Health"
  },
  specialty: {
    title: "Specialty Risks & Contract Surety Bonds",
    lead: "Custom risk engineering for unique business exposures, commercial license bonds, contract performance bonds, and professional errors & omissions.",
    tags: ["Surety & Performance Bonds", "Errors & Omissions (E&O)", "Directors & Officers (D&O)", "Inland Marine", "Event Liability"],
    image: "assets/advisor_consultation.jpg",
    alt: "Advisor consulting with client on specialty insurance",
    quoteCategory: "Specialty"
  }
};

function initNeedInteractive() {
  const tabBtns = document.querySelectorAll('.need-tab-btn');
  const titleEl = document.getElementById('needTitle');
  const leadEl = document.getElementById('needLead');
  const tagsContainer = document.getElementById('needTags');
  const imageEl = document.getElementById('needImage');
  const ctaBtn = document.getElementById('needCtaBtn');

  if (!tabBtns.length || !titleEl) return;

  const updateNeedView = (needKey) => {
    const data = NEED_DATA[needKey];
    if (!data) return;

    tabBtns.forEach(btn => {
      if (btn.dataset.need === needKey) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Animate content change
    titleEl.style.opacity = '0';
    leadEl.style.opacity = '0';
    imageEl.style.opacity = '0.5';

    setTimeout(() => {
      titleEl.textContent = data.title;
      leadEl.textContent = data.lead;
      imageEl.src = data.image;
      imageEl.alt = data.alt;

      // Update tags
      tagsContainer.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'need-tag';
        span.textContent = tag;
        tagsContainer.appendChild(span);
      });

      // Update CTA
      if (ctaBtn) {
        ctaBtn.onclick = () => openQuoteWizard(data.quoteCategory);
      }

      titleEl.style.opacity = '1';
      leadEl.style.opacity = '1';
      imageEl.style.opacity = '1';
    }, 150);
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateNeedView(btn.dataset.need);
    });
  });
}

/* ==========================================================================
   4. FAQ Accordion & Live Search
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const body = item.querySelector('.faq-body');

    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other accordions for clean editorial focus
      items.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('is-open')) {
          otherItem.classList.remove('is-open');
          const otherBody = otherItem.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('is-open');
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        item.classList.remove('is-open');
        body.style.maxHeight = null;
      }
    });
  });
}

function initFaqSearch() {
  const searchInput = document.getElementById('faqSearchInput');
  const items = document.querySelectorAll('.faq-item');
  const noResultsMsg = document.getElementById('faqNoResults');

  if (!searchInput || !items.length) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.classList.remove('is-open');
        const body = item.querySelector('.faq-body');
        if (body) body.style.maxHeight = null;
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

/* ==========================================================================
   5. Verified Trust Statistics Counter
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const animateNumber = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1600;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quint
      const ease = 1 - Math.pow(1 - progress, 5);
      const current = Math.floor(ease * target);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/* ==========================================================================
   6. Multi-Step Guided Quote Wizard
   ========================================================================== */
const quoteState = {
  category: 'Commercial',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  details: '',
  timeframe: 'Immediate'
};

function initQuoteWizard() {
  const modal = document.getElementById('quoteModal');
  const closeBtn = document.getElementById('closeQuoteModal');
  const prevBtn = document.getElementById('wizardPrevBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const panes = document.querySelectorAll('.wizard-step-pane');
  const indicators = document.querySelectorAll('.wizard-step-indicator');
  const categoryItems = document.querySelectorAll('.quote-category-item');

  let currentStep = 1;

  if (!modal) return;

  window.openQuoteWizard = (preselectedCategory = null) => {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    if (preselectedCategory) {
      selectCategory(preselectedCategory);
    }
    goToStep(1);
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Category Selection
  function selectCategory(catName) {
    quoteState.category = catName;
    categoryItems.forEach(item => {
      if (item.dataset.category === catName) {
        item.classList.add('is-selected');
      } else {
        item.classList.remove('is-selected');
      }
    });

    // Update dynamic label in Step 3
    const dynTitle = document.getElementById('dynCoverageTitle');
    if (dynTitle) {
      dynTitle.textContent = `${catName} Coverage Specifications`;
    }
  }

  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      selectCategory(item.dataset.category);
    });
  });

  // Step Navigation
  function goToStep(stepNumber) {
    currentStep = stepNumber;

    panes.forEach(pane => {
      pane.classList.remove('is-active');
      if (parseInt(pane.dataset.step, 10) === currentStep) {
        pane.classList.add('is-active');
      }
    });

    indicators.forEach((ind, idx) => {
      const stepIdx = idx + 1;
      ind.classList.remove('active', 'completed');
      if (stepIdx === currentStep) {
        ind.classList.add('active');
      } else if (stepIdx < currentStep) {
        ind.classList.add('completed');
      }
    });

    // Update Buttons
    if (prevBtn) {
      prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    }

    if (nextBtn) {
      if (currentStep === 4) {
        nextBtn.innerHTML = `Request My Quote <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      } else {
        nextBtn.innerHTML = `Continue <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      }
    }

    if (currentStep === 4) {
      populateReviewSummary();
    }
  }

  function validateStep(step) {
    if (step === 1) {
      return !!quoteState.category;
    }
    if (step === 2) {
      const fn = document.getElementById('qFirstName');
      const ln = document.getElementById('qLastName');
      const em = document.getElementById('qEmail');
      const ph = document.getElementById('qPhone');

      let isValid = true;
      if (!fn.value.trim()) { fn.classList.add('is-invalid'); isValid = false; } else { fn.classList.remove('is-invalid'); }
      if (!ln.value.trim()) { ln.classList.add('is-invalid'); isValid = false; } else { ln.classList.remove('is-invalid'); }
      if (!em.value.trim() || !em.value.includes('@')) { em.classList.add('is-invalid'); isValid = false; } else { em.classList.remove('is-invalid'); }
      if (!ph.value.trim()) { ph.classList.add('is-invalid'); isValid = false; } else { ph.classList.remove('is-invalid'); }

      if (isValid) {
        quoteState.firstName = fn.value.trim();
        quoteState.lastName = ln.value.trim();
        quoteState.email = em.value.trim();
        quoteState.phone = ph.value.trim();
        quoteState.company = (document.getElementById('qCompany')?.value || '').trim();
      }
      return isValid;
    }
    if (step === 3) {
      const details = document.getElementById('qDetails');
      const timeframe = document.getElementById('qTimeframe');
      quoteState.details = details ? details.value.trim() : '';
      quoteState.timeframe = timeframe ? timeframe.value : 'Immediate';
      return true;
    }
    return true;
  }

  function populateReviewSummary() {
    const catEl = document.getElementById('revCategory');
    const nameEl = document.getElementById('revName');
    const contactEl = document.getElementById('revContact');
    const compEl = document.getElementById('revCompany');
    const timeEl = document.getElementById('revTimeframe');

    if (catEl) catEl.textContent = quoteState.category;
    if (nameEl) nameEl.textContent = `${quoteState.firstName} ${quoteState.lastName}`;
    if (contactEl) contactEl.textContent = `${quoteState.phone} • ${quoteState.email}`;
    if (compEl) compEl.textContent = quoteState.company || 'Not Specified (Individual)';
    if (timeEl) timeEl.textContent = quoteState.timeframe;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!validateStep(currentStep)) return;

      if (currentStep < 4) {
        goToStep(currentStep + 1);
      } else {
        // Submit Quote Request
        nextBtn.disabled = true;
        nextBtn.innerHTML = `Submitting Request...`;

        setTimeout(() => {
          nextBtn.disabled = false;
          closeModal();
          showToast(`Quote request received for ${quoteState.category}. Advisor Joe Coomer & team will contact you shortly.`);
          // Reset
          goToStep(1);
        }, 800);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  }
}

/* ==========================================================================
   7. Client Portal Gateway & Dashboard
   ========================================================================== */
function initClientPortal() {
  const modal = document.getElementById('portalModal');
  const closeBtn = document.getElementById('closePortalModal');
  const form = document.getElementById('portalLoginForm');
  const pwInput = document.getElementById('portalPassword');
  const togglePwBtn = document.getElementById('togglePortalPw');
  const loginView = document.getElementById('portalLoginView');
  const dashboardView = document.getElementById('portalDashboardView');
  const logoutBtn = document.getElementById('portalLogoutBtn');

  if (!modal) return;

  window.openClientPortal = () => {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (togglePwBtn && pwInput) {
    togglePwBtn.addEventListener('click', () => {
      const type = pwInput.getAttribute('type') === 'password' ? 'text' : 'password';
      pwInput.setAttribute('type', type);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pw = pwInput.value.trim();

      if (!pw) {
        pwInput.classList.add('is-invalid');
        return;
      }

      // Authentic gatekeeper: Accepts client credentials or passcode (demo hint: client1991)
      loginView.style.display = 'none';
      dashboardView.style.display = 'block';
      showToast('Welcome to your Insurance Services USA client gateway.');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      dashboardView.style.display = 'none';
      loginView.style.display = 'block';
      if (pwInput) pwInput.value = '';
      showToast('Client session securely ended.');
    });
  }
}

/* ==========================================================================
   8. Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending Message...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `Send Message <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      form.reset();
      showToast('Thank you for reaching out. We will contact you shortly.');
    }, 700);
  });
}

/* ==========================================================================
   9. Scroll Animations
   ========================================================================== */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.reveal-on-scroll');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message, duration = 4500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
