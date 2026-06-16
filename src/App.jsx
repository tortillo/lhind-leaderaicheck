import React, { useState, useEffect, useRef, useCallback } from "react";
import { storage } from "./storage";
import { POOL, I, drawItems } from "./questions";
import { LHIND_ROLES } from "./roles";
import { VERSION, RELEASES } from "./version";

// ============================================================
// LHIND AI LEADERSHIP ASSESSMENT — v2
// Design: "Flight deck" cockpit instrumentation. Deep navy panels,
// amber/cyan/green instrument accents, mono data type + Inter.
// Features: DE/EN, randomized scientific item pool, gamification
// (speed bonus + streak), anti-cheat, cohort + study benchmarks,
// PIN admin panel with hardest-question analysis. Persistent shared storage.
// ============================================================

const C = {
  bg: "#0B1622", panel: "#10202F", panelHi: "#15293B", line: "#1F3A52",
  ink: "#E8F0F6", inkDim: "#8AA6BC", amber: "#F5A623", cyan: "#36C9D9",
  green: "#4FD18B", red: "#F0556B", violet: "#9B7BE0", gold: "#FFD166",
};
const mono = "'JetBrains Mono',ui-monospace,monospace";
const sans = "'Inter',system-ui,-apple-system,sans-serif";

// === inlined i18n ===
// i18n strings DE/EN
const STR = {
  de: {
    appTitle: "LHIND · AI Leadership Check",
    appSub: "ANONYM · FÜR FÜHRUNGSKRÄFTE",
    forLeaders: "FÜR FÜHRUNGSKRÄFTE",
    question: "FRAGE",
    privacyBanner: "Es werden keine personenbezogenen Daten gespeichert. Keine Namen, keine E-Mail, keine IP. Nur anonyme, aggregierte Kennzahlen für deinen Vergleich.",
    introEyebrow: "Selbsteinschätzung · 20 Fragen · ~12 Min",
    introH1: "Wie KI-fit ist deine Führung?",
    introP: "Ein anonymer Check zu KI-Grundwissen, Anwendung im Business und Führung im KI-Zeitalter — plus ein Praxistest. Am Ende: dein Score, ein Vergleich mit anderen Führungskräften und mit Studiendaten, sowie konkrete nächste Schritte.",
    fairnessTitle: "⚠ FAIRNESS & SPIELREGELN",
    fairnessText: "Pro Frage läuft ein Countdown — je schneller du richtig liegst, desto mehr Bonuspunkte. Der Test enthält Kontroll-Fragen und erkennt Tab-Wechsel & Einfügen. Die Fragen werden zufällig aus einem großen Pool gezogen, ein erneuter Versuch bringt also neue Fragen. Antworte ehrlich und ohne fremde Hilfe.",
    participantsSoFar: "Teilnehmer bisher",
    avgScore: "Ø-Score",
    start: "Check starten →",
    step1: "Schritt 1 · Basisdaten (anonym)",
    onboardH2: "Ein paar Eckdaten",
    onboardP: "Keine Namen, keine E-Mail. Nur für die anonyme Auswertung, deinen Vergleich und die Personalisierung deiner Fragen.",
    role: "Deine Rolle",
    timeLabel: "Verbleibende Zeit",
    firstQBonus: "Erste Frage: +10 Sek. Bonuszeit zum Reinkommen 😊",
    rolePlaceholder: "Rolle suchen oder eingeben…",
    roleFreeText: "Mit Enter als eigene Eingabe übernehmen",
    age: "Altersgruppe",
    area: "Bereich",
    leadExp: "Führungserfahrung",
    teamSize: "Teamgröße",
    self: "Selbsteinschätzung: professionelle KI-Nutzung",
    timeSaved: "Wie viel Zeit spart dir KI aktuell pro Tag?",
    savingPotential: "Bei welchen Tätigkeiten siehst du Spar-/Nutzenpotenzial? (nach Priorität antippen)",
    savingRankHint: "Tippe die Tätigkeiten in der Reihenfolge an, in der du das größte Potenzial siehst. Erneutes Antippen entfernt sie wieder.",
    otherPlaceholder: "Bitte angeben…",
    toTest: "Zum Test →",
    bauch: "Keine Korrektur sichtbar — antworte aus dem Bauch.",
    anomalies: "Auffälligkeit",
    anomaliesPl: "Auffälligkeiten",
    speedBonus: "TEMPO-BONUS",
    streak: "SERIE",
    yourResult: "Dein Ergebnis · anonym gespeichert",
    ofPoints: "VON 100 PUNKTEN",
    seniority: "SENIORITÄT",
    cohortCompare: "Vergleich mit anderen Führungskräften",
    betterThan: "Du bist besser als",
    ofParticipants: "der bisher",
    participants: "Teilnehmer",
    avgIs: "Der Durchschnitt liegt bei",
    firstParticipant: "Du bist unter den ersten Teilnehmern — sobald mehr Kolleg:innen teilnehmen, erscheint hier dein Perzentil-Vergleich.",
    currentAvg: "Aktueller Ø",
    studyCompare: "Vergleich mit Studiendaten",
    competencyProfile: "Kompetenz-Profil",
    integrityCheck: "INTEGRITÄTS-CHECK",
    tabSwitch: "Tab-Wechsel",
    paste: "Einfügen",
    timeouts: "Zeitüberschreitungen",
    controlQ: "Kontroll-Fragen",
    yourPlacement: "Deine Einordnung",
    nextSteps: "Empfohlene nächste Schritte",
    focus: "Fokus",
    training: "Weiterbildung",
    skills: "Praktische Fähigkeiten",
    books: "Bücher",
    restart: "Erneut starten (neue Fragen)",
    savedNote: "Dein Ergebnis wurde anonym zur Kohorten-Auswertung gespeichert (Score, Seniorität, Rolle, Bereich, Altersgruppe, Selbsteinschätzung). Keine Namen, keine Antworten im Klartext.",
    admin: "Admin",
    adminTitle: "Admin-Dashboard",
    adminSub: "Aggregierte Auswertung aller Durchläufe",
    totalRuns: "Durchläufe gesamt",
    avgScoreAdmin: "Ø-Score",
    medianScore: "Median",
    avgIntegrity: "Ø-Integrität sauber",
    byRole: "Nach Rolle",
    byArea: "Nach Bereich",
    byAge: "Nach Altersgruppe",
    hardestQuestions: "Schwierigste Fragen (Trainingsbedarf)",
    hardestSub: "Fragen mit der niedrigsten Korrektquote — Kandidaten für gezielte Schulungen",
    correctRate: "Korrektquote",
    timesAsked: "Mal gestellt",
    resetAll: "Alle Daten zurücksetzen",
    resetConfirm: "Wirklich ALLE anonymen Ergebnisse löschen? Das kann nicht rückgängig gemacht werden.",
    backToStart: "← Zurück zum Start",
    noData: "Noch keine Daten vorhanden.",
    enterPin: "Admin-PIN eingeben",
    wrongPin: "Falsche PIN.",
    unlock: "Entsperren",
    quizComplete: "Geschafft!",
    seniorityScale: "Senioritäts-Skala",
    studyNote: "Benchmarks aus NBER/St. Louis Fed Real-Time Population Survey (2024–25) und AI-Literacy-Forschung (Ng et al. 2021; Carolus et al. 2023).",
    methodologyTitle: "Methodik",
    methodology: "Fragen sind nach dem AI-Literacy-Framework von Ng et al. (2021) — Verstehen, Anwenden, Bewerten/Erstellen, Ethik — strukturiert und nach der revidierten Bloom-Taxonomie (Anderson & Krathwohl, 2001) schwierigkeitskalibriert. Pro Durchlauf werden Items zufällig und schwierigkeitsbalanciert aus einem großen Pool gezogen.",
    points: "Pkt",
    pause: "Pause", resume: "Weiter",
    pausedTitle: "Pausiert",
    pausedHint: "Frage ausgeblendet. Die Zeit ist angehalten — niemand kann mitlesen oder kopieren.",
    answered: "beantwortet", remaining: "offen",
    trainingPromptTitle: "Dein persönlicher Trainingsplan-Prompt",
    trainingPromptHint: "Kopiere diesen Prompt in deine bevorzugte KI (Claude, ChatGPT, Gemini …). Er erstellt dir auf Basis deiner Ergebnisse einen aktuellen, individuellen Trainingsplan — ganz ohne dass hier Daten gespeichert werden.",
    copyPrompt: "Prompt kopieren",
    copied: "Kopiert ✓",
    resourcesTitle: "Zertifikate, Videos & Quellen",
    reviewTitle: "Alle Fragen im Überblick",
    reviewHint: "Deine Antwort, die richtige Antwort und eine kurze Erläuterung — zum Nachlernen.",
    reviewShow: "Fragenüberblick anzeigen",
    reviewHide: "Überblick ausblenden",
    yourAnswer: "Deine Antwort",
    correctAnswer: "Richtig",
    noAnswer: "(keine Antwort)",
    explanation: "Erläuterung",
    avatarLabel: "Avatar-Name (optional)",
    avatarHint: "Wähle einen frei erfundenen Namen, wenn du deinen Fortschritt später wiedersehen möchtest. Gibst du beim nächsten Mal denselben Namen ein, zeigt der Bericht deine Entwicklung. Freiwillig — leer lassen ist völlig ok und bleibt anonym.",
    avatarPlaceholder: "z. B. Falcon-7, Captain Nova …",
    excludeLeadLabel: "Führungs-spezifische Fragen ausschließen",
    excludeLeadHint: "Wenn aktiviert, werden Fragen zur Personalführung in diesem Durchlauf nicht gestellt. Sinnvoll für Fach- oder Projektrollen ohne disziplinarische Führung.",
    includeCompanyLabel: "LHIND-spezifische Fragen einbeziehen",
    includeCompanyHint: "Wenn aktiviert, werden zusätzlich Fragen zum LHIND-Portfolio (AI Services, ASE, verantwortungsvolle KI) gestellt. Standardmäßig deaktiviert.",
    progressTitle: "Deine Entwicklung",
    progressIntro: "Frühere Durchläufe unter diesem Avatar-Namen:",
    progressDelta: "Veränderung zum letzten Mal",
    viewProfile: "Profil ansehen",
    profileLookupTitle: "Eigenes Profil wieder aufrufen",
    viewLastResult: "Letztes Ergebnis auf diesem Gerät anzeigen",
    persistHint: "Hinweis: Ergebnisse werden anonym gespeichert. Geräteübergreifend (z. B. anderes Handy/PC) funktioniert das Wiederaufrufen nur bei verbundenem gemeinsamem Speicher und mit gesetztem Avatar-Namen. Auf diesem Gerät bleibt dein letztes Ergebnis auch ohne Avatar abrufbar.",
    profileTitle: "Profil",
    profileEmpty: "Noch keine Ergebnisse unter diesem Namen.",
    profileEmptyHint: "Mach den Test und gib zu Beginn genau diesen Avatar-Namen an — dann sammeln sich deine Ergebnisse hier und du siehst deine Entwicklung über die Zeit.",
    profileRuns: "Durchläufe",
    profileLatest: "Zuletzt",
    profileBest: "Bestwert",
    profileDelta: "Entwicklung",
    profileTrend: "Verlauf deiner Punktzahlen",
    profileAddRun: "Neuen Durchlauf hinzufügen",
  },
  en: {
    appTitle: "LHIND · AI Leadership Check",
    appSub: "ANONYMOUS · FOR LEADERS",
    forLeaders: "FOR LEADERS",
    question: "QUESTION",
    privacyBanner: "No personal data is stored. No names, no email, no IP. Only anonymous, aggregated metrics for your comparison.",
    introEyebrow: "Self-assessment · 20 questions · ~12 min",
    introH1: "How AI-fit is your leadership?",
    introP: "An anonymous check on AI fundamentals, business application and leadership in the AI era — plus a practical test. At the end: your score, a comparison with other leaders and with study data, and concrete next steps.",
    fairnessTitle: "⚠ FAIRNESS & RULES",
    fairnessText: "Each question has a countdown — the faster you answer correctly, the more bonus points. The test includes control questions and detects tab switches & pasting. Questions are drawn randomly from a large pool, so a retry gives you new questions. Answer honestly and without outside help.",
    participantsSoFar: "participants so far",
    avgScore: "avg score",
    start: "Start check →",
    step1: "Step 1 · Basics (anonymous)",
    onboardH2: "A few basics",
    onboardP: "No names, no email. Only for anonymous analysis, your comparison and personalizing your questions.",
    role: "Your role",
    timeLabel: "Time remaining",
    firstQBonus: "First question: +10 sec bonus time to get started 😊",
    rolePlaceholder: "Search or type a role…",
    roleFreeText: "Press Enter to use your own input",
    age: "Age group",
    area: "Business area",
    leadExp: "Leadership experience",
    teamSize: "Team size",
    self: "Self-assessment: professional AI usage",
    timeSaved: "How much time does AI currently save you per day?",
    savingPotential: "Where do you see saving / value potential? (tap in priority order)",
    savingRankHint: "Tap the activities in the order you see the greatest potential. Tap again to remove.",
    otherPlaceholder: "Please specify…",
    toTest: "To the test →",
    bauch: "No feedback shown — go with your gut.",
    anomalies: "anomaly",
    anomaliesPl: "anomalies",
    speedBonus: "SPEED BONUS",
    streak: "STREAK",
    yourResult: "Your result · stored anonymously",
    ofPoints: "OF 100 POINTS",
    seniority: "SENIORITY",
    cohortCompare: "Comparison with other leaders",
    betterThan: "You are better than",
    ofParticipants: "of the",
    participants: "participants so far",
    avgIs: "The average is",
    firstParticipant: "You're among the first participants — once more colleagues take part, your percentile comparison will appear here.",
    currentAvg: "Current avg",
    studyCompare: "Comparison with study data",
    competencyProfile: "Competency profile",
    integrityCheck: "INTEGRITY CHECK",
    tabSwitch: "Tab switches",
    paste: "Pastes",
    timeouts: "Timeouts",
    controlQ: "Control questions",
    yourPlacement: "Your assessment",
    nextSteps: "Recommended next steps",
    focus: "Focus",
    training: "Training",
    skills: "Practical skills",
    books: "Books",
    restart: "Restart (new questions)",
    savedNote: "Your result was stored anonymously for cohort analysis (score, seniority, role, area, age group, self-assessment). No names, no answers in plain text.",
    admin: "Admin",
    adminTitle: "Admin dashboard",
    adminSub: "Aggregated analysis of all runs",
    totalRuns: "Total runs",
    avgScoreAdmin: "Avg score",
    medianScore: "Median",
    avgIntegrity: "Clean integrity rate",
    byRole: "By role",
    byArea: "By area",
    byAge: "By age group",
    hardestQuestions: "Hardest questions (training needs)",
    hardestSub: "Questions with the lowest correct rate — candidates for targeted training",
    correctRate: "Correct rate",
    timesAsked: "times asked",
    resetAll: "Reset all data",
    resetConfirm: "Really delete ALL anonymous results? This cannot be undone.",
    backToStart: "← Back to start",
    noData: "No data yet.",
    enterPin: "Enter admin PIN",
    wrongPin: "Wrong PIN.",
    unlock: "Unlock",
    quizComplete: "Done!",
    seniorityScale: "Seniority scale",
    studyNote: "Benchmarks from NBER/St. Louis Fed Real-Time Population Survey (2024–25) and AI literacy research (Ng et al. 2021; Carolus et al. 2023).",
    methodologyTitle: "Methodology",
    methodology: "Questions are structured along Ng et al. (2021)'s AI literacy framework — Understand, Apply, Evaluate/Create, Ethics — and difficulty-calibrated using the revised Bloom's taxonomy (Anderson & Krathwohl, 2001). Each run draws items randomly and difficulty-balanced from a large pool.",
    points: "pts",
    pause: "Pause", resume: "Resume",
    pausedTitle: "Paused",
    pausedHint: "Question hidden. The timer is frozen — nobody can read along or copy.",
    answered: "answered", remaining: "left",
    trainingPromptTitle: "Your personal training-plan prompt",
    trainingPromptHint: "Copy this prompt into your preferred AI (Claude, ChatGPT, Gemini …). Based on your results it will build a current, individual training plan — without any data being stored here.",
    copyPrompt: "Copy prompt",
    copied: "Copied ✓",
    resourcesTitle: "Certificates, videos & sources",
    reviewTitle: "All questions in review",
    reviewHint: "Your answer, the correct answer and a short explanation — to learn from.",
    reviewShow: "Show question review",
    reviewHide: "Hide review",
    yourAnswer: "Your answer",
    correctAnswer: "Correct",
    noAnswer: "(no answer)",
    explanation: "Explanation",
    avatarLabel: "Avatar name (optional)",
    avatarHint: "Pick a made-up name if you'd like to revisit your progress later. Enter the same name next time and the report will show your development. Voluntary — leaving it blank is perfectly fine and stays anonymous.",
    avatarPlaceholder: "e.g. Falcon-7, Captain Nova …",
    excludeLeadLabel: "Exclude leadership-specific questions",
    excludeLeadHint: "If enabled, people-leadership questions won't be asked in this run. Useful for expert or project roles without line-management duties.",
    includeCompanyLabel: "Include LHIND-specific questions",
    includeCompanyHint: "If enabled, questions on the LHIND portfolio (AI services, ASE, responsible AI) are added. Disabled by default.",
    progressTitle: "Your development",
    progressIntro: "Earlier runs under this avatar name:",
    progressDelta: "Change since last time",
    viewProfile: "View profile",
    profileLookupTitle: "Revisit your own profile",
    viewLastResult: "Show last result on this device",
    persistHint: "Note: results are stored anonymously. Cross-device retrieval (e.g. another phone/PC) only works with shared storage connected and an avatar name set. On this device your last result stays available even without an avatar.",
    profileTitle: "Profile",
    profileEmpty: "No results under this name yet.",
    profileEmptyHint: "Take the test and enter exactly this avatar name at the start — your results will collect here and you'll see your development over time.",
    profileRuns: "Runs",
    profileLatest: "Latest",
    profileBest: "Best",
    profileDelta: "Development",
    profileTrend: "Your score history",
    profileAddRun: "Add a new run",
  },
};
// POOL, I and drawItems are imported from ./questions (see top of file).

