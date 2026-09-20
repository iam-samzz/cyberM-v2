/* ========== STATE MANAGEMENT ========== */
let currentRoadmapId = "basics";
let selectedResourceCategory = "all";

/* ========== NAVIGATION CONTROLLER ========== */
function navigateTo(pageId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-page') === pageId);
  });

  // Close mobile nav menu if open
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========== ROADMAP RENDERER ========== */
function switchRoadmap(roadmapId) {
  if (!roadmapsData[roadmapId]) return;
  currentRoadmapId = roadmapId;

  // Update button active state
  document.querySelectorAll('.roadmap-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-roadmap') === roadmapId);
  });

  const data = roadmapsData[roadmapId];

  // Render Active Roadmap Header Banner
  const headerEl = document.getElementById('roadmapHeader');
  headerEl.innerHTML = `
    <div class="roadmap-active-header-badge">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ${data.badge}
    </div>
    <h3>${data.title}</h3>
    <p>${data.desc}</p>
  `;

  // Render Vertical Roadmap Nodes
  const nodesContainer = document.getElementById('verticalRoadmapNodes');
  nodesContainer.innerHTML = '';

  data.nodes.forEach(node => {
    const nodeCard = document.createElement('div');
    nodeCard.className = 'vertical-node-card';

    // Topics Grid HTML
    let topicsHTML = '';
    if (node.topics && node.topics.length > 0) {
      topicsHTML = `
        <div class="vertical-node-subheading">Core Topics to Cover</div>
        <div class="vertical-topics-grid">
          ${node.topics.map(topic => `
            <div class="vertical-topic-card">
              <div class="vertical-topic-card-title">${topic.category}</div>
              <ul>
                ${topic.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Tools Row HTML
    let toolsHTML = '';
    if (node.tools && node.tools.length > 0) {
      toolsHTML = `
        <div class="vertical-tools-row">
          <span class="vertical-tools-label">Key Tools to Master:</span>
          ${node.tools.map(tool => `<span class="vertical-tool-chip">${tool}</span>`).join('')}
        </div>
      `;
    }

    nodeCard.innerHTML = `
      <div class="vertical-node-marker">${node.number}</div>
      <div class="vertical-node-header">
        <div class="vertical-node-title-group">
          <span class="vertical-node-step-tag">Node ${node.number}</span>
          <h4 class="vertical-node-title">${node.title}</h4>
        </div>
      </div>
      <div class="vertical-node-overview">${node.overview}</div>
      ${topicsHTML}
      ${toolsHTML}
    `;

    nodesContainer.appendChild(nodeCard);
  });
}

/* ========== RESOURCES RENDERER & FILTERS ========== */
function renderResources() {
  const grid = document.getElementById('resourceGrid');
  if (!grid) return;

  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  const levelTerm = document.getElementById('resourceLevelFilter').value;

  const filtered = resources.filter(res => {
    const matchesCategory = selectedResourceCategory === 'all' || res.category === selectedResourceCategory;
    const matchesLevel = levelTerm === 'all' || res.level === levelTerm;
    const matchesSearch = !searchTerm ||
      res.title.toLowerCase().includes(searchTerm) ||
      res.desc.toLowerCase().includes(searchTerm) ||
      res.source.toLowerCase().includes(searchTerm) ||
      res.skill.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Update Dashboard Stats
  document.getElementById('resourceTotalCount').textContent = resources.length;
  document.getElementById('resourceCategoryCount').textContent = new Set(resources.map(r => r.category)).size;
  document.getElementById('resourceBeginnerCount').textContent = resources.filter(r => r.level === 'beginner').length;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1;">
        <div class="no-results-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h3>No resources found</h3>
        <p>Try adjusting your search terms or filters.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(res => `
    <div class="resource-card">
      <div class="resource-card-top">
        <span class="resource-type">${res.type}</span>
        <span class="resource-level ${res.level}">${res.level}</span>
      </div>
      <h3>${res.title}</h3>
      <p>${res.desc}</p>
      <div class="resource-meta">
        <span>By ${res.source}</span>
        <span>•</span>
        <span>${res.skill}</span>
      </div>
      <a href="${res.link}" target="_blank" rel="noopener noreferrer" class="resource-link">
        Open Resource
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </a>
    </div>
  `).join('');
}

function filterResourceCategory(cat, btn) {
  selectedResourceCategory = cat;
  document.querySelectorAll('#resourceCategoryStrip .resource-category').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderResources();
}

/* ========== TOOLS DIRECTORY RENDERER ========== */
function renderTools() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;

  const searchTerm = document.getElementById('toolSearchInput').value.toLowerCase().trim();
  const categoryTerm = document.getElementById('toolCategoryFilter').value;
  const levelTerm = document.getElementById('toolLevelFilter').value;

  const filtered = tools.filter(t => {
    const matchesCategory = categoryTerm === 'all' || t.category === categoryTerm;
    const matchesLevel = levelTerm === 'all' || t.level === levelTerm;
    const matchesSearch = !searchTerm ||
      t.name.toLowerCase().includes(searchTerm) ||
      t.category.toLowerCase().includes(searchTerm) ||
      t.brief.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Update Tool Stats
  document.getElementById('totalToolsCount').textContent = tools.length;
  document.getElementById('totalCategoriesCount').textContent = new Set(tools.map(t => t.category)).size;
  document.getElementById('trendingToolsCount').textContent = tools.filter(t => t.trending).length;
  document.getElementById('toolsResultSummary').textContent = `Showing ${filtered.length} of ${tools.length} tools`;

  grid.innerHTML = filtered.map(t => `
    <div class="tool-card" onclick="openToolModal('${t.id}')">
      <div class="tool-card-topline">
        <span class="tool-level ${t.level.toLowerCase()}">${t.level}</span>
        ${t.trending ? '<span class="tool-trending">Popular</span>' : ''}
      </div>
      <div class="enhanced-tool-title-row">
        <div class="tool-icon">${t.icon}</div>
        <div>
          <h3>${t.name}</h3>
          <p class="tool-cat">${t.category}</p>
        </div>
      </div>
      <p class="tool-brief">${t.brief}</p>
      <button class="view-btn">
        View Overview & Features
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  `).join('');
}

function populateToolCategoryFilter() {
  const select = document.getElementById('toolCategoryFilter');
  if (!select) return;
  const categories = Array.from(new Set(tools.map(t => t.category)));
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

/* ========== TOOL MODAL CONTROLLER ========== */
function openToolModal(toolId) {
  const tool = tools.find(t => t.id === toolId);
  if (!tool) return;

  document.getElementById('modalTitle').textContent = tool.name;
  document.getElementById('modalOverview').innerHTML = tool.overview;

  const featureList = document.getElementById('modalFeatureList');
  featureList.innerHTML = tool.features.map(f => `<li>${f}</li>`).join('');

  document.getElementById('toolModal').classList.add('active');
}

function closeModal() {
  document.getElementById('toolModal').classList.remove('active');
}

function enrollTraining() {
  closeModal();
  navigateTo('contact');
  document.getElementById('cSubject').value = 'tool-training';
  document.getElementById('cMessage').value = `I want to enroll in ${document.getElementById('modalTitle').textContent} tool training.`;
}

/* ========== CONTACT FORM CONTROLLER ========== */
function handleContact(e) {
  e.preventDefault();
  alert('Thank you for reaching out! Your message has been sent successfully. We will get back to you within 24 hours.');
  document.getElementById('contactForm').reset();
}

/* ========== ASSISTANT BOT CONTROLLER ========== */
function setupAssistant() {
  const launcher = document.getElementById('assistantLauncher');
  const panel = document.getElementById('assistantPanel');
  const closeBtn = document.getElementById('assistantClose');
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  const messages = document.getElementById('assistantMessages');

  launcher.addEventListener('click', () => {
    panel.classList.toggle('active');
    if (panel.classList.contains('active') && messages.children.length === 0) {
      addAssistantMessage('bot', "Hello! Welcome to cyberM. I can help you find learning resources, explore security tools, or select a vertical career roadmap. What would you like to explore today?");
    }
  });

  closeBtn.addEventListener('click', () => panel.classList.remove('active'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addAssistantMessage('user', text);
    input.value = '';
    setTimeout(() => respondToUser(text), 500);
  });

  document.getElementById('assistantQuickActions').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const action = e.target.getAttribute('data-assistant-action');
      if (action === 'career') {
        addAssistantMessage('user', 'Start my cybersecurity journey');
        setTimeout(() => {
          addAssistantMessage('bot', 'Awesome! To start your journey, switch to our Main Cybersecurity Basics Vertical Roadmap. It covers OS fundamentals, networking, core security principles, and hands-on lab setup step-by-step.');
          navigateTo('roadmap');
          switchRoadmap('basics');
        }, 500);
      } else if (action === 'resources') {
        addAssistantMessage('user', 'Find learning resources');
        setTimeout(() => {
          addAssistantMessage('bot', 'We have curated 46+ free learning resources including OWASP Top 10, NIST frameworks, PortSwigger Academy, and TryHackMe. Taking you there now!');
          navigateTo('resources');
        }, 500);
      } else if (action === 'tools') {
        addAssistantMessage('user', 'Explore security tools');
        setTimeout(() => {
          addAssistantMessage('bot', 'Explore our interactive Tools Directory to learn Nmap, Burp Suite, Metasploit, Wireshark, Splunk, and more. Taking you there now!');
          navigateTo('tools');
        }, 500);
      } else if (action === 'roadmap') {
        addAssistantMessage('user', 'Show career paths');
        setTimeout(() => {
          addAssistantMessage('bot', 'You can switch between 6 vertical career roadmaps: Cybersecurity Basics, SOC Analyst, Penetration Tester, Cloud Security, DFIR, and GRC Analyst!');
          navigateTo('roadmap');
        }, 500);
      }
    }
  });
}

function addAssistantMessage(sender, text) {
  const messages = document.getElementById('assistantMessages');
  const msg = document.createElement('div');
  msg.className = `assistant-message ${sender}`;
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function respondToUser(query) {
  const q = query.toLowerCase();
  if (q.includes('soc') || q.includes('blue') || q.includes('defense')) {
    addAssistantMessage('bot', 'The SOC Analyst (Blue Team) roadmap focuses on monitoring, log correlation with Splunk/Sentinel, packet analysis with Wireshark, and incident response lifecycle!');
    navigateTo('roadmap');
    switchRoadmap('soc');
  } else if (q.includes('pentest') || q.includes('red') || q.includes('hack') || q.includes('offensive')) {
    addAssistantMessage('bot', 'The Penetration Tester (Red Team) roadmap covers OSINT recon, port scanning with Nmap, web exploitation with Burp Suite, and privilege escalation!');
    navigateTo('roadmap');
    switchRoadmap('pentest');
  } else if (q.includes('cloud') || q.includes('aws') || q.includes('azure')) {
    addAssistantMessage('bot', 'The Cloud Security Engineer roadmap guides you through IAM policies, Infrastructure as Code scanning with Terraform, and continuous CSPM auditing!');
    navigateTo('roadmap');
    switchRoadmap('cloud');
  } else if (q.includes('forensic') || q.includes('dfir') || q.includes('memory')) {
    addAssistantMessage('bot', 'The DFIR Specialist roadmap covers OS registry artifacts, disk imaging, RAM memory forensics with Volatility 3, and malware disassembly with Ghidra!');
    navigateTo('roadmap');
    switchRoadmap('dfir');
  } else if (q.includes('grc') || q.includes('risk') || q.includes('compliance')) {
    addAssistantMessage('bot', 'The GRC Analyst roadmap covers security policies, NIST CSF/ISO 27001 frameworks, quantitative risk assessment, and vendor audits!');
    navigateTo('roadmap');
    switchRoadmap('grc');
  } else {
    addAssistantMessage('bot', "I can guide you through our site! You can explore curated learning resources, test tools in our directory, or follow one of our vertical career roadmaps.");
  }
}

/* ========== THEME TOGGLE CONTROLLER ========== */
function setupThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('cyberM_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cyberM_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (theme === 'dark') {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  } else {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/* ========== MOBILE NAVIGATION TOGGLE ========== */
function setupMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
}

/* ========== INITIALIZATION ========== */
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupMobileNav();

  // Initialize Vertical Roadmap
  switchRoadmap('basics');

  // Initialize Resources
  renderResources();
  document.getElementById('searchInput').addEventListener('input', renderResources);
  document.getElementById('resourceLevelFilter').addEventListener('change', renderResources);

  // Initialize Tools Directory
  populateToolCategoryFilter();
  renderTools();
  document.getElementById('toolSearchInput').addEventListener('input', renderTools);
  document.getElementById('toolCategoryFilter').addEventListener('change', renderTools);
  document.getElementById('toolLevelFilter').addEventListener('change', renderTools);
  document.getElementById('resetToolFilters').addEventListener('click', () => {
    document.getElementById('toolSearchInput').value = '';
    document.getElementById('toolCategoryFilter').value = 'all';
    document.getElementById('toolLevelFilter').value = 'all';
    renderTools();
  });

  // Initialize Assistant
  setupAssistant();
});