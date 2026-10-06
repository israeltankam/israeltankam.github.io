(() => {
  const STORAGE_KEY = "tjs_human_warrant_annotation_v1";
  const CASES_KEY = "tjs_human_warrant_custom_cases_v1";
  let cases = loadStoredCases() || structuredClone(window.ANNOTATION_CASES || []);
  let state = loadState();
  let currentIndex = Math.min(state.currentIndex || 0, Math.max(0, cases.length - 1));

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  function blankAnnotation(caseId) {
    return {
      case_id: caseId,
      verdict: "",
      relevant_evidence: [],
      warrants: [],
      contradictions: [],
      dependencies: [],
      action: "",
      confidence: 3,
      notes: "",
      completed: false,
      started_at: null,
      updated_at: null
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { annotator: {}, annotations: {}, currentIndex: 0 };
    } catch {
      return { annotator: {}, annotations: {}, currentIndex: 0 };
    }
  }

  function loadStoredCases() {
    try {
      const raw = localStorage.getItem(CASES_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function persist() {
    state.currentIndex = currentIndex;
    state.annotator = {
      id: $("#annotatorId")?.value.trim() || state.annotator?.id || "",
      background: $("#background")?.value || state.annotator?.background || "",
      consent: !!$("#consent")?.checked
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const status = $("#saveStatus");
    if (status) {
      status.textContent = "Sauvegardé";
      setTimeout(() => status.textContent = "Sauvegarde locale", 1000);
    }
    updateProgress();
  }

  function ensureAnnotation(caseId) {
    if (!state.annotations[caseId]) state.annotations[caseId] = blankAnnotation(caseId);
    return state.annotations[caseId];
  }

  function showScreen(name) {
    $$(".screen").forEach(el => el.classList.toggle("active", el.id === `screen-${name}`));
    $$(".step").forEach(el => el.classList.toggle("active", el.dataset.screen === name));
    if (name === "annotate") renderCase();
    if (name === "export") renderExport();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.remove("hidden");
    setTimeout(() => t.classList.add("hidden"), 2200);
  }

  function updateProgress() {
    const total = cases.length;
    const done = cases.filter(c => state.annotations[c.id]?.completed).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    $("#progressText").textContent = `${done} / ${total}`;
    $("#progressBar").style.width = `${pct}%`;
  }

  function canStart() {
    const id = $("#annotatorId").value.trim();
    const bg = $("#background").value;
    const consent = $("#consent").checked;
    if (!id) return toast("Indique un nom ou pseudonyme."), false;
    if (!bg) return toast("Choisis ton profil."), false;
    if (!consent) return toast("Le consentement est nécessaire pour commencer."), false;
    persist();
    return true;
  }

  function renderCase() {
    const empty = $("#annotationEmpty");
    const panel = $("#annotationPanel");
    if (!cases.length) {
      empty.classList.remove("hidden"); panel.classList.add("hidden"); return;
    }
    empty.classList.add("hidden"); panel.classList.remove("hidden");

    const c = cases[currentIndex];
    const a = ensureAnnotation(c.id);
    if (!a.started_at) a.started_at = new Date().toISOString();
    $("#caseIndexText").textContent = `Cas ${currentIndex + 1} / ${cases.length}`;
    $("#caseDomain").textContent = c.domain || "Cas";
    if (c.difficulty) { $("#caseDifficulty").textContent = c.difficulty; $("#caseDifficulty").classList.remove("hidden"); }
    else $("#caseDifficulty").classList.add("hidden");
    $("#claimText").textContent = c.claim || "";
    if (c.question) { $("#questionText").textContent = c.question; $("#questionText").classList.remove("hidden"); }
    else $("#questionText").classList.add("hidden");

    $$('input[name="verdict"]').forEach(r => r.checked = r.value === a.verdict);
    $$('input[name="action"]').forEach(r => r.checked = r.value === a.action);
    $("#confidenceRange").value = a.confidence || 3;
    $("#notes").value = a.notes || "";

    renderEvidence(c, a);
    renderWarrants(c, a);
    renderContradictions(c, a);
    renderDependencies(c, a);
    $("#prevCaseBtn").disabled = currentIndex === 0;
    $("#nextCaseBtn").disabled = currentIndex === cases.length - 1;
    persist();
  }

  function renderEvidence(c, a) {
    const list = $("#evidenceList"); list.innerHTML = "";
    c.evidence.forEach(ev => {
      const label = document.createElement("label");
      label.className = `evidence-card selectable ${a.relevant_evidence.includes(ev.id) ? "selected" : ""}`;
      label.innerHTML = `
        <input type="checkbox" value="${escapeHtml(ev.id)}" ${a.relevant_evidence.includes(ev.id) ? "checked" : ""}/>
        <div class="evidence-head"><span class="evidence-id">${escapeHtml(ev.id)}</span><span class="source-type">${escapeHtml(ev.source_type || "Source")}</span><span class="source-title">${escapeHtml(ev.source_title || "")}</span></div>
        <p>${escapeHtml(ev.text || "")}</p>`;
      const input = label.querySelector("input");
      input.addEventListener("change", () => {
        if (input.checked) a.relevant_evidence = unique([...a.relevant_evidence, ev.id]);
        else a.relevant_evidence = a.relevant_evidence.filter(x => x !== ev.id);
        label.classList.toggle("selected", input.checked);
        a.updated_at = new Date().toISOString(); persist();
      });
      list.appendChild(label);
    });
  }

  function renderWarrants(c, a) {
    const box = $("#warrantsContainer"); box.innerHTML = "";
    a.warrants.forEach((w, idx) => {
      const card = document.createElement("div"); card.className = "warrant-card";
      const opts = c.evidence.map(ev => `
        <label class="mini-check"><input type="checkbox" value="${escapeHtml(ev.id)}" ${w.evidence_ids.includes(ev.id) ? "checked" : ""}/><span><strong>${escapeHtml(ev.id)}</strong> — ${escapeHtml(shorten(ev.text, 95))}</span></label>`).join("");
      card.innerHTML = `
        <div class="warrant-head"><strong>Warrant ${idx + 1}</strong><button class="remove-link">Supprimer</button></div>
        <div class="warrant-options">${opts}</div>
        <div class="warrant-foot">
          <div class="mini-field"><label>Ce warrant suffit-il à lui seul ?</label><select class="input suff"><option value="yes" ${w.sufficient === "yes" ? "selected" : ""}>Oui</option><option value="no" ${w.sufficient === "no" ? "selected" : ""}>Non</option><option value="uncertain" ${w.sufficient === "uncertain" ? "selected" : ""}>Incertain</option></select></div>
          <div class="mini-field"><label>Est-il minimal ?</label><select class="input mini"><option value="yes" ${w.minimal === "yes" ? "selected" : ""}>Oui</option><option value="no" ${w.minimal === "no" ? "selected" : ""}>Non</option><option value="uncertain" ${w.minimal === "uncertain" ? "selected" : ""}>Incertain</option></select></div>
        </div>`;
      card.querySelectorAll('input[type="checkbox"]').forEach(inp => inp.addEventListener("change", () => {
        w.evidence_ids = Array.from(card.querySelectorAll('input[type="checkbox"]:checked')).map(x => x.value);
        a.updated_at = new Date().toISOString(); persist();
      }));
      card.querySelector(".suff").addEventListener("change", e => { w.sufficient = e.target.value; persist(); });
      card.querySelector(".mini").addEventListener("change", e => { w.minimal = e.target.value; persist(); });
      card.querySelector(".remove-link").addEventListener("click", () => { a.warrants.splice(idx, 1); renderWarrants(c, a); persist(); });
      box.appendChild(card);
    });
  }

  function addWarrant() {
    const c = cases[currentIndex], a = ensureAnnotation(c.id);
    a.warrants.push({ evidence_ids: [], sufficient: "yes", minimal: "yes" });
    renderWarrants(c, a); persist();
  }

  function renderContradictions(c, a) {
    const box = $("#contradictionList"); box.innerHTML = "";
    c.evidence.forEach(ev => {
      const lab = document.createElement("label"); lab.className = "check-pill";
      lab.innerHTML = `<input type="checkbox" value="${escapeHtml(ev.id)}" ${a.contradictions.includes(ev.id) ? "checked" : ""}/><span><strong>${escapeHtml(ev.id)}</strong> — ${escapeHtml(shorten(ev.text, 120))}</span>`;
      const inp = lab.querySelector("input"); inp.addEventListener("change", () => {
        if (inp.checked) a.contradictions = unique([...a.contradictions, ev.id]);
        else a.contradictions = a.contradictions.filter(x => x !== ev.id);
        persist();
      });
      box.appendChild(lab);
    });
  }

  function renderDependencies(c, a) {
    const box = $("#dependencyPairs"); box.innerHTML = "";
    a.dependencies.forEach((d, idx) => {
      const row = document.createElement("div"); row.className = "dependency-row";
      row.innerHTML = `<select class="input left">${evidenceOptions(c, d.a)}</select><span class="arrow">↔</span><select class="input right">${evidenceOptions(c, d.b)}</select><button class="remove-link">Supprimer</button>`;
      row.querySelector(".left").addEventListener("change", e => { d.a = e.target.value; persist(); });
      row.querySelector(".right").addEventListener("change", e => { d.b = e.target.value; persist(); });
      row.querySelector(".remove-link").addEventListener("click", () => { a.dependencies.splice(idx, 1); renderDependencies(c, a); persist(); });
      box.appendChild(row);
    });
  }

  function addDependency() {
    const c = cases[currentIndex], a = ensureAnnotation(c.id);
    if (c.evidence.length < 2) return toast("Il faut au moins deux preuves pour signaler une dépendance.");
    a.dependencies.push({ a: c.evidence[0].id, b: c.evidence[1].id });
    renderDependencies(c, a); persist();
  }

  function evidenceOptions(c, selected) {
    return c.evidence.map(ev => `<option value="${escapeHtml(ev.id)}" ${ev.id === selected ? "selected" : ""}>${escapeHtml(ev.id)} — ${escapeHtml(shorten(ev.source_title || ev.text, 55))}</option>`).join("");
  }

  function captureCase(markComplete = false) {
    if (!cases.length) return true;
    const c = cases[currentIndex], a = ensureAnnotation(c.id);
    a.verdict = $('input[name="verdict"]:checked')?.value || "";
    a.action = $('input[name="action"]:checked')?.value || "";
    a.confidence = Number($("#confidenceRange").value || 3);
    a.notes = $("#notes").value.trim();
    a.updated_at = new Date().toISOString();

    if (markComplete) {
      const issues = [];
      if (!a.verdict) issues.push("le jugement global");
      if (!a.action) issues.push("l’action recommandée");
      if (["SUPPORT","CONTRADICT"].includes(a.verdict) && !a.warrants.length) issues.push("au moins un warrant");
      if (a.warrants.some(w => w.evidence_ids.length === 0)) issues.push("un warrant vide");
      if (issues.length) { toast("À compléter : " + issues.join(", ") + "."); persist(); return false; }
      a.completed = true;
    }
    persist(); return true;
  }

  function navigate(delta, requireComplete = false) {
    if (!captureCase(requireComplete)) return;
    currentIndex = Math.max(0, Math.min(cases.length - 1, currentIndex + delta));
    renderCase(); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderExport() {
    captureCase(false);
    const total = cases.length;
    const doneIds = cases.filter(c => state.annotations[c.id]?.completed).map(c => c.id);
    const done = doneIds.length;
    const pct = total ? Math.round(done / total * 100) : 0;
    $("#summaryDone").textContent = done;
    $("#summaryTotal").textContent = total;
    $("#summaryPct").textContent = pct + "%";
    const missing = cases.filter(c => !state.annotations[c.id]?.completed).map(c => c.id);
    $("#missingCases").innerHTML = missing.length ? `<strong>À compléter :</strong> ${missing.map(escapeHtml).join(", ")}` : `<strong>Tout est complété.</strong>`;
  }

  function exportJson() {
    captureCase(false);
    const payload = {
      schema_version: "1.0",
      exported_at: new Date().toISOString(),
      annotator: state.annotator,
      case_set: cases.map(c => c.id),
      annotations: cases.map(c => state.annotations[c.id] || blankAnnotation(c.id))
    };
    download(JSON.stringify(payload, null, 2), `warrant_annotations_${slug(state.annotator?.id || "annotator")}.json`, "application/json");
  }

  function exportCsv() {
    captureCase(false);
    const rows = [["case_id","verdict","relevant_evidence","warrants","contradictions","dependencies","action","confidence","completed","notes"]];
    cases.forEach(c => {
      const a = state.annotations[c.id] || blankAnnotation(c.id);
      rows.push([
        c.id,a.verdict,a.relevant_evidence.join("|"),a.warrants.map(w => w.evidence_ids.join("+")).join(" || "),a.contradictions.join("|"),a.dependencies.map(d => `${d.a}~${d.b}`).join("|"),a.action,a.confidence,a.completed,a.notes
      ]);
    });
    download(rows.map(r => r.map(csvCell).join(",")).join("\n"), `warrant_annotations_${slug(state.annotator?.id || "annotator")}.csv`, "text/csv;charset=utf-8");
  }

  function download(content, name, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function importCases() {
    const f = $("#caseFileInput").files?.[0];
    if (!f) return toast("Choisis d’abord un fichier JSON.");
    try {
      const data = JSON.parse(await f.text());
      const arr = Array.isArray(data) ? data : data.cases;
      validateCases(arr);
      cases = arr;
      localStorage.setItem(CASES_KEY, JSON.stringify(cases));
      state.annotations = {}; currentIndex = 0; persist();
      toast(`${cases.length} cas chargés.`); renderExport(); updateProgress();
    } catch (e) { toast("Fichier invalide : " + e.message); }
  }

  function validateCases(arr) {
    if (!Array.isArray(arr) || !arr.length) throw new Error("aucun cas trouvé");
    const ids = new Set();
    arr.forEach((c, i) => {
      if (!c.id || !c.claim || !Array.isArray(c.evidence)) throw new Error(`cas ${i + 1} incomplet`);
      if (ids.has(c.id)) throw new Error(`identifiant dupliqué : ${c.id}`); ids.add(c.id);
      const eids = new Set(); c.evidence.forEach(ev => { if (!ev.id || !ev.text) throw new Error(`preuve incomplète dans ${c.id}`); if (eids.has(ev.id)) throw new Error(`preuve dupliquée ${ev.id} dans ${c.id}`); eids.add(ev.id); });
    });
  }

  function resetAll() {
    if (!confirm("Effacer toutes les annotations sauvegardées dans ce navigateur ?")) return;
    localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(CASES_KEY);
    state = { annotator: {}, annotations: {}, currentIndex: 0 }; cases = structuredClone(window.ANNOTATION_CASES || []); currentIndex = 0;
    location.reload();
  }

  function unique(arr) { return [...new Set(arr)]; }
  function shorten(s, n) { return (s || "").length > n ? s.slice(0, n - 1) + "…" : (s || ""); }
  function escapeHtml(s) { return String(s ?? "").replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function csvCell(v) { const s = String(v ?? ""); return `"${s.replace(/"/g, '""')}"`; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9_-]+/gi,"_").replace(/^_+|_+$/g,"") || "annotator"; }

  // Events
  $("#startTutorialBtn").addEventListener("click", () => { if (canStart()) showScreen("tutorial"); });
  $("#beginBtn").addEventListener("click", () => { if (canStart()) showScreen("annotate"); });
  $$('[data-go]').forEach(b => b.addEventListener("click", () => showScreen(b.dataset.go)));
  $$(".step").forEach(b => b.addEventListener("click", () => {
    const s = b.dataset.screen;
    if (["tutorial","annotate","export"].includes(s) && !state.annotator?.consent && !canStart()) return;
    showScreen(s);
  }));
  $("#prevCaseBtn").addEventListener("click", () => navigate(-1, false));
  $("#nextCaseBtn").addEventListener("click", () => navigate(1, false));
  $("#saveAndPrevBtn").addEventListener("click", () => navigate(-1, true));
  $("#saveAndNextBtn").addEventListener("click", () => {
    if (!captureCase(true)) return;
    if (currentIndex === cases.length - 1) { toast("Dernier cas enregistré."); showScreen("export"); }
    else navigate(1, false);
  });
  $("#addWarrantBtn").addEventListener("click", addWarrant);
  $("#addDependencyBtn").addEventListener("click", addDependency);
  $("#exportJsonBtn").addEventListener("click", exportJson);
  $("#exportCsvBtn").addEventListener("click", exportCsv);
  $("#loadCasesBtn").addEventListener("click", importCases);
  $("#resetBtn").addEventListener("click", resetAll);
  $("#helpBtn").addEventListener("click", () => $("#helpModal").classList.remove("hidden"));
  $("#closeHelpBtn").addEventListener("click", () => $("#helpModal").classList.add("hidden"));
  $("#helpModal").addEventListener("click", e => { if (e.target.id === "helpModal") $("#helpModal").classList.add("hidden"); });
  $$('input[name="verdict"], input[name="action"], #confidenceRange, #notes').forEach(el => el.addEventListener("change", () => captureCase(false)));
  $("#notes").addEventListener("input", () => { const c = cases[currentIndex]; if (c) ensureAnnotation(c.id).notes = $("#notes").value; persist(); });
  [$("#annotatorId"), $("#background"), $("#consent")].forEach(el => el.addEventListener("change", persist));

  // Init
  $("#annotatorId").value = state.annotator?.id || "";
  $("#background").value = state.annotator?.background || "";
  $("#consent").checked = !!state.annotator?.consent;
  updateProgress();
})();