// ---- dimension display labels ----
const DIMS = {
  understand: { de: "Verstehen", en: "Understand", color: C.cyan },
  apply: { de: "Anwenden", en: "Apply", color: C.amber },
  evaluate: { de: "Bewerten", en: "Evaluate", color: C.gold },
  ethics: { de: "Ethik", en: "Ethics", color: C.violet },
  lead: { de: "Führung", en: "Leadership", color: C.green },
  practice: { de: "Praxis", en: "Practice", color: C.red },
  company: { de: "Firmenwissen", en: "Company Knowledge", color: C.gold },
};

// ---- onboarding option sets (value keys are stable; labels via lang) ----
const OPTS = {
  role: {
    de: ["Team Lead", "Abteilungsleitung", "Bereichsleitung", "Geschäftsführung / C-Level", "Projektleitung", "Sonstige"],
    en: ["Team Lead", "Department Head", "Division Head", "Managing Director / C-Level", "Project Lead", "Other"],
  },
  age: { de: ["unter 30", "30–39", "40–49", "50–59", "60+"], en: ["under 30", "30–39", "40–49", "50–59", "60+"] },
  area: {
    de: ["IT / Engineering", "Consulting", "Sales / Account", "Pricing / Commerce", "Operations", "HR / People", "Finance", "Marketing", "Produkt / Strategie", "Sonstige"],
    en: ["IT / Engineering", "Consulting", "Sales / Account", "Pricing / Commerce", "Operations", "HR / People", "Finance", "Marketing", "Product / Strategy", "Other"],
  },
  leadExp: { de: ["< 2 Jahre", "2–5 Jahre", "6–10 Jahre", "> 10 Jahre"], en: ["< 2 years", "2–5 years", "6–10 years", "> 10 years"] },
  teamSize: { de: ["1–5", "6–15", "16–25", "26–50", "> 50"], en: ["1–5", "6–15", "16–25", "26–50", "> 50"] },
  self: {
    de: ["Anfänger", "Gelegentlich", "Routiniert", "Fortgeschritten", "Experte"],
    en: ["Beginner", "Occasional", "Routine", "Advanced", "Expert"],
  },
  timeSaved: {
    de: ["< 15 Min", "15–30 Min", "30–60 Min", "1–2 Std", "> 2 Std"],
    en: ["< 15 min", "15–30 min", "30–60 min", "1–2 hrs", "> 2 hrs"],
  },
  savingPotential: {
    de: ["Recherche & Analyse", "Texte & Kommunikation", "Reporting & Datenarbeit", "Meetings & Doku", "Entscheidungsvorbereitung", "Sonstiges"],
    en: ["Research & analysis", "Writing & communication", "Reporting & data work", "Meetings & docs", "Decision prep", "Other"],
  },
};
const FIELDS = ["age", "area", "leadExp", "teamSize", "self", "timeSaved"];

// ---- study benchmarks (NBER/St. Louis Fed RPS 2024-25; management occ.) ----
// genAI work-adoption share by age band; management ~49%. Used for context only.
const STUDY = {
  adoptionByAge: { "unter 30": 34, "under 30": 34, "30–39": 34, "40–49": 26, "50–59": 17, "60+": 17 },
  mgmtAdoption: 49, // % of management occupations using genAI at work
  avgTimeSavedPct: 2.3, // % of work hours saved (management/computer occ ~2.1-2.5)
};

// ---- scientific references (verified canonical links) ----
const REFERENCES = [
  {
    cite: "Ng, Leung, Chu & Qiao (2021)",
    what: { de: "AI-Literacy-Framework: Verstehen · Anwenden · Bewerten/Erstellen · Ethik", en: "AI literacy framework: Understand · Apply · Evaluate/Create · Ethics" },
    where: "Computers and Education: Artificial Intelligence",
    url: "https://doi.org/10.1016/j.caeai.2021.100041",
  },
  {
    cite: "Carolus, Koch, Straka, Latoschik & Wienrich (2023)",
    what: { de: "MAILS — Meta-AI-Literacy-Skala; Dimensionen inkl. 'Detect AI' & Ethik", en: "MAILS — Meta AI Literacy Scale; dimensions incl. 'Detect AI' & ethics" },
    where: "Computers in Human Behavior: Artificial Humans",
    url: "https://doi.org/10.1016/j.chbah.2023.100014",
  },
  {
    cite: "Anderson & Krathwohl (2001)",
    what: { de: "Revidierte Bloom-Taxonomie (Erinnern · Verstehen · Anwenden · Analysieren · Bewerten · Erschaffen) — aktuelle Grundlage der Schwierigkeitskalibrierung", en: "Revised Bloom's taxonomy (Remember · Understand · Apply · Analyze · Evaluate · Create) — current basis for difficulty calibration" },
    where: "A Taxonomy for Learning, Teaching, and Assessing (Longman); Überblick: Krathwohl (2002), Theory Into Practice 41(4)",
    url: "https://doi.org/10.1207/s15430421tip4104_2",
  },
  {
    cite: "Bick, Blandin & Deming (2024)",
    what: { de: "KI-Nutzungs-Benchmarks (Real-Time Population Survey, NBER/St. Louis Fed)", en: "AI adoption benchmarks (Real-Time Population Survey, NBER/St. Louis Fed)" },
    where: "NBER Working Paper No. 32966",
    url: "https://www.nber.org/papers/w32966",
  },
];

const ADMIN_PIN = "2024"; // simple gate; change as needed

// ---- Branding (change here to reuse the app in any context) ----
// Set the organisation/prefix shown in the header and titles. Set to "" to hide.
const BRAND = "LHIND";
const APP_NAME = "AI Leadership Check";
const brandTitle = BRAND ? `${BRAND} · ${APP_NAME}` : APP_NAME;


// ---- storage ----
async function loadCohort() {
  try { const r = await storage.get("cohort:v2", true); return r ? JSON.parse(r.value) : []; }
  catch { return []; }
}
async function loadItemStats() {
  try { const r = await storage.get("itemstats:v2", true); return r ? JSON.parse(r.value) : {}; }
  catch { return {}; }
}
// All runs stored under a given avatar name (case-insensitive), oldest first.
async function loadAvatarHistory(avatarKey) {
  if (!avatarKey) return [];
  try {
    const all = await loadCohort();
    return all.filter((e) => e.avatarKey === avatarKey).sort((a, b) => a.ts - b.ts);
  } catch { return []; }
}
// Always keep the most recent full report locally, so a person can re-open
// their last result after reloading even without an avatar name or Supabase.
// Uses localStorage directly (device-local by design) and is independent of
// the cohort backend.
function saveLastResult(report, profile) {
  try {
    const slim = {
      ts: Date.now(), report, profile,
    };
    localStorage.setItem("lastResult:v1", JSON.stringify(slim));
  } catch {}
}
function loadLastResult() {
  try {
    const raw = localStorage.getItem("lastResult:v1");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
// Diagnostic: tells the admin which backend is active and whether reads work.
async function storageDiagnose() {
  const shared = !!storage.isShared;
  let ok = false, error = null, count = 0;
  try {
    const r = await storage.get("cohort:v2", true);
    ok = true;
    if (r) { try { count = JSON.parse(r.value).length; } catch { count = 0; } }
  } catch (e) { error = (e && e.message) ? e.message : String(e); }
  return { shared, ok, error, count };
}
async function persist(entry, itemResults) {
  let arr = [];
  try { const r = await storage.get("cohort:v2", true); if (r) arr = JSON.parse(r.value); } catch {}
  arr.push(entry);
  if (arr.length > 1000) arr = arr.slice(-1000);
  try { await storage.set("cohort:v2", JSON.stringify(arr), true); } catch {}

  let stats = {};
  try { const r = await storage.get("itemstats:v2", true); if (r) stats = JSON.parse(r.value); } catch {}
  itemResults.forEach(({ key, q, correct }) => {
    if (!stats[key]) stats[key] = { q, asked: 0, correct: 0 };
    stats[key].asked += 1;
    if (correct) stats[key].correct += 1;
  });
  try { await storage.set("itemstats:v2", JSON.stringify(stats), true); } catch {}
  return arr;
}
async function resetAll() {
  try { await storage.set("cohort:v2", JSON.stringify([]), true); } catch {}
  try { await storage.set("itemstats:v2", JSON.stringify({}), true); } catch {}
}

const NQ = 20; // questions per run

// ---- small atoms ----
const Eyebrow = ({ children, color = C.amber }) => (
  <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color }}>{children}</div>
);
function Bar({ value, max = 100, color, height = 10 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ background: C.line, borderRadius: 2, height, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, transition: "width .9s cubic-bezier(.2,.8,.2,1)" }} />
    </div>
  );
}
const L = (obj, lang) => (obj && typeof obj === "object" ? obj[lang] : obj);

