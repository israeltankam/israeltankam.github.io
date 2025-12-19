// scripts.js
// General page scripts: load miniblog fragment and miniblog.js, and GitHub last-edited detection.

(async function () {
  // 1a) Dynamically load the mini-blog HTML fragment and then its script.
  async function loadMiniblog() {
    const container = document.getElementById('miniblog-import');
    if (!container) return;
    try {
      const res = await fetch('blog/miniblog.html');
      if (!res.ok) {
        container.innerHTML = '<p class="text-sm text-red-600">Failed to load mini-blog (blog/miniblog.html).</p>';
        return;
      }
      const html = await res.text();
      container.innerHTML = html;

      // then append miniblog.js as a <script> so it runs in page context
      const script = document.createElement('script');
      script.src = 'blog/miniblog.js';
      script.defer = false;
      document.body.appendChild(script);
    } catch (e) {
      console.warn('Failed to load miniblog', e);
      container.innerHTML = '<p class="text-sm text-red-600">Failed to load mini-blog (see console).</p>';
    }
  }

  // 1b) Dynamically load the publication-list HTML fragment and append its script.
async function loadPublicationList() {
  const container = document.getElementById('publist-import');
  if (!container) return;
  try {
    const res = await fetch('pub_list/index.html');
    if (!res.ok) {
      container.innerHTML = '<p class="text-sm text-red-600">Failed to load publication list (pub_list/index.html).</p>';
      return;
    }
    const html = await res.text();
    container.innerHTML = html;

    // append publist.js (optional, supports auto-numbering)
    const script = document.createElement('script');
    script.src = 'pub_list/publist.js';
    script.defer = false;
    document.body.appendChild(script);
  } catch (e) {
    console.warn('Failed to load publication list', e);
    container.innerHTML = '<p class="text-sm text-red-600">Failed to load publication list (see console).</p>';
  }
}

// 1c) Dynamically load the portfolio HTML fragment and append its script.
async function loadPortfolio() {
  const container = document.getElementById('portfolio-import');
  if (!container) return;
  try {
    const res = await fetch('portfolio/index.html');
    if (!res.ok) {
      container.innerHTML = '<p class="text-sm text-red-600">Failed to load portfolio (portfolio/index.html).</p>';
      return;
    }
    const html = await res.text();
    container.innerHTML = html;
  } catch (e) {
    console.warn('Failed to load portfolio', e);
    container.innerHTML = '<p class="text-sm text-red-600">Failed to load portfolio (see console).</p>';
  }
}

  // 2) GitHub last-edited detection (keeps previous logic)
  async function updateLastEdited() {
    const lastEditedEl = document.getElementById('last-edited');
    if (!lastEditedEl) return;

    const metaRepo = document.querySelector('meta[name="github-repo"]')?.getAttribute('content');
    const metaPath = document.querySelector('meta[name="github-path"]')?.getAttribute('content');

    function formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleString('en-GB', { year:'numeric', month:'short', day:'2-digit' });
    }

    if (metaRepo && metaPath) {
      try {
        const [owner, repo] = metaRepo.split('/');
        const path = metaPath;
        const api = `https://api.github.com/repos/${owner}/${repo}/commits?path=${encodeURIComponent(path)}&per_page=1`;
        const res = await fetch(api);
        if (res.ok) {
          const commits = await res.json();
          if (Array.isArray(commits) && commits.length > 0) {
            const date = commits[0].commit.committer.date || commits[0].commit.author.date;
            lastEditedEl.innerHTML = `Last edited: <strong class="text-blue-600">${formatDate(date)}</strong>`;
            return;
          }
        }
      } catch (e) {
        console.warn('GitHub last-edited check failed', e);
      }
    }

    // Fallback: use document.lastModified
    const docDate = document.lastModified;
    if (docDate) {
      const parsed = new Date(docDate);
      if (!isNaN(parsed)) {
        lastEditedEl.innerHTML = `Last edited: <strong class="text-blue-600">${formatDate(parsed.toISOString())}</strong>`;
        return;
      }
    }

    // Final fallback: show today's date
    const now = new Date();
    lastEditedEl.innerHTML = `Last edited: <strong class="text-blue-600">${formatDate(now.toISOString())}</strong>`;
  }

  // Run loader + last-edited on DOM ready
  if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadMiniblog();
    loadPublicationList(); // <<< NEW
    updateLastEdited();
  });
} else {
  loadMiniblog();
  loadPortfolio();
  loadPublicationList();
  updateLastEdited();
}

})();
