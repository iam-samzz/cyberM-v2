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

/* ========== RENDER TOOLS DIRECTORY ========== */
const toolProfiles = {
  nmap: { level: 'Beginner', tags: ['Network discovery', 'Port scanning'], purpose: 'Discover hosts, open ports, and running services on an authorized network.', safe: 'Use only on systems and networks you own or have permission to test.' },
  burp: { level: 'Intermediate', tags: ['Web testing', 'HTTP analysis'], purpose: 'Inspect and test web application requests and responses in a controlled lab.', safe: 'Test only applications where you have explicit authorization.' },
  metasploit: { level: 'Advanced', tags: ['Exploit validation', 'Penetration testing'], purpose: 'Validate vulnerabilities and security controls using a controlled penetration-testing framework.', safe: 'Use in intentionally vulnerable labs or authorized assessments.' },
  wireshark: { level: 'Beginner', tags: ['Packet analysis', 'Networking'], purpose: 'Capture and inspect network packets to understand protocols and investigate issues.', safe: 'Capture traffic only on networks where monitoring is permitted.' },
  hashcat: { level: 'Advanced', tags: ['Password auditing', 'Hash analysis'], purpose: 'Audit password strength by testing password hashes in approved security assessments.', safe: 'Use only with authorized password hashes and test environments.' },
  john: { level: 'Intermediate', tags: ['Password auditing', 'Hash recovery'], purpose: 'Assess password strength and recover passwords from authorized hash samples.', safe: 'Never use it against accounts or hashes without permission.' },
  splunk: { level: 'Intermediate', tags: ['SIEM', 'Threat monitoring'], purpose: 'Search, correlate, and visualize security events for monitoring and incident response.', safe: 'Use organization-approved data sources and follow privacy policies.' },
  nessus: { level: 'Beginner', tags: ['Vulnerability assessment', 'Compliance'], purpose: 'Find vulnerabilities and configuration issues across authorized systems.', safe: 'Scanning can affect systems; obtain approval before running scans.' },
  aircrack: { level: 'Advanced', tags: ['Wireless security', 'Wi-Fi assessment'], purpose: 'Assess wireless network security in a controlled and authorized environment.', safe: 'Practice only on your own lab network or an approved test network.' },
  autopsy: { level: 'Intermediate', tags: ['Digital forensics', 'Evidence analysis'], purpose: 'Analyze disk images and digital evidence using forensic workflows.', safe: 'Preserve evidence integrity and follow the applicable legal process.' },
  maltego: { level: 'Intermediate', tags: ['OSINT', 'Link analysis'], purpose: 'Map relationships between domains, organizations, and other publicly available data.', safe: 'Respect privacy, terms of service, and applicable laws.' },
  gophish: { level: 'Advanced', tags: ['Phishing simulation', 'Awareness'], purpose: 'Run controlled phishing-awareness simulations to measure and improve training.', safe: 'Get written approval and avoid collecting real credentials.' }
};

let currentToolSearch = '';
let currentToolCategory = 'all';
let currentToolLevel = 'all';
const directoryCategories = {
  nmap: 'Network Analysis',
  wireshark: 'Network Analysis',
  burp: 'Web Application Security',
  metasploit: 'Offensive Security',
  hashcat: 'Password Security',
  john: 'Password Security',
  splunk: 'Security Monitoring',
  nessus: 'Vulnerability Assessment',
  aircrack: 'Wireless Security',
  autopsy: 'Digital Forensics',
  maltego: 'OSINT & Intelligence',
  gophish: 'Security Awareness'
};

function getDirectoryCategory(tool) {
  return directoryCategories[tool.id] || tool.category;
}


function getToolProfile(tool) {
  return toolProfiles[tool.id] || { level: 'Beginner', tags: [], purpose: tool.brief, safe: 'Use responsibly and only with authorization.' };
}

function getToolCategories() {
  return [...new Set(tools.map(getDirectoryCategory))].sort();
}

