// miniblog.js
// Contains POSTS data and rendering/filter logic for the mini-blog.
// This file is loaded dynamically after miniblog.html is inserted into the DOM.

(function () {
  // ======= POSTS DATA (Medium articles + repo notes) =======
  // Each entry: title, url, date, tags (array), excerpt, source
  const POSTS = [
    {
      title: "AEF Crop Intelligence: User Guide",
      url: "https://medium.com/@israeltankam/%EF%B8%8F-aef-crop-intelligence-user-guide-2d5fd9ee1895",
      date: "November 19, 2025",
      tags: ["agriculture", "precision agriculture", "user guide", "decision support", "data driven decisions", "crop modelling"],
      excerpt: "User guide for AEF Crop Intelligence (https://aef-crop-intelligence.streamlit.app/), a decision support tool for farmers and agronomists that combines a Digital Twin of your field (a computer simulation of crop growth) with Satellite Intelligence (real-time observations from space) to help you optimize yield, manage diseases, and reduce input costs.",
      source: "Medium"
    },
    {
      title: "Big insights from small data in Plant Disease Epidemiology",
      url: "https://medium.com/@israeltankam/big-insights-from-small-data-in-plant-disease-epidemiology-9977186b97ee",
      date: "November 19, 2025",
      tags: ["agriculture","small data","plant health","modelling","predictive modelling","big data","hybrid model","data"],
      excerpt: "In plant disease epidemiology, limited observations are the norm. I outline how modern statistical and modelling approaches can transform these constrained datasets into powerful, actionable predictions for crop protection.",
      source: "Medium"
    },
    {
      title: "Chaos in ecology (notebook) — Course & simulations on chaotic dynamics",
      url: "https://github.com/israeltankam/chaos_ecology",
      date: "repo (notebook)",
      tags: ["chaos","dynamical systems","notebook","course","ecology"],
      excerpt: "Course notebook and simulation tools on chaos in ecological models; associated with a lecture at University of Bern.",
      source: "GitHub"
    },
    {
      title: "Memory-based incremental parameter update (repo)",
      url: "https://github.com/israeltankam/Memory-based-incremental-parameter-update-of-a-generic-stochastic-plant-epidemic-model",
      date: "repo",
      tags: ["software","sequential-MC","inference","epidemic modelling","modelling","plant health"],
      excerpt: "Sequential-Monte Carlo framework to incrementally update parameters of a stochastic plant epidemic model (notebooks included).",
      source: "GitHub"
    },
    {
      title: "A short note on genetic drift",
      url: "https://medium.com/@israeltankam/a-short-note-on-genetic-drift-ddac11aaa17e",
      date: "May 3, 2023",
      tags: ["population genetics","genetic drift","evolution"],
      excerpt: "Genetic drift refers to changes in allele frequencies due to random sampling events — particularly important in small populations.",
      source: "Medium"
    },
    {
      title: "A short note on effective population size in population genetics",
      url: "https://medium.com/@israeltankam/a-short-note-on-effective-population-size-in-population-genetics-ed3258e28b9f",
      date: "Mar 21, 2023",
      tags: ["population genetics","Ne","evolution", "genetic drift"],
      excerpt: "Effective population size (Ne) explains the strength of genetic drift and differences between census size and evolutionary dynamics.",
      source: "Medium"
    },
    {
      title: "A short note on the Red Queen Hypothesis",
      url: "https://medium.com/@israeltankam/a-short-note-on-the-red-queen-hypothesis-or-why-you-are-screwed-if-you-stop-running-on-a-treadmill-3ffd3ac02293",
      date: "Feb 12, 2023",
      tags: ["evolution","co-evolution","red queen"],
      excerpt: "The Red Queen Hypothesis explains why species must continually adapt to persist when interacting antagonistically with co-evolving species.",
      source: "Medium"
    },
    {
      title: "A short note on Hitchhiking in population genetics",
      url: "https://medium.com/@israeltankam/hitchhiking-in-population-genetics-6ec7b88870c3",
      date: "Sep 8, 2023",
      tags: ["selection","hitchhiking","population genetics", "evolution"],
      excerpt: "Hitchhiking occurs when an allele increases in frequency because it is linked to a positively selected variant.",
      source: "Medium"
    },
    {
      title: "A short note on the durability of pest-resistant crop varieties",
      url: "https://medium.com/@israeltankam/a-short-note-on-the-durability-of-pest-resistant-crop-varieties-c6ef435257d3",
      date: "Feb 9, 2023",
      tags: ["agriculture","resistance durability","plant health", "evolution"],
      excerpt: "Durability of resistance depends on evolutionary pressure; model-based deployment (mixtures, rotations) can increase longevity.",
      source: "Medium"
    },
    {
      title: "A note on population genetics and some associated models",
      url: "https://medium.com/@israeltankam/a-note-on-population-genetics-and-some-related-models-f82004fae610",
      date: "Feb 5, 2023",
      tags: ["population genetics","models","modelling"],
      excerpt: "A short guided tour of classic population genetics models and the assumptions behind them.",
      source: "Medium"
    },
    {
      title: "A short note on chaos",
      url: "https://medium.com/@israeltankam/a-short-note-on-chaos-89b3afca88c7",
      date: "Jan 30, 2023",
      tags: ["chaos","dynamical systems","education"],
      excerpt: "Overview of chaos: sensitive dependence on initial conditions, attractors, and how simple deterministic systems can appear unpredictable.",
      source: "Medium"
    },
    {
      title: "CMD4.0 — Cassava Mosaic Disease (repo)",
      url: "https://github.com/israeltankam/CMD4.0-Cassava-Mosaic-Disease-Simulator",
      date: "Created: Jun 2022",
      tags: ["software","NetLogo","cassava","epidemiology","plant health","simulation"],
      excerpt: "Agent-based NetLogo model for CMD (varieties, whitefly vectors, roguing, replanting, economic outputs).",
      source: "GitHub"
    },
    {
      title: "Comprendre la Conjecture de Poincaré — Partie I",
      url: "https://medium.com/@israeltankam/comprendre-la-conjecture-de-poincar%C3%A9-partie-1-introduction-8ad1f000d27a",
      date: "Oct 25, 2017",
      tags: ["maths","poincaré","vulgarisation","français","education"],
      excerpt: "Introduction to the Poincaré conjecture written for an engaged general audience.",
      source: "Medium"
    },
    {
      title: "Comprendre la Conjecture de Poincaré — Partie II",
      url: "https://medium.com/@israeltankam/comprendre-la-conjecture-de-poincar%C3%A9-partie-ii-ressemblances-topologiques-aae5f12fccbc",
      date: "Oct 25, 2017",
      tags: ["maths","topology","poincaré","vulgarisation","français","education"],
      excerpt: "Topological intuition and examples to gently approach Poincaré's statement.",
      source: "Medium"
    },
    {
      title: "Comprendre la Conjecture de Poincaré — Partie III",
      url: "https://medium.com/@israeltankam/comprendre-la-conjecture-de-poincar%C3%A9-partie-iii-le-groupe-fondamental-fb440e1c84fd",
      date: "Apr 17, 2018",
      tags: ["maths","topology","poincaré","vulgarisation","français","education"],
      excerpt: "Further exposition on fundamental groups and contractibility.",
      source: "Medium"
    },
    {
      title: "Le comma pythagoricien (musique)",
      url: "https://medium.com/@israeltankam/le-comma-pythagoricien-musique-adc72ee0eab3",
      date: "Apr 6, 2020",
      tags: ["music","vulgarisation","français"],
      excerpt: "An accessible note about the Pythagorean comma and tuning in music.",
      source: "Medium"
    },
    {
      title: "Chroniques transhumanistes (Ep. 2) : Sourd ou malentendant ? Pas de problème",
      url: "https://medium.com/@israeltankam/chroniques-transhumanistes-ep-2-sourd-ou-malentendant-pas-de-probl%C3%A8me-8d14db00f689",
      date: "Nov 19, 2025",
      tags: ["philosophy","technology","français","neurotechnology"],
      excerpt: "Second episode in a short series reflecting on transhumanism and perception: Introduction vulgarisée au fonctionnement de l'audition et présentation de l'implant cochléaire comme solution pour les personnes sourdes ou fortement malentendantes.",
      source: "Medium"
    },
    {
      title: "Chroniques transhumanistes (Ep. 1)",
      url: "https://medium.com/@israeltankam/chroniques-transhumanistes-ep-1-voir-avec-la-langue-5d0f9d3dd83d",
      date: "Apr 5, 2020",
      tags: ["essays","philosophy","technology","neurotechnology","français"],
      excerpt: "First episode in a short series reflecting on transhumanism and perception.",
      source: "Medium"
    },
    {
      title: "Un monde de pâquerettes!",
      url: "https://medium.com/@israeltankam/un-monde-de-p%C3%A2querettes-e8d78fe55aeb",
      date: "Jan 12, 2019",
      tags: ["essay","vulgarisation","français","modelling"],
      excerpt: "A short essay with a playful tone.",
      source: "Medium"
    },
    {
      title: "Chaos (Partie 1): Mes millions pour un millionième",
      url: "https://medium.com/@israeltankam/chaos-partie-1-mes-millions-pour-un-millioni%C3%A8me-f6dca0d39702",
      date: "Jun 5, 2017",
      tags: ["chaos","vulgarisation","français","dynamical systems"],
      excerpt: "First in a popular science series on chaos — an accessible story illustrating sensitive dependence on initial conditions.",
      source: "Medium"
    }
  ];

  // ======= Build topics list from POSTS tags =======
  const topicsSet = new Set();
  POSTS.forEach(p => (p.tags || []).forEach(t => topicsSet.add(t)));
  const topics = Array.from(topicsSet).sort();

  // Helper: render topics checkboxes into #topics
  function renderTopicCheckboxes() {
    const topicsContainer = document.getElementById('topics');
    if (!topicsContainer) return;
    topics.forEach(t => {
      const id = 'topic-' + t.replace(/\s+/g,'-');
      const wrapper = document.createElement('label');
      wrapper.className = 'inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border border-blue-100';
      wrapper.innerHTML = `<input type="checkbox" data-topic="${t}" id="${id}" class="topic-checkbox"><span class="text-sm text-gray-700">${t}</span>`;
      topicsContainer.appendChild(wrapper);
    });
  }

  // Post rendering function
  function renderPosts(filteredPosts) {
    const container = document.getElementById('posts');
    if (!container) return;
    container.innerHTML = '';
    if (filteredPosts.length === 0) {
      container.innerHTML = '<p class="text-sm text-gray-500">No posts match the current filters.</p>';
      return;
    }
    filteredPosts.forEach(p => {
      const el = document.createElement('div');
      el.className = 'bg-white/80 p-4 rounded-xl border border-blue-100 shadow-sm';
      el.innerHTML = `
        <div class="flex justify-between items-start">
          <div class="flex-1 min-w-0">
            <a href="${p.url}" target="_blank" class="text-blue-700 font-semibold hover:underline text-lg">${p.title}</a>
            <p class="text-xs text-gray-500 mt-1">${p.source} • ${p.date}</p>
            <p class="text-sm text-gray-700 mt-3">${p.excerpt}</p>
            <p class="mt-3 text-xs"><strong>Tags:</strong> ${ (p.tags||[]).map(t => `<span class="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full mr-1 text-xs">${t}</span>`).join(' ') }</p>
          </div>
          <div class="ml-4 shrink-0 text-right">
            <a href="${p.url}" target="_blank" class="inline-block px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium hover:scale-105 transform transition">Read</a>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
  }

  // Filter logic
  function applyFilters() {
    const searchInput = document.getElementById('mini-search');
    const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const checked = Array.from(document.querySelectorAll('.topic-checkbox:checked')).map(c => c.dataset.topic);
    let list = POSTS.slice();
    if (checked.length) {
      list = list.filter(p => (p.tags || []).some(t => checked.includes(t)));
    }
    if (search) {
      list = list.filter(p => (p.title + ' ' + p.excerpt + ' ' + (p.tags||[]).join(' ')).toLowerCase().includes(search));
    }
    renderPosts(list);
  }

  // Wire up events after DOM ready
  function init() {
    renderTopicCheckboxes();
    const searchEl = document.getElementById('mini-search');
    if (searchEl) searchEl.addEventListener('input', applyFilters);
    // delegate checkbox change events
    document.addEventListener('change', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('topic-checkbox')) {
        applyFilters();
      }
    });

    // initial render
    renderPosts(POSTS);
  }

  // Wait for DOMContentLoaded for the imported fragment to exist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
