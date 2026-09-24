// ---- Theme toggle, header scroll shadow, nav scroll-spy ----
var root = document.documentElement;
var header = document.getElementById('siteHeader');
var toggle = document.getElementById('themeToggle');
var menuBtnHeader = document.getElementById('menuBtn');
var menuEl = document.getElementById('mobileMenu');

function syncToggle() {
    var dark = root.getAttribute('data-theme') === 'dark';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', dark);
}
syncToggle();
toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-switching');
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { }
    syncToggle();
    setTimeout(function () { root.classList.remove('theme-switching'); }, 350);
});

new MutationObserver(function () {
    menuBtnHeader.setAttribute('aria-expanded', menuEl.classList.contains('open'));
}).observe(menuEl, { attributes: true, attributeFilter: ['class'] });

function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

var spyLinks = document.querySelectorAll('[data-spy]');
var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        spyLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });
['top', 'about', 'work', 'achievements', 'contact'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spy.observe(el);
});

// ---- Resume dropdown ----
(function () {
    const wrap = document.getElementById('resumeWrap');
    const btn = document.getElementById('resumeBtn');
    const menu = document.getElementById('resumeMenu');
    const chevron = document.getElementById('resumeChevron');

    function setOpen(open) {
        menu.classList.toggle('hidden', !open);
        btn.setAttribute('aria-expanded', open);
        chevron.classList.toggle('rotate-180', open);
    }

    btn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
    document.addEventListener('click', e => { if (!wrap.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
})();

// ---- Achievements ----
const achievements = [
    {
        category: 'competitions',
        title: 'Prothom Alo Bhasha Protijog',
        org: 'Prothom Alo',
        year: '2018',
        result: 'Winner',
        description: 'Won the language competition, placing 3rd in the regional round.',
        certs: ['assets/prothomalo.jpg'],
        link: '', linkLabel: ''
    },
    {
        category: 'competitions',
        title: 'English Olympiad — Regional',
        org: '',
        year: '2018',
        result: '3rd Place',
        description: 'Secured third position in the regional round of the English Olympiad.',
        certs: [],
        link: '', linkLabel: ''
    },
    {
        category: 'competitions',
        title: 'Inter-College Handball Championship',
        org: '',
        year: '2018',
        result: 'Champion',
        description: 'Won the inter-college handball championship with my team.',
        certs: [],
        link: '', linkLabel: ''
    },
    {
        category: 'hackathons',
        title: 'IIUC CSE Fest — Datathon',
        org: 'International Islamic University Chittagong',
        year: '2026',
        result: 'Participant',
        description: 'Multimodal disaster severity classification. Reached 74% on the public leaderboard (weighted F1) with a MobileNetV2 + multilingual BERT model.',
        certs: ['assets/datathon.jpg'],
    },
    {
        category: 'volunteer',
        title: 'Volunteer — Leads Academy',
        org: 'Leads Academy',
        year: '',
        result: 'Volunteer',
        description: 'Add your role, dates, and what you contributed here.',
        certs: ['assets/volunteer.jpg'],
        link: '', linkLabel: ''
    },
    {
        category: 'language',
        title: 'First Step Korean',
        org: 'Yonsei University · Coursera',
        year: '2020',
        result: 'Certified',
        description: 'Online non-credit course authorized by Yonsei University and offered through Coursera. Taught by Prof. Seung Hae Kang (Korean Language Education as a Foreign Language). Completed Nov 30, 2020.',
        certs: ['assets/korean.jpg'],
        link: 'https://coursera.org/verify/K2W7E89JRBGH',
        linkLabel: 'Verify on Coursera'
    },
];

const achIcons = { competitions: '🏅', hackathons: '💻', volunteer: '🤝' };

const achGrid = document.getElementById('achGrid');
achGrid.innerHTML = achievements.map((a, i) => `
  <button type="button" data-cat="${a.category}" data-i="${i}"
    class="ach-card text-left flex gap-4 items-center border border-line rounded-2xl bg-white p-4 hover:-translate-y-0.5 hover:shadow-md hover:border-leaf transition duration-300">
    <div class="relative w-20 h-20 flex-none rounded-xl bg-leaf/15 overflow-hidden flex items-center justify-center text-2xl">
      ${achIcons[a.category] || '⭐'}
      ${a.certs && a.certs[0] ? `<img src="${a.certs[0]}" alt="Certificate: ${a.title}" loading="lazy" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()">` : ''}
    </div>
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2 mb-1">
        ${a.result ? `<span class="badge badge-sm border-none bg-leaf/20 text-ink text-[11px] font-medium">${a.result}</span>` : ''}
        ${a.year ? `<span class="text-xs text-muted">${a.year}</span>` : ''}
        ${a.certs && a.certs.length ? `<span class="text-xs text-leafdark ml-auto">📄 Certificate</span>` : ''}
      </div>
      <h4 class="font-display text-base leading-snug truncate">${a.title}</h4>
      ${a.org ? `<p class="text-xs text-leafdark truncate">${a.org}</p>` : ''}
      ${a.description ? `<p class="text-xs text-muted leading-relaxed mt-1 line-clamp-2">${a.description}</p>` : ''}
    </div>
  </button>`).join('');

const achButtons = document.querySelectorAll('.ach-filter');
const achCards = achGrid.querySelectorAll('.ach-card');
achButtons.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    achButtons.forEach(b => b.classList.toggle('active', b === btn));
    achCards.forEach(c => c.classList.toggle('hidden', !(f === 'all' || c.dataset.cat === f)));
}));

const achModal = document.getElementById('achModal');
achCards.forEach(card => card.addEventListener('click', () => {
    const a = achievements[card.dataset.i];
    document.getElementById('achModalImgs').innerHTML =
        (a.certs || []).map(src => `<img src="${src}" alt="Certificate: ${a.title}" class="w-full object-contain max-h-[60vh] bg-white" onerror="this.remove()">`).join('');
    document.getElementById('achModalResult').textContent = a.result || '';
    document.getElementById('achModalResult').classList.toggle('hidden', !a.result);
    document.getElementById('achModalYear').textContent = a.year || '';
    document.getElementById('achModalTitle').textContent = a.title;
    document.getElementById('achModalOrg').textContent = a.org || '';
    document.getElementById('achModalDesc').textContent = a.description || '';
    const l = document.getElementById('achModalLink');
    l.classList.toggle('hidden', !a.link);
    if (a.link) { l.href = a.link; l.textContent = (a.linkLabel || 'View') + ' →'; }
    achModal.showModal();
}));

// ---- Contact form ----
(function () {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('cfBtn');
    const btnText = document.getElementById('cfBtnText');
    const status = document.getElementById('cfStatus');

    function showStatus(msg, ok) {
        status.textContent = msg;
        status.className = 'text-sm rounded-xl px-4 py-3 ' +
            (ok ? 'bg-leaf/15 text-ink' : 'bg-red-50 text-red-700');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) { form.reportValidity(); return; }

        const data = Object.fromEntries(new FormData(form));
        if (!data.subject || !data.subject.trim()) {
            data.subject = 'New portfolio message from ' + data.name;
        }

        btn.disabled = true;
        btnText.textContent = 'Sending…';
        btn.insertAdjacentHTML('afterbegin', '<span id="cfSpin" class="loading loading-spinner loading-sm"></span>');
        status.className = 'hidden';

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();

            if (res.ok && json.success) {
                showStatus('Thanks! Your message was sent. I’ll get back to you soon.', true);
                form.reset();
            } else {
                showStatus('Something went wrong. Please try again or email me directly.', false);
            }
        } catch (err) {
            showStatus('Network error. Please check your connection or email me directly.', false);
        } finally {
            const spin = document.getElementById('cfSpin');
            if (spin) spin.remove();
            btn.disabled = false;
            btnText.textContent = 'Send message';
        }
    });
})();

// ---- Mobile menu ----
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ---- Skill bar reveal ----
const bars = document.querySelectorAll('.skill-bar-fill');
const skillIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            bars.forEach(b => { b.style.width = b.dataset.pct + '%'; });
            document.querySelectorAll('.skill-pct').forEach((el, i) => { el.textContent = bars[i].dataset.pct + '%'; });
            skillIo.disconnect();
        }
    });
}, { threshold: 0.3 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillIo.observe(skillsSection);

// ---- Project data ----
const projectData = [
    {
        key: 'Shoppers Hub',
        title: 'Shoppers Hub',
        short: 'A full-stack e-commerce platform for browsing products, managing carts, wishlists, and completing purchases.',
        eyebrow: 'Full-Stack · E-Commerce',
        body: 'Shoppers Hub is an e-commerce web application that allows users to browse products, view product details, manage wishlists and shopping carts, and proceed through a checkout flow.',
        tags: ['Full-Stack', 'E-Commerce', 'Web'],
        github: 'https://github.com/KhushnurAnjum26/Ecommerce-website',
        live: '#',
        image: 'assets/ecom.png',
        accent: 'from-leafdark to-leaf',
        label: 'Shop'
    },
    {
        key: 'Nova-Travels',
        title: 'Nova-Travels',
        short: 'A bus seat reservation application for selecting available seats and managing ticket bookings.',
        eyebrow: 'Coursework · Booking System',
        body: 'Seat Booking App is an extended bus ticket reservation project that focuses on seat selection, booking management, and additional reservation functionality.',
        tags: ['Assignment', 'Booking', 'Web'],
        github: 'https://github.com/KhushnurAnjum26/Bus_ticket_assgnment5',
        live: '#',
        image: 'assets/nova-travels.png',
        accent: 'from-ink to-ink/80',
        label: 'Bus'
    },
    {
        key: 'E-Ticket Resolver',
        title: 'E-Ticket Resolver',
        short: 'A coursework project focused on implementing an electronic ticketing and reservation solution.',
        eyebrow: 'Coursework · Software Development',
        body: 'E-Ticket Resolver is an academic assignment developed to demonstrate software development concepts through an electronic ticketing system.',
        tags: ['Assignment', 'Java', 'Software'],
        github: 'https://github.com/KhushnurAnjum26/New-Assignment2',
        live: '#',
        image: 'assets/task-resolve-counter.png',
        accent: 'from-ink to-ink/80',
        label: 'T'
    },
    {
        key: 'Kali based Bus Ticket reservation System',
        title: 'Kali based Bus Ticket reservation System',
        short: 'A database-driven bus ticket reservation system for routes, passengers, seat selection, and bookings.',
        eyebrow: 'Full-Stack · Database',
        body: 'This bus ticket reservation system provides functionality for searching bus routes, selecting seats, storing passenger information, and managing ticket reservations using a database-backed application.',
        tags: ['Full-Stack', 'Database', 'Web'],
        github: 'https://github.com/KhushnurAnjum26/Bus-Ticket-Reservation-System',
        live: '#',
        image: 'assets/linux-bus.png',
        accent: 'from-leafdark to-leaf',
        label: 'Bus'
    },
    {
        key: 'Diabetes Detection Model Using ML',
        title: 'Diabetes Detection Model Using ML',
        short: 'A machine learning classification model for predicting diabetes from patient health indicators.',
        eyebrow: 'Machine Learning · Classification',
        body: 'This project applies machine learning to diabetes prediction using health-related patient features. Logistic Regression is used to classify whether a patient is likely to have diabetes.',
        tags: ['Machine Learning', 'Classification', 'Python'],
        github: 'https://github.com/KhushnurAnjum26/machine-Learning/blob/main/Diabetes_Prediction_using_Logistic_Regression.ipynb',
        live: '#',
        image: 'assets/diabetes.png',
        accent: 'from-ink to-ink/80',
        label: 'ML'
    },
    {
        key: 'PrismNet For Medical Image Segmentation',
        title: 'PRISM-Net for Medical Image Segmentation',
        short: 'A deep learning model for accurate colon polyp segmentation from endoscopic images.',
        eyebrow: 'Computer Vision · Deep Learning',
        body: 'PRISM-Net is a medical image segmentation model designed for colon polyp segmentation. It combines a ResNet34 encoder, attention-gated skip connections, ASPP-based multi-scale feature extraction, and a depthwise-separable decoder.',
        tags: ['Computer Vision', 'Deep Learning', 'Medical AI'],
        github: 'https://github.com/KhushnurAnjum26/Image-Processing-Project',
        live: '#',
        image: 'assets/seg.jpg',
        accent: 'from-leafdark to-leaf',
        label: 'CV'
    }
];

const carousel = document.getElementById('carousel');
carousel.innerHTML = projectData.map((p, i) => `
<article class="carousel-item snap-start w-[85%] sm:w-[60%] lg:w-[32%] flex-none border border-line rounded-2xl overflow-hidden bg-white flex flex-col">
  <div class="w-full aspect-video overflow-hidden bg-gray-100">
    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover" loading="lazy">
  </div>
  <div class="p-6 flex flex-col flex-1">
    <h3 class="font-display text-xl mb-2">${p.title}</h3>
    <p class="text-sm text-muted leading-relaxed mb-4 flex-1">${p.short}</p>
    <div class="flex flex-wrap gap-2 mb-5">
      ${p.tags.map(t => `<span class="badge badge-outline border-line text-ink/70">${t}</span>`).join('')}
    </div>
    <div class="flex flex-wrap gap-2">
      <a href="${p.github}" class="btn btn-xs rounded-full bg-ink hover:bg-ink/85 border-none text-white normal-case">GitHub</a>
      <a href="${p.live}" class="btn btn-xs rounded-full bg-leaf hover:bg-leafdark border-none text-ink normal-case">Live link</a>
      <button class="quickview-btn btn btn-xs rounded-full bg-transparent border border-line normal-case" data-project="${i}">Quick view</button>
    </div>
  </div>
</article>
`).join('');

const track = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsWrap = document.getElementById('dots');
const items = track.querySelectorAll('.carousel-item');

items.forEach((item, i) => {
    const dot = document.createElement('button');
    dot.className = 'w-2 h-2 rounded-full bg-line';
    dot.setAttribute('aria-label', 'Go to project ' + (i + 1));
    dot.addEventListener('click', () => item.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' }));
    dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll('button');

function updateDots() {
    const trackRect = track.getBoundingClientRect();
    let closest = 0, closestDist = Infinity;
    items.forEach((item, i) => {
        const dist = Math.abs(item.getBoundingClientRect().left - trackRect.left);
        if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('bg-leaf', i === closest));
}
track.addEventListener('scroll', () => window.requestAnimationFrame(updateDots));
updateDots();

function scrollByCard(dir) {
    const cardWidth = items[0].getBoundingClientRect().width + 24;
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
}
prevBtn.addEventListener('click', () => scrollByCard(-1));
nextBtn.addEventListener('click', () => scrollByCard(1));

const modal = document.getElementById('quickviewModal');
document.querySelectorAll('.quickview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const p = projectData[btn.dataset.project];
        document.getElementById('qvEyebrow').textContent = '— ' + p.eyebrow;
        document.getElementById('qvTitle').textContent = p.title;
        document.getElementById('qvBody').textContent = p.body;
        document.getElementById('qvGithub').href = p.github;
        document.getElementById('qvLive').href = p.live;
        const tagsWrap = document.getElementById('qvTags');
        tagsWrap.innerHTML = '';
        p.tags.forEach(t => {
            const span = document.createElement('span');
            span.className = 'badge badge-outline border-line text-ink/70';
            span.textContent = t;
            tagsWrap.appendChild(span);
        });
        modal.showModal();
    });
});

document.getElementById('toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---- Scroll-reveal animation ----
const revealSelectors = [
    '#about .grid.md\\:grid-cols-2 > div',
    '#skills .border.border-line',
    '#work .carousel-item',
    '#achievements .ach-card',
    '#contact .border.border-line'
];
const revealTargets = document.querySelectorAll(revealSelectors.join(', '));

revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 70 + 'ms';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

revealTargets.forEach((el) => revealObserver.observe(el));

// Hero entrance: staggers in on load, no scroll needed
const heroTextCol = document.querySelector('#top > div:nth-child(1)');
const heroPhotoCol = document.querySelector('#top > div:nth-child(2)');

if (heroTextCol) {
    Array.from(heroTextCol.children).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = i * 90 + 'ms';
    });
}
if (heroPhotoCol) {
    heroPhotoCol.classList.add('reveal-scale');
    heroPhotoCol.style.transitionDelay = '160ms';
}

requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        if (heroTextCol) heroTextCol.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
        if (heroPhotoCol) heroPhotoCol.classList.add('is-visible');
    });
});