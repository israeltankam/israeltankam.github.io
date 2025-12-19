// State Management
let currentLang = 'fr';
let userAnswers = {}; // Store answers { questionId: [indices] }

// --- Navigation Logic ---
function navigate(viewId) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear content
    window.scrollTo(0, 0);

    if (viewId === 'home') renderHome();
    else if (viewId === 'curriculum') renderCurriculum();
    else if (viewId === 'quiz') renderQuiz();
    else if (viewId === 'result') renderResult();
}

function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    // Re-render current view logic would go here, simpler to go home for MVP
    navigate('home');
    updateNav();
}

function updateNav() {
    document.getElementById('nav-home').innerText = currentLang === 'fr' ? 'Accueil' : 'Home';
    document.getElementById('nav-curriculum').innerText = currentLang === 'fr' ? 'Parcours' : 'Pathways';
    document.getElementById('nav-quiz').innerText = DATA[currentLang].quiz.title;
}

// --- Renders ---

function renderHome() {
    const t = DATA[currentLang].home;
    const html = `
        <div class="section container" style="text-align:center;">
            <h1>${t.title}</h1>
            <h2 style="font-weight:400; color:var(--text-muted);">${t.subtitle}</h2>
            <p style="font-size:1.1rem; max-width:600px; margin: 0 auto 2rem auto;">${t.desc}</p>
            <button onclick="navigate('quiz')" class="btn btn-primary">${t.cta}</button>
            <div style="margin-top:3rem;">
                <img src="hero.jpg" alt="MLOps Illustration" style="border-radius:16px; box-shadow:var(--shadow-hover); max-width:100%; height:auto;">
            </div>
        </div>
    `;
    document.getElementById('app').innerHTML = html;
}