// ============================================================
export default function App() {
  const [lang, setLang] = useState("de");
  const t = STR[lang];
  const [phase, setPhase] = useState("intro"); // intro|onboard|test|done|admin|profile
  const [profileName, setProfileName] = useState("");
  const [profile, setProfile] = useState({});
  const [cohort, setCohort] = useState([]);
  const [report, setReport] = useState(null);

  // test state
  const [items, setItems] = useState([]);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [picked, setPicked] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastGain, setLastGain] = useState(null);
  const [revealed, setRevealed] = useState(null); // feedback after answering
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false); pausedRef.current = paused;
  const pauseAccum = useRef(0); // ms spent paused on current question
  const pauseStart = useRef(0);
  const qStart = useRef(0);
  const answersRef = useRef([]); answersRef.current = answers;
  const [flags, setFlags] = useState({ blur: 0, paste: 0, longPause: 0, timeouts: 0 });
  const flagsRef = useRef(flags); flagsRef.current = flags;

  useEffect(() => { loadCohort().then(setCohort); }, []);

  const TIME_PER_Q = 25;

  function beginTest() {
    const excludeDims = [];
    if (profile.excludeLead) excludeDims.push("lead");
    // Company-specific (LHIND) questions are OPT-IN: excluded unless the
    // person actively enables them.
    if (!profile.includeCompany) excludeDims.push("company");
    const drawn = drawItems(POOL, NQ, profile.area, Date.now() % 2147483647, excludeDims)
      .map((it) => ({ ...it, key: hashItem(it) }));
    setItems(drawn);
    setQi(0); setAnswers([]); setPoints(0); setStreak(0); setLastGain(null);
    setFlags({ blur: 0, paste: 0, longPause: 0, timeouts: 0 });
    setPhase("test");
  }

  // timer (respects pause + feedback reveal)
  const revealedRef = useRef(null); revealedRef.current = revealed;
  useEffect(() => {
    if (phase !== "test" || !items.length) return;
    setPicked(null); setRevealed(null); setTimeLeft(TIME_PER_Q + (qi === 0 ? 10 : 0)); qStart.current = Date.now();
    pauseAccum.current = 0; setPaused(false);
    const tm = setInterval(() => {
      if (pausedRef.current || revealedRef.current) return; // frozen while paused or showing feedback
      setTimeLeft((s) => { if (s <= 1) { clearInterval(tm); if (!revealedRef.current) handleAnswer(null, true); return 0; } return s - 1; });
    }, 1000);
    return () => clearInterval(tm);
    // eslint-disable-next-line
  }, [qi, phase, items]);

  function togglePause() {
    setPaused((p) => {
      const next = !p;
      if (next) { pauseStart.current = Date.now(); }
      else { pauseAccum.current += Date.now() - pauseStart.current; }
      return next;
    });
  }

  // anti-cheat
  useEffect(() => {
    if (phase !== "test") return;
    const onBlur = () => setFlags((f) => ({ ...f, blur: f.blur + 1 }));
    const onVis = () => { if (document.hidden) onBlur(); };
    const onPaste = () => setFlags((f) => ({ ...f, paste: f.paste + 1 }));
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVis);
    document.addEventListener("paste", onPaste);
    return () => { window.removeEventListener("blur", onBlur); document.removeEventListener("visibilitychange", onVis); document.removeEventListener("paste", onPaste); };
  }, [phase]);

  const handleAnswer = useCallback((choiceIdx, timedOut = false) => {
    const cur = items[qi];
    if (!cur) return;
    const dur = (Date.now() - qStart.current) - pauseAccum.current;
    const isCorrect = choiceIdx === cur.correct;

    // gamified scoring: base 100 + speed bonus (up to 100) ; streak multiplier
    let gain = 0;
    if (isCorrect) {
      const speedFrac = Math.max(0, (TIME_PER_Q * 1000 - dur) / (TIME_PER_Q * 1000));
      const speedBonus = Math.round(speedFrac * 100);
      const newStreak = streak + 1;
      const mult = 1 + Math.min(newStreak - 1, 5) * 0.1; // up to 1.5x
      gain = Math.round((100 + speedBonus) * mult);
      setStreak(newStreak);
    } else {
      setStreak(0);
    }
    setPoints((p) => p + gain);
    setLastGain({ gain, correct: isCorrect, key: qi });

    // Full record — carries everything the end-of-test review needs.
    const rec = {
      dim: cur.dim, diff: cur.diff, correct: isCorrect, isTrap: !!cur.trap,
      timedOut, durationMs: dur, key: cur.key,
      q: cur.q, options: cur.a, correctIdx: cur.correct, pickedIdx: choiceIdx,
      expl: cur.expl,
    };
    setAnswers((prev) => [...prev, rec]);
    if (timedOut) setFlags((f) => ({ ...f, timeouts: f.timeouts + 1 }));
    if (cur.trap && dur > TIME_PER_Q * 1000 * 0.8 && isCorrect) setFlags((f) => ({ ...f, longPause: f.longPause + 1 }));

    // Show feedback and STOP. Advancing happens on the user's "Weiter" click.
    setRevealed({ pickedIdx: choiceIdx, correctIdx: cur.correct, isCorrect, timedOut, expl: cur.expl });
    // eslint-disable-next-line
  }, [qi, items, streak]);

  function advance() {
    const all = answersRef.current;
    setRevealed(null);
    if (qi + 1 >= items.length) finish(all);
    else setQi((i) => i + 1);
  }

  async function finish(all) {
    const r = computeReport(all, flagsRef.current, profile, points);
    const avatar = (profile.avatar || "").trim();
    const avatarKey = avatar ? avatar.toLowerCase() : null;
    const entry = {
      ts: Date.now(), score: r.totalScore, points,
      seniority: r.seniority.key, role: profile.role, area: profile.area,
      age: profile.age, self: profile.self, integrity: r.integrity.key,
      dims: r.dimScores, avatar: avatar || undefined, avatarKey: avatarKey || undefined,
    };
    // Prior runs under the same avatar (computed from cohort BEFORE this run is added).
    if (avatarKey) {
      const priorAll = await loadCohort();
      const history = priorAll
        .filter((e) => e.avatarKey === avatarKey)
        .sort((a, b) => a.ts - b.ts);
      r.avatar = avatar;
      r.history = history; // earlier runs, oldest first (excludes the current one)
    }
    // For admin "hardest questions": store a stable text label (German) per item.
    const itemResults = all.map((a) => ({ key: a.key, q: (a.q && a.q.de) ? a.q.de : String(a.q), correct: a.correct }));
    const updated = await persist(entry, itemResults);
    setCohort(updated); r.cohort = updated; r.points = points;
    r.answers = all; // full per-question records for the end-of-test review
    saveLastResult(r, profile); // device-local snapshot for "view my last result"
    setReport(r); setPhase("done");
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *{box-sizing:border-box;} button{font-family:inherit;cursor:pointer;}
        @keyframes scan{0%{transform:translateY(-100%)}100%{transform:translateY(2400%)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes pop{0%{transform:scale(.6);opacity:0}50%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:1}}
        @keyframes floatUp{0%{opacity:0;transform:translateY(6px)}20%{opacity:1}100%{opacity:0;transform:translateY(-26px)}}
        .fu{animation:fadeUp .4s ease both;} .pop{animation:pop .4s ease both;}
        input{font-family:inherit;}
        @media (prefers-reduced-motion:reduce){.fu,.pop{animation:none}}
      `}</style>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px" }}>
        <Header t={t} lang={lang} setLang={setLang} phase={phase} qi={qi} nq={items.length} setPhase={setPhase} />
        {phase === "intro" && <Intro t={t} lang={lang} cohort={cohort} onStart={() => setPhase("onboard")} onViewProfile={(name) => { setProfileName(name); setPhase("profile"); }} onViewLast={() => {
          const last = loadLastResult();
          if (last && last.report) { setReport(last.report); setPhase("done"); }
        }} hasLast={!!loadLastResult()} />}
        {phase === "onboard" && <Onboard t={t} lang={lang} profile={profile} setProfile={setProfile} onDone={beginTest} />}
        {phase === "test" && items.length > 0 && (
          <TestView t={t} lang={lang} cur={items[qi]} qi={qi} total={items.length} timeLeft={timeLeft} timeMax={TIME_PER_Q}
            picked={picked} points={points} streak={streak} lastGain={lastGain} flags={flags}
            answeredCount={answers.length} paused={paused} onTogglePause={togglePause}
            revealed={revealed} onAdvance={advance}
            onPick={(i) => { setPicked(i); handleAnswer(i); }} />
        )}
        {phase === "done" && report && <Report t={t} lang={lang} report={report} profile={profile} onViewProfile={(name) => { setProfileName(name); setPhase("profile"); }} />}
        {phase === "admin" && <Admin t={t} lang={lang} onBack={() => setPhase("intro")} />}
        {phase === "profile" && <ProfileView t={t} lang={lang} name={profileName} onBack={() => setPhase("intro")} onStart={() => setPhase("onboard")} />}
        <VersionFooter lang={lang} />
      </div>
    </div>
  );
}

// ---------- Scientific references block (reusable) ----------
// Curated, well-known media recommendations for staying current on AI.
// Grouped by channel type, each with a short bilingual description.
// Deliberately a fixed, vetted list of widely recognized names.
const MEDIA_RECS = [
  {
    group: { de: "Newsletter", en: "Newsletters" },
    icon: "✉",
    items: [
      { name: "One Useful Thing — Ethan Mollick", url: "https://www.oneusefulthing.org/", desc: { de: "Wharton-Professor; pragmatische, fundierte Einordnung von KI für Arbeit und Führung.", en: "Wharton professor; pragmatic, well-grounded takes on AI for work and leadership." } },
      { name: "The Batch — DeepLearning.AI (Andrew Ng)", url: "https://www.deeplearning.ai/the-batch/", desc: { de: "Wöchentliche, seriöse Zusammenfassung wichtiger KI-Entwicklungen.", en: "Weekly, reputable digest of the most important AI developments." } },
      { name: "Import AI — Jack Clark", url: "https://importai.substack.com/", desc: { de: "Tiefer, technisch-politischer Blick auf Forschung und KI-Governance.", en: "In-depth, technical-and-policy view on research and AI governance." } },
      { name: "TLDR AI", url: "https://tldr.tech/ai", desc: { de: "Sehr kompakte tägliche News für den schnellen Überblick.", en: "Very compact daily news for a quick overview." } },
    ],
  },
  {
    group: { de: "YouTube & Video", en: "YouTube & video" },
    icon: "▶",
    items: [
      { name: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown", desc: { de: "Visuell herausragende Erklärungen zu neuronalen Netzen und Mathematik dahinter.", en: "Visually outstanding explanations of neural networks and the maths behind them." } },
      { name: "Andrej Karpathy", url: "https://www.youtube.com/@AndrejKarpathy", desc: { de: "Mitgründer-Niveau: baut LLMs from scratch nach, exzellent für tiefes Verständnis.", en: "Builds LLMs from scratch; excellent for genuinely deep understanding." } },
      { name: "Two Minute Papers", url: "https://www.youtube.com/@TwoMinutePapers", desc: { de: "Kurze, zugängliche Vorstellung aktueller KI-Forschungsergebnisse.", en: "Short, accessible walkthroughs of recent AI research results." } },
    ],
  },
  {
    group: { de: "LinkedIn & X (Stimmen)", en: "LinkedIn & X (voices)" },
    icon: "✦",
    items: [
      { name: "Andrew Ng", url: "https://www.linkedin.com/in/andrewyng/", desc: { de: "Einer der einflussreichsten KI-Lehrer weltweit; nüchtern und praxisnah.", en: "One of the world's most influential AI educators; sober and practical." } },
      { name: "Ethan Mollick", url: "https://www.linkedin.com/in/emollick/", desc: { de: "Konkrete Experimente und Implikationen von KI für Wissensarbeit.", en: "Concrete experiments and implications of AI for knowledge work." } },
      { name: "Allie K. Miller", url: "https://www.linkedin.com/in/alliekmiller/", desc: { de: "Sehr zugängliche, anwendungsnahe Einordnung für Business-Anwender.", en: "Very accessible, application-oriented framing for business users." } },
    ],
  },
  {
    group: { de: "Podcasts", en: "Podcasts" },
    icon: "🎧",
    items: [
      { name: "Latent Space", url: "https://www.latent.space/", desc: { de: "Technisch fundiert, für alle, die KI ernsthaft anwenden und bauen.", en: "Technically solid; for people who seriously apply and build AI." } },
      { name: "Hard Fork (NYT)", url: "https://www.nytimes.com/column/hard-fork", desc: { de: "Wöchentliche Tech-Einordnung, gut verständlich und einordnend.", en: "Weekly tech discussion, approachable and good at context." } },
    ],
  },
];

function MediaRecs({ lang, compact }) {
  const [open, setOpen] = useState(!compact);
  return (
    <div style={{ background: C.panelHi, border: `1px solid ${C.line}`, borderRadius: 10, padding: compact ? "14px 16px" : "16px 18px", margin: compact ? "0 0 22px" : "22px 0" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ background: "transparent", border: "none", color: C.violet, fontFamily: mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "space-between", padding: 0 }}>
        <span>{lang === "de" ? "Am Ball bleiben: Newsletter, Kanäle & Stimmen" : "Stay current: newsletters, channels & voices"}</span>
        <span style={{ opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ marginTop: 14, display: "grid", gap: 18 }}>
          <div style={{ color: C.inkDim, fontSize: 12, lineHeight: 1.5 }}>
            {lang === "de"
              ? "Eine kuratierte Auswahl bekannter, seriöser Quellen, um nach dem Check dranzubleiben — kein vollständiges Ranking, keine Werbung."
              : "A curated selection of well-known, reputable sources to keep going after the check — not an exhaustive ranking, not advertising."}
          </div>
          {MEDIA_RECS.map((grp, gi) => (
            <div key={gi}>
              <div style={{ fontFamily: mono, fontSize: 11, color: C.violet, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 9, display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ opacity: 0.9 }}>{grp.icon}</span> {grp.group[lang]}
              </div>
              <div style={{ display: "grid", gap: 9 }}>
                {grp.items.map((it, ii) => (
                  <div key={ii} style={{ fontSize: 13, lineHeight: 1.5 }}>
                    <a href={it.url} target="_blank" rel="noopener noreferrer" style={{ color: C.cyan, fontWeight: 600, textDecoration: "none" }}>{it.name} ↗</a>
                    <span style={{ color: C.inkDim, display: "block", fontSize: 12, marginTop: 1 }}>{it.desc[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function References({ lang, compact }) {
  const [open, setOpen] = useState(!compact);
  return (
    <div style={{ background: C.panelHi, border: `1px solid ${C.line}`, borderRadius: 10, padding: compact ? "14px 16px" : "16px 18px", margin: compact ? "0 0 22px" : "22px 0" }}>
      <button onClick={() => setOpen((o) => !o)} style={{ background: "transparent", border: "none", color: C.cyan, fontFamily: mono, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "space-between", padding: 0 }}>
        <span>{lang === "de" ? "Wissenschaftliche Grundlagen & Quellen" : "Scientific basis & sources"}</span>
        <span style={{ opacity: 0.7 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ marginTop: 12, display: "grid", gap: 11 }}>
          {REFERENCES.map((r, i) => (
            <div key={i} style={{ fontSize: 13, lineHeight: 1.5 }}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: C.cyan, fontWeight: 600, textDecoration: "none" }}>
                {r.cite} ↗
              </a>
              <span style={{ color: C.ink }}> — {r.what[lang]}</span>
              <span style={{ color: C.inkDim, display: "block", fontSize: 11.5, fontFamily: mono, marginTop: 2 }}>{r.where}</span>
            </div>
          ))}
          <div style={{ color: C.inkDim, fontSize: 11.5, lineHeight: 1.5, marginTop: 2 }}>
            {lang === "de"
              ? "Die Benchmark-Zahlen sind gerundete Orientierungswerte aus US-Erhebungen und dienen dem groben Vergleich, nicht als exakte Messlatte."
              : "The benchmark figures are rounded reference values from US surveys, intended for rough comparison, not as an exact yardstick."}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Version footer + release-notes modal ----------
function VersionFooter({ lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${C.line}`, marginTop: 48, padding: "18px 0 40px", display: "flex", justifyContent: "center" }}>
      <button onClick={() => setOpen(true)} title={lang === "de" ? "Release-Notes anzeigen" : "Show release notes"} style={{
        background: "transparent", border: `1px solid ${C.line}`, color: C.inkDim, borderRadius: 20,
        padding: "5px 13px", fontFamily: mono, fontSize: 11, letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 7,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
        v{VERSION}
        <span style={{ opacity: 0.6 }}>· {lang === "de" ? "Was ist neu?" : "What's new?"}</span>
      </button>
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(5,11,18,0.78)", display: "grid", placeItems: "center", zIndex: 50, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} className="fu" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: "24px 26px", maxWidth: 560, width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <Eyebrow color={C.green}>{lang === "de" ? "Release-Notes" : "Release notes"}</Eyebrow>
              <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", color: C.inkDim, fontSize: 22, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: "grid", gap: 22 }}>
              {RELEASES.map((r) => (
                <div key={r.version}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 15, color: r.version === VERSION ? C.green : C.ink }}>v{r.version}</span>
                    {r.version === VERSION && <span style={{ fontFamily: mono, fontSize: 9.5, color: C.bg, background: C.green, borderRadius: 4, padding: "1px 6px", letterSpacing: "0.05em" }}>{lang === "de" ? "AKTUELL" : "CURRENT"}</span>}
                    <span style={{ fontFamily: mono, fontSize: 11, color: C.inkDim, marginLeft: "auto" }}>{r.date}</span>
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 8 }}>{r.title[lang]}</div>
                  <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 5 }}>
                    {r.notes[lang].map((n, i) => (
                      <li key={i} style={{ fontSize: 13.5, color: C.inkDim, lineHeight: 1.5 }}>{n}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function hashItem(it) {
  const s = L(it.q, "de");
  let h = 0; for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return "q" + Math.abs(h);
}

// ---------- Header ----------
function Header({ t, lang, setLang, phase, qi, nq, setPhase }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0 18px", borderBottom: `1px solid ${C.line}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 6, background: C.amber, display: "grid", placeItems: "center", color: C.bg, fontWeight: 800, fontFamily: mono }}>AI</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{brandTitle}</div>
          <div style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, letterSpacing: "0.15em" }}>{t.appSub}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {phase === "test" && <span style={{ fontFamily: mono, fontSize: 11, color: C.inkDim }}>{t.question} {qi + 1}/{nq}</span>}
        {(phase === "intro") && (
          <button onClick={() => setPhase("admin")} style={{ background: "transparent", border: `1px solid ${C.line}`, color: C.inkDim, borderRadius: 7, padding: "5px 10px", fontSize: 11, fontFamily: mono }}>{t.admin}</button>
        )}
        <div style={{ display: "flex", border: `1px solid ${C.line}`, borderRadius: 7, overflow: "hidden" }}>
          {["de", "en"].map((lg) => (
            <button key={lg} onClick={() => setLang(lg)} style={{
              background: lang === lg ? C.panelHi : "transparent", color: lang === lg ? C.ink : C.inkDim,
              border: "none", padding: "5px 10px", fontSize: 11, fontFamily: mono, fontWeight: 700,
            }}>{lg.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Intro ----------
function Intro({ t, lang, cohort, onStart, onViewProfile, onViewLast, hasLast }) {
  const avg = cohort.length ? Math.round(cohort.reduce((s, r) => s + r.score, 0) / cohort.length) : null;
  const [lookupName, setLookupName] = useState("");
  return (
    <div className="fu" style={{ padding: "30px 0 44px" }}>
      <div style={{ background: C.panelHi, border: `1px solid ${C.green}`, borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", marginBottom: 30 }}>
        <span style={{ color: C.green, fontFamily: mono, fontSize: 14 }}>🔒</span>
        <span style={{ color: C.inkDim, fontSize: 13, lineHeight: 1.5 }}>{t.privacyBanner}</span>
      </div>
      <Eyebrow>{t.introEyebrow}</Eyebrow>
      <h1 style={{ fontSize: 38, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.02em", margin: "16px 0 14px", maxWidth: 620 }}>{t.introH1}</h1>
      <p style={{ color: C.inkDim, fontSize: 16, lineHeight: 1.6, maxWidth: 580, margin: 0 }}>{t.introP}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, margin: "30px 0" }}>
        {Object.entries(DIMS).map(([k, d]) => (
          <div key={k} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, marginBottom: 10 }} />
            <div style={{ fontWeight: 600, fontSize: 14 }}>{d[lang]}</div>
          </div>
        ))}
      </div>

      <div style={{ background: C.panelHi, border: `1px solid ${C.line}`, borderRadius: 10, padding: "16px 18px", marginBottom: 24 }}>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.amber, marginBottom: 8 }}>{t.fairnessTitle}</div>
        <div style={{ color: C.inkDim, fontSize: 13, lineHeight: 1.55 }}>{t.fairnessText}</div>
      </div>

      <div style={{ fontFamily: mono, fontSize: 11, color: C.inkDim, marginBottom: 22, lineHeight: 1.6 }}>
        {avg !== null && `${cohort.length} ${t.participantsSoFar} · ${t.avgScore} ${avg}/100 · `}{t.methodology}
      </div>
      <References lang={lang} compact />
      <button onClick={onStart} style={btnPrimary}>{t.start}</button>

      {/* Profile lookup — revisit earlier results under an avatar name */}
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.line}` }}>
        <div style={{ fontFamily: mono, fontSize: 11, color: C.inkDim, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{t.profileLookupTitle}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input value={lookupName} maxLength={40} placeholder={t.avatarPlaceholder}
            onChange={(e) => setLookupName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && lookupName.trim()) onViewProfile(lookupName.trim()); }}
            style={{ flex: "1 1 200px", background: C.panel, border: `1px solid ${C.line}`, color: C.ink, borderRadius: 8, padding: "10px 12px", fontSize: 14, fontFamily: mono }} />
          <button disabled={!lookupName.trim()} onClick={() => onViewProfile(lookupName.trim())}
            style={{ ...btnSecondary, opacity: lookupName.trim() ? 1 : 0.4, cursor: lookupName.trim() ? "pointer" : "not-allowed" }}>{t.viewProfile}</button>
        </div>
        {hasLast && (
          <button onClick={onViewLast} style={{ ...btnSecondary, marginTop: 10 }}>{t.viewLastResult}</button>
        )}
        <div style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, marginTop: 10, lineHeight: 1.5 }}>{t.persistHint}</div>
      </div>
    </div>
  );
}

// ---------- Onboarding ----------
// Tap-to-rank picker: stores an ordered list, avoiding the suggestive
// "pick the single highest" framing. Tapping adds with a rank badge; tapping
// again removes and renumbers.
function RankPicker({ options, value, onChange, t }) {
  const ranked = Array.isArray(value) ? value : [];
  const toggle = (o) => {
    if (ranked.includes(o)) onChange(ranked.filter((x) => x !== o));
    else onChange([...ranked, o]);
  };
  return (
    <div>
      <div style={{ color: C.inkDim, fontSize: 12.5, marginBottom: 9, lineHeight: 1.5 }}>{t.savingRankHint}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((o) => {
          const rank = ranked.indexOf(o);
          const on = rank >= 0;
          return (
            <button key={o} onClick={() => toggle(o)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 14px", borderRadius: 8, fontSize: 13.5, fontWeight: 500,
              border: `1px solid ${on ? C.cyan : C.line}`,
              background: on ? "rgba(54,201,217,0.12)" : C.panel, color: on ? C.ink : C.inkDim,
            }}>
              {on && (
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", background: C.cyan, color: C.bg, fontSize: 11, fontWeight: 800, fontFamily: mono }}>{rank + 1}</span>
              )}
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Searchable role picker: type to filter all LHIND roles; free text allowed.
function RoleSearch({ t, lang, value, onChange }) {
  const [q, setQ] = useState(value || "");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const ql = q.trim().toLowerCase();
  const matches = ql
    ? LHIND_ROLES.filter((r) => r.name.toLowerCase().includes(ql)).slice(0, 8)
    : LHIND_ROLES.slice(0, 8);
  const exact = LHIND_ROLES.some((r) => r.name.toLowerCase() === ql);
  return (
    <div ref={boxRef} style={{ position: "relative" }}>
      <input
        value={q}
        placeholder={t.rolePlaceholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQ(e.target.value); onChange(e.target.value); setOpen(true); }}
        style={{ width: "100%", maxWidth: 420, background: C.panel, border: `1px solid ${value ? C.cyan : C.line}`, color: C.ink, borderRadius: 8, padding: "10px 12px", fontSize: 14 }}
      />
      {open && (
        <div style={{ position: "absolute", zIndex: 20, marginTop: 4, width: "100%", maxWidth: 420, maxHeight: 260, overflowY: "auto", background: C.panelHi, border: `1px solid ${C.line}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
          {matches.map((r) => (
            <button key={r.name} onMouseDown={() => { setQ(r.name); onChange(r.name); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 12px", fontSize: 13.5, color: C.ink, background: "transparent", border: "none", borderBottom: `1px solid ${C.line}`, cursor: "pointer" }}>
              {r.name}
            </button>
          ))}
          {ql && !exact && (
            <div style={{ padding: "9px 12px", fontSize: 12.5, color: C.inkDim, fontStyle: "italic" }}>{t.roleFreeText}</div>
          )}
          {!matches.length && !ql && (
            <div style={{ padding: "9px 12px", fontSize: 12.5, color: C.inkDim }}>—</div>
          )}
        </div>
      )}
    </div>
  );
}

function Onboard({ t, lang, profile, setProfile, onDone }) {
  const labels = { role: t.role, age: t.age, area: t.area, leadExp: t.leadExp, teamSize: t.teamSize, self: t.self, timeSaved: t.timeSaved, savingPotential: t.savingPotential };
  const otherKey = (lang === "de" ? "Sonstige" : "Other");
  const otherKey2 = (lang === "de" ? "Sonstiges" : "Other");
  const complete = !!profile.role && (Array.isArray(profile.savingPotential) && profile.savingPotential.length > 0) && FIELDS.every((f) => {
    const v = profile[f];
    if (!v) return false;
    if ((v === otherKey || v === otherKey2) && !profile[`${f}_other`]) return false;
    return true;
  });
  return (
    <div className="fu" style={{ padding: "30px 0" }}>
      <Eyebrow color={C.cyan}>{t.step1}</Eyebrow>
      <h2 style={{ fontSize: 26, fontWeight: 800, margin: "12px 0 6px" }}>{t.onboardH2}</h2>
      <p style={{ color: C.inkDim, fontSize: 14, margin: "0 0 26px" }}>{t.onboardP}</p>

      {/* Optional avatar name — lets a person revisit their own progress, fully voluntary */}
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px", marginBottom: 24 }}>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cyan, letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>{t.avatarLabel}</div>
        <div style={{ color: C.inkDim, fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{t.avatarHint}</div>
        <input placeholder={t.avatarPlaceholder} value={profile.avatar || ""} maxLength={40}
          onChange={(e) => setProfile((p) => ({ ...p, avatar: e.target.value }))}
          style={{ width: "100%", maxWidth: 360, background: C.panelHi, border: `1px solid ${C.line}`, color: C.ink, borderRadius: 8, padding: "11px 13px", fontSize: 14, fontFamily: mono }} />
      </div>

      <div style={{ display: "grid", gap: 22 }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 11.5, color: C.inkDim, letterSpacing: "0.08em", marginBottom: 9, textTransform: "uppercase" }}>{t.role}</div>
          <RoleSearch t={t} lang={lang} value={profile.role || ""} onChange={(v) => setProfile((p) => ({ ...p, role: v }))} />
        </div>
        {FIELDS.map((f) => {
          const opts = OPTS[f][lang];
          const sel = profile[f];
          const isOther = sel === otherKey || sel === otherKey2;
          return (
            <div key={f}>
              <div style={{ fontFamily: mono, fontSize: 11.5, color: C.inkDim, letterSpacing: "0.08em", marginBottom: 9, textTransform: "uppercase" }}>{labels[f]}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {opts.map((o) => {
                  const on = sel === o;
                  return (
                    <button key={o} onClick={() => setProfile((p) => ({ ...p, [f]: o }))} style={{
                      padding: "9px 14px", borderRadius: 8, fontSize: 13.5, fontWeight: 500,
                      border: `1px solid ${on ? C.cyan : C.line}`,
                      background: on ? "rgba(54,201,217,0.12)" : C.panel, color: on ? C.ink : C.inkDim,
                    }}>{o}</button>
                  );
                })}
              </div>
              {isOther && (
                <input autoFocus placeholder={t.otherPlaceholder} value={profile[`${f}_other`] || ""}
                  onChange={(e) => setProfile((p) => ({ ...p, [`${f}_other`]: e.target.value }))}
                  style={{ marginTop: 10, width: "100%", maxWidth: 360, background: C.panel, border: `1px solid ${C.line}`, color: C.ink, borderRadius: 8, padding: "10px 12px", fontSize: 14 }} />
              )}
            </div>
          );
        })}

        {/* Saving-potential as a ranking (non-suggestive) */}
        <div>
          <div style={{ fontFamily: mono, fontSize: 11.5, color: C.inkDim, letterSpacing: "0.08em", marginBottom: 9, textTransform: "uppercase" }}>{t.savingPotential}</div>
          <RankPicker t={t} options={OPTS.savingPotential[lang]} value={profile.savingPotential} onChange={(v) => setProfile((p) => ({ ...p, savingPotential: v }))} />
          {Array.isArray(profile.savingPotential) && (profile.savingPotential.includes(otherKey) || profile.savingPotential.includes(otherKey2)) && (
            <input placeholder={t.otherPlaceholder} value={profile.savingPotential_other || ""}
              onChange={(e) => setProfile((p) => ({ ...p, savingPotential_other: e.target.value }))}
              style={{ marginTop: 10, width: "100%", maxWidth: 360, background: C.panel, border: `1px solid ${C.line}`, color: C.ink, borderRadius: 8, padding: "10px 12px", fontSize: 14 }} />
          )}
        </div>
      </div>

      {/* Optional: exclude leadership-specific questions */}
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 24, cursor: "pointer", background: C.panel, border: `1px solid ${profile.excludeLead ? C.amber : C.line}`, borderRadius: 12, padding: "14px 16px" }}>
        <input type="checkbox" checked={!!profile.excludeLead}
          onChange={(e) => setProfile((p) => ({ ...p, excludeLead: e.target.checked }))}
          style={{ marginTop: 3, width: 17, height: 17, accentColor: C.amber, cursor: "pointer" }} />
        <span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{t.excludeLeadLabel}</span>
          <span style={{ display: "block", color: C.inkDim, fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{t.excludeLeadHint}</span>
        </span>
      </label>

      {/* Optional opt-in: include LHIND company-specific questions (off by default) */}
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", marginTop: 12, cursor: "pointer", background: C.panel, border: `1px solid ${profile.includeCompany ? C.gold : C.line}`, borderRadius: 12, padding: "14px 16px" }}>
        <input type="checkbox" checked={!!profile.includeCompany}
          onChange={(e) => setProfile((p) => ({ ...p, includeCompany: e.target.checked }))}
          style={{ marginTop: 3, width: 17, height: 17, accentColor: C.gold, cursor: "pointer" }} />
        <span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{t.includeCompanyLabel}</span>
          <span style={{ display: "block", color: C.inkDim, fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{t.includeCompanyHint}</span>
        </span>
      </label>

      <button disabled={!complete} onClick={onDone} style={{ ...btnPrimary, marginTop: 24, opacity: complete ? 1 : 0.4, cursor: complete ? "pointer" : "not-allowed" }}>{t.toTest}</button>
    </div>
  );
}

// ---------- Test ----------
function TestView({ t, lang, cur, qi, total, timeLeft, timeMax, picked, points, streak, lastGain, flags, answeredCount, paused, onTogglePause, revealed, onAdvance, onPick }) {
  const urgent = timeLeft <= 7 && !paused && !revealed;
  const pct = Math.round((answeredCount / total) * 100);
  const flagCount = flags.blur + flags.paste;
  const dim = DIMS[cur.dim];
  return (
    <div style={{ padding: "22px 0" }}>
      {/* HUD */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ fontFamily: mono, fontSize: 13 }}>
          <span style={{ color: C.inkDim }}>{lang === "de" ? "PUNKTE" : "POINTS"} </span>
          <b style={{ color: C.gold, fontSize: 16 }}>{points}</b>
        </div>
        {streak >= 2 && (
          <div style={{ fontFamily: mono, fontSize: 12, color: C.amber }}>
            🔥 {t.streak} {streak}× ({(1 + Math.min(streak - 1, 5) * 0.1).toFixed(1)}×)
          </div>
        )}
        {!revealed && (
        <button onClick={onTogglePause} style={{
          marginLeft: "auto", background: paused ? C.amber : "transparent", color: paused ? C.bg : C.ink,
          border: `1px solid ${paused ? C.amber : C.line}`, borderRadius: 8, padding: "6px 13px",
          fontSize: 12.5, fontFamily: mono, fontWeight: 700, display: "flex", alignItems: "center", gap: 6,
        }}>{paused ? `▶ ${t.resume}` : `⏸ ${t.pause}`}</button>
        )}
        {flagCount > 0 && (
          <span style={{ fontFamily: mono, fontSize: 10.5, color: C.red }}>⚑ {flagCount} {flagCount > 1 ? t.anomaliesPl : t.anomalies}</span>
        )}
      </div>

      {/* SEGMENTED STATUS BAR — answered / current / upcoming */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          {Array.from({ length: total }).map((_, i) => {
            const state = i < answeredCount ? "done" : i === qi ? "current" : "todo";
            return (
              <div key={i} style={{
                flex: 1, height: state === "current" ? 9 : 6, borderRadius: 2,
                background: state === "done" ? dim.color : state === "current" ? C.ink : C.line,
                opacity: state === "todo" ? 0.5 : 1,
                transition: "all .3s",
              }} />
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontFamily: mono, fontSize: 11, color: C.inkDim }}>
          <span>{answeredCount}/{total} {t.answered} · {pct}%</span>
          <span>{total - answeredCount} {t.remaining}</span>
        </div>
      </div>

      {/* timer row — visible countdown bar + large readout */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 11, color: C.inkDim, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t.timeLabel}</span>
          <div style={{ position: "relative", marginLeft: "auto", fontFamily: mono, fontWeight: 800, fontSize: 22, minWidth: 56, textAlign: "right", color: paused ? C.amber : urgent ? C.red : C.ink }}>
            {paused ? "⏸" : `${String(timeLeft).padStart(2, "0")}s`}
            {lastGain && lastGain.key === qi && lastGain.correct && (
              <span style={{ position: "absolute", right: 0, top: -22, color: C.gold, fontSize: 13, animation: "floatUp 1s ease forwards" }}>+{lastGain.gain}</span>
            )}
          </div>
        </div>
        <div style={{ height: 8, borderRadius: 5, background: C.panelHi, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 5,
            width: `${Math.max(0, Math.min(100, (timeLeft / (timeMax + (qi === 0 ? 10 : 0))) * 100))}%`,
            background: paused ? C.amber : urgent ? C.red : dim.color,
            transition: "width 1s linear, background .3s",
          }} />
        </div>
        {qi === 0 && !paused && !revealed && (
          <div style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, marginTop: 6 }}>{t.firstQBonus}</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: dim.color }} />
        <Eyebrow color={dim.color}>{dim[lang]}</Eyebrow>
      </div>

      <div key={qi} className="fu" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "26px 24px", position: "relative", overflow: "hidden", minHeight: 280 }}>
        {urgent && <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: C.red, opacity: 0.5, animation: "scan 1.2s linear infinite" }} />}

        {paused ? (
          // PAUSE OVERLAY — question + options fully hidden so nobody can read/copy
          <div style={{ display: "grid", placeItems: "center", minHeight: 230, textAlign: "center" }}>
            <div>
              <div style={{ fontSize: 40, marginBottom: 14 }}>⏸</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{t.pausedTitle}</div>
              <div style={{ color: C.inkDim, fontSize: 14, maxWidth: 360, margin: "0 auto 20px", lineHeight: 1.5 }}>{t.pausedHint}</div>
              <button onClick={onTogglePause} style={btnPrimary}>▶ {t.resume}</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 18.5, fontWeight: 600, lineHeight: 1.42, marginBottom: 22 }}>{L(cur.q, lang)}</div>
            <div style={{ display: "grid", gap: 10 }}>
              {cur.a.map((opt, i) => {
                const on = picked === i;
                // feedback colors once revealed
                let bd = on ? dim.color : C.line;
                let bg = on ? "rgba(255,255,255,0.05)" : C.panelHi;
                let mark = null;
                if (revealed) {
                  if (i === revealed.correctIdx) { bd = C.green; bg = "rgba(79,209,139,0.12)"; mark = "✓"; }
                  else if (i === revealed.pickedIdx) { bd = C.red; bg = "rgba(240,85,107,0.12)"; mark = "✕"; }
                }
                return (
                  <button key={i} disabled={picked !== null || revealed !== null} onClick={() => onPick(i)} style={{
                    textAlign: "left", padding: "14px 16px", borderRadius: 10, fontSize: 14.5, lineHeight: 1.4,
                    border: `1px solid ${bd}`, background: bg,
                    color: C.ink, display: "flex", gap: 12, alignItems: "flex-start",
                    cursor: revealed ? "default" : "pointer",
                  }}>
                    <span style={{ fontFamily: mono, fontSize: 12, color: bd === C.line ? dim.color : bd, marginTop: 2, fontWeight: 700 }}>{String.fromCharCode(65 + i)}</span>
                    <span style={{ flex: 1 }}>{L(opt, lang)}</span>
                    {mark && <span style={{ color: mark === "✓" ? C.green : C.red, fontWeight: 800 }}>{mark}</span>}
                  </button>
                );
              })}
            </div>

            {/* FEEDBACK after answering */}
            {revealed && (
              <div className="fu" style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: revealed.isCorrect ? C.green : C.red, marginBottom: 6 }}>
                  {revealed.timedOut ? (lang === "de" ? "⏱ Zeit abgelaufen" : "⏱ Time's up")
                    : revealed.isCorrect ? (lang === "de" ? "✓ Richtig" : "✓ Correct")
                    : (lang === "de" ? "✕ Nicht ganz" : "✕ Not quite")}
                </div>
                <div style={{ color: C.ink, fontSize: 14, lineHeight: 1.55 }}>{L(revealed.expl, lang)}</div>
                <button onClick={onAdvance} style={{ ...btnPrimary, marginTop: 16 }}>
                  {qi + 1 >= total ? (lang === "de" ? "Ergebnis ansehen →" : "See result →") : (lang === "de" ? "Weiter →" : "Next →")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: 16, fontFamily: mono, fontSize: 11, color: C.inkDim }}>{paused ? t.pausedHint : revealed ? "" : t.bauch}</div>
    </div>
  );
}

// ============================================================
// SCORING
// ============================================================
function computeReport(answers, flags, profile, points) {
  const dimScores = {};
  Object.keys(DIMS).forEach((k) => {
    const qs = answers.filter((a) => a.dim === k);
    const correct = qs.filter((a) => a.correct).length;
    if (qs.length) dimScores[k] = { correct, total: qs.length, pct: Math.round((correct / qs.length) * 100) };
  });

  // difficulty-weighted score (harder items worth more) — IRT-lite
  let earned = 0, possible = 0;
  answers.forEach((a) => { const w = a.diff; possible += w; if (a.correct) earned += w; });
  const totalScore = possible ? Math.round((earned / possible) * 100) : 0;

  const traps = answers.filter((a) => a.isTrap);
  const trapsCorrect = traps.filter((a) => a.correct).length;

  const tabSwitches = flags.blur, pastes = flags.paste, timeouts = flags.timeouts, slowTraps = flags.longPause;
  let suspicion = 0;
  suspicion += Math.min(tabSwitches * 18, 50);
  suspicion += Math.min(pastes * 25, 50);
  suspicion += slowTraps * 12;
  if (traps.length && trapsCorrect === traps.length && tabSwitches >= 2) suspicion += 15;
  suspicion = Math.min(100, suspicion);

  const integrity =
    suspicion >= 60 ? { key: "flag", label: { de: "Auffällig", en: "Flagged" }, color: C.red, note: { de: "Mehrere Hinweise auf externe Hilfe. Ergebnis nur eingeschränkt aussagekräftig.", en: "Multiple signs of outside help. Result is only partly meaningful." } } :
    suspicion >= 30 ? { key: "borderline", label: { de: "Grenzwertig", en: "Borderline" }, color: C.amber, note: { de: "Einzelne Auffälligkeiten erkannt. Im Zweifel ehrlich wiederholen.", en: "Some anomalies detected. If in doubt, retry honestly." } } :
    { key: "clean", label: { de: "Sauber", en: "Clean" }, color: C.green, note: { de: "Keine relevanten Auffälligkeiten. Belastbares Ergebnis.", en: "No relevant anomalies. Reliable result." } };

  const judgement = traps.length ? trapsCorrect / traps.length : 0;
  const sIndex = totalScore * 0.7 + judgement * 30;
  const seniority =
    sIndex >= 85 ? { key: 5, rank: 5, color: C.green, label: { de: "AI-Native Leader", en: "AI-Native Leader" }, desc: { de: "Souveräne Kombination aus Wissen, Urteilsvermögen und Führungsperspektive.", en: "A confident blend of knowledge, judgement and leadership perspective." } } :
    sIndex >= 68 ? { key: 4, rank: 4, color: C.cyan, label: { de: "Strategischer Anwender", en: "Strategic Practitioner" }, desc: { de: "Solides Fundament, denkt KI bereits in Prozesse und Teamführung mit.", en: "A solid foundation, already integrating AI into processes and team leadership." } } :
    sIndex >= 50 ? { key: 3, rank: 3, color: C.amber, label: { de: "Aufgeklärter Einsteiger", en: "Informed Beginner" }, desc: { de: "Gutes Grundverständnis, ausbaufähig bei Anwendung und Governance.", en: "Good basic understanding, room to grow in application and governance." } } :
    sIndex >= 32 ? { key: 2, rank: 2, color: C.violet, label: { de: "Neugieriger Beobachter", en: "Curious Observer" }, desc: { de: "Erste Berührungspunkte, klarer Bedarf an strukturiertem Aufbau.", en: "First touchpoints, a clear need for structured build-up." } } :
    { key: 1, rank: 1, color: C.red, label: { de: "Orientierungsphase", en: "Orientation Phase" }, desc: { de: "Grundlagen sollten priorisiert aufgebaut werden.", en: "Fundamentals should be built up as a priority." } };

  const recs = buildRecs(dimScores);
  const top3 = buildTop3(dimScores, seniority, integrity, { correct: trapsCorrect, total: traps.length });
  const tier = buildTier(sIndex);
  return { totalScore, dimScores, seniority, integrity, suspicion, points, flags: { tabSwitches, pastes, timeouts, slowTraps }, traps: { correct: trapsCorrect, total: traps.length }, recs, top3, tier };
}

function buildRecs(dimScores) {
  const lib = {
    understand: {
      training: { de: ["Grundlagen-Workshop 'Wie funktioniert generative KI?'", "Interner AI-Fundamentals-Kurs (sofern vorhanden)"], en: ["Foundations workshop 'How does generative AI work?'", "Internal AI fundamentals course (if available)"] },
      skills: { de: ["Halluzinationen aktiv gegenprüfen", "Knowledge Cutoff & Kontextfenster verstehen"], en: ["Actively cross-check hallucinations", "Understand knowledge cutoff & context window"] },
      books: { de: ["'Co-Intelligence' — Ethan Mollick", "'Künstliche Intelligenz' — Manuela Lenzen"], en: ["'Co-Intelligence' — Ethan Mollick", "'A Brief History of Intelligence' — M. Bennett"] },
      resources: [
        { label: "LHG LinkedIn Learning: 'Generative AI / KI-Grundlagen' (intern verfügbar)", url: "https://www.linkedin.com/learning/search?keywords=artificial%20intelligence%20fundamentals" },
        { label: "Elements of AI (kostenloser Kurs / free course)", url: "https://www.elementsofai.com/" },
        { label: "Google AI Essentials (Coursera, Zertifikat)", url: "https://www.coursera.org/google-learn/ai-essentials" },
        { label: "3Blue1Brown: How LLMs work (Video)", url: "https://www.youtube.com/watch?v=wjZofJX0v4M" },
      ],
    },
    apply: {
      training: { de: ["Workshop 'KI-Use-Cases bewerten & priorisieren'", "ROI-Methodik für KI-Projekte"], en: ["Workshop 'Evaluate & prioritize AI use-cases'", "ROI methodology for AI projects"] },
      skills: { de: ["Use-Case-Canvas anwenden", "Baseline vor Pilot definieren", "Model-Routing einführen (klein/lokal vs. Frontier)"], en: ["Apply a use-case canvas", "Define a baseline before piloting", "Introduce model routing (small/local vs. frontier)"] },
      books: { de: ["'Prediction Machines' — Agrawal et al.", "'The AI-First Company' — Ash Fontana"], en: ["'Prediction Machines' — Agrawal et al.", "'The AI-First Company' — Ash Fontana"] },
      resources: [
        { label: "LHG LinkedIn Learning: 'AI for Business Leaders' (intern verfügbar)", url: "https://www.linkedin.com/learning/search?keywords=ai%20for%20business" },
        { label: "Wharton: AI for Business (Coursera Specialization)", url: "https://www.coursera.org/specializations/ai-for-business-wharton" },
        { label: "Ollama — lokale LLMs selbst betreiben", url: "https://ollama.com/" },
        { label: "Microsoft: AI for Business Leaders (Learn)", url: "https://learn.microsoft.com/en-us/training/" },
      ],
    },
    evaluate: {
      training: { de: ["Critical-Thinking-Lab für KI-Output", "Quellen-Verifikation in der Praxis"], en: ["Critical-thinking lab for AI output", "Source verification in practice"] },
      skills: { de: ["KI-Output systematisch verifizieren", "Provenienz/Content Credentials prüfen statt Detektor-Scores"], en: ["Systematically verify AI output", "Check provenance/content credentials instead of detector scores"] },
      books: { de: ["'Calling Bullshit' — Bergstrom & West", "'Weapons of Math Destruction' — O'Neil"], en: ["'Calling Bullshit' — Bergstrom & West", "'Weapons of Math Destruction' — O'Neil"] },
      resources: [
        { label: "LHG LinkedIn Learning: 'Critical Thinking / Fact-Checking' (intern verfügbar)", url: "https://www.linkedin.com/learning/search?keywords=critical%20thinking" },
        { label: "C2PA / Content Credentials (Herkunfts-Standard)", url: "https://contentcredentials.org/" },
        { label: "Calling Bullshit — Uni-Kurs (frei)", url: "https://www.callingbullshit.org/" },
        { label: "MIT: Detecting AI text — Grenzen (Studie)", url: "https://arxiv.org/abs/2303.11156" },
      ],
    },
    ethics: {
      training: { de: ["Workshop KI-Ethik, DSGVO & Mitbestimmung", "Bias & Fairness in KI-Systemen"], en: ["Workshop AI ethics, GDPR & co-determination", "Bias & fairness in AI systems"] },
      skills: { de: ["Datenschutz-Check vor Tool-Einsatz", "Vertrauliche Dokumente für KI kennzeichnen", "Bias-Risiken im Prozess erkennen"], en: ["Data-protection check before tool use", "Mark confidential docs against AI processing", "Spot bias risks in the process"] },
      books: { de: ["'The Alignment Problem' — Brian Christian", "'Atlas of AI' — Kate Crawford"], en: ["'The Alignment Problem' — Brian Christian", "'Atlas of AI' — Kate Crawford"] },
      resources: [
        { label: "LHG LinkedIn Learning: 'GDPR / AI Ethics' (intern verfügbar)", url: "https://www.linkedin.com/learning/search?keywords=ai%20ethics%20gdpr" },
        { label: "EU AI Act — offizieller Überblick", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
        { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
        { label: "OECD AI Principles", url: "https://oecd.ai/en/ai-principles" },
      ],
    },
    lead: {
      training: { de: ["'Führen im KI-Zeitalter' — Leadership-Programm", "Change-Management für KI-Adoption"], en: ["'Leading in the AI era' — leadership program", "Change management for AI adoption"] },
      skills: { de: ["KI-Nutzungsrahmen fürs Team formulieren", "Sichere Lernräume schaffen", "Team Zeit & Raum für KI einräumen"], en: ["Define an AI usage framework for the team", "Create safe learning spaces", "Give the team time & space for AI"] },
      books: { de: ["'The Coming Wave' — Mustafa Suleyman", "'Human + Machine' — Daugherty & Wilson"], en: ["'The Coming Wave' — Mustafa Suleyman", "'Human + Machine' — Daugherty & Wilson"] },
      resources: [
        { label: "LHG LinkedIn Learning: 'Leading through Change / AI for Leaders' (intern verfügbar)", url: "https://www.linkedin.com/learning/search?keywords=leading%20through%20change" },
        { label: "HBR: Leading with AI (Artikelsammlung)", url: "https://hbr.org/topic/subject/ai-and-machine-learning" },
        { label: "MIT Sloan: AI for leaders (executive)", url: "https://executive.mit.edu/" },
        { label: "Ethan Mollick — 'One Useful Thing' (Blog)", url: "https://www.oneusefulthing.org/" },
      ],
    },
    practice: {
      training: { de: ["Hands-on Lab: Agentische Workflows & lokale Skills", "Praxis-Sprint: einen echten Prozess automatisieren"], en: ["Hands-on lab: agentic workflows & local skills", "Practice sprint: automate a real process"] },
      skills: { de: ["Einen wiederverwendbaren 'lokalen Skill' bauen", "Morning-Briefing-Routine für Top-Kunden aufsetzen", "Prompt-Bibliothek anlegen"], en: ["Build a reusable 'local skill'", "Set up a morning-briefing routine for key accounts", "Create a prompt library"] },
      books: { de: ["'AI Engineering' — Chip Huyen (Auszüge)", "'Co-Intelligence' — Ethan Mollick"], en: ["'AI Engineering' — Chip Huyen (excerpts)", "'Co-Intelligence' — Ethan Mollick"] },
      resources: [
        { label: "LHG LinkedIn Learning: 'Prompt Engineering / Generative AI' (intern verfügbar)", url: "https://www.linkedin.com/learning/search?keywords=prompt%20engineering" },
        { label: "Anthropic: Prompt Engineering Guide", url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview" },
        { label: "OpenAI: Prompt engineering Guide", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
        { label: "DeepLearning.AI: Short Courses (frei)", url: "https://www.deeplearning.ai/courses/" },
      ],
    },
    company: {
      training: { de: ["LHIND AI-Services-Überblick (intern)", "ASE — Agentic Software Engineering kennenlernen"], en: ["LHIND AI services overview (internal)", "Get to know ASE — Agentic Software Engineering"] },
      skills: { de: ["LHIND-Portfolio von Strategie bis Betrieb kennen", "AI Services (Plug-and-Play) im Kundengespräch platzieren"], en: ["Know the LHIND portfolio from strategy to operations", "Position AI services (plug-and-play) in customer talks"] },
      books: { de: ["Interne Vertriebs- & Portfolio-Unterlagen", "LHIND AI-Services-Seiten im Intranet"], en: ["Internal sales & portfolio materials", "LHIND AI services pages on the intranet"] },
      resources: [
        { label: "LHIND AI Services (SharePoint, intern)", url: "https://lufthansagroup.sharepoint.com/sites/LHIND_EF/SitePages/de/AI-Services(1).aspx" },
        { label: "Bei Fragen: ase@lhind.dlh.de", url: "mailto:ase@lhind.dlh.de" },
      ],
    },
  };
  const order = Object.entries(dimScores).sort((a, b) => a[1].pct - b[1].pct).map(([k]) => k);
  return order.slice(0, 2).map((k) => ({ dim: k, pct: dimScores[k].pct, ...lib[k] }));
}

// Concrete, result-specific Top-3 tips (not generic advice).
function fmtPotential(profile, lang) {
  const v = profile.savingPotential;
  const list = Array.isArray(v) ? v.slice() : (v ? [v] : []);
  if (profile.savingPotential_other) list.push(profile.savingPotential_other);
  if (!list.length) return lang === "de" ? "—" : "—";
  // Show as a ranked list "1. X, 2. Y, 3. Z"
  return list.map((x, i) => `${i + 1}. ${x}`).join(", ");
}

function buildTier(sIndex) {
  // Maps the competence score onto LHIND's own seniority ladder
  // (Junior → Professional → Senior → Expert), with an entry level below.
  // Descriptions are adapted from the official LHIND seniority model.
  const tiers = [
    { min: 88, emoji: "🏆", color: C.gold,
      label: { de: "Expert", en: "Expert" },
      analogy: { de: "Auf LHIND-Expert-Niveau: Du würdest beim Thema KI Standards setzen, andere befähigen und Verantwortung in Schlüsselbereichen übernehmen.", en: "At LHIND Expert level: on AI you'd set standards, enable others and take accountability in key areas." } },
    { min: 70, emoji: "🚀", color: C.green,
      label: { de: "Senior", en: "Senior" },
      analogy: { de: "Auf LHIND-Senior-Niveau: Du gibst fundierte Orientierung, denkst KI in Prozesse und Teamführung mit und verantwortest Ergebnisse von der Analyse bis zur Umsetzung.", en: "At LHIND Senior level: you give well-founded guidance, weave AI into processes and team leadership, and own outcomes from analysis to delivery." } },
    { min: 50, emoji: "🎯", color: C.cyan,
      label: { de: "Professional", en: "Professional" },
      analogy: { de: "Auf LHIND-Professional-Niveau: Du bearbeitest vielfältige, komplexe KI-Themen eigenständig, unterstützt andere und bringst KI verlässlich in die Praxis.", en: "At LHIND Professional level: you handle diverse, complex AI topics autonomously, support others and bring AI reliably into practice." } },
    { min: 30, emoji: "🌱", color: C.amber,
      label: { de: "Junior", en: "Junior" },
      analogy: { de: "Auf LHIND-Junior-Niveau: Die Grundlagen sitzen; du arbeitest unter Anleitung an klar umrissenen KI-Aufgaben und baust Routine auf.", en: "At LHIND Junior level: the basics are in place; you work under guidance on well-defined AI tasks and build routine." } },
    { min: 0, emoji: "🔰", color: C.red,
      label: { de: "Einstieg", en: "Entry" },
      analogy: { de: "Noch vor dem Junior-Niveau: Jeder fängt hier an. Mit gezieltem Aufbau der Grundlagen kommt der Rest Schritt für Schritt.", en: "Just below Junior level: everyone starts here. With targeted work on the fundamentals, the rest follows step by step." } },
  ];
  const t = tiers.find((x) => sIndex >= x.min) || tiers[tiers.length - 1];
  return t;
}

function buildTop3(dimScores, sen, integrity, traps) {
  const dn = (k) => DIMS[k] ? DIMS[k] : { de: k, en: k };
  const tipByDim = {
    understand: {
      de: (p) => `Stärke deine Grundlagen (${p}%): Nimm dir 30 Min, um Knowledge Cutoff, Kontextfenster und Halluzinationen an einem echten Beispiel nachzuvollziehen — z. B. eine Antwort der KI bewusst gegenprüfen.`,
      en: (p) => `Strengthen your fundamentals (${p}%): spend 30 min understanding knowledge cutoff, context window and hallucinations on a real example — e.g. deliberately cross-check one AI answer.`,
    },
    apply: {
      de: (p) => `Übersetze Wissen in Anwendung (${p}%): Wähle einen konkreten Prozess in deinem Bereich, definiere eine messbare Baseline und plane einen klar begrenzten Piloten mit menschlicher Freigabe.`,
      en: (p) => `Turn knowledge into application (${p}%): pick a concrete process in your area, define a measurable baseline and plan a bounded pilot with human sign-off.`,
    },
    evaluate: {
      de: (p) => `Schärfe dein kritisches Prüfen (${p}%): Behandle KI-Aussagen als Hypothesen — verlange prüfbare Belege und verifiziere Quellen unabhängig, bevor du sie in Entscheidungen übernimmst.`,
      en: (p) => `Sharpen your critical evaluation (${p}%): treat AI claims as hypotheses — demand checkable evidence and verify sources independently before using them in decisions.`,
    },
    ethics: {
      de: (p) => `Verankere Verantwortung (${p}%): Etabliere einen kurzen Datenschutz-Check vor jedem neuen Tool-Einsatz und kennzeichne vertrauliche Dokumente klar gegen KI-Verarbeitung.`,
      en: (p) => `Anchor responsibility (${p}%): establish a quick data-protection check before any new tool use and clearly mark confidential documents against AI processing.`,
    },
    lead: {
      de: (p) => `Führe sichtbar (${p}%): Formuliere einen klaren KI-Nutzungsrahmen fürs Team (welche Daten, welche Freigaben) und schaffe einen sicheren Raum zum Ausprobieren.`,
      en: (p) => `Lead visibly (${p}%): define a clear AI usage framework for your team (which data, which approvals) and create a safe space to experiment.`,
    },
    practice: {
      de: (p) => `Komm ins Tun (${p}%): Baue eine wiederverwendbare Routine — etwa ein automatisiertes Wochen-Briefing mit fester Quelle und kurzem menschlichem Check vor Versand.`,
      en: (p) => `Get hands-on (${p}%): build one reusable routine — e.g. an automated weekly briefing with a fixed source and a brief human check before sending.`,
    },
    company: {
      de: (p) => `Schärfe dein LHIND-Wissen (${p}%): Mach dich mit dem End-to-End-Portfolio (Strategie bis Betrieb), den AI Services und dem ASE-Programm vertraut, um KI im Kundengespräch souverän zu positionieren.`,
      en: (p) => `Sharpen your LHIND knowledge (${p}%): get familiar with the end-to-end portfolio (strategy to operations), the AI services and the ASE program to position AI confidently with customers.`,
    },
  };
  const order = Object.entries(dimScores).sort((a, b) => a[1].pct - b[1].pct);
  const tips = [];
  // Two weakest dimensions → two concrete tips.
  for (const [k, v] of order.slice(0, 2)) {
    tips.push({ icon: "↗", color: DIMS[k].color, de: tipByDim[k].de(v.pct), en: tipByDim[k].en(v.pct), dimLabel: dn(k) });
  }
  // Third tip: integrity / control-question behaviour, else seniority next step.
  if (integrity.key !== "clean") {
    tips.push({
      icon: "⚑", color: C.amber,
      de: "Achte auf eigenständiges Urteilen: In diesem Durchlauf gab es Auffälligkeiten (z. B. Tab-Wechsel oder sehr langes Zögern bei Kontrollfragen). Übe, Antworten selbst zu bewerten, statt extern nachzuschlagen — das ist die eigentliche Führungskompetenz.",
      en: "Work on independent judgement: this run showed some anomalies (e.g. tab switches or long hesitation on control questions). Practise judging answers yourself instead of looking them up — that's the real leadership skill.",
    });
  } else if (traps.total && traps.correct < traps.total) {
    tips.push({
      icon: "🎯", color: C.cyan,
      de: `Lies Aufgaben genauer: Du hast ${traps.correct} von ${traps.total} Kontrollfragen gelöst. Nimm dir bei kniffligen Fragen zwei Sekunden mehr und prüfe, was wirklich gefragt ist.`,
      en: `Read tasks more carefully: you solved ${traps.correct} of ${traps.total} control questions. On tricky items, take two seconds more and check what is actually being asked.`,
    });
  } else {
    tips.push({
      icon: "🚀", color: C.green,
      de: sen.rank >= 4
        ? "Skaliere deinen Vorsprung: Mach deine KI-Nutzung im Team sichtbar und wiederholbar — etabliere Governance und befähige andere gezielt."
        : sen.rank === 3
        ? "Dein nächster Hebel: Vom Ausprobieren zur Struktur — definiere für einen realen Use-Case Erfolgskriterien und miss den Nutzen."
        : "Dein nächster Hebel: Sammle praktische Erfahrung in einem sicheren Rahmen — Verständnis entsteht durchs Tun, nicht durch Theorie.",
      en: sen.rank >= 4
        ? "Scale your edge: make your AI use visible and repeatable across the team — establish governance and deliberately enable others."
        : sen.rank === 3
        ? "Your next lever: move from experimenting to structure — define success criteria for one real use-case and measure the value."
        : "Your next lever: gain hands-on experience in a safe setting — understanding comes from doing, not theory.",
    });
  }
  return tips.slice(0, 3);
}

function narrative(t, lang, profile, dimScores, sen, score, integrity, traps) {
  const entries = Object.entries(dimScores);
  const weakest = entries.sort((a, b) => a[1].pct - b[1].pct)[0];
  const strongest = entries.slice().sort((a, b) => b[1].pct - a[1].pct)[0];
  const dn = (k) => DIMS[k][lang];
  const role = profile.role_other || profile.role || "—";
  const area = profile.area_other || profile.area || "—";
  if (lang === "de") {
    let s = `Als ${role} im Bereich ${area} erreichst du einen Gesamtscore von ${score}/100 und damit das Profil „${sen.label.de}". ${sen.desc.de} `;
    s += `Deine stärkste Dimension ist „${dn(strongest[0])}" (${strongest[1].pct}%), während „${dn(weakest[0])}" (${weakest[1].pct}%) dein größtes Wachstumsfeld ist. `;
    if (traps.total) s += traps.correct === traps.total
      ? `Bemerkenswert: Du hast alle ${traps.total} Kontroll-Fragen korrekt gelöst — ein starkes Zeichen für eigenständiges Urteilsvermögen. `
      : `Bei den Kontroll-Fragen hast du ${traps.correct} von ${traps.total} gemeistert — hinterfrage Antworten kritischer statt der erstbesten plausiblen Option zu folgen. `;
    if (integrity.key !== "clean") s += `Hinweis: ${integrity.note.de} `;
    s += sen.rank >= 4
      ? `Dein nächster Hebel liegt im Skalieren: etabliere Governance, befähige dein Team gezielt und mache deinen KI-Einsatz sichtbar und wiederholbar.`
      : sen.rank === 3
      ? `Konkreter nächster Schritt: wähle einen echten Prozess in deinem Bereich, definiere eine messbare Baseline und führe einen begrenzten Piloten durch.`
      : `Konkreter nächster Schritt: investiere in Grundlagen und sammle in einem sicheren Rahmen erste eigene Hands-on-Erfahrung — Verständnis entsteht durch Anwendung.`;
    return s;
  }
  let s = `As a ${role} in ${area}, you reach a total score of ${score}/100 — the profile "${sen.label.en}". ${sen.desc.en} `;
  s += `Your strongest dimension is "${dn(strongest[0])}" (${strongest[1].pct}%), while "${dn(weakest[0])}" (${weakest[1].pct}%) is your biggest growth area. `;
  if (traps.total) s += traps.correct === traps.total
    ? `Notably, you solved all ${traps.total} control questions correctly — a strong sign of independent judgement. `
    : `You mastered ${traps.correct} of ${traps.total} control questions — challenge answers more critically rather than picking the first plausible option. `;
  if (integrity.key !== "clean") s += `Note: ${integrity.note.en} `;
  s += sen.rank >= 4
    ? `Your next lever is scaling: establish governance, enable your team deliberately, and make your AI use visible and repeatable.`
    : sen.rank === 3
    ? `Concrete next step: pick a real process in your area, define a measurable baseline and run a bounded pilot.`
    : `Concrete next step: invest in fundamentals and gain first hands-on experience in a safe setting — understanding comes from doing.`;
  return s;
}

// ============================================================
// REPORT
// ============================================================
function Report({ t, lang, report, profile, onViewProfile }) {
  const { totalScore, dimScores, seniority, integrity, recs, traps, flags, cohort, points, top3, history, avatar, tier } = report;
  const scores = (cohort || []).map((r) => r.score).sort((a, b) => a - b);
  const better = scores.filter((s) => s < totalScore).length;
  const percentile = scores.length > 1 ? Math.round((better / scores.length) * 100) : null;
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  // study comparison: self-reported saving potential vs adoption benchmark for age
  const adoption = STUDY.adoptionByAge[profile.age] ?? 30;

  return (
    <div className="fu" style={{ padding: "28px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 22 }}>🎯</span>
        <Eyebrow color={seniority.color}>{t.yourResult}</Eyebrow>
      </div>

      {/* Hero */}
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-end", margin: "8px 0" }}>
        <div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, fontFamily: mono, color: seniority.color }}>{totalScore}</div>
          <div style={{ fontFamily: mono, fontSize: 12, color: C.inkDim, letterSpacing: "0.1em" }}>{t.ofPoints}</div>
        </div>
        <div style={{ paddingBottom: 6 }}>
          <div style={{ fontSize: 13, color: C.inkDim, fontFamily: mono, letterSpacing: "0.1em" }}>{t.seniority}</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: seniority.color }}>{seniority.label[lang]}</div>
          <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
            {[1, 2, 3, 4, 5].map((n) => <div key={n} style={{ width: 26, height: 5, borderRadius: 2, background: n <= seniority.rank ? seniority.color : C.line }} />)}
          </div>
        </div>
        <div style={{ paddingBottom: 6, marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 13, color: C.inkDim, fontFamily: mono, letterSpacing: "0.1em" }}>{lang === "de" ? "SPIELPUNKTE" : "GAME POINTS"}</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.gold, fontFamily: mono }}>{points}</div>
        </div>
      </div>

      {/* Dynamic tier — playful consulting-world equivalent */}
      {tier && (
        <div style={{ background: `linear-gradient(135deg, ${C.panelHi}, ${C.panel})`, border: `1px solid ${tier.color}`, borderRadius: 14, padding: "20px 22px", margin: "20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 38, lineHeight: 1 }}>{tier.emoji}</div>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10.5, color: tier.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>{lang === "de" ? "Deine Einstufung" : "Your tier"}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: tier.color, marginTop: 2 }}>{tier.label[lang]}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.55, marginTop: 12 }}>{tier.analogy[lang]}</div>
          <div style={{ fontSize: 11, color: C.inkDim, marginTop: 8, fontStyle: "italic" }}>
            {lang === "de" ? "Orientierung an den LHIND-Senioritätsstufen — eine Einordnung der KI-Kompetenz, keine offizielle Stellenbewertung." : "Oriented on the LHIND seniority levels — an indication of AI competence, not an official job grading."}
          </div>
        </div>
      )}

      {/* Avatar progress (only when a name was chosen and prior runs exist) */}
      {avatar && history && history.length > 0 && (
        <div style={{ background: C.panel, border: `1px solid ${seniority.color}`, borderRadius: 12, padding: "18px 20px", margin: "22px 0" }}>
          <Eyebrow color={seniority.color}>{t.progressTitle} · {avatar}</Eyebrow>
          {(() => {
            const prev = history[history.length - 1];
            const delta = totalScore - prev.score;
            const runs = [...history.map((h) => h.score), totalScore];
            const max = Math.max(...runs, 100);
            return (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 14, marginBottom: 14 }}>
                  {t.progressDelta}: <b style={{ color: delta > 0 ? C.green : delta < 0 ? C.red : C.inkDim }}>{delta > 0 ? "+" : ""}{delta}</b>
                  <span style={{ color: C.inkDim }}> ({prev.score} → {totalScore})</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 70 }}>
                  {runs.map((s, i) => {
                    const isNow = i === runs.length - 1;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{ fontFamily: mono, fontSize: 11, color: isNow ? seniority.color : C.inkDim }}>{s}</div>
                        <div style={{ width: "100%", maxWidth: 40, height: `${Math.max(6, (s / max) * 46)}px`, background: isNow ? seniority.color : C.line, borderRadius: 3 }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, marginTop: 6, textAlign: "right" }}>{t.progressIntro} {history.length}</div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TOP-3 concrete, result-specific tips */}
      {top3 && top3.length > 0 && (
        <div style={{ background: C.panelHi, border: `1px solid ${C.gold}`, borderRadius: 12, padding: "20px 22px", margin: "22px 0" }}>
          <Eyebrow color={C.gold}>{lang === "de" ? "Deine Top-3-Tipps" : "Your Top 3 tips"}</Eyebrow>
          <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
            {top3.map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ minWidth: 30, height: 30, borderRadius: 8, background: tip.color, color: C.bg, display: "grid", placeItems: "center", fontWeight: 800, fontFamily: mono, fontSize: 14 }}>{i + 1}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, paddingTop: 3 }}>{lang === "de" ? tip.de : tip.en}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cohort */}
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px", margin: "22px 0" }}>
        <Eyebrow color={C.cyan}>{t.cohortCompare}</Eyebrow>
        {percentile !== null ? (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 15, marginBottom: 14 }}>
              {t.betterThan} <b style={{ color: C.cyan }}>{percentile}%</b> {t.ofParticipants} {scores.length} {t.participants}. {t.avgIs} <b>{avg}/100</b>.
            </div>
            <CohortHist scores={scores} you={totalScore} />
          </div>
        ) : (
          <div style={{ marginTop: 10, color: C.inkDim, fontSize: 14 }}>{t.firstParticipant}{avg !== null && ` (${t.currentAvg}: ${avg}/100)`}</div>
        )}
      </div>

      {/* Study comparison */}
      <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px", margin: "22px 0" }}>
        <Eyebrow color={C.gold}>{t.studyCompare}</Eyebrow>
        <div style={{ marginTop: 14, display: "grid", gap: 16 }}>
          <StudyRow lang={lang}
            label={lang === "de" ? `KI-Nutzung deiner Altersgruppe (${profile.age})` : `AI use in your age group (${profile.age})`}
            value={adoption} suffix="%" benchLabel={lang === "de" ? "Studien-Schnitt" : "study avg"} color={C.cyan} />
          <StudyRow lang={lang}
            label={lang === "de" ? "KI-Nutzung in Management-Rollen" : "AI use in management roles"}
            value={STUDY.mgmtAdoption} suffix="%" benchLabel={lang === "de" ? "Studien-Schnitt" : "study avg"} color={C.green} />
          <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.5 }}>
            {lang === "de"
              ? `Deine Selbsteinschätzung: KI spart dir aktuell ${profile.timeSaved} pro Tag. In Studien sparen Wissensarbeiter im Schnitt rund ${STUDY.avgTimeSavedPct}% ihrer Arbeitszeit — Potenzial siehst du (nach Priorität) bei: ${fmtPotential(profile, lang)}.`
              : `Your self-assessment: AI currently saves you ${profile.timeSaved} per day. Studies show knowledge workers save about ${STUDY.avgTimeSavedPct}% of work hours on average — you see potential (by priority) in: ${fmtPotential(profile, lang)}.`}
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, marginTop: 14, lineHeight: 1.5 }}>{t.studyNote}</div>
      </div>

      {/* Scientific references */}
      <References lang={lang} compact />

      {/* Curated media recommendations: newsletters, channels, voices */}
      <MediaRecs lang={lang} compact />

      {/* Profile */}
      <div style={{ margin: "26px 0" }}>
        <Eyebrow color={C.amber}>{t.competencyProfile}</Eyebrow>
        <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
          {Object.entries(dimScores).map(([k, m]) => (
            <div key={k}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13.5 }}>
                <span style={{ fontWeight: 600 }}>{DIMS[k][lang]}</span>
                <span style={{ fontFamily: mono, color: DIMS[k].color }}>{m.pct}% · {m.correct}/{m.total}</span>
              </div>
              <Bar value={m.pct} color={DIMS[k].color} />
            </div>
          ))}
        </div>
      </div>

      <Radar dimScores={dimScores} lang={lang} />

      {/* Integrity */}
      <div style={{ background: C.panel, border: `1px solid ${integrity.color}`, borderRadius: 12, padding: "16px 20px", margin: "24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: integrity.color, letterSpacing: "0.15em" }}>{t.integrityCheck}</div>
          <div style={{ fontWeight: 700, color: integrity.color }}>{integrity.label[lang]}</div>
        </div>
        <div style={{ color: C.inkDim, fontSize: 13.5, marginTop: 8 }}>{integrity.note[lang]}</div>
        <div style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap", fontFamily: mono, fontSize: 11.5, color: C.inkDim }}>
          <span>{t.tabSwitch}: <b style={{ color: C.ink }}>{flags.tabSwitches}</b></span>
          <span>{t.paste}: <b style={{ color: C.ink }}>{flags.pastes}</b></span>
          <span>{t.timeouts}: <b style={{ color: C.ink }}>{flags.timeouts}</b></span>
          <span>{t.controlQ}: <b style={{ color: C.ink }}>{traps.correct}/{traps.total}</b></span>
        </div>
      </div>

      {/* Narrative */}
      <div style={{ margin: "26px 0" }}>
        <Eyebrow color={seniority.color}>{t.yourPlacement}</Eyebrow>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, marginTop: 12 }}>{narrative(t, lang, profile, dimScores, seniority, totalScore, integrity, traps)}</p>
      </div>

      {/* Recs */}
      <div style={{ margin: "26px 0" }}>
        <Eyebrow color={C.green}>{t.nextSteps}</Eyebrow>
        <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
          {recs.map((r) => (
            <div key={r.dim} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{t.focus}: {DIMS[r.dim][lang]}</span>
                <span style={{ fontFamily: mono, fontSize: 12, color: C.inkDim }}>{r.pct}%</span>
              </div>
              <RecBlock label={t.training} items={r.training[lang]} color={C.cyan} />
              <RecBlock label={t.skills} items={r.skills[lang]} color={C.amber} />
              <RecBlock label={t.books} items={r.books[lang]} color={C.violet} />
              {r.resources && (
                <div style={{ marginTop: 4 }}>
                  <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.12em", color: C.green, marginBottom: 6, textTransform: "uppercase" }}>{t.resourcesTitle}</div>
                  <div style={{ display: "grid", gap: 5 }}>
                    {r.resources.map((res, i) => (
                      <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: C.cyan, fontSize: 13, textDecoration: "none", display: "flex", gap: 7, alignItems: "baseline" }}>
                        <span style={{ color: C.inkDim, fontFamily: mono, fontSize: 10 }}>↗</span><span>{res.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* End-of-test review of all questions */}
      {report.answers && <Review t={t} lang={lang} answers={report.answers} />}

      {/* Training-plan prompt generator */}
      <TrainingPrompt t={t} lang={lang} profile={profile} dimScores={dimScores} seniority={seniority} totalScore={totalScore} recs={recs} />

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => window.location.reload()} style={btnSecondary}>{t.restart}</button>
        {avatar && (
          <button onClick={() => onViewProfile && onViewProfile(avatar)} style={btnPrimary}>{t.viewProfile} · {avatar}</button>
        )}
      </div>
      <div style={{ fontFamily: mono, fontSize: 11, color: C.inkDim, marginTop: 16, lineHeight: 1.6 }}>{t.savedNote}</div>
    </div>
  );
}

function buildTrainingPrompt(lang, profile, dimScores, seniority, totalScore) {
  const dn = (k) => DIMS[k][lang];
  const dimLines = Object.entries(dimScores).sort((a, b) => a[1].pct - b[1].pct)
    .map(([k, m]) => `- ${dn(k)}: ${m.pct}% (${m.correct}/${m.total})`).join("\n");
  const role = profile.role_other || profile.role;
  const area = profile.area_other || profile.area;
  const potential = fmtPotential(profile, lang);
  if (lang === "de") {
    return `Du bist mein persönlicher KI-Lerncoach. Erstelle mir einen konkreten, aktuellen 8-Wochen-Trainingsplan zum Aufbau meiner KI-Kompetenz als Führungskraft.

MEIN KONTEXT
- Rolle: ${role}
- Bereich: ${area}
- Altersgruppe: ${profile.age}
- Führungserfahrung: ${profile.leadExp}
- Teamgröße: ${profile.teamSize}
- Selbsteinschätzung KI-Nutzung: ${profile.self}
- KI-Zeitersparnis aktuell pro Tag: ${profile.timeSaved}
- Höchstes selbst gesehenes Potenzial: ${potential}

MEIN TESTERGEBNIS
- Gesamtscore: ${totalScore}/100
- Senioritätsstufe: ${seniority.label.de}
- Kompetenzprofil (schwächste zuerst):
${dimLines}

AUFGABE
1. Recherchiere kurz aktuelle, hochwertige Ressourcen (Kurse, Zertifikate, Videos, Tools, Bücher) — bevorzugt frei verfügbar — und priorisiere meine schwächsten Dimensionen.
2. Baue einen wochenweisen Plan (Woche 1–8) mit je: Lernziel, 1 konkreter Ressource, 1 praktischer Übung an einem echten Beispiel aus meinem Bereich (${area}), und einem messbaren Mini-Ergebnis.
3. Integriere mindestens eine anwendbare Routine (z. B. Morning-Briefing für Top-Kunden) und einen wiederverwendbaren 'lokalen Skill'.
4. Berücksichtige Modellauswahl/Model-Routing (lokal/klein vs. Frontier) und Datenschutz für vertrauliche Dokumente.
5. Gib am Ende eine kurze Liste der 3 größten Fehler, die ich in meiner Rolle vermeiden sollte.

Stelle Rückfragen, falls dir etwas fehlt. Formatiere übersichtlich.`;
  }
  return `You are my personal AI learning coach. Build me a concrete, up-to-date 8-week training plan to develop my AI competence as a leader.

MY CONTEXT
- Role: ${role}
- Area: ${area}
- Age group: ${profile.age}
- Leadership experience: ${profile.leadExp}
- Team size: ${profile.teamSize}
- Self-assessed AI usage: ${profile.self}
- Current daily time saved with AI: ${profile.timeSaved}
- Highest self-seen potential: ${potential}

MY TEST RESULT
- Total score: ${totalScore}/100
- Seniority level: ${seniority.label.en}
- Competency profile (weakest first):
${dimLines}

TASK
1. Briefly research current, high-quality resources (courses, certificates, videos, tools, books) — prefer free ones — and prioritize my weakest dimensions.
2. Build a week-by-week plan (week 1–8), each with: learning goal, 1 concrete resource, 1 hands-on exercise on a real example from my area (${area}), and a measurable mini-outcome.
3. Include at least one applicable routine (e.g. a morning briefing for key accounts) and one reusable 'local skill'.
4. Account for model selection/routing (local/small vs. frontier) and data protection for confidential documents.
5. End with a short list of the top 3 mistakes I should avoid in my role.

Ask me follow-up questions if anything is missing. Format clearly.`;
}

function Review({ t, lang, answers }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "26px 0" }}>
      <button onClick={() => setOpen((o) => !o)} style={{
        background: "transparent", border: `1px solid ${C.line}`, color: C.ink,
        borderRadius: 10, padding: "12px 18px", fontSize: 14, fontWeight: 600, width: "100%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span>{open ? t.reviewHide : t.reviewShow}</span>
        <span style={{ color: C.inkDim, fontFamily: mono, fontSize: 12 }}>{open ? "▲" : "▼"} {answers.length}</span>
      </button>
      {open && (
        <div className="fu" style={{ marginTop: 10 }}>
          <div style={{ color: C.inkDim, fontSize: 13, marginBottom: 14 }}>{t.reviewHint}</div>
          <div style={{ display: "grid", gap: 12 }}>
            {answers.map((a, idx) => {
              const dim = DIMS[a.dim];
              const userTxt = a.pickedIdx == null ? t.noAnswer : L(a.options[a.pickedIdx], lang);
              const correctTxt = L(a.options[a.correctIdx], lang);
              return (
                <div key={idx} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontFamily: mono, fontSize: 11, color: C.inkDim }}>{String(idx + 1).padStart(2, "0")}</span>
                    <span style={{ width: 7, height: 7, borderRadius: 2, background: dim.color }} />
                    <span style={{ fontFamily: mono, fontSize: 10.5, color: dim.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{dim[lang]}</span>
                    <span style={{ marginLeft: "auto", fontWeight: 800, color: a.correct ? C.green : C.red }}>{a.correct ? "✓" : "✕"}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4, marginBottom: 12 }}>{L(a.q, lang)}</div>
                  <div style={{ display: "grid", gap: 6, marginBottom: 10 }}>
                    <div style={{ fontSize: 13.5, display: "flex", gap: 8 }}>
                      <span style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, minWidth: 92, textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: 2 }}>{t.yourAnswer}</span>
                      <span style={{ color: a.correct ? C.green : C.red }}>{userTxt}</span>
                    </div>
                    {!a.correct && (
                      <div style={{ fontSize: 13.5, display: "flex", gap: 8 }}>
                        <span style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, minWidth: 92, textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: 2 }}>{t.correctAnswer}</span>
                        <span style={{ color: C.green }}>{correctTxt}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ background: C.panelHi, borderRadius: 8, padding: "10px 12px" }}>
                    <span style={{ fontFamily: mono, fontSize: 10, color: C.cyan, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.explanation}: </span>
                    <span style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.5 }}>{L(a.expl, lang)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function TrainingPrompt({ t, lang, profile, dimScores, seniority, totalScore }) {
  const [copied, setCopied] = useState(false);
  const prompt = buildTrainingPrompt(lang, profile, dimScores, seniority, totalScore);
  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(prompt).then(done).catch(done);
    else done();
  };
  return (
    <div style={{ margin: "26px 0", background: C.panelHi, border: `1px solid ${C.gold}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <Eyebrow color={C.gold}>{t.trainingPromptTitle}</Eyebrow>
        <button onClick={copy} style={{ background: copied ? C.green : C.gold, color: C.bg, border: "none", borderRadius: 8, padding: "8px 14px", fontWeight: 700, fontSize: 12.5, fontFamily: mono }}>
          {copied ? t.copied : `⎘ ${t.copyPrompt}`}
        </button>
      </div>
      <div style={{ color: C.inkDim, fontSize: 13, margin: "10px 0 12px", lineHeight: 1.5 }}>{t.trainingPromptHint}</div>
      <pre style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 8, padding: "14px 16px", margin: 0, maxHeight: 220, overflow: "auto", whiteSpace: "pre-wrap", fontFamily: mono, fontSize: 12, lineHeight: 1.5, color: C.ink }}>{prompt}</pre>
    </div>
  );
}

function StudyRow({ label, value, suffix, benchLabel, color, lang }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 6 }}>
        <span>{label}</span>
        <span style={{ fontFamily: mono, color }}>{value}{suffix} <span style={{ color: C.inkDim, fontSize: 11 }}>{benchLabel}</span></span>
      </div>
      <Bar value={value} color={color} height={8} />
    </div>
  );
}

function RecBlock({ label, items, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.12em", color, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {items.map((it, i) => <li key={i} style={{ fontSize: 13.5, lineHeight: 1.5, marginBottom: 3 }}>{it}</li>)}
      </ul>
    </div>
  );
}

function CohortHist({ scores, you }) {
  const bins = [0, 0, 0, 0, 0];
  scores.forEach((s) => { bins[Math.min(4, Math.floor(s / 20))]++; });
  const max = Math.max(...bins, 1);
  const youBin = Math.min(4, Math.floor(you / 20));
  const labels = ["0–20", "20–40", "40–60", "60–80", "80–100"];
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 96 }}>
      {bins.map((b, i) => (
        <div key={i} style={{ flex: 1, textAlign: "center" }}>
          <div style={{ height: 68, display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: `${(b / max) * 100}%`, minHeight: b ? 4 : 0, background: i === youBin ? C.cyan : C.line, borderRadius: "3px 3px 0 0", transition: "height .8s" }} />
          </div>
          <div style={{ fontFamily: mono, fontSize: 9.5, color: i === youBin ? C.cyan : C.inkDim, marginTop: 5 }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

function Radar({ dimScores, lang }) {
  const data = Object.entries(dimScores);
  const n = data.length; if (n < 3) return null;
  const cx = 140, cy = 140, R = 100;
  const pt = (i, r) => { const ang = (Math.PI * 2 * i) / n - Math.PI / 2; return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r]; };
  const poly = data.map(([, m], i) => pt(i, (m.pct / 100) * R).join(",")).join(" ");
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
      <svg width="290" height="300" viewBox="0 0 290 300">
        {[0.25, 0.5, 0.75, 1].map((r, i) => <polygon key={i} points={data.map((_, j) => pt(j, R * r).join(",")).join(" ")} fill="none" stroke={C.line} strokeWidth="1" />)}
        {data.map((_, i) => { const [x, y] = pt(i, R); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={C.line} strokeWidth="1" />; })}
        <polygon points={poly} fill="rgba(54,201,217,0.18)" stroke={C.cyan} strokeWidth="2" />
        {data.map(([k, m], i) => { const [x, y] = pt(i, (m.pct / 100) * R); return <circle key={i} cx={x} cy={y} r="3.5" fill={DIMS[k].color} />; })}
        {data.map(([k], i) => { const [x, y] = pt(i, R + 22); return <text key={i} x={x} y={y} fill={C.inkDim} fontSize="10" fontFamily={mono} textAnchor={Math.abs(x - cx) < 10 ? "middle" : x > cx ? "start" : "end"}>{DIMS[k][lang]}</text>; })}
      </svg>
    </div>
  );
}

// ============================================================
// ADMIN
// ============================================================
function ProfileView({ t, lang, name, onBack, onStart }) {
  const [runs, setRuns] = useState(null);
  useEffect(() => {
    const key = (name || "").trim().toLowerCase();
    loadAvatarHistory(key).then(setRuns);
  }, [name]);

  if (runs === null) return <div style={{ padding: 60, fontFamily: mono, color: C.inkDim }}>…</div>;

  const SEN = {
    1: { de: "Orientierungsphase", en: "Orientation Phase", color: C.red },
    2: { de: "Neugieriger Beobachter", en: "Curious Observer", color: C.violet },
    3: { de: "Aufgeklärter Einsteiger", en: "Informed Beginner", color: C.amber },
    4: { de: "Strategischer Anwender", en: "Strategic Practitioner", color: C.cyan },
    5: { de: "AI-Native Leader", en: "AI-Native Leader", color: C.green },
  };
  const fmtDate = (ts) => new Date(ts).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="fu" style={{ padding: "28px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <Eyebrow color={C.cyan}>{t.profileTitle}</Eyebrow>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>{name}</div>
        </div>
        <button onClick={onBack} style={btnSecondary}>{t.backToStart}</button>
      </div>

      {runs.length === 0 ? (
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "24px 20px", marginTop: 22 }}>
          <div style={{ fontSize: 15, marginBottom: 8 }}>{t.profileEmpty}</div>
          <div style={{ color: C.inkDim, fontSize: 13.5, lineHeight: 1.55, marginBottom: 18 }}>{t.profileEmptyHint}</div>
          <button onClick={onStart} style={btnPrimary}>{t.start}</button>
        </div>
      ) : (() => {
        const scores = runs.map((r) => r.score);
        const best = Math.max(...scores);
        const latest = scores[scores.length - 1];
        const first = scores[0];
        const max = Math.max(...scores, 100);
        const delta = latest - first;
        return (
          <>
            {/* Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, margin: "22px 0" }}>
              <Stat label={t.profileRuns} value={runs.length} color={C.cyan} />
              <Stat label={t.profileLatest} value={latest} color={C.gold} />
              <Stat label={t.profileBest} value={best} color={C.green} />
              <Stat label={t.profileDelta} value={(delta > 0 ? "+" : "") + delta} color={delta >= 0 ? C.green : C.red} />
            </div>

            {/* Trend chart */}
            <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 20px", margin: "16px 0" }}>
              <Eyebrow color={C.cyan}>{t.profileTrend}</Eyebrow>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90, marginTop: 14 }}>
                {runs.map((r, i) => {
                  const isLast = i === runs.length - 1;
                  const sen = SEN[r.seniority] || SEN[1];
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 30 }}>
                      <div style={{ fontFamily: mono, fontSize: 11, color: isLast ? C.gold : C.inkDim }}>{r.score}</div>
                      <div title={fmtDate(r.ts)} style={{ width: "100%", maxWidth: 44, height: `${Math.max(6, (r.score / max) * 60)}px`, background: isLast ? C.gold : sen.color, borderRadius: 3, opacity: isLast ? 1 : 0.8 }} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Run list */}
            <div style={{ display: "grid", gap: 10, margin: "16px 0" }}>
              {[...runs].reverse().map((r, i) => {
                const sen = SEN[r.seniority] || SEN[1];
                return (
                  <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 800, color: sen.color, minWidth: 44 }}>{r.score}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: sen.color }}>{sen[lang]}</div>
                      <div style={{ fontFamily: mono, fontSize: 11, color: C.inkDim }}>{fmtDate(r.ts)}{r.area ? " · " + r.area : ""}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button onClick={onStart} style={btnPrimary}>{t.profileAddRun}</button>
          </>
        );
      })()}
    </div>
  );
}

function Admin({ t, lang, onBack }) {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);
  const [cohort, setCohort] = useState([]);
  const [stats, setStats] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [diag, setDiag] = useState(null);

  useEffect(() => { if (authed) { Promise.all([loadCohort(), loadItemStats(), storageDiagnose()]).then(([c, s, d]) => { setCohort(c); setStats(s); setDiag(d); setLoaded(true); }); } }, [authed]);

  if (!authed) {
    return (
      <div className="fu" style={{ padding: "60px 0", maxWidth: 320 }}>
        <Eyebrow color={C.amber}>{t.adminTitle}</Eyebrow>
        <div style={{ marginTop: 16, fontSize: 14, color: C.inkDim, marginBottom: 12 }}>{t.enterPin}</div>
        <input type="password" value={pin} onChange={(e) => { setPin(e.target.value); setErr(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") { if (pin === ADMIN_PIN) setAuthed(true); else setErr(true); } }}
          style={{ width: "100%", background: C.panel, border: `1px solid ${err ? C.red : C.line}`, color: C.ink, borderRadius: 8, padding: "11px 13px", fontSize: 15, fontFamily: mono }} />
        {err && <div style={{ color: C.red, fontSize: 12, marginTop: 6 }}>{t.wrongPin}</div>}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button onClick={() => { if (pin === ADMIN_PIN) setAuthed(true); else setErr(true); }} style={btnPrimary}>{t.unlock}</button>
          <button onClick={onBack} style={btnSecondary}>{t.backToStart}</button>
        </div>
      </div>
    );
  }

  if (!loaded) return <div style={{ padding: 60, fontFamily: mono, color: C.inkDim }}>…</div>;

  const n = cohort.length;
  const scores = cohort.map((r) => r.score).sort((a, b) => a - b);
  const avg = n ? Math.round(scores.reduce((a, b) => a + b, 0) / n) : 0;
  const median = n ? scores[Math.floor(n / 2)] : 0;
  const cleanRate = n ? Math.round((cohort.filter((r) => r.integrity === "clean").length / n) * 100) : 0;

  const groupBy = (key) => {
    const g = {};
    cohort.forEach((r) => { const v = r[key] || "—"; if (!g[v]) g[v] = []; g[v].push(r.score); });
    return Object.entries(g).map(([k, arr]) => ({ k, n: arr.length, avg: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) })).sort((a, b) => b.avg - a.avg);
  };

  const hardest = Object.values(stats)
    .filter((s) => s.asked >= 1)
    .map((s) => ({ ...s, rate: Math.round((s.correct / s.asked) * 100) }))
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 8);

  return (
    <div className="fu" style={{ padding: "28px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div><Eyebrow color={C.amber}>{t.adminTitle}</Eyebrow><div style={{ color: C.inkDim, fontSize: 13, marginTop: 6 }}>{t.adminSub}</div></div>
        <button onClick={onBack} style={btnSecondary}>{t.backToStart}</button>
      </div>

      {/* Storage diagnostics — explains an empty panel */}
      {diag && (
        <div style={{ background: C.panelHi, border: `1px solid ${diag.shared ? (diag.ok ? C.green : C.red) : C.amber}`, borderRadius: 10, padding: "12px 16px", margin: "18px 0", fontSize: 13, lineHeight: 1.55 }}>
          <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.12em", color: diag.shared ? (diag.ok ? C.green : C.red) : C.amber, marginBottom: 6 }}>SPEICHER-STATUS</div>
          {diag.shared ? (
            diag.ok ? (
              <span style={{ color: C.inkDim }}>{lang === "de"
                ? `Geteilter Speicher (Supabase) ist verbunden und lesbar. ${diag.count} Durchläufe gespeichert. Der Vergleich umfasst alle Teilnehmer.`
                : `Shared storage (Supabase) is connected and readable. ${diag.count} runs stored. The comparison covers all participants.`}</span>
            ) : (
              <span style={{ color: C.ink }}>{lang === "de"
                ? `Supabase ist konfiguriert, aber der Lesezugriff schlägt fehl: „${diag.error}". Prüfe, ob die Tabelle kv_store existiert und die RLS-Policy anon-Zugriff erlaubt (siehe README, Option C).`
                : `Supabase is configured but reading fails: "${diag.error}". Check that the kv_store table exists and the RLS policy allows anon access (see README, Option C).`}</span>
            )
          ) : (
            <span style={{ color: C.ink }}>{lang === "de"
              ? "Es läuft im LOKALEN Modus (kein Supabase verbunden). Das Admin-Panel zeigt deshalb nur Durchläufe AUS DIESEM Browser — Durchläufe anderer Teilnehmer erscheinen nicht. Für den geteilten Vergleich müssen die beiden VITE_SUPABASE_*-Variablen bei Vercel gesetzt und neu deployed werden (siehe README, Option C)."
              : "Running in LOCAL mode (no Supabase connected). The admin panel therefore only shows runs FROM THIS browser — other participants' runs won't appear. For the shared comparison, set the two VITE_SUPABASE_* variables in Vercel and redeploy (see README, Option C)."}</span>
          )}
        </div>
      )}

      {n === 0 ? <div style={{ padding: 24, color: C.inkDim, fontSize: 14 }}>{t.noData}</div> : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, margin: "22px 0" }}>
            <Stat label={t.totalRuns} value={n} color={C.cyan} />
            <Stat label={t.avgScoreAdmin} value={avg} color={C.amber} />
            <Stat label={t.medianScore} value={median} color={C.gold} />
            <Stat label={t.avgIntegrity} value={cleanRate + "%"} color={C.green} />
          </div>

          <GroupTable title={t.byRole} rows={groupBy("role")} />
          <GroupTable title={t.byArea} rows={groupBy("area")} />
          <GroupTable title={t.byAge} rows={groupBy("age")} />

          <div style={{ margin: "26px 0" }}>
            <Eyebrow color={C.red}>{t.hardestQuestions}</Eyebrow>
            <div style={{ color: C.inkDim, fontSize: 12.5, margin: "6px 0 14px" }}>{t.hardestSub}</div>
            <div style={{ display: "grid", gap: 10 }}>
              {hardest.map((h, i) => (
                <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 13.5, lineHeight: 1.4 }}>{h.q}</span>
                    <span style={{ fontFamily: mono, fontSize: 12, color: h.rate < 40 ? C.red : h.rate < 70 ? C.amber : C.green, whiteSpace: "nowrap" }}>{h.rate}%</span>
                  </div>
                  <Bar value={h.rate} color={h.rate < 40 ? C.red : h.rate < 70 ? C.amber : C.green} height={5} />
                  <div style={{ fontFamily: mono, fontSize: 10, color: C.inkDim, marginTop: 5 }}>{h.correct}/{h.asked} {t.correctRate} · {h.asked} {t.timesAsked}</div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={async () => { if (window.confirm(t.resetConfirm)) { await resetAll(); setCohort([]); setStats({}); } }}
            style={{ ...btnSecondary, borderColor: C.red, color: C.red, marginTop: 10 }}>{t.resetAll}</button>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 26, fontWeight: 800, fontFamily: mono, color }}>{value}</div>
      <div style={{ fontFamily: mono, fontSize: 10.5, color: C.inkDim, letterSpacing: "0.08em", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function GroupTable({ title, rows }) {
  if (!rows.length) return null;
  const max = Math.max(...rows.map((r) => r.avg), 1);
  return (
    <div style={{ margin: "22px 0" }}>
      <Eyebrow color={C.cyan}>{title}</Eyebrow>
      <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
        {rows.map((r) => (
          <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, width: 170, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.k}</span>
            <div style={{ flex: 1 }}><Bar value={r.avg} max={max} color={C.cyan} height={8} /></div>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.inkDim, width: 70, textAlign: "right" }}>{r.avg} · n={r.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- button styles ----
const btnPrimary = { background: C.amber, color: C.bg, border: "none", padding: "14px 26px", borderRadius: 10, fontWeight: 700, fontSize: 15 };
const btnSecondary = { background: "transparent", color: C.ink, border: `1px solid ${C.line}`, padding: "12px 22px", borderRadius: 10, fontWeight: 600, fontSize: 14 };
