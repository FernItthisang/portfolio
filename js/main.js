// Footer year update
document.addEventListener('DOMContentLoaded', function() {
  const yearElements = document.querySelectorAll('#y');
  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});

// Scrollytelling behavior for IHPP project
(function(){
  const steps = Array.from(document.querySelectorAll('.step'));
  const title = document.getElementById('media-title');
  const desc  = document.getElementById('media-desc');

  // Only run if elements exist (for IHPP page)
  if (steps.length === 0 || !title || !desc) return;

  const states = {
    consumption: {
      node: document.getElementById('media-consumption'),
      title: 'Antimicrobial Consumption',
      desc: 'Sankey flow highlighting annual antimicrobial usage.'
    },
    resistance: {
      node: document.getElementById('media-resistance'),
      title: 'Antimicrobial Resistance',
      desc: 'Trends over time with line charts; distribution via dots/bars.'
    },
    awareness: {
      node: document.getElementById('media-awareness'),
      title: 'Awareness & Knowledge',
      desc: 'Survey results and knowledge gaps shown with bars & dots.'
    },
    methods: {
      node: document.getElementById('media-methods'),
      title: 'Methods & Process',
      desc: 'Workshops, data characterization, prototyping, accessibility.'
    },
  };

  function show(key){
    Object.values(states).forEach(s => s.node.classList.remove('is-visible'));
    states[key].node.classList.add('is-visible');
    title.textContent = states[key].title;
    desc.textContent  = states[key].desc;
  }
  // init
  show('consumption'); 
  if (steps[0]) steps[0].classList.add('is-active');

  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        steps.forEach(s => s.classList.toggle('is-active', s===entry.target));
        const key = entry.target.getAttribute('data-state');
        if (key && states[key]) {
          show(key);
        }
      }
    });
  }, {root:null, rootMargin:'0px 0px -55% 0px', threshold:0.5});

  steps.forEach(s => io.observe(s));
})();

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  if (nav) {
    nav.classList.toggle('mobile-open');
  }
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Add loading states for buttons
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.href && !this.href.startsWith('#')) {
        this.style.opacity = '0.7';
        this.style.pointerEvents = 'none';
      }
    });
  });
});