function renderCurriculum() {
    const t = DATA[currentLang].curriculum;
    
    // Header Section
    let html = `
        <div class="section container">
            <div class="curriculum-intro">
                <h1>${t.title}</h1>
                <p>${t.intro}</p>
            </div>
            
            <div class="project-highlight">
                ${t.common_project}
            </div>

            <div class="curriculum-list">
    `;
    
    // Loop through modules
    t.modules.forEach(mod => {
        // Generate Tools Badges
        const toolsHtml = mod.tools.map(tool => `<span class="tool-badge">${tool}</span>`).join('');
        
        // Generate Skills Text
        const skillsText = mod.skills.join(' • ');

        // Generate Details List
        const detailsHtml = mod.details.map(item => `<div class="detail-item">Example: ${item}</div>`).join(''); // Note: "Example" prefix is optional context
        // Better rendering for details based on Data:
        const syllabusHtml = mod.details.map(item => `
            <div class="detail-item">
                <span style="color:var(--primary-blue);">➤</span> ${item}
            </div>
        `).join('');

        html += `
            <div class="card module-card" id="module-${mod.id}">
                <div class="module-header">
                    <div>
                        <h3>${mod.title}</h3>
                        <div class="module-meta">
                            <span class="meta-tag">⏱ ${mod.duration}</span>
                            <span class="meta-tag">🎓 ${mod.level}</span>
                        </div>
                    </div>
                </div>

                <p>${mod.desc}</p>

                <div class="skills-list">
                    <strong>Compétences :</strong> ${skillsText}
                </div>

                <div class="tools-container">
                    ${toolsHtml}
                </div>

                <button class="btn-toggle-details" onclick="toggleDetails(${mod.id})">
                    Voir le programme détaillé ▼
                </button>

                <div id="details-${mod.id}" class="module-details">
                    <h4 style="margin-bottom:0.5rem; font-size:1rem;">Programme des séances :</h4>
                    ${syllabusHtml}
                    <div style="margin-top:1.5rem; text-align:right;">
                        <button onclick="navigate('quiz')" class="btn btn-sm btn-secondary">S'inscrire à ce module</button>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div></div>`; // Close grid and section
    document.getElementById('app').innerHTML = html;
}

// Fonction utilitaire pour l'accordéon
function toggleDetails(id) {
    const details = document.getElementById(`details-${id}`);
    const btn = details.previousElementSibling; // Le bouton
    
    if (details.classList.contains('active')) {
        details.classList.remove('active');
        btn.innerHTML = "Voir le programme détaillé ▼";
    } else {
        details.classList.add('active');
        btn.innerHTML = "Masquer le programme ▲";
    }
}

// Petit bonus : Lier le bouton "S'inscrire" vers le formulaire
function prefillForm(moduleTitle) {
    // On simule un résultat pour aller sur la page de résultat/contact
    window.lastResult = {
        score: 0, 
        path: 99, // Dummy ID
        details: {}
    };
    
    // On force l'affichage du formulaire
    navigate('result');
    
    // On attend que le DOM soit généré puis on remplit
    setTimeout(() => {
        const subjectInput = document.querySelector('input[name="subject"]');
        if(subjectInput) subjectInput.value = `Inscription directe - ${moduleTitle}`;
        document.getElementById('contact-form-container').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    }, 100);
}

function renderQuiz() {
    const t = DATA[currentLang].quiz;
    let html = `<div class="section container">
        <h1>${t.title}</h1>
        <p>${t.intro}</p>
        <form id="quiz-form">`;

    QUIZ_QUESTIONS.forEach((q, index) => {
        html += `
            <div class="card quiz-card" id="q-${q.id}">
                <div style="margin-bottom:0.5rem; text-transform:uppercase; font-size:0.8rem; letter-spacing:1px; color:var(--indigo-accent);">
                    ${t.levels[q.level]} - ${q.points} pts
                </div>
                <h3>${index + 1}. ${q.text}</h3>
                <div class="quiz-options">
        `;
        q.options.forEach((opt, optIndex) => {
            html += `
                <label class="option-label">
                    <input type="checkbox" name="q${q.id}" value="${optIndex}">
                    ${opt.text}
                </label>
            `;
        });
        html += `</div></div>`;
    });

    html += `
        <button type="button" onclick="calculateScore()" class="btn btn-primary" style="margin-top:2rem; width:100%;">${t.submit}</button>
        </form></div>
    `;
    document.getElementById('app').innerHTML = html;
}

// --- Scoring Engine (Based on DOCX) ---
function calculateScore() {
    let totalScore = 0;
    let levelScores = { 0:0, 1:0, 2:0, 3:0, 4:0 }; // By level
    let maxScores = { 0:0, 1:0, 2:0, 3:0, 4:0 };

    QUIZ_QUESTIONS.forEach(q => {
        // Get user selected indices for this question
        const checkboxes = document.querySelectorAll(`input[name="q${q.id}"]:checked`);
        const userIndices = Array.from(checkboxes).map(cb => parseInt(cb.value));
        
        // Determine correctness
        const correctIndices = q.options.map((opt, i) => opt.correct ? i : null).filter(i => i !== null);
        
        let questionScore = 0;
        let isCorrect = true; // Perfect match flag

        // Logic from doc: 
        // All good: 100%
        // Incorrect checked: -25%
        // Good missing: -20%
        
        const pointValue = q.points;
        maxScores[q.level] += pointValue;

        let penalty = 0;

        // Check for wrong selections
        userIndices.forEach(idx => {
            if (!correctIndices.includes(idx)) {
                penalty += 0.25; // 25% penalty per wrong answer
            }
        });

        // Check for missing correct selections
        correctIndices.forEach(idx => {
            if (!userIndices.includes(idx)) {
                penalty += 0.20; // 20% penalty per missing answer
            }
        });

        // Calculate final score for this question
        let finalPercent = 1 - penalty;
        if (finalPercent < 0) finalPercent = 0;
        
        // Simple override: If no answer selected, 0 points
        if (userIndices.length === 0) finalPercent = 0;

        questionScore = pointValue * finalPercent;
        
        totalScore += questionScore;
        levelScores[q.level] += questionScore;
    });

    // Determine Recommendation Logic (Simplified from DOCX)
    let recommendedPath = 0;
    if (totalScore <= 22) recommendedPath = 0;
    else if (totalScore <= 35) recommendedPath = 1;
    else if (totalScore <= 45) recommendedPath = 2;
    else if (totalScore <= 52) recommendedPath = 3;
    else recommendedPath = 4;

    // Save result to session or global
    window.lastResult = {
        score: Math.round(totalScore),
        path: recommendedPath,
        details: levelScores
    };

    navigate('result');
}

function renderResult() {
    const r = window.lastResult;
    const t = DATA[currentLang].result;
    const pathInfo = DATA[currentLang].curriculum.modules[r.path];

    const html = `
        <div class="section container">
            <div class="card" style="text-align:center; border-top: 5px solid var(--indigo-accent);">
                <h2>${t.title}</h2>
                <div style="font-size:3rem; font-weight:800; color:var(--primary-blue); margin:1rem 0;">
                    ${r.score} / 55 pts
                </div>
                <h3>${t.recommendation} <br><span style="color:var(--indigo-accent);">${pathInfo.title}</span></h3>
                <p>${pathInfo.desc}</p>
                <button onclick="document.getElementById('contact-form-container').style.display='block'; this.style.display='none'" class="btn btn-primary" style="margin-top:1rem;">
                    ${t.cta_apply}
                </button>
            </div>

            <div id="contact-form-container" class="card" style="display:none; animation: fadeIn 0.5s;">
                <h3>${t.form_title}</h3>
                <p>${t.form_desc}</p>
                
                <form action="https://formspree.io/f/mqezepld" method="POST">
                    <input type="hidden" name="_next" value="https://israeltankam.github.io/mlops/">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" class="form-control" required placeholder="votre@email.com">
                    </div>
                    
                    <div class="form-group">
                        <label>Sujet</label>
                        <input type="text" name="subject" class="form-control" value="Inscription - ${pathInfo.title}" readonly>
                    </div>

                    <input type="hidden" name="quiz_score" value="${r.score}">
                    <input type="hidden" name="recommended_path" value="${pathInfo.title}">

                    <div class="form-group">
                        <label>Message de motivation (max 1000 chars)</label>
                        <textarea name="message" class="form-control" maxlength="1000" required></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Envoyer</button>
                </form>
            </div>
        </div>
    `;
    document.getElementById('app').innerHTML = html;
}

// Init
window.onload = () => {
    updateNav();
    navigate('home');
};
