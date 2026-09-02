(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('cropmix-theme');
  if (saved) root.dataset.theme = saved;
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next; localStorage.setItem('cropmix-theme', next);
  }));
  document.querySelectorAll('[data-menu]').forEach(btn => btn.addEventListener('click', () => document.body.classList.toggle('menu-open')));
  document.addEventListener('click', e => { if (document.body.classList.contains('menu-open') && !e.target.closest('.sidebar') && !e.target.closest('[data-menu]')) document.body.classList.remove('menu-open'); });

  document.querySelectorAll('pre').forEach(pre => {
    if (pre.querySelector('.copy-code')) return;
    const b=document.createElement('button'); b.className='copy-code'; b.type='button'; b.textContent='Copy';
    b.addEventListener('click', async()=>{ const c=pre.querySelector('code'); await navigator.clipboard.writeText((c||pre).innerText); b.textContent='Copied'; setTimeout(()=>b.textContent='Copy',1200); });
    pre.appendChild(b);
  });
  document.querySelectorAll('[data-copy-text]').forEach(b=>b.addEventListener('click',async()=>{await navigator.clipboard.writeText(b.dataset.copyText); const old=b.textContent;b.textContent='Copied';setTimeout(()=>b.textContent=old,1200)}));

  const tocLinks=[...document.querySelectorAll('.toc a')];
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const map=new Map(tocLinks.map(a=>[a.getAttribute('href').slice(1),a]));
    const obs=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){tocLinks.forEach(a=>a.classList.remove('current')); const a=map.get(en.target.id); if(a)a.classList.add('current')}})}, {rootMargin:'-80px 0px -72% 0px'});
    map.forEach((_,id)=>{const el=document.getElementById(id);if(el)obs.observe(el)});
  }

  const input=document.querySelector('[data-search]'), results=document.querySelector('[data-search-results]');
  if(input && results){
    let idx=[]; fetch('search-index.json').then(r=>r.json()).then(x=>idx=x).catch(()=>{});
    const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase(); if(q.length<2){results.classList.remove('open');results.innerHTML='';return}
      const terms=q.split(/\s+/); const hits=idx.map(d=>{const hay=(d.title+' '+d.headings+' '+d.text).toLowerCase(); let score=0;terms.forEach(t=>{if(d.title.toLowerCase().includes(t))score+=5;if(d.headings.toLowerCase().includes(t))score+=3;if(hay.includes(t))score+=1});return [score,d]}).filter(x=>x[0]>=terms.length).sort((a,b)=>b[0]-a[0]).slice(0,8);
      results.innerHTML=hits.length?hits.map(([,d])=>`<a class="search-hit" href="${esc(d.url)}"><b>${esc(d.title)}</b><span>${esc(d.snippet)}</span></a>`).join(''):'<div class="search-hit"><span>No matching page</span></div>';results.classList.add('open');
    }); input.addEventListener('keydown',e=>{if(e.key==='Escape')results.classList.remove('open')});
  }
  document.querySelectorAll('table').forEach(t=>{ if(t.parentElement?.classList.contains('table-wrap')) return; const w=document.createElement('div'); w.className='table-wrap'; t.parentNode.insertBefore(w,t); w.appendChild(t); });
})();
