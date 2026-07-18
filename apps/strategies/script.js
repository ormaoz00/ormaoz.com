// ==========================================================================
   // APPLICATION STATE & CONSTANTS
   // ==========================================================================
let activeStrategyKey = '';
let searchQuery = '';

// Strategy metadata mapping for icons and user-friendly titles
const strategyMeta = {
  "01_איך_לבנות_עסק": {
    title: "איך לבנות עסק",
    icon: "🏢",
    description: "בניית סיסטם ומותג מבוסס ערך"
  },
  "02_איך_לבנות_משפך": {
    title: "איך לבנות משפך",
    icon: "🎯",
    description: "מערכת לייצור לקוחות על אוטומט"
  },
  "03_איך_לכתוב_הצעה": {
    title: "איך לכתוב הצעה",
    icon: "💰",
    description: "בניית הצעה בלתי ניתנת לסירוב"
  },
  "04_איך_לדבר_לקהל_יעד": {
    title: "איך לדבר לקהל יעד",
    icon: "👤",
    description: "פיצוח כאבים, חלומות והתנגדויות"
  },
  "05_איך_לכתוב_קופי_ומסרים": {
    title: "איך לכתוב קופי ומסרים",
    icon: "✍️",
    description: "קופירייטינג וכתיבה שיווקית פסיכולוגית"
  }
};

// DOM Elements
const strategyListEl = document.getElementById('strategy-list');
const contentAreaEl = document.getElementById('content-area');
const searchInputEl = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const loaderEl = document.getElementById('loader');

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Marked Options Configuration
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true
  });

  // Populate Sidebar
  initializeSidebar();

  // Load Initial Content
  const firstKey = Object.keys(strategyData)[0];
  if (firstKey) {
    loadStrategy(firstKey);
  }

  // Setup Event Listeners
  setupEventListeners();
});

// ==========================================================================
// SIDEBAR & NAVIGATION LOGIC
// ==========================================================================
function initializeSidebar() {
  strategyListEl.innerHTML = '';
  
  Object.keys(strategyData).forEach(key => {
    const meta = strategyMeta[key] || { title: key, icon: "📄", description: "" };
    
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="nav-item" id="nav-${key}" data-key="${key}">
        <span class="nav-item-icon">${meta.icon}</span>
        <div class="nav-item-details">
          <span class="nav-item-title">${meta.title}</span>
          <span class="nav-item-badge" id="badge-${key}" style="display:none;">0</span>
        </div>
      </div>
    `;
    
    li.querySelector('.nav-item').addEventListener('click', () => {
      loadStrategy(key);
    });
    
    strategyListEl.appendChild(li);
  });
}

function updateActiveSidebarItem(activeKey) {
  Object.keys(strategyData).forEach(key => {
    const navItem = document.getElementById(`nav-${key}`);
    if (navItem) {
      if (key === activeKey) {
        navItem.classList.add('active');
      } else {
        navItem.classList.remove('active');
      }
    }
  });
}

// ==========================================================================
// CONTENT LOADING & MARKDOWN RENDERING
// ==========================================================================
function loadStrategy(key) {
  if (!strategyData[key]) return;
  
  // Show loader
  loaderEl.classList.add('active');
  activeStrategyKey = key;
  
  setTimeout(() => {
    updateActiveSidebarItem(key);
    renderContent();
    loaderEl.classList.remove('active');
  }, 150); // Small delay for smooth transition feel
}

function renderContent() {
  let markdown = strategyData[activeStrategyKey];
  if (!markdown) return;

  // Pre-process math expressions before Marked parses them
  markdown = processMathExpressions(markdown);

  // Parse Markdown to HTML
  let htmlContent = marked.parse(markdown);

  // Apply Search Highlight if search query exists
  if (searchQuery.trim().length >= 2) {
    htmlContent = highlightSearchTerms(htmlContent, searchQuery);
  }

  contentAreaEl.innerHTML = htmlContent;
}

// Custom parser to format Math blocks nicely without KaTeX
function processMathExpressions(text) {
  // Replace display math $$ ... $$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
    // Basic formatting of equations for styled display
    const formattedMath = math.trim()
      .replace(/\\text\{(.+?)\}/g, '<span class="math-text">$1</span>')
      .replace(/\\frac\{(.+?)\}\{(.+?)\}/g, '<span class="math-fraction"><span class="math-numerator">$1</span><span class="math-denominator">$2</span></span>')
      .replace(/\\times/g, ' &times; ')
      .replace(/\\ge/g, ' &ge; ')
      .replace(/\\le/g, ' &le; ');
    return `<div class="math-display-container"><div class="math-display">${formattedMath}</div></div>`;
  });

  // Replace inline math $ ... $
  text = text.replace(/\$([\s\S]+?)\$/g, (match, math) => {
    const formattedMath = math.trim()
      .replace(/\\text\{(.+?)\}/g, '<span class="math-text">$1</span>')
      .replace(/\\times/g, ' &times; ')
      .replace(/\\ge/g, ' &ge; ')
      .replace(/\\le/g, ' &le; ');
    return `<code class="math-inline">${formattedMath}</code>`;
  });

  return text;
}

// ==========================================================================
// SEARCH & FILTER LOGIC
// ==========================================================================
function setupEventListeners() {
  searchInputEl.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    handleSearch();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInputEl.value = '';
    searchQuery = '';
    handleSearch();
  });
}

function handleSearch() {
  const query = searchQuery.trim().toLowerCase();
  
  if (query.length < 2) {
    // Hide all badges
    Object.keys(strategyData).forEach(key => {
      const badge = document.getElementById(`badge-${key}`);
      if (badge) badge.style.display = 'none';
    });
    clearSearchBtn.style.display = 'none';
    renderContent();
    return;
  }

  // Show clear button
  clearSearchBtn.style.display = 'block';

  // Search across all strategies and update badges
  Object.keys(strategyData).forEach(key => {
    const content = strategyData[key].toLowerCase();
    const matchesCount = countOccurrences(content, query);
    
    const badge = document.getElementById(`badge-${key}`);
    if (badge) {
      if (matchesCount > 0) {
        badge.innerText = matchesCount;
        badge.style.display = 'inline-flex';
        badge.className = 'nav-item-badge matches-found';
      } else {
        badge.style.display = 'none';
      }
    }
  });

  // Re-render current strategy with highlights
  renderContent();
}

function countOccurrences(string, subString) {
  string += "";
  subString += "";
  if (subString.length <= 0) return 0;

  var n = 0,
    pos = 0,
    step = subString.length;

  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}

function highlightSearchTerms(html, query) {
  // Escape regex special chars
  const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
  // Create a regex that matches the query except inside HTML tags/attributes
  // This avoids corrupting HTML tags (e.g. matching 'class', 'href', etc.)
  const regex = new RegExp(`(?![^<>]*>)(${escapedQuery})`, 'gi');
  
  return html.replace(regex, '<mark class="search-highlight">$1</mark>');
}
