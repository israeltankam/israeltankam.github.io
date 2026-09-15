(() => {
  'use strict';
  const D = window.STUDY_DATA;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const page = $('#page');
  const searchInput = $('#globalSearch');
  const searchResults = $('#searchResults');
  const conceptMap = new Map(D.concepts.map(c => [c.id,c]));
  const moduleMap = new Map(D.modules.map(m => [m.id,m]));
  const categoryName = c => D.categoryNames[c] || c;
  const STORAGE='psychotherapy-exam-lab-v1';
  const defaultProgress={masteredConcepts:[],completedModules:[],flashKnown:[],caseReviewed:[],quizHistory:[],wrongCounts:{},lastModule:null};
  let progress=loadProgress();
  let quizState=null, flashState=null, toastTimer=null;

  function loadProgress(){
    try{return {...defaultProgress,...JSON.parse(localStorage.getItem(STORAGE)||'{}')}}catch{return {...defaultProgress}}
  }
  function saveProgress(){localStorage.setItem(STORAGE,JSON.stringify(progress));}
  function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),1800)}
  function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
  function pct(a,b){return b?Math.round(a/b*100):0}
  function route(){const raw=(location.hash||'#dashboard').slice(1);const [name,id]=raw.split('/');return {name:name||'dashboard',id:id||null}}
  function routeName(){return route().name}
  function setActiveNav(){const r=routeName();$$('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===r));}
  function moduleForConcept(id){return D.modules.find(m=>m.concepts.includes(id));}
  function mastered(id){return progress.masteredConcepts.includes(id)}
  function completeModule(id){return progress.completedModules.includes(id)}
  function modulePct(m){if(completeModule(m.id))return 100;if(!m.concepts.length)return 0;return pct(m.concepts.filter(mastered).length,m.concepts.length)}
  function quizAccuracy(){const h=progress.quizHistory;if(!h.length)return 0;const correct=h.reduce((s,x)=>s+x.correct,0), total=h.reduce((s,x)=>s+x.total,0);return pct(correct,total)}
  function readiness(){const c=pct(progress.masteredConcepts.length,D.concepts.length);const m=pct(progress.completedModules.length,D.modules.length);const q=progress.quizHistory.length?quizAccuracy():0;return Math.round(c*.5+m*.25+q*.25)}
  function stats(){return {readiness:readiness(),concept:pct(progress.masteredConcepts.length,D.concepts.length),modules:progress.completedModules.length,accuracy:quizAccuracy(),cases:progress.caseReviewed.length}}

  function pageHead(kicker,title,desc,action=''){
    return `<div class="page-head"><div><div class="eyebrow">${esc(kicker)}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div>${action}</div>`;
  }
  function progressBar(p){return `<div class="progress-bar"><span style="width:${Math.max(0,Math.min(100,p))}%"></span></div>`}
  function categoryChip(cat){return `<span class="chip">${esc(categoryName(cat))}</span>`}
  function moduleCard(m){const p=modulePct(m);return `<a class="module-card" href="#course/${m.id}"><div class="module-top"><span class="module-icon">${m.icon}</span>${completeModule(m.id)?'<span class="done-badge">Completed</span>':`<span class="chip">Module ${m.order}</span>`}</div><h3>${esc(m.title)}</h3><p>${esc(m.summary)}</p><div class="module-meta"><span>${m.concepts.length} concept${m.concepts.length===1?'':'s'}</span><span>${p}%</span></div>${progressBar(p)}</a>`}

  function renderDashboard(){
    const s=stats(), weak=Object.entries(progress.wrongCounts).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const continueId=progress.lastModule && moduleMap.has(progress.lastModule)?progress.lastModule:'foundations';
    page.innerHTML=`
      <section class="hero"><div class="hero-content"><div><div class="eyebrow" style="color:#d8d3ff">Interactive revision</div><h1>Learn the course. Recognise the cues. Write the session.</h1><p>Exam-focused psychotherapy revision built from the recovered course map and the supplied 2025 AEDA paper style—with lessons, flashcards, drills, clinical cases and ten full mock papers.</p><div class="hero-actions"><a class="button primary" href="#course/${continueId}">Continue learning →</a><a class="button ghost" href="#quiz">Start a quick quiz</a></div></div><div class="progress-ring" style="--p:${s.readiness}"><div><strong>${s.readiness}%</strong><small>readiness</small></div></div></div></section>
      <div class="stats-grid">
        <div class="stat-card"><small>Concept mastery</small><strong>${s.concept}%</strong><div class="trend">${progress.masteredConcepts.length}/${D.concepts.length} concepts</div></div>
        <div class="stat-card"><small>Modules finished</small><strong>${s.modules}/${D.modules.length}</strong><div class="trend">Keep the sequence moving</div></div>
        <div class="stat-card"><small>Quiz accuracy</small><strong>${progress.quizHistory.length?s.accuracy+'%':'—'}</strong><div class="trend">${progress.quizHistory.length?progress.quizHistory.length+' completed quiz'+(progress.quizHistory.length>1?'zes':''):'Take your first drill'}</div></div>
        <div class="stat-card"><small>Cases reviewed</small><strong>${s.cases}/${D.cases.length}</strong><div class="trend">Simulation-paper practice</div></div>
      </div>
      <section class="section"><div class="section-head"><div><h2>Your study path</h2><p>Work through the course, then revisit weak cues.</p></div><a class="text-link" href="#course">View all modules</a></div><div class="grid module-grid">${D.modules.slice(0,6).map(moduleCard).join('')}</div></section>
      <section class="section"><div class="section-head"><div><h2>Quick drills</h2><p>Short, active revision beats rereading.</p></div></div><div class="quick-drill">
        <div class="quick-card"><strong>Flashcard sprint</strong><p>Cycle through diagnostic cues, techniques and ethical rules.</p><a class="button small secondary" href="#flashcards">Open cards</a></div>
        <div class="quick-card"><strong>Random clinical case</strong><p>Practise a 25-mark simulation answer before revealing the marking points.</p><button class="button small secondary" data-random-case>Give me a case</button></div>
        <div class="quick-card"><strong>Full exam practice</strong><p>Ten AEDA-style papers plus detailed solution papers are built in.</p><a class="button small secondary" href="#exams">Choose a paper</a></div>
      </div></section>
      <section class="section"><div class="section-head"><div><h2>Weak-area tracker</h2><p>Built automatically from questions you miss.</p></div></div><div class="card">${weak.length?`<div class="weak-list">${weak.map(([id,n])=>{const c=conceptMap.get(id);return c?`<div class="weak-row"><span>${esc(c.label)}</span><b>${n} miss${n>1?'es':''}</b></div>`:''}).join('')}</div>`:'<div class="empty">No weak areas recorded yet. Complete a quiz to start your error log.</div>'}</div></section>
    `;
    $('[data-random-case]')?.addEventListener('click',()=>location.hash='#cases/'+D.cases[Math.floor(Math.random()*D.cases.length)].id);
  }

  function renderCourse(id){
    if(id && moduleMap.has(id)) return renderModule(moduleMap.get(id));
    page.innerHTML=pageHead('Course','Learn the full revision syllabus','Thirteen modules organize the recovered lecture map and the recurring emphases in the 2025 papers.')+`<div class="grid module-grid">${D.modules.map(moduleCard).join('')}</div><div class="notice" style="margin-top:20px"><strong>Source fidelity</strong>${esc(D.sourceNote)}</div>`;
  }

  function renderModule(m){
    progress.lastModule=m.id;saveProgress();
    const idx=D.modules.findIndex(x=>x.id===m.id), prev=D.modules[idx-1], next=D.modules[idx+1];
    const concepts=m.concepts.map(id=>conceptMap.get(id)).filter(Boolean);
    page.innerHTML=`
      ${pageHead(`Module ${m.order} · ${m.short}`,m.title,m.summary,`<a class="button ghost" href="#course">All modules</a>`)}
      <div class="split"><div>
        <section class="card" style="margin-bottom:16px"><div class="eyebrow">Learning objectives</div><ul class="objective-list">${m.objectives.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>
        <section class="lesson-stack">${m.notes.map(n=>`<article class="lesson-card"><h3>${esc(n.heading)}</h3><p>${esc(n.body)}</p>${n.mnemonic?`<p class="mnemonic">Memory hook · ${esc(n.mnemonic)}</p>`:''}</article>`).join('')}</section>
        ${concepts.length?`<section class="section"><div class="section-head"><div><h2>Exam concepts</h2><p>Expand the explanation, then mark the cue as mastered.</p></div></div><div class="concept-grid">${concepts.map(c=>conceptCard(c)).join('')}</div></section>`:''}
        <section class="section"><div class="section-head"><div><h2>Source-track coverage</h2><p>Recovered source titles linked to this module.</p></div></div><div class="card"><details><summary>${m.sources.length} source reference${m.sources.length===1?'':'s'} · click to expand</summary><ol class="source-list">${m.sources.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></details></div></section>
        <div class="module-nav">${prev?`<a class="button ghost" href="#course/${prev.id}">← ${esc(prev.short)}</a>`:'<span></span>'}${next?`<a class="button primary" href="#course/${next.id}">${esc(next.short)} →</a>`:'<a class="button primary" href="#exams">Go to mock exams →</a>'}</div>
      </div><aside class="card sticky-card"><div class="eyebrow">Module progress</div><h3>${modulePct(m)}% complete</h3>${progressBar(modulePct(m))}<p class="subtle">${m.concepts.filter(mastered).length}/${m.concepts.length||0} linked concepts mastered.</p><button class="button ${completeModule(m.id)?'success':'primary'}" style="width:100%" data-complete-module="${m.id}">${completeModule(m.id)?'✓ Module completed':'Mark module complete'}</button><div style="height:12px"></div><a class="button ghost" style="width:100%" href="#quiz" data-module-quiz="${m.id}">Quiz this material</a></aside></div>
    `;
    $$('[data-master]').forEach(b=>b.addEventListener('click',()=>toggleMaster(b.dataset.master,b)));
    $('[data-complete-module]')?.addEventListener('click',e=>toggleModule(m.id,e.currentTarget));
  }
  function conceptCard(c){return `<article class="concept-card"><button class="master-btn ${mastered(c.id)?'mastered':''}" data-master="${c.id}">${mastered(c.id)?'✓ mastered':'mark learned'}</button>${categoryChip(c.category)}<h4>${esc(c.label)}</h4><p><strong>Cue:</strong> ${esc(c.cue)}</p><details><summary>Explanation & mnemonic</summary><p>${esc(c.explanation)}</p>${c.mnemonic?`<p class="mnemonic">${esc(c.mnemonic)}</p>`:''}</details></article>`}
  function toggleMaster(id,button){const arr=progress.masteredConcepts;const i=arr.indexOf(id);if(i>=0)arr.splice(i,1);else arr.push(id);saveProgress();const on=mastered(id);button.classList.toggle('mastered',on);button.textContent=on?'✓ mastered':'mark learned';toast(on?'Concept marked mastered':'Concept moved back to review')}
  function toggleModule(id,button){const a=progress.completedModules,i=a.indexOf(id);if(i>=0)a.splice(i,1);else a.push(id);saveProgress();renderModule(moduleMap.get(id));toast(completeModule(id)?'Module completed':'Module reopened')}

  function renderFlashcards(){
    if(!flashState) initFlash('all');
    page.innerHTML=pageHead('Active recall','Flashcards','Read the cue, name the concept before flipping, then grade yourself honestly.')+`<div class="flash-layout"><div><div class="flashcard ${flashState.revealed?'revealed':''}" id="flashcard" tabindex="0"><div class="flash-inner">${flashFaces()}</div></div><div class="flash-controls"><button class="button danger" data-grade="again">Again</button><button class="button success" data-grade="got">Got it</button></div></div><aside class="side-controls"><div class="card"><div class="control-label">Deck</div><select class="select" id="flashCategory"><option value="all">All concepts</option>${Object.entries(D.categoryNames).map(([k,v])=>`<option value="${k}" ${flashState.category===k?'selected':''}>${esc(v)}</option>`).join('')}</select></div><div class="card"><div class="control-label">Progress in this deck</div><strong>${flashState.index+1} / ${flashState.deck.length}</strong><div style="height:8px"></div><div class="meter"><span style="width:${pct(flashState.index+1,flashState.deck.length)}%"></span></div><p class="subtle">${flashState.deck.filter(c=>progress.flashKnown.includes(c.id)).length} marked “got it”.</p></div><div class="card"><button class="button ghost" style="width:100%" id="shuffleCards">Shuffle deck</button><p class="subtle">Shortcuts: Space = flip, 1 = again, 2 = got it.</p></div></aside></div>`;
    $('#flashcard').addEventListener('click',flipCard);$('#flashcard').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flipCard()}});
    $$('[data-grade]').forEach(b=>b.addEventListener('click',()=>gradeCard(b.dataset.grade)));
    $('#flashCategory').addEventListener('change',e=>{initFlash(e.target.value);renderFlashcards()});
    $('#shuffleCards').addEventListener('click',()=>{flashState.deck=shuffle(flashState.deck);flashState.index=0;flashState.revealed=false;renderFlashcards()});
  }
  function initFlash(cat){let deck=cat==='all'?D.concepts:D.concepts.filter(c=>c.category===cat);flashState={category:cat,deck:shuffle(deck),index:0,revealed:false}}
  function currentFlash(){return flashState.deck[flashState.index%flashState.deck.length]}
  function flashFaces(){const c=currentFlash();return `<div class="flash-face flash-front">${categoryChip(c.category)}<div class="eyebrow">Name the concept</div><h2>${esc(c.cue)}</h2><div class="flash-hint">Click or press Space to reveal</div></div><div class="flash-face flash-back">${categoryChip(c.category)}<div class="eyebrow">Answer</div><h2>${esc(c.label)}</h2><p>${esc(c.explanation)}</p>${c.mnemonic?`<p class="mnemonic">${esc(c.mnemonic)}</p>`:''}<div class="flash-hint">Grade yourself below</div></div>`}
  function flipCard(){flashState.revealed=!flashState.revealed;$('#flashcard')?.classList.toggle('revealed',flashState.revealed)}
  function gradeCard(g){const id=currentFlash().id;if(g==='got'&&!progress.flashKnown.includes(id))progress.flashKnown.push(id);if(g==='again')progress.flashKnown=progress.flashKnown.filter(x=>x!==id);saveProgress();flashState.index=(flashState.index+1)%flashState.deck.length;flashState.revealed=false;renderFlashcards()}

  function renderQuiz(){
    if(quizState?.active)return renderQuizQuestion();
    if(quizState?.result)return renderQuizResult();
    page.innerHTML=pageHead('Practice','Quiz Lab','Build a randomized drill from course concepts and true/false statements. Learning mode explains as you go; exam mode waits until the end.',`<a class="button ghost" href="#quiz/written">Written recall →</a>`)+`
      <div class="quiz-setup"><section class="card"><h3>Build your quiz</h3><div class="setup-grid">
        <div class="form-field"><label>Area</label><select class="select" id="quizCategory"><option value="all">All course areas</option>${Object.entries(D.categoryNames).map(([k,v])=>`<option value="${k}">${esc(v)}</option>`).join('')}</select></div>
        <div class="form-field"><label>Number of questions</label><select class="select" id="quizLength"><option>10</option><option selected>20</option><option>40</option><option>60</option></select></div>
        <div class="form-field"><label>Mode</label><select class="select" id="quizMode"><option value="learn">Learning · instant explanations</option><option value="exam">Exam · results at the end</option></select></div>
        <div class="form-field"><label>Timer</label><select class="select" id="quizTimer"><option value="0">No timer</option><option value="1">1 min / question</option><option value="0.5">30 sec / question</option></select></div>
      </div><div style="height:18px"></div><button class="button primary" id="startQuiz">Start randomized quiz →</button></section>
      <aside class="card"><div class="eyebrow">Your record</div><h3>${progress.quizHistory.length?quizAccuracy()+'% overall':'No quizzes yet'}</h3><p class="subtle">Questions are generated from ${D.concepts.length} course concepts plus ${D.truefalse.length} verified true/false statements.</p><a class="text-link" href="#dashboard">See weak areas →</a></aside></div>`;
    $('#startQuiz').addEventListener('click',startQuiz);
  }
  function buildMCQ(c){const peers=D.concepts.filter(x=>x.category===c.category&&x.id!==c.id);const distract=shuffle(peers).slice(0,3).map(x=>x.label);return {id:'mcq-'+c.id,conceptId:c.id,category:c.category,type:'mcq',prompt:`Which term best matches this cue?\n“${c.cue}”`,options:shuffle([c.label,...distract]),answer:c.label,explanation:c.explanation+(c.mnemonic?` Memory hook: ${c.mnemonic}`:'')}}
  function startQuiz(){
    const cat=$('#quizCategory').value,n=Number($('#quizLength').value),mode=$('#quizMode').value,timer=Number($('#quizTimer').value);
    let cs=cat==='all'?D.concepts:D.concepts.filter(c=>c.category===cat);let tf=cat==='all'?D.truefalse:D.truefalse.filter(x=>x.category===cat);
    let pool=[...cs.map(buildMCQ),...tf.map(x=>({id:x.id,conceptId:null,category:x.category,type:'tf',prompt:x.statement,options:['True','False'],answer:x.answer?'True':'False',explanation:x.explanation}))];
    const questions=shuffle(pool).slice(0,Math.min(n,pool.length));quizState={active:true,result:false,questions,index:0,answers:[],mode,timerSeconds:timer?Math.round(timer*60*questions.length):0,endsAt:timer?Date.now()+Math.round(timer*60*questions.length)*1000:null,locked:false};renderQuizQuestion();
  }
  function renderQuizQuestion(){
    const q=quizState.questions[quizState.index], answered=quizState.answers[quizState.index], elapsed=quizState.endsAt?Math.max(0,Math.ceil((quizState.endsAt-Date.now())/1000)):null;
    if(quizState.endsAt&&elapsed<=0)return finishQuiz();
    page.innerHTML=`<div class="quiz-card"><div class="quiz-top"><span>${categoryChip(q.category)} &nbsp; Question ${quizState.index+1}/${quizState.questions.length}</span>${elapsed!==null?`<span class="timer" id="quizTimerDisplay">${formatTime(elapsed)}</span>`:''}</div><div class="progress-bar"><span style="width:${pct(quizState.index,quizState.questions.length)}%"></span></div><div style="height:23px"></div><h2 class="quiz-question">${esc(q.prompt).replace(/\n/g,'<br>')}</h2><div class="options">${q.options.map(o=>`<button class="option ${answered&&quizState.mode==='learn'?(o===q.answer?'correct':o===answered.choice&&o!==q.answer?'wrong':''):''}" data-answer="${esc(o)}" ${answered?'disabled':''}>${esc(o)}</button>`).join('')}</div>${answered&&quizState.mode==='learn'?`<div class="feedback ${answered.correct?'good':'bad'}"><strong>${answered.correct?'Correct.':'Not quite.'}</strong> ${esc(q.explanation)}</div>`:''}<div class="quiz-footer">${answered?`<button class="button primary" id="nextQuestion">${quizState.index===quizState.questions.length-1?'Finish quiz':'Next question →'}</button>`:''}</div></div>`;
    $$('[data-answer]').forEach(b=>b.addEventListener('click',()=>answerQuiz(b.dataset.answer)));
    $('#nextQuestion')?.addEventListener('click',nextQuiz);
    if(quizState.endsAt){clearInterval(window.__quizTimer);window.__quizTimer=setInterval(()=>{const t=Math.max(0,Math.ceil((quizState.endsAt-Date.now())/1000));const el=$('#quizTimerDisplay');if(el)el.textContent=formatTime(t);if(t<=0){clearInterval(window.__quizTimer);finishQuiz()}},1000)}
  }
  function formatTime(s){return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
  function answerQuiz(choice){const q=quizState.questions[quizState.index];const ans={choice,correct:choice===q.answer};quizState.answers[quizState.index]=ans;if(quizState.mode==='exam'){nextQuiz()}else renderQuizQuestion()}
  function nextQuiz(){if(quizState.index>=quizState.questions.length-1)finishQuiz();else{quizState.index++;renderQuizQuestion()}}
  function finishQuiz(){clearInterval(window.__quizTimer);while(quizState.answers.length<quizState.questions.length)quizState.answers.push({choice:'No answer',correct:false});const correct=quizState.answers.filter(a=>a.correct).length;quizState.questions.forEach((q,i)=>{if(!quizState.answers[i].correct&&q.conceptId)progress.wrongCounts[q.conceptId]=(progress.wrongCounts[q.conceptId]||0)+1});progress.quizHistory.push({date:new Date().toISOString(),correct,total:quizState.questions.length});progress.quizHistory=progress.quizHistory.slice(-30);saveProgress();quizState.active=false;quizState.result={correct,total:quizState.questions.length};renderQuizResult()}
  function renderQuizResult(){const r=quizState.result,score=pct(r.correct,r.total);page.innerHTML=`<div class="quiz-result">${pageHead('Results','Quiz complete',score>=80?'Strong work. Review the misses, then repeat later.':score>=60?'Good base. The review below shows where to tighten your recall.':'Use the review as an error log, then return to the relevant modules.')}<section class="card score-hero"><div class="eyebrow">Score</div><strong>${score}%</strong><p>${r.correct} correct out of ${r.total}</p><div class="button-row" style="justify-content:center"><button class="button primary" id="newQuiz">New quiz</button><a class="button ghost" href="#course">Review course</a></div></section><section class="section"><div class="section-head"><h2>Answer review</h2></div><div class="review-list">${quizState.questions.map((q,i)=>{const a=quizState.answers[i];return `<div class="review-item ${a.correct?'good':'bad'}"><strong>${i+1}. ${esc(q.prompt)}</strong><div class="subtle">Your answer: ${esc(a.choice)} · Correct: ${esc(q.answer)}</div><div style="margin-top:5px;font-size:12px">${esc(q.explanation)}</div></div>`}).join('')}</div></section></div>`;$('#newQuiz').addEventListener('click',()=>{quizState=null;renderQuiz()})}

  function renderWritten(){
    const q=D.shortanswers[Math.floor(Math.random()*D.shortanswers.length)];
    page.innerHTML=pageHead('Active written recall','Short-Answer Drill','Answer from memory first. Then reveal the marking points and mnemonic. This bank mirrors the short-answer style used throughout the practice papers.',`<a class="button ghost" href="#quiz">← Quiz Lab</a>`)+`<div class="split"><section><div class="card"><div class="module-top">${categoryChip(q.category)}<span class="chip">${q.marks} mark${q.marks===1?'':'s'}</span></div><h2 style="font-size:24px;line-height:1.35;margin:18px 0">${esc(q.question)}</h2><textarea id="writtenAnswer" rows="8" style="width:100%;resize:vertical;border:1px solid var(--line);background:var(--panel-2);color:var(--text);border-radius:12px;padding:12px" placeholder="Write your answer from memory here…"></textarea><div class="button-row" style="margin-top:12px"><button class="button primary" id="revealWritten">Reveal marking points</button><button class="button ghost" id="anotherWritten">Another question</button></div></div><div id="writtenKey" style="margin-top:14px"></div></section><aside class="card sticky-card"><div class="eyebrow">Written-answer method</div><h3>Match the marks</h3><p class="subtle">A 1-mark item needs a precise definition. A 2-mark item usually needs two distinct points or a definition plus example. For 4+ marks, structure your response visibly.</p><p class="mnemonic">Define → Distinguish → Demonstrate.</p></aside></div>`;
    $('#anotherWritten').addEventListener('click',renderWritten);
    $('#revealWritten').addEventListener('click',()=>{ $('#writtenKey').innerHTML=`<div class="card"><div class="eyebrow">Marking key</div><ol class="mark-points">${q.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>${q.mnemonic?`<p class="mnemonic">Memory hook · ${esc(q.mnemonic)}</p>`:''}<div class="button-row"><button class="button success" id="selfGood">I knew it</button><button class="button danger" id="selfAgain">Review again</button></div></div>`; $('#revealWritten').disabled=true; $('#selfGood').addEventListener('click',()=>toast('Good recall — keep moving')); $('#selfAgain').addEventListener('click',()=>toast('Marked mentally for review — try another and return later')); });
  }

  function renderCases(id){
    if(id){const c=D.cases.find(x=>x.id===id);if(c)return renderCase(c)}
    page.innerHTML=pageHead('Simulation paper','Clinical Case Lab','Practise the 25-mark real-working-situation style. Write your plan before revealing the anchor approach and marking points.',`<button class="button secondary" id="randomCase">Random case</button>`)+`<div class="grid case-grid">${D.cases.map((c,i)=>`<a class="case-card" href="#cases/${c.id}"><div class="module-top"><span class="chip">Case ${String(i+1).padStart(2,'0')}</span>${progress.caseReviewed.includes(c.id)?'<span class="done-badge">Reviewed</span>':''}</div><h3>${esc(c.title)}</h3><p>${esc(c.scenario).slice(0,155)}…</p></a>`).join('')}</div>`;$('#randomCase').addEventListener('click',()=>location.hash='#cases/'+D.cases[Math.floor(Math.random()*D.cases.length)].id)
  }
  function renderCase(c){const idx=D.cases.findIndex(x=>x.id===c.id),prev=D.cases[idx-1],next=D.cases[idx+1];page.innerHTML=`<div class="case-detail">${pageHead(`Case ${String(idx+1).padStart(2,'0')}`,c.title,'Treat this like a 25-mark simulation: formulate, choose, demonstrate, review.',`<a class="button ghost" href="#cases">All cases</a>`)}<div class="vignette">${esc(c.scenario)}</div><div class="question-box"><strong>Exam task</strong><br>${esc(c.question)}</div><div class="card"><div class="eyebrow">Before you reveal</div><h3>Draft your answer in this order</h3><p class="subtle">Presenting problem → safety/ethics → anchor theory → assessment/formulation → goals → technique steps → homework/practice → review/follow-up.</p><textarea id="caseNotes" rows="6" style="width:100%;resize:vertical;border:1px solid var(--line);background:var(--panel-2);color:var(--text);border-radius:12px;padding:12px" placeholder="Type your outline here (not saved)…"></textarea><div style="height:10px"></div><button class="button primary" id="revealCase">Reveal model marking points</button></div><div id="caseAnswer" class="answer-reveal"></div><div class="module-nav">${prev?`<a class="button ghost" href="#cases/${prev.id}">← Previous case</a>`:'<span></span>'}${next?`<a class="button primary" href="#cases/${next.id}">Next case →</a>`:'<a class="button primary" href="#exams">Go to full papers →</a>'}</div></div>`;$('#revealCase').addEventListener('click',()=>{if(!progress.caseReviewed.includes(c.id))progress.caseReviewed.push(c.id);saveProgress();$('#caseAnswer').innerHTML=`<div class="card"><div class="eyebrow">Anchor approach</div><h3>${esc(c.approach)}</h3><p class="mnemonic">${esc(c.mnemonic)}</p><h3 style="margin-top:20px">Marking points</h3><ol class="mark-points">${c.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`;$('#revealCase').remove();toast('Case marked reviewed')})}

  function renderExams(){page.innerHTML=pageHead('Timed practice','Mock Exams','Ten complete AEDA-style examination sets. Attempt the exam first; open the solution paper only when you have finished.')+`<div class="notice" style="margin-bottom:18px"><strong>Recommended routine</strong>Use timed conditions, mark with the corresponding solution, then add every miss to your personal error log: diagnosis cue · therapy/technique · ethical rule · counseling-process step · simulation structure.</div><div class="grid exam-grid">${D.exams.map(x=>`<article class="exam-card"><div class="exam-number">${x.set}</div><div><h3>Practice Set ${String(x.set).padStart(2,'0')}</h3><p>3-hour comprehensive paper + 1h30 simulation paper, with detailed explanations in the solution file.</p><div class="button-row"><a class="button small primary" href="${x.exam}" target="_blank" rel="noopener">Open exam PDF</a><a class="button small ghost" href="${x.solutions}" target="_blank" rel="noopener">Open solutions</a></div></div></article>`).join('')}</div><section class="section"><div class="card"><div class="eyebrow">Paper anatomy</div><h3>Comprehensive Vocational Paper · 100 marks</h3><p class="subtle">Psychopathology 25 · Theories/Techniques 25 · Professional Orientation & Ethical/Legal Issues 25 · Cultural Diversity/Group Therapy/Counseling Process/Treatment Planning 25.</p><h3 style="margin-top:16px">Simulation of Real Working Situation · 4 × 25 marks</h3><p class="subtle">Clinical vignettes test whether you can select and demonstrate a fitting therapeutic response—not merely define a theory.</p></div></section>`}

  function renderCoverage(){page.innerHTML=pageHead('Source grounding','Course Map','See how the recovered source-title map feeds the revision modules. This is a study synthesis, not a claimed verbatim transcript.')+`<div class="notice" style="margin-bottom:18px"><strong>What is source-derived vs synthesized?</strong>${esc(D.sourceNote)} The recovered source-title map below is presented directly; lesson explanations and mnemonics are revision syntheses designed to make those topics learnable and exam-ready.</div><div class="stats-grid"><div class="stat-card"><small>Named source entries</small><strong>${D.sourceTitles.length}</strong><div class="trend">Recovered course-title map</div></div><div class="stat-card"><small>Study concepts</small><strong>${D.concepts.length}</strong><div class="trend">Across four exam domains</div></div><div class="stat-card"><small>True/False bank</small><strong>${D.truefalse.length}</strong><div class="trend">With explanations</div></div><div class="stat-card"><small>Clinical cases</small><strong>${D.cases.length}</strong><div class="trend">Simulation practice</div></div></div><section class="section"><div class="section-head"><h2>Recovered course references by module</h2></div>${D.modules.filter(m=>m.sources.length).map(m=>`<div class="coverage-group"><details><summary>${m.icon} ${esc(m.title)} · ${m.sources.length} source reference${m.sources.length===1?'':'s'}</summary><ol class="source-list">${m.sources.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></details></div>`).join('')}</section><section class="section"><div class="button-row"><a class="button ghost" href="course-source-map.txt" target="_blank">Open plain-text source map</a><a class="button ghost" href="SOURCE_AND_COVERAGE_NOTE.txt" target="_blank">Read coverage note</a><button class="button danger" id="resetProgress">Reset all local progress</button></div></section>`;$('#resetProgress').addEventListener('click',()=>{if(confirm('Reset mastered concepts, quiz history and case progress on this device?')){progress={...defaultProgress};saveProgress();toast('Progress reset');renderCoverage()}})}

  function render404(){page.innerHTML=pageHead('Not found','That page does not exist','Use the navigation to return to the course.')+`<a class="button primary" href="#dashboard">Back to dashboard</a>`}
  function render(){setActiveNav();const r=route();switch(r.name){case'dashboard':renderDashboard();break;case'course':renderCourse(r.id);break;case'flashcards':renderFlashcards();break;case'quiz':r.id==='written'?renderWritten():renderQuiz();break;case'cases':renderCases(r.id);break;case'exams':renderExams();break;case'coverage':renderCoverage();break;default:render404()}page.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});closeMenu()}

  function search(q){q=q.trim().toLowerCase();if(!q){searchResults.hidden=true;return}let results=[];D.modules.forEach(m=>{const txt=(m.title+' '+m.summary+' '+m.notes.map(n=>n.heading+' '+n.body).join(' ')).toLowerCase();if(txt.includes(q))results.push({type:'Module',title:m.title,detail:m.summary,href:'#course/'+m.id})});D.concepts.forEach(c=>{const txt=(c.label+' '+c.cue+' '+c.explanation+' '+c.mnemonic).toLowerCase();if(txt.includes(q)){const m=moduleForConcept(c.id);results.push({type:categoryName(c.category),title:c.label,detail:c.cue,href:m?'#course/'+m.id:'#course'})}});D.cases.forEach(c=>{if((c.title+' '+c.scenario+' '+c.approach).toLowerCase().includes(q))results.push({type:'Case Lab',title:c.title,detail:c.approach,href:'#cases/'+c.id})});D.modules.forEach(m=>m.sources.forEach(src=>{if(src.toLowerCase().includes(q))results.push({type:'Source track',title:src,detail:m.title,href:'#course/'+m.id})}));results=results.slice(0,12);searchResults.innerHTML=results.length?results.map(r=>`<a class="search-item" href="${r.href}"><strong>${esc(r.title)}</strong><small>${esc(r.type)} · ${esc(r.detail)}</small></a>`).join(''):'<div class="empty">No matches.</div>';searchResults.hidden=false}

  function applyTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem('psychotherapy-theme',theme);$('#themeBtn').textContent=theme==='dark'?'☀':'☾'}
  function initTheme(){const stored=localStorage.getItem('psychotherapy-theme');applyTheme(stored||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))}
  function openMenu(){const s=$('#sidebar'),sc=$('#scrim');s.classList.add('open');sc.hidden=false}
  function closeMenu(){$('#sidebar').classList.remove('open');$('#scrim').hidden=true}

  window.addEventListener('hashchange',render);
  searchInput.addEventListener('input',e=>search(e.target.value));
  searchResults.addEventListener('click',()=>{searchResults.hidden=true;searchInput.value=''})
  document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap'))searchResults.hidden=true});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&document.activeElement!==searchInput){e.preventDefault();searchInput.focus()}if(routeName()==='flashcards'&&flashState){if(e.code==='Space'&&document.activeElement.tagName!=='SELECT'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();flipCard()}if(e.key==='1')gradeCard('again');if(e.key==='2')gradeCard('got')}});
  $('#themeBtn').addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
  $('#menuBtn').addEventListener('click',openMenu);$('#scrim').addEventListener('click',closeMenu);
  initTheme();render();
})();