function renderToolControls() {
  const categoryFilter = document.getElementById('toolCategoryFilter');
  const summary = document.getElementById('toolsCategorySummary');
  if (!categoryFilter || !summary) return;

  categoryFilter.innerHTML = '<option value="all">All categories</option>' +
    getToolCategories().map(category => `<option value="${category}">${category}</option>`).join('');
  categoryFilter.value = currentToolCategory;

  summary.innerHTML = getToolCategories().map(category => {
    const count = tools.filter(tool => getDirectoryCategory(tool) === category).length;
    const active = currentToolCategory === category ? 'active' : '';
    return `<button class="category-chip ${active}" data-tool-category="${category}">${category}<span>${count}</span></button>`;
  }).join('');
}

function getFilteredTools() {
  return tools.filter(tool => {
    const profile = getToolProfile(tool);
    const searchable = [tool.name, getDirectoryCategory(tool), tool.category, tool.brief, profile.purpose, ...profile.tags].join(' ').toLowerCase();
    const matchesSearch = !currentToolSearch || searchable.includes(currentToolSearch);
    const matchesCategory = currentToolCategory === 'all' || getDirectoryCategory(tool) === currentToolCategory;
    const matchesLevel = currentToolLevel === 'all' || profile.level === currentToolLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });
}

function renderTools() {
  const grid = document.getElementById('toolsGrid');
  if (!grid) return;

  const filtered = getFilteredTools();
  document.getElementById('totalToolsCount').textContent = tools.length;
  document.getElementById('totalCategoriesCount').textContent = getToolCategories().length;
  document.getElementById('trendingToolsCount').textContent = tools.filter(tool => tool.trending).length;
  document.getElementById('toolsResultSummary').textContent = `Showing ${filtered.length} of ${tools.length} tools`;

  if (!filtered.length) {
    grid.innerHTML = `<div class="no-results" style="grid-column:1 / -1"><div class="no-results-icon">⌕</div><h3>No tools found</h3><p>Try a different search term or reset the filters.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(tool => {
    const profile = getToolProfile(tool);
    return `<article class="tool-card enhanced-tool-card" tabindex="0" role="button" aria-label="View details for ${tool.name}" onclick="openToolModal('${tool.id}')" onkeydown="if(event.key==='Enter' || event.key===' ') { event.preventDefault(); openToolModal('${tool.id}'); }">
      <div class="tool-card-topline"><span class="tool-card-id">#${String(tools.indexOf(tool) + 1).padStart(3, '0')}</span>${tool.trending ? '<span class="tool-trending">Trending</span>' : ''}</div>
      <div class="enhanced-tool-title-row"><div class="tool-icon">${tool.icon}</div><div><h3>${tool.name}</h3><p class="tool-cat">${getDirectoryCategory(tool)}</p></div></div>
      <span class="tool-level ${profile.level.toLowerCase()}">${profile.level}</span>
      <p class="tool-brief">${tool.brief}</p>
      <p class="tool-purpose"><strong>Used for:</strong> ${profile.purpose}</p>
      <div class="tag-list">${profile.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
      <button class="view-btn" type="button" onclick="event.stopPropagation(); openToolModal('${tool.id}')">View tool details →</button>
    </article>`;
  }).join('');
}

function resetToolFilters() {
  currentToolSearch = '';
  currentToolCategory = 'all';
  currentToolLevel = 'all';
  document.getElementById('toolSearchInput').value = '';
  document.getElementById('toolCategoryFilter').value = 'all';
  document.getElementById('toolLevelFilter').value = 'all';
  renderToolControls();
  renderTools();
}

renderToolControls();
renderTools();

document.getElementById('toolSearchInput').addEventListener('input', event => {
  currentToolSearch = event.target.value.trim().toLowerCase();
  renderTools();
});
document.getElementById('toolCategoryFilter').addEventListener('change', event => {
  currentToolCategory = event.target.value;
  renderToolControls();
  renderTools();
});
document.getElementById('toolLevelFilter').addEventListener('change', event => {
  currentToolLevel = event.target.value;
  renderTools();
});
document.getElementById('resetToolFilters').addEventListener('click', resetToolFilters);
document.getElementById('toolsCategorySummary').addEventListener('click', event => {
  const chip = event.target.closest('[data-tool-category]');
  if (!chip) return;
  currentToolCategory = chip.dataset.toolCategory;
  renderToolControls();
  renderTools();
});

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

/* ========== cyberM ASSISTANT ========== */
(function initAssistant() {
  const launcher = document.getElementById('assistantLauncher');
  const panel = document.getElementById('assistantPanel');
  const closeBtn = document.getElementById('assistantClose');
  const messages = document.getElementById('assistantMessages');
  const form = document.getElementById('assistantForm');
  const input = document.getElementById('assistantInput');
  const quickActions = document.getElementById('assistantQuickActions');

  if (!launcher || !panel || !messages || !form) return;

  function addMessage(text, sender = 'bot') {
    const message = document.createElement('div');
    message.className = `assistant-message ${sender}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function openAssistant() {
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
    if (!messages.children.length) {
      addMessage('Hi! I am the cyberM Assistant. I can guide you through cybersecurity careers, learning resources, roadmaps, and security tools.');
      addMessage('Choose a quick option below or ask me a question.');
    }
    input.focus();
  }

  function closeAssistant() {
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
  }

  function showTopic(topic) {
    if (topic === 'career') {
      addMessage('career', 'user');
      addMessage('A beginner-friendly order is:\n1. IT fundamentals and Linux\n2. Networking and protocols\n3. Security basics\n4. Hands-on labs\n5. Choose a specialization\n6. Build projects and prepare for roles.\n\nUse the Roadmap page to explore Penetration Tester, SOC Analyst, Network Security, Cloud Security, Malware Analysis, and GRC paths.');
      addMessage('Would you like to open the Roadmap page?');
    } else if (topic === 'resources') {
      addMessage('resources', 'user');
      addMessage('Start with networking fundamentals, OWASP Top 10, the NIST Cybersecurity Framework, MITRE ATT&CK, and guided practice on TryHackMe. The Resources page contains articles, videos, blogs, and ongoing security news.');
      addMessage('I can open the Resources page for you.');
    } else if (topic === 'tools') {
      addMessage('tools', 'user');
      addMessage('For beginners, start with Nmap for network discovery, Wireshark for packet analysis, Burp Suite for web testing, and Splunk for security monitoring. Open a tool card to see its overview and learning features.');
      addMessage('I can open the Tools page for you.');
    } else if (topic === 'roadmap') {
      addMessage('roadmap', 'user');
      addMessage('Available career paths include Penetration Tester, SOC Analyst, Network Security Engineer, Cloud Security Specialist, Malware Analyst, and GRC Analyst. Each path lists relevant skills and technologies.');
      addMessage('Opening the Roadmap page will show all available paths.');
    }
  }

  function answer(query) {
    const q = query.toLowerCase();
    if (q.includes('career') || q.includes('beginner') || q.includes('start')) {
      showTopic('career');
    } else if (q.includes('resource') || q.includes('learn') || q.includes('study') || q.includes('news')) {
      showTopic('resources');
    } else if (q.includes('tool') || q.includes('nmap') || q.includes('burp') || q.includes('wireshark') || q.includes('splunk')) {
      showTopic('tools');
    } else if (q.includes('roadmap') || q.includes('soc') || q.includes('penetration') || q.includes('cloud')) {
      showTopic('roadmap');
    } else if (q.includes('hello') || q.includes('hi')) {
      addMessage('Hello! I can help you discover a cybersecurity career path, find learning resources, or understand security tools.');
    } else {
      addMessage('I can currently help with three areas: cybersecurity careers, learning resources, and tool discovery. Try asking “How do I start cybersecurity?”, “Show resources”, or “Explain Nmap”.');
    }
  }

  launcher.addEventListener('click', openAssistant);
  closeBtn.addEventListener('click', closeAssistant);
  quickActions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-assistant-action]');
    if (button) showTopic(button.dataset.assistantAction);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    addMessage(query, 'user');
    input.value = '';
    answer(query);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAssistant();
  });
})();
