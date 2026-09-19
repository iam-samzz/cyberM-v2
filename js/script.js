/* ========== NAVIGATION ========== */
function navigateTo(page) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  
  // Show target section
  const targetSection = document.getElementById('page-' + page);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update nav links
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === page) {
      a.classList.add('active');
    }
  });
  
  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========== THEME TOGGLE ========== */
const themeToggle = document.getElementById('themeToggle');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('cyberm-theme', theme);
}
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});
// Load saved theme
const savedTheme = localStorage.getItem('cyberm-theme') || 'dark';
setTheme(savedTheme);

/* ========== HAMBURGER ========== */
document.getElementById('hamburger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.getElementById('navLinks').classList.toggle('open');
});

/* ========== SEARCH & FILTER RESOURCES ========== */
let currentFilter = 'all';
let currentSearch = '';

function renderResources() {
  const grid = document.getElementById('resourceGrid');
  
  // Apply both filter and search
  let filtered = resources;
  
  if (currentFilter !== 'all') {
    filtered = filtered.filter(r => r.type === currentFilter);
  }
  
  if (currentSearch) {
    const searchLower = currentSearch.toLowerCase();
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(searchLower) ||
      r.desc.toLowerCase().includes(searchLower) ||
      r.source.toLowerCase().includes(searchLower) ||
      r.type.toLowerCase().includes(searchLower)
    );
  }
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        <div class="no-results-icon">🔍</div>
        <h3>No resources found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filtered.map(r => `
    <div class="resource-card" data-type="${r.type}">
      <div class="resource-type">${r.type}</div>
      <h3>${r.title}</h3>
      <p>${r.desc}</p>
      <div class="resource-meta">
        <span>📌 ${r.source}</span>
        <span>📅 ${r.date}</span>
      </div>
      <a class="resource-link" href="${r.link}" target="_blank" rel="noopener">Access Resource →</a>
    </div>
  `).join('');
}

function filterResources(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.resource-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderResources();
}

// Search functionality
const searchInput = document.getElementById('searchInput');
let searchTimeout;
searchInput.addEventListener('input', function(e) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = e.target.value.trim();
    renderResources();
  }, 300);
});

// Initial render
renderResources();

/* ========== RENDER ROADMAPS ========== */
function renderRoadmaps() {
  const grid = document.getElementById('roadmapGrid');
  grid.innerHTML = roadmaps.map(r => `
    <div class="roadmap-card">
      <div class="roadmap-card-icon">${r.icon}</div>
      <h3>${r.title}</h3>
      <p>${r.desc}</p>
      <div class="tag-list">
        ${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}
renderRoadmaps();

/* ========== RENDER TOOLS ========== */
function renderTools() {
  const grid = document.getElementById('toolsGrid');
  grid.innerHTML = tools.map(t => `
    <div class="tool-card" onclick="openToolModal('${t.id}')">
      <div class="tool-card-header">
        <div class="tool-icon">${t.icon}</div>
        ${t.trending ? '<span class="tool-trending">Trending</span>' : ''}
      </div>
      <h3>${t.name}</h3>
      <div class="tool-cat">${t.category}</div>
      <div class="tool-brief">${t.brief}</div>
      <button class="view-btn">View Overview →</button>
    </div>
  `).join('');
}
renderTools();

/* ========== TOOL MODAL ========== */
function openToolModal(toolId) {
  const tool = tools.find(t => t.id === toolId);
  if (!tool) return;
  document.getElementById('modalTitle').textContent = tool.name;
  document.getElementById('modalOverview').innerHTML = tool.overview;
  document.getElementById('modalFeatureList').innerHTML = tool.features.map(f => `<li>${f}</li>`).join('');
  document.getElementById('toolModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('toolModal').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('toolModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

function enrollTraining() {
  closeModal();
  navigateTo('contact');
  setTimeout(() => {
    document.getElementById('cSubject').value = 'tool-training';
    document.getElementById('cMessage').focus();
  }, 400);
}

/* ========== CONTACT FORM ========== */
function handleContact(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('cName').value,
    email: document.getElementById('cEmail').value,
    subject: document.getElementById('cSubject').value,
    message: document.getElementById('cMessage').value
  };
  // Backend integration point: POST /api/contact
  console.log('Contact form data:', data);
  alert('Message sent! We\'ll get back to you within 24 hours.');
  e.target.reset();
}

/* ========== INIT ========== */
// Ensure home page is active on load
document.addEventListener('DOMContentLoaded', function() {
  navigateTo('home');
});