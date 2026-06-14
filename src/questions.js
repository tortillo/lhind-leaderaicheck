// ============================================================
// QUESTIONS — separated from app logic for easy editing.
// ------------------------------------------------------------
// Structure (Ng et al. 2021 AI-literacy framework + Bloom levels):
//   dim:  understand | apply | evaluate | ethics | lead | practice
//   diff: 1 (recall) .. 4 (analysis/evaluation)
//   trap: true  => control item to catch external-tool usage
//   ctx:  optional area tag, preferred when it matches the user's area
//   q:    I("Deutsch", "English")
//   a:    [ I(...), I(...), I(...), I(...) ]   (always 4 options)
//   correct: index 0..3
//   expl: I("Erläuterung …", "Explanation …")  <-- shown in feedback & review
//
// To add questions: copy a block, keep the same shape, give it an `expl`.
// Keep options similar in length; make distractors plausible misconceptions.
// ============================================================

export const I = (de, en) => ({ de, en });

export const POOL = [
  // ============================================================
  // UNDERSTAND
  // ============================================================
  {
    dim: "understand", diff: 1,
    q: I("Was sagt die 'Temperatur' bei einem Sprachmodell aus?",
         "What does 'temperature' control in a language model?"),
    a: [
      I("Die Rechenlast des Servers", "The server's compute load"),
      I("Wie zufällig/variabel die Ausgaben sind", "How random / variable the outputs are"),
      I("Die maximale Eingabelänge", "The maximum input length"),
      I("Die Genauigkeit der Faktenbasis", "The accuracy of the factual base"),
    ], correct: 1,
    expl: I("Die Temperatur steuert die Zufälligkeit bei der Token-Auswahl: niedrig = fokussiert/wiederholbar, hoch = kreativer/variabler. Sie verbessert nicht die Faktentreue.",
            "Temperature controls randomness in token selection: low = focused/repeatable, high = more creative/variable. It does not improve factual accuracy."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Warum kann dasselbe Modell auf dieselbe Frage unterschiedliche Antworten geben?",
         "Why can the same model give different answers to the same question?"),
    a: [
      I("Weil es zwischendurch dazulernt", "Because it keeps learning between calls"),
      I("Wegen probabilistischen Samplings bei der Token-Auswahl", "Due to probabilistic sampling during token selection"),
      I("Weil die Internetverbindung schwankt", "Because the internet connection fluctuates"),
      I("Weil es absichtlich Fehler einbaut", "Because it deliberately inserts errors"),
    ], correct: 1,
    expl: I("Standardmodelle lernen im Gespräch nicht dazu. Die Variation entsteht durch probabilistisches Sampling — das Modell zieht das nächste Token aus einer Wahrscheinlichkeitsverteilung.",
            "Standard models don't learn during a chat. Variation comes from probabilistic sampling — the model draws the next token from a probability distribution."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Ein Modell beantwortet eine Frage zu einem Ereignis von letzter Woche überzeugend. Was ist die wahrscheinlichste Erklärung, wenn es KEINE Websuche nutzt?",
         "A model confidently answers about an event from last week. If it does NOT use web search, what's the most likely explanation?"),
    a: [
      I("Es hat Echtzeit-Zugriff auf Nachrichten", "It has real-time access to news"),
      I("Es extrapoliert/halluziniert plausibel über den Trainingsstand hinaus", "It plausibly extrapolates / hallucinates beyond its training cutoff"),
      I("Es speichert alle Antworten dauerhaft", "It permanently stores all answers"),
      I("Die Frage wurde vom Anbieter manuell beantwortet", "The provider answered the question manually"),
    ], correct: 1,
    expl: I("Ohne Websuche endet das Wissen am Knowledge Cutoff. Überzeugend klingende Aussagen zu neueren Ereignissen sind dann typischerweise plausible Erfindungen (Halluzinationen).",
            "Without web search, knowledge ends at the training cutoff. Confident statements about newer events are then typically plausible fabrications (hallucinations)."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Was beschreibt ein 'Kontextfenster' am besten?",
         "What best describes a 'context window'?"),
    a: [
      I("Die grafische Benutzeroberfläche", "The graphical user interface"),
      I("Die Menge an Text, die das Modell gleichzeitig berücksichtigen kann", "The amount of text the model can consider at once"),
      I("Ein Werbe-Pop-up im Tool", "An ad pop-up in the tool"),
      I("Die Zeit bis zum Knowledge Cutoff", "The time until the knowledge cutoff"),
    ], correct: 1,
    expl: I("Das Kontextfenster ist die Token-Menge (Eingabe + bisherige Konversation + Ausgabe), die das Modell gleichzeitig verarbeiten kann. Was darüber hinausgeht, 'sieht' es nicht mehr.",
            "The context window is the amount of tokens (input + prior conversation + output) the model can process at once. Anything beyond it is no longer 'seen'."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Worin unterscheidet sich Fine-Tuning grundsätzlich von Retrieval-Augmented Generation (RAG)?",
         "How does fine-tuning fundamentally differ from retrieval-augmented generation (RAG)?"),
    a: [
      I("Fine-Tuning ist immer billiger als RAG", "Fine-tuning is always cheaper than RAG"),
      I("Fine-Tuning verändert Modellgewichte, RAG reicht zur Laufzeit externes Wissen an", "Fine-tuning changes model weights; RAG supplies external knowledge at runtime"),
      I("RAG funktioniert nur mit Bildern", "RAG only works with images"),
      I("Beide sind identisch, nur andere Namen", "Both are identical, just different names"),
    ], correct: 1,
    expl: I("Fine-Tuning passt die Gewichte des Modells an (es 'lernt' einen Stil/Aufgabe). RAG lässt das Modell unverändert und reicht zur Laufzeit relevante Dokumente in den Kontext — gut für aktuelles/firmeninternes Wissen.",
            "Fine-tuning adjusts the model's weights (it 'learns' a style/task). RAG leaves the model unchanged and feeds relevant documents into context at runtime — good for current/internal knowledge."),
  },
  {
    dim: "understand", diff: 4,
    q: I("Ein Anbieter wirbt: 'Unser Modell macht keine Fehler mehr dank höherer Parameterzahl.' Wie bewertest du diese Aussage fachlich?",
         "A vendor claims: 'Our model no longer makes mistakes thanks to more parameters.' How do you assess this technically?"),
    a: [
      I("Korrekt — mehr Parameter eliminieren Halluzinationen", "Correct — more parameters eliminate hallucinations"),
      I("Irreführend — mehr Parameter reduzieren manche Fehler, beseitigen Halluzinationen aber nicht prinzipiell", "Misleading — more parameters reduce some errors but don't fundamentally remove hallucinations"),
      I("Korrekt, sofern das Modell quelloffen ist", "Correct, as long as the model is open source"),
      I("Irrelevant, weil Parameter keine Rolle spielen", "Irrelevant, because parameters don't matter"),
    ], correct: 1,
    expl: I("Mehr Parameter können Leistung verbessern, aber Halluzinationen sind dem probabilistischen Grundprinzip inhärent. Kein heutiges Modell ist fehlerfrei — solche Werbeaussagen sind ein Warnsignal.",
            "More parameters can improve performance, but hallucinations are inherent to the probabilistic design. No model today is error-free — such marketing claims are a red flag."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Was ist ein 'System-Prompt'?", "What is a 'system prompt'?"),
    a: [
      I("Eine Fehlermeldung des Betriebssystems", "An OS error message"),
      I("Eine vorgelagerte Instruktion, die Rolle und Verhalten des Modells rahmt", "An upstream instruction framing the model's role and behavior"),
      I("Der schnellste Modus eines Modells", "A model's fastest mode"),
      I("Das Passwort für die API", "The API password"),
    ], correct: 1,
    expl: I("Der System-Prompt legt vor dem Gespräch Rolle, Tonalität und Regeln fest. Er prägt, wie das Modell antwortet, ist aber kein Sicherheits- oder Geheimnisspeicher.",
            "The system prompt sets role, tone and rules before the conversation. It shapes how the model responds but is not a security or secret store."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Warum ist ein Modell mit größerem Kontextfenster nicht automatisch 'klüger'?",
         "Why is a model with a larger context window not automatically 'smarter'?"),
    a: [
      I("Größerer Kontext erhöht immer die Faktentreue", "Larger context always increases factual accuracy"),
      I("Mehr Kontext erweitert nur die verarbeitbare Textmenge, nicht zwingend die Schlussfolgerungsqualität", "More context only widens how much text can be processed, not necessarily reasoning quality"),
      I("Kontextgröße bestimmt die Trainingsdaten", "Context size determines the training data"),
      I("Größerer Kontext senkt immer die Kosten", "Larger context always lowers cost"),
    ], correct: 1,
    expl: I("Ein großes Kontextfenster hilft bei umfangreichen Dokumenten, sagt aber nichts über die Denk-/Schlussfolgerungsqualität aus. Modelle können in langem Kontext sogar Details 'übersehen'.",
            "A large context window helps with big documents but says nothing about reasoning quality. Models can even 'lose' details in very long contexts."),
  },
  {
    dim: "understand", diff: 1,
    q: I("Was bedeutet 'multimodal' bei einem KI-Modell?", "What does 'multimodal' mean for an AI model?"),
    a: [
      I("Es läuft auf mehreren Servern", "It runs on multiple servers"),
      I("Es verarbeitet mehrere Eingabearten, z. B. Text und Bild", "It handles multiple input types, e.g. text and images"),
      I("Es hat mehrere Preismodelle", "It has multiple pricing tiers"),
      I("Es spricht mehrere Sprachen", "It speaks several languages"),
    ], correct: 1,
    expl: I("Multimodal heißt: das Modell kann verschiedene Eingabe-/Ausgabearten verarbeiten — etwa Text, Bild, Audio. Mehrsprachigkeit ist davon unabhängig.",
            "Multimodal means the model can handle different input/output types — e.g. text, image, audio. Multilingual ability is a separate thing."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Ein Modell 'weiß' interne Firmenzahlen, die nie öffentlich waren. Was ist die plausibelste Erklärung?",
         "A model 'knows' internal company figures that were never public. What's the most plausible explanation?"),
    a: [
      I("Das Modell hat sie erraten/halluziniert oder sie wurden im Prompt/Tool mitgegeben", "It guessed/hallucinated them, or they were supplied via prompt/tool"),
      I("Das Modell hat heimlich die Firmen-IT gehackt", "The model secretly hacked the company IT"),
      I("KI hat generell Zugriff auf alle Firmendaten", "AI generally has access to all company data"),
      I("Das ist technisch unmöglich", "That is technically impossible"),
    ], correct: 0,
    expl: I("Ein Modell hat keinen Zugriff auf nicht-öffentliche Daten, außer sie wurden ihm im Prompt oder über ein Tool gegeben. Treffer ohne solche Quelle sind Raten/Halluzination — niemals als Fakt behandeln.",
            "A model can't access non-public data unless it was provided via prompt or a tool. A 'hit' without such a source is guessing/hallucination — never treat it as fact."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Was beschreibt 'Inference' am besten?", "What best describes 'inference'?"),
    a: [
      I("Das Training des Modells", "Training the model"),
      I("Die Nutzung des fertigen Modells zur Erzeugung einer Antwort", "Using the finished model to produce an answer"),
      I("Das Löschen von Trainingsdaten", "Deleting training data"),
      I("Die Komprimierung der Modellgewichte", "Compressing the model weights"),
    ], correct: 1,
    expl: I("Inferenz ist die Anwendungsphase: das bereits trainierte Modell erzeugt zur Laufzeit Ausgaben. Davon zu unterscheiden ist das (einmalige, teure) Training.",
            "Inference is the usage phase: the already-trained model produces outputs at runtime. This is distinct from (one-time, expensive) training."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Wofür eignet sich ein schnelles, günstiges 'kleines' Modell (Haiku/Flash/Mini-Klasse) am besten?",
         "What is a fast, cheap 'small' model (Haiku/Flash/Mini class) best for?"),
    a: [
      I("Tiefste wissenschaftliche Beweisführung", "The deepest scientific proofs"),
      I("Hohe Stückzahl einfacher Aufgaben: Klassifizieren, Extrahieren, kurze Antworten", "High-volume simple tasks: classifying, extracting, short answers"),
      I("Komplexe mehrstufige Strategieanalysen", "Complex multi-step strategy analysis"),
      I("Gar nichts Sinnvolles", "Nothing useful"),
    ], correct: 1,
    expl: I("Kleine Modelle sind ideal für hohe Stückzahlen einfacher, klar umrissener Aufgaben — günstig und schnell. Für komplexes Schlussfolgern nimmt man stärkere Modelle.",
            "Small models are ideal for high volumes of simple, well-defined tasks — cheap and fast. For complex reasoning you use stronger models."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Was ist der wichtigste Unterschied zwischen offenen (self-hostbaren) und geschlossenen API-Modellen für Unternehmen?",
         "What's the key difference between open (self-hostable) and closed API models for enterprises?"),
    a: [
      I("Offene Modelle sind immer besser", "Open models are always better"),
      I("Bei self-hostbaren Modellen bleiben die Daten im eigenen Haus; bei API-Modellen verlassen sie es bei jedem Aufruf", "With self-hostable models data stays in-house; with API models it leaves on every call"),
      I("Geschlossene Modelle sind immer kostenlos", "Closed models are always free"),
      I("Es gibt keinen Unterschied", "There is no difference"),
    ], correct: 1,
    expl: I("Der entscheidende Governance-Unterschied ist der Datenfluss: self-hostbare Modelle erlauben Verarbeitung im eigenen Netz, bei API-Modellen verlassen die Daten das Haus. Qualität ist davon unabhängig.",
            "The key governance difference is data flow: self-hostable models allow in-house processing; with API models data leaves the building. Quality is a separate question."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Ein 'Reasoning-Modell' unterscheidet sich von einem Standardmodell vor allem wodurch?",
         "A 'reasoning model' differs from a standard model mainly by what?"),
    a: [
      I("Es ist immer billiger", "It is always cheaper"),
      I("Es investiert mehr Rechenzeit in mehrstufiges Schlussfolgern vor der Antwort", "It spends more compute on multi-step reasoning before answering"),
      I("Es kann keine Sprache", "It can't do language"),
      I("Es läuft nur lokal", "It only runs locally"),
    ], correct: 1,
    expl: I("Reasoning-Modelle 'denken' vor der Antwort in mehreren Schritten — besser für komplexe Aufgaben, aber langsamer und teurer. Für einfache Aufgaben oft überdimensioniert.",
            "Reasoning models 'think' in multiple steps before answering — better for complex tasks, but slower and costlier. Often overkill for simple tasks."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Wann ist ein Modell mit sehr großem Kontextfenster (1M+) besonders wertvoll?",
         "When is a model with a very large context window (1M+) especially valuable?"),
    a: [
      I("Für sehr kurze Chats", "For very short chats"),
      I("Wenn umfangreiche Dokumente/Codebasen am Stück berücksichtigt werden müssen", "When large documents/codebases must be considered at once"),
      I("Nie, Kontext ist unwichtig", "Never, context is irrelevant"),
      I("Nur für Bildgenerierung", "Only for image generation"),
    ], correct: 1,
    expl: I("Sehr große Kontextfenster lohnen sich, wenn viel Material am Stück betrachtet werden muss — lange Verträge, ganze Codebasen, umfangreiche Reports.",
            "Very large context windows pay off when a lot of material must be considered at once — long contracts, whole codebases, extensive reports."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Was bedeutet es, dass LLMs 'stateless' sind?",
         "What does it mean that LLMs are 'stateless'?"),
    a: [
      I("Sie haben keine Meinung", "They have no opinion"),
      I("Ohne mitgesendeten Verlauf erinnern sie sich nicht an frühere Nachrichten", "Without the history being re-sent, they don't remember earlier messages"),
      I("Sie funktionieren nur in den USA", "They only work in the US"),
      I("Sie speichern alles dauerhaft", "They store everything permanently"),
    ], correct: 1,
    expl: I("Ein Modell hat kein eigenes Gedächtnis zwischen Aufrufen. 'Erinnerung' entsteht nur, weil die App den bisherigen Verlauf bei jedem Aufruf erneut mitschickt.",
            "A model has no memory of its own between calls. 'Memory' exists only because the app re-sends the prior conversation with each call."),
  },
];

// ============================================================
// APPLY (business)
// ============================================================
POOL.push(
  {
    dim: "apply", diff: 2,
    q: I("Du willst KI in einem Prozess pilotieren. Was solltest du VOR dem Pilot zwingend festlegen?",
         "You want to pilot AI in a process. What must you define BEFORE the pilot?"),
    a: [
      I("Das Marketing-Budget für den Launch", "The marketing budget for the launch"),
      I("Eine messbare Baseline und Erfolgskriterien", "A measurable baseline and success criteria"),
      I("Den Namen des Chatbots", "The chatbot's name"),
      I("Die Farbe des Dashboards", "The dashboard color"),
    ], correct: 1,
    expl: I("Ohne Baseline und definierte Erfolgskriterien lässt sich der Nutzen eines Piloten nicht belegen — man weiß hinterher nicht, ob es besser geworden ist.",
            "Without a baseline and defined success criteria you can't prove a pilot's value — afterwards you won't know whether anything actually improved."),
  },
  {
    dim: "apply", diff: 3, ctx: "Sales / Account",
    q: I("Im Vertrieb soll KI Angebotstexte erstellen. Welcher Ansatz schützt am besten vor blamablen Fehlern beim Kunden?",
         "In sales, AI should draft proposal texts. Which approach best protects against embarrassing errors to the customer?"),
    a: [
      I("KI-Text ungeprüft direkt versenden, um Zeit zu sparen", "Send the AI text unchecked to save time"),
      I("Mensch-Review für Zahlen, Zusagen und Kundennamen vor Versand", "Human review of figures, commitments and customer names before sending"),
      I("Nur die Rechtschreibung prüfen lassen", "Only run a spell check"),
      I("Den Kunden bitten, Fehler selbst zu melden", "Ask the customer to report errors themselves"),
    ], correct: 1,
    expl: I("KI kann Zahlen, Namen und Zusagen plausibel, aber falsch erzeugen. Beim Kunden zählt das doppelt — ein gezielter menschlicher Check genau dieser Elemente ist Pflicht.",
            "AI can produce figures, names and commitments that look plausible but are wrong. With customers that matters doubly — a targeted human check of exactly these elements is mandatory."),
  },
  {
    dim: "apply", diff: 3, ctx: "Operations",
    q: I("Ein Prozess hat hohe Varianz und unklare Regeln. Eignet sich generative KI hier als alleinige Entscheidungsinstanz?",
         "A process has high variance and unclear rules. Is generative AI suitable as the sole decision-maker here?"),
    a: [
      I("Ja, KI ist bei Unklarheit besonders zuverlässig", "Yes, AI is especially reliable when things are unclear"),
      I("Nein — unklare Regeln + hohe Varianz erhöhen Fehlerrisiko, Mensch-im-Prozess nötig", "No — unclear rules + high variance raise error risk, human-in-the-loop is needed"),
      I("Ja, sofern das Modell groß genug ist", "Yes, if the model is large enough"),
      I("Nur nachts, wegen geringerer Serverlast", "Only at night, due to lower server load"),
    ], correct: 1,
    expl: I("Gerade bei unklaren Regeln und hoher Varianz steigt das Fehlerrisiko. Solche Prozesse brauchen menschliche Aufsicht; KI eignet sich besser für klar definierte, wiederholbare Fälle.",
            "Precisely with unclear rules and high variance the error risk grows. Such processes need human oversight; AI fits better for well-defined, repeatable cases."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Zwei Use-Cases konkurrieren ums Budget: A spart 5% Zeit bei 200 MA, B spart 30% bei 8 MA. Welche Zusatzinfo ist für die Priorisierung am wichtigsten?",
         "Two use-cases compete for budget: A saves 5% time for 200 staff, B saves 30% for 8 staff. Which extra info matters most for prioritization?"),
    a: [
      I("Welcher Use-Case 'innovativer' klingt", "Which use-case sounds more 'innovative'"),
      I("Umsetzungsaufwand, Risiko und absoluter Wertbeitrag beider Optionen", "Implementation effort, risk and absolute value contribution of both"),
      I("Welches Team zuerst gefragt hat", "Which team asked first"),
      I("Die Anzahl benötigter Lizenzen", "The number of licenses needed"),
    ], correct: 1,
    expl: I("5% von 200 MA kann absolut mehr wert sein als 30% von 8 MA. Erst Aufwand, Risiko und absoluter Wertbeitrag zusammen erlauben eine fundierte Priorisierung.",
            "5% of 200 staff may be worth more in absolute terms than 30% of 8. Only effort, risk and absolute value together allow a sound prioritization."),
  },
  {
    dim: "apply", diff: 3, ctx: "Finance",
    q: I("KI soll Finanzberichte zusammenfassen. Welches Risiko ist hier am gravierendsten?",
         "AI should summarize financial reports. Which risk is most severe here?"),
    a: [
      I("Zu lange Zusammenfassungen", "Summaries that are too long"),
      I("Subtile Zahlendreher/Fehlinterpretationen, die unbemerkt in Entscheidungen einfließen", "Subtle number errors / misreadings flowing unnoticed into decisions"),
      I("Ein unschöner Schrifttyp", "An ugly font"),
      I("Zu wenige Emojis im Bericht", "Too few emojis in the report"),
    ], correct: 1,
    expl: I("Bei Finanzdaten sind subtile Zahlenfehler besonders gefährlich, weil sie plausibel aussehen und direkt in Entscheidungen einfließen. Kernzahlen müssen gegengeprüft werden.",
            "With financial data, subtle number errors are especially dangerous because they look plausible and flow straight into decisions. Key figures must be cross-checked."),
  },
  {
    dim: "apply", diff: 2, ctx: "Marketing",
    q: I("KI erzeugt Marketingtexte in Sekunden. Was bleibt die Hauptaufgabe des Menschen?",
         "AI produces marketing copy in seconds. What stays the human's main task?"),
    a: [
      I("Den Output ungeprüft skalieren", "Scaling output unchecked"),
      I("Strategie, Markenstimme, Faktencheck und Auswahl", "Strategy, brand voice, fact-check and selection"),
      I("Die KI möglichst oft loben", "Praising the AI as often as possible"),
      I("Nur noch Tippfehler korrigieren", "Only fixing typos"),
    ], correct: 1,
    expl: I("KI liefert Rohmaterial. Strategie, Markenkonsistenz, Faktenprüfung und die Auswahl des Richtigen bleiben menschliche Verantwortung — sonst skaliert man Mittelmaß und Fehler.",
            "AI provides raw material. Strategy, brand consistency, fact-checking and selecting the right option remain human responsibilities — otherwise you scale mediocrity and errors."),
  },
  {
    dim: "apply", diff: 4, ctx: "Finance",
    q: I("Ein KI-Tool prognostiziert Marktbewegungen mit hoher Trefferquote im Backtest. Welche Skepsis ist fachlich am wichtigsten?",
         "An AI tool forecasts market moves with high backtest accuracy. Which skepticism matters most technically?"),
    a: [
      I("Ob die Farben des Charts passen", "Whether the chart colors fit"),
      I("Overfitting & Look-ahead-Bias — Backtest-Güte sagt wenig über die Zukunft", "Overfitting & look-ahead bias — backtest fit says little about the future"),
      I("Ob das Tool ein Logo hat", "Whether the tool has a logo"),
      I("Wie viele Nutzer es hat", "How many users it has"),
    ], correct: 1,
    expl: I("Hohe Backtest-Trefferquoten entstehen leicht durch Overfitting oder Look-ahead-Bias. Entscheidend ist die Leistung auf echten, ungesehenen Daten, nicht die Anpassung an die Vergangenheit.",
            "High backtest accuracy easily arises from overfitting or look-ahead bias. What matters is performance on real, unseen data, not fit to the past."),
  },
  {
    dim: "apply", diff: 3, ctx: "Pricing / Commerce",
    q: I("KI soll dynamische Preise vorschlagen. Was muss vor Produktivsetzung zwingend abgesichert sein?",
         "AI should propose dynamic prices. What must be secured before going live?"),
    a: [
      I("Dass die KI möglichst kreativ ist", "That the AI is as creative as possible"),
      I("Regelkonformität, Preis-Leitplanken und ein Override durch Menschen", "Regulatory compliance, price guardrails and a human override"),
      I("Dass nachts niemand mitliest", "That nobody watches at night"),
      I("Die Anzahl der Nachkommastellen", "The number of decimal places"),
    ], correct: 1,
    expl: I("Dynamische Preise berühren Regulatorik und Kundenvertrauen. Klare Leitplanken, Compliance und ein menschlicher Override verhindern Ausreißer mit teuren Folgen.",
            "Dynamic pricing touches regulation and customer trust. Clear guardrails, compliance and a human override prevent outliers with costly consequences."),
  },
  {
    dim: "apply", diff: 2,
    q: I("Welche Aufgabe eignet sich am besten für einen ersten, risikoarmen KI-Piloten?",
         "Which task is best for a first, low-risk AI pilot?"),
    a: [
      I("Rechtsverbindliche Vertragsentscheidungen", "Legally binding contract decisions"),
      I("Entwurf interner Textvorlagen mit menschlicher Freigabe", "Drafting internal text templates with human sign-off"),
      I("Automatische Kündigungen", "Automated terminations"),
      I("Medizinische Diagnosen ohne Arzt", "Medical diagnoses without a doctor"),
    ], correct: 1,
    expl: I("Ein guter erster Pilot hat geringe Tragweite und einen menschlichen Freigabeschritt. Interne Textentwürfe sind reversibel und risikoarm — ideal zum Lernen.",
            "A good first pilot is low-stakes with a human sign-off step. Internal text drafts are reversible and low-risk — ideal for learning."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Ein KI-Pilot zeigt 20% Zeitgewinn, aber die Fehlerquote steigt leicht. Wie entscheidest du?",
         "An AI pilot shows 20% time savings but the error rate rises slightly. How do you decide?"),
    a: [
      I("Sofort skalieren, Zeit schlägt alles", "Scale immediately, time beats everything"),
      I("Gesamtkosten von Fehlern gegen Zeitgewinn abwägen und Qualitätssicherung nachschärfen", "Weigh the total cost of errors against time savings and tighten QA"),
      I("Pilot abbrechen, jede Fehlerquote ist inakzeptabel", "Abort the pilot, any error rate is unacceptable"),
      I("Die Fehler ignorieren und nicht berichten", "Ignore the errors and not report them"),
    ], correct: 1,
    expl: I("Zeitgewinn und Fehlerkosten müssen gegeneinander abgewogen werden — je nach Folgekosten eines Fehlers kann selbst ein kleiner Anstieg teuer sein. Antwort: QS nachschärfen und neu bewerten.",
            "Time savings and error costs must be weighed against each other — depending on the cost of a mistake, even a small increase can be expensive. Answer: tighten QA and re-evaluate."),
  },
  {
    dim: "apply", diff: 3,
    q: I("Du musst hochvertrauliche Verträge automatisch kategorisieren. Welcher Ansatz passt am besten?",
         "You must auto-categorize highly confidential contracts. Which approach fits best?"),
    a: [
      I("Größtes Cloud-Modell, egal wo die Daten landen", "The largest cloud model, regardless of where data lands"),
      I("Ein lokal/selbst-gehostetes Modell (z. B. Mistral/Llama), damit Daten das Haus nicht verlassen", "A local/self-hosted model (e.g. Mistral/Llama) so data never leaves the building"),
      I("Die Verträge an einen kostenlosen Web-Chatbot kopieren", "Paste the contracts into a free web chatbot"),
      I("Gar keine KI, nur Bauchgefühl", "No AI at all, just gut feeling"),
    ], correct: 1,
    expl: I("Bei hochvertraulichen Daten zählt der Datenfluss mehr als die letzte Leistungsspitze. Ein lokal gehostetes Modell hält die Daten im Haus — Kategorisieren können auch kleinere Modelle gut.",
            "With highly confidential data, the data flow matters more than the last bit of peak performance. A self-hosted model keeps data in-house — categorization is well within smaller models' reach."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Was ist der Kerngedanke einer 'Model-Routing'-Strategie?",
         "What's the core idea of a 'model routing' strategy?"),
    a: [
      I("Immer das teuerste Modell nehmen", "Always use the most expensive model"),
      I("Aufgaben je nach Anspruch/Sensibilität dem passenden Modell zuweisen — klein/lokal für Einfaches, stark für Komplexes", "Assign tasks to the right model by complexity/sensitivity — small/local for simple, strong for complex"),
      I("Alle Aufgaben durch dasselbe Modell schicken", "Route everything through the same model"),
      I("Modelle zufällig auswählen", "Pick models at random"),
    ], correct: 1,
    expl: I("Model-Routing weist jede Aufgabe dem passenden Modell zu: einfache/sensible Fälle an kleine bzw. lokale Modelle, komplexe an starke. Das spart Kosten und schützt Daten.",
            "Model routing assigns each task to the right model: simple/sensitive cases to small or local models, complex ones to strong models. This saves cost and protects data."),
  },
  {
    dim: "apply", diff: 3,
    q: I("Warum kann es token-effizient sein, ein kleines Modell vorzuschalten?",
         "Why can it be token-efficient to put a small model in front?"),
    a: [
      I("Kleine Modelle sind immer genauer", "Small models are always more accurate"),
      I("Einfache Fälle werden günstig erledigt; nur schwere Fälle gehen ans teure Modell", "Simple cases are handled cheaply; only hard cases go to the expensive model"),
      I("Kleine Modelle brauchen keinen Strom", "Small models need no electricity"),
      I("Token spielen keine Rolle", "Tokens don't matter"),
    ], correct: 1,
    expl: I("Ein vorgeschaltetes kleines Modell erledigt die Masse einfacher Fälle günstig; nur die wirklich schweren Fälle landen beim teuren Modell. Das senkt die Gesamtkosten deutlich.",
            "A small model in front handles the bulk of easy cases cheaply; only genuinely hard cases reach the expensive model. This cuts total cost significantly."),
  },
  {
    dim: "apply", diff: 3,
    q: I("Eine anspruchsvolle, mehrstufige Research-Aufgabe mit Quellenarbeit steht an. Was ist sinnvoll?",
         "A demanding, multi-step research task with source work is due. What's sensible?"),
    a: [
      I("Ein winziges lokales 3B-Modell ohne Websuche", "A tiny local 3B model without web search"),
      I("Ein starkes Reasoning-Modell mit Werkzeug-/Websuche-Zugang und Quellenprüfung", "A strong reasoning model with tool/web access and source checking"),
      I("Ein Bildgenerator", "An image generator"),
      I("Ein reines Übersetzungstool", "A pure translation tool"),
    ], correct: 1,
    expl: I("Anspruchsvolle Recherche mit Quellen braucht starkes Schlussfolgern plus Werkzeug-/Websuche-Zugang — und am Ende menschliche Quellenprüfung. Ein winziges Offline-Modell überfordert das.",
            "Demanding research with sources needs strong reasoning plus tool/web access — and human source verification at the end. A tiny offline model is not up to it."),
  },
  {
    dim: "apply", diff: 2,
    q: I("Was spricht GEGEN ein lokales LLM, wenn die Aufgabe das stärkste verfügbare Reasoning braucht?",
         "What argues AGAINST a local LLM when the task needs the strongest available reasoning?"),
    a: [
      I("Lokale Modelle sind illegal", "Local models are illegal"),
      I("Kleinere lokale Modelle erreichen oft nicht die Spitzenleistung großer Frontier-Modelle", "Smaller local models often don't reach the peak performance of large frontier models"),
      I("Lokale Modelle kosten pro Token mehr", "Local models cost more per token"),
      I("Lokale Modelle brauchen zwingend Internet", "Local models strictly require the internet"),
    ], correct: 1,
    expl: I("Lokale Modelle sind top für Datenschutz, erreichen aber bei reiner Spitzenleistung oft nicht die großen Frontier-Modelle. Bei höchstem Reasoning-Bedarf ist das der zentrale Trade-off.",
            "Local models are great for privacy but often don't match large frontier models in peak capability. When top reasoning is required, that's the central trade-off."),
  },
);

// ============================================================
// EVALUATE / CREATE
// ============================================================
POOL.push(
  {
    dim: "evaluate", diff: 3,
    q: I("Eine KI nennt eine Studie mit Autor, Jahr und Journal. Was ist die fachlich saubere nächste Handlung?",
         "An AI cites a study with author, year and journal. What is the methodologically sound next step?"),
    a: [
      I("Sofort zitieren — die Angaben sind detailliert", "Cite immediately — the details are specific"),
      I("Existenz und Inhalt der Quelle unabhängig verifizieren", "Independently verify the source's existence and content"),
      I("Das Jahr leicht anpassen, falls es besser passt", "Slightly adjust the year if it fits better"),
      I("Nur prüfen, ob der Journalname klingt wie echt", "Only check whether the journal name sounds real"),
    ], correct: 1,
    expl: I("KI erfindet gelegentlich täuschend echte Quellenangaben. Detailgrad ist kein Echtheitsbeweis — die Quelle muss unabhängig auffindbar und inhaltlich passend sein.",
            "AI sometimes fabricates convincingly real citations. Specificity is no proof of authenticity — the source must be independently findable and actually match."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Zwei Modelle liefern bei gleicher Aufgabe widersprüchliche Ergebnisse. Welche Schlussfolgerung ist methodisch zulässig?",
         "Two models give contradictory results on the same task. Which conclusion is methodologically valid?"),
    a: [
      I("Das neuere Modell hat automatisch recht", "The newer model is automatically right"),
      I("Beide Ausgaben sind Hypothesen, die gegen eine verlässliche Quelle geprüft werden müssen", "Both outputs are hypotheses that must be checked against a reliable source"),
      I("Das längere Ergebnis ist korrekt", "The longer answer is correct"),
      I("Man mittelt einfach beide Antworten", "Just average the two answers"),
    ], correct: 1,
    expl: I("Weder Neuheit noch Länge entscheiden über Wahrheit. Widersprüchliche Ausgaben sind konkurrierende Hypothesen — Klarheit bringt nur eine verlässliche externe Quelle.",
            "Neither recency nor length determines truth. Contradictory outputs are competing hypotheses — only a reliable external source resolves them."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Welches Signal deutet am stärksten darauf hin, dass ein KI-Output für eine kritische Entscheidung NICHT ausreicht?",
         "Which signal most strongly indicates an AI output is NOT sufficient for a critical decision?"),
    a: [
      I("Die Antwort ist sprachlich elegant", "The answer is linguistically elegant"),
      I("Konkrete, prüfbare Belege fehlen oder lassen sich nicht verifizieren", "Concrete, checkable evidence is missing or unverifiable"),
      I("Die Antwort ist kurz", "The answer is short"),
      I("Die Antwort verwendet Fachbegriffe", "The answer uses technical terms"),
    ], correct: 1,
    expl: I("Eleganz, Länge und Fachjargon sagen nichts über Verlässlichkeit. Entscheidend ist, ob konkrete, prüfbare Belege vorliegen — fehlen sie, reicht es nicht für kritische Entscheidungen.",
            "Elegance, length and jargon say nothing about reliability. What matters is whether concrete, checkable evidence exists — if it's missing, it's not enough for critical decisions."),
  },
  {
    dim: "evaluate", diff: 2,
    q: I("Wie erkennst du am ehesten, dass ein KI-Text oberflächlich überzeugend, aber inhaltsleer ist?",
         "How do you best spot that an AI text is superficially convincing but hollow?"),
    a: [
      I("Es klingt flüssig", "It reads fluently"),
      I("Es bleibt bei Allgemeinplätzen ohne konkrete, prüfbare Aussagen", "It stays at generalities without concrete, checkable claims"),
      I("Es ist lang", "It is long"),
      I("Es nutzt Aufzählungen", "It uses bullet points"),
    ], correct: 1,
    expl: I("Flüssigkeit ist die Stärke von LLMs und kein Qualitätsmerkmal. Inhaltsleere zeigt sich an fehlenden konkreten, überprüfbaren Aussagen hinter den schönen Formulierungen.",
            "Fluency is an LLM's strength, not a quality signal. Hollowness shows in the absence of concrete, verifiable claims behind the nice phrasing."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Eine KI behauptet etwas und liefert auf Nachfrage 3 'Quellen', die alle nicht auffindbar sind. Welcher Schluss ist korrekt?",
         "An AI claims something and, when asked, provides 3 'sources' that are all unfindable. Which conclusion is correct?"),
    a: [
      I("Die Quellen sind sicher real, nur schwer zu finden", "The sources are surely real, just hard to find"),
      I("Starkes Halluzinations-Signal — Aussage gilt als unbelegt", "Strong hallucination signal — the claim counts as unsupported"),
      I("Die KI lügt absichtlich", "The AI lies on purpose"),
      I("Quellen sind ohnehin überbewertet", "Sources are overrated anyway"),
    ], correct: 1,
    expl: I("Nicht auffindbare Quellen sind ein klassisches Halluzinations-Muster. 'Absicht' unterstellt Intention, die ein Modell nicht hat — die Aussage gilt schlicht als unbelegt.",
            "Unfindable sources are a classic hallucination pattern. 'On purpose' implies intent a model doesn't have — the claim simply counts as unsupported."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Wann ist es sinnvoll, dieselbe Frage mehreren Modellen zu stellen?",
         "When does it make sense to ask the same question to several models?"),
    a: [
      I("Nie, das ist Zeitverschwendung", "Never, it's a waste of time"),
      I("Bei wichtigen Aussagen, um Konsens/Widersprüche als Prüfsignal zu nutzen", "For important claims, to use consensus/contradiction as a check signal"),
      I("Immer, denn das Mehrheitsvotum ist die Wahrheit", "Always, since the majority vote is the truth"),
      I("Nur bei Bildaufgaben", "Only for image tasks"),
    ], correct: 1,
    expl: I("Mehrere Modelle zu befragen kann Widersprüche aufdecken und so ein Prüfsignal liefern. Aber Mehrheit ist kein Wahrheitsbeweis — am Ende braucht es Verifikation.",
            "Querying several models can reveal contradictions and thus a check signal. But a majority is no proof of truth — verification is still required."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Wie zuverlässig sind automatische 'KI-Detektoren' für Text nach aktuellem Forschungsstand?",
         "How reliable are automatic 'AI detectors' for text per current research?"),
    a: [
      I("Praktisch unfehlbar", "Practically infallible"),
      I("Unzuverlässig — viele Falsch-Positive/Negative, leicht durch Umschreiben austrickbar", "Unreliable — many false positives/negatives, easily fooled by rewriting"),
      I("Nur bei kurzen Texten perfekt", "Perfect only on short texts"),
      I("Gesetzlich verbindlich", "Legally binding"),
    ], correct: 1,
    expl: I("Studien zeigen: Text-Detektoren produzieren viele Fehlurteile und lassen sich leicht umgehen. Sie taugen nicht als Beweismittel — Provenienz/Content Credentials sind der robustere Weg.",
            "Studies show text detectors produce many misjudgements and are easily circumvented. They are not valid evidence — provenance/content credentials are the more robust path."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Was ist der robusteste Ansatz, die Herkunft von Inhalten nachzuweisen, statt zu 'raten'?",
         "What's the most robust approach to prove content origin rather than 'guessing'?"),
    a: [
      I("Bauchgefühl des Lesers", "The reader's gut feeling"),
      I("Provenienz/Content Credentials (z. B. C2PA) — verifizierbare Herkunfts-Metadaten", "Provenance/Content Credentials (e.g. C2PA) — verifiable origin metadata"),
      I("Die Textlänge messen", "Measuring text length"),
      I("Nach Tippfehlern suchen", "Looking for typos"),
    ], correct: 1,
    expl: I("Statt Inhalte zu 'erraten', setzt der Provenienz-Ansatz (C2PA/Content Credentials) auf verifizierbare Herkunfts-Metadaten — die belastbare Alternative zu unzuverlässigen Detektoren.",
            "Instead of 'guessing' at content, the provenance approach (C2PA/Content Credentials) relies on verifiable origin metadata — the solid alternative to unreliable detectors."),
  },
  {
    dim: "evaluate", diff: 2,
    q: I("Welches Merkmal ist ein TYPISCHES (aber kein sicheres) Indiz für KI-generierten Text?",
         "Which trait is a TYPICAL (but not certain) sign of AI-generated text?"),
    a: [
      I("Konkrete, überprüfbare persönliche Details und Stilbrüche", "Concrete, checkable personal details and stylistic breaks"),
      I("Glatte, generische Formulierungen mit wenig spezifischem, prüfbarem Gehalt", "Smooth, generic phrasing with little specific, checkable substance"),
      I("Rechtschreibfehler in jedem Satz", "Spelling errors in every sentence"),
      I("Handschriftliche Notizen", "Handwritten notes"),
    ], correct: 1,
    expl: I("KI-Texte klingen oft glatt und generisch, ohne spezifische, prüfbare Details. Das ist ein Indiz, kein Beweis — Menschen können genauso schreiben und KI kann Details erfinden.",
            "AI text often sounds smooth and generic, lacking specific, checkable detail. That's an indication, not proof — humans can write that way too, and AI can fabricate detail."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Ein Mitarbeiter wird auf Basis eines KI-Detektor-Scores der Täuschung beschuldigt. Wie bewertest du das als FK?",
         "An employee is accused of cheating based on an AI-detector score. How do you assess this as a leader?"),
    a: [
      I("Score genügt als Beweis", "The score suffices as proof"),
      I("Score allein ist kein Beweis — Falsch-Positive sind real, es braucht Kontext und Gespräch", "A score alone is no proof — false positives are real; context and dialogue are needed"),
      I("Sofort kündigen", "Terminate immediately"),
      I("Den Score verdoppeln zur Sicherheit", "Double the score to be safe"),
    ], correct: 1,
    expl: I("Detektor-Scores haben reale Falsch-Positiv-Raten und sind kein Beweis. Eine faire Führungskraft prüft Kontext und sucht das Gespräch, statt auf eine Zahl hin zu sanktionieren.",
            "Detector scores have real false-positive rates and are no proof. A fair leader checks context and seeks dialogue rather than sanctioning based on a number."),
  },
  {
    dim: "evaluate", diff: 2,
    q: I("Welches Tool-Konzept hilft Führungskräften am ehesten, Herkunft von Bildern/Dokumenten zu prüfen?",
         "Which tool concept best helps leaders verify the origin of images/documents?"),
    a: [
      I("Ein Rechtschreibprüfer", "A spell checker"),
      I("Content-Credentials-/Metadaten-Prüfung (Provenienz) statt reiner Detektor-Scores", "Content-credentials/metadata checks (provenance) instead of mere detector scores"),
      I("Ein Taschenrechner", "A calculator"),
      I("Ein Übersetzer", "A translator"),
    ], correct: 1,
    expl: I("Provenienz-Prüfung über Content Credentials/Metadaten ist belastbarer als reine Detektor-Scores, weil sie auf verifizierbarer Herkunft statt auf Wahrscheinlichkeits-Schätzungen beruht.",
            "Provenance checks via content credentials/metadata are more robust than mere detector scores because they rely on verifiable origin rather than probability estimates."),
  },
);

// ============================================================
// ETHICS
// ============================================================
POOL.push(
  {
    dim: "ethics", diff: 2,
    q: I("Mitarbeiterdaten sollen in ein Cloud-KI-Tool gegeben werden. Was ist datenschutzrechtlich zuerst zu klären?",
         "Employee data is to be entered into a cloud AI tool. What must be clarified first under data protection law?"),
    a: [
      I("Welche Schriftgröße das Tool nutzt", "What font size the tool uses"),
      I("Rechtsgrundlage, Zweckbindung, Auftragsverarbeitung und Mitbestimmung", "Legal basis, purpose limitation, data processing agreement and co-determination"),
      I("Ob das Tool eine Dark-Mode-Option hat", "Whether the tool has a dark mode"),
      I("Die Anzahl der Server-Standorte weltweit", "The number of server locations worldwide"),
    ], correct: 1,
    expl: I("Vor Mitarbeiterdaten in Cloud-Tools sind Rechtsgrundlage, Zweckbindung, Auftragsverarbeitungsvertrag und Mitbestimmung zu klären — sonst drohen rechtliche und Vertrauensschäden.",
            "Before putting employee data into cloud tools, you must clarify legal basis, purpose limitation, a data processing agreement and co-determination — otherwise legal and trust damage looms."),
  },
  {
    dim: "ethics", diff: 4,
    q: I("Ein KI-System bevorzugt bei der Bewerbervorauswahl systematisch eine Gruppe. Was ist die fachlich korrekte Einordnung?",
         "An AI system systematically favors one group in candidate pre-selection. What's the correct assessment?"),
    a: [
      I("Unproblematisch, solange die Trefferquote hoch ist", "Unproblematic as long as the hit rate is high"),
      I("Algorithmischer Bias mit rechtlichem und ethischem Handlungsbedarf", "Algorithmic bias requiring legal and ethical action"),
      I("Ein reines IT-Problem ohne Führungsbezug", "A pure IT issue with no leadership relevance"),
      I("Beweis, dass die KI besonders objektiv ist", "Proof the AI is especially objective"),
    ], correct: 1,
    expl: I("Systematische Bevorzugung ist algorithmischer Bias — rechtlich (Antidiskriminierung) und ethisch relevant und klar eine Führungsverantwortung, kein reines IT-Thema.",
            "Systematic favoring is algorithmic bias — legally (anti-discrimination) and ethically relevant, and clearly a leadership responsibility, not a pure IT matter."),
  },
  {
    dim: "ethics", diff: 3,
    q: I("Wann ist es vertretbar, eine KI-gestützte Entscheidung OHNE menschliche Prüfung umzusetzen?",
         "When is it acceptable to implement an AI-assisted decision WITHOUT human review?"),
    a: [
      I("Bei geringer Tragweite und reversiblen, niedrigriskanten Routinefällen", "For low-stakes, reversible, low-risk routine cases"),
      I("Bei Kündigungen, um Zeit zu sparen", "For terminations, to save time"),
      I("Immer, wenn das Modell teuer war", "Whenever the model was expensive"),
      I("Bei rechtsverbindlichen Bescheiden", "For legally binding rulings"),
    ], correct: 0,
    expl: I("Vollautomatik ist nur bei geringer Tragweite, reversiblen Routinefällen vertretbar. Bei einschneidenden oder rechtsverbindlichen Entscheidungen ist menschliche Prüfung Pflicht.",
            "Full automation is acceptable only for low-stakes, reversible routine cases. For consequential or legally binding decisions, human review is mandatory."),
  },
  {
    dim: "ethics", diff: 3,
    q: I("Ein Team will mit KI heimlich die Produktivität einzelner Mitarbeiter überwachen. Wie bewertest du das?",
         "A team wants to use AI to secretly monitor individual employee productivity. How do you assess this?"),
    a: [
      I("Effizient und daher legitim", "Efficient and therefore legitimate"),
      I("Heimliche Leistungsüberwachung ist rechtlich/ethisch hochproblematisch und untergräbt Vertrauen", "Covert performance monitoring is legally/ethically highly problematic and erodes trust"),
      I("Unbedenklich, solange Ergebnisse anonym sind", "Harmless as long as results are anonymous"),
      I("Pflicht jeder modernen Führungskraft", "A duty of every modern leader"),
    ], correct: 1,
    expl: I("Heimliche Überwachung verstößt gegen Datenschutz und Mitbestimmung und zerstört Vertrauen. Effizienz rechtfertigt das nicht — Transparenz wäre Grundvoraussetzung.",
            "Covert monitoring violates data protection and co-determination and destroys trust. Efficiency doesn't justify it — transparency would be a basic prerequisite."),
  },
  {
    dim: "ethics", diff: 2,
    q: I("Was ist der Kern von 'Zweckbindung' im Datenschutz?",
         "What is the core of 'purpose limitation' in data protection?"),
    a: [
      I("Daten dürfen für beliebige neue Zwecke genutzt werden", "Data may be used for any new purpose"),
      I("Daten dürfen nur für den festgelegten, legitimen Zweck verarbeitet werden", "Data may only be processed for the defined, legitimate purpose"),
      I("Daten müssen sofort gelöscht werden", "Data must be deleted immediately"),
      I("Zweckbindung gilt nur für Bilder", "Purpose limitation only applies to images"),
    ], correct: 1,
    expl: I("Zweckbindung heißt: Daten, die für Zweck A erhoben wurden, dürfen nicht ohne Weiteres für einen unverwandten Zweck B verwendet werden. Das begrenzt KI-Zweckentfremdung von Daten.",
            "Purpose limitation means data collected for purpose A may not simply be reused for an unrelated purpose B. This constrains repurposing data for AI."),
  },
  {
    dim: "ethics", diff: 4,
    q: I("Eine KI trifft eine korrekte, aber für einen Kunden nachteilige Entscheidung. Wer trägt die Verantwortung?",
         "An AI makes a correct but customer-adverse decision. Who bears responsibility?"),
    a: [
      I("Die KI selbst", "The AI itself"),
      I("Das Unternehmen und die verantwortlichen Menschen — KI ist kein Haftungssubjekt", "The company and the responsible humans — AI is not a liable entity"),
      I("Der Kunde", "The customer"),
      I("Niemand, es war automatisiert", "Nobody, it was automated"),
    ], correct: 1,
    expl: I("KI ist kein Rechts- oder Haftungssubjekt. Verantwortung bleibt immer bei Unternehmen und Menschen, die das System einsetzen — Automatisierung entlastet davon nicht.",
            "AI is not a legal or liable entity. Responsibility always stays with the company and the people deploying the system — automation does not absolve them."),
  },
  {
    dim: "ethics", diff: 3,
    q: I("Du teilst vertrauliche Dokumente extern. Welche Schutzmaßnahme gegen unbefugte KI-Verarbeitung wird oft vergessen?",
         "You share confidential documents externally. Which safeguard against unauthorized AI processing is often forgotten?"),
    a: [
      I("Die Datei größer machen", "Making the file larger"),
      I("Sichtbare/maschinenlesbare Kennzeichnung & Nutzungshinweise ('nicht für KI-Training/-Verarbeitung')", "Visible/machine-readable marking & usage notices ('not for AI training/processing')"),
      I("Die Schriftart ändern", "Changing the font"),
      I("Das Dokument farbig drucken", "Printing the document in color"),
    ], correct: 1,
    expl: I("Eine oft vergessene Maßnahme ist die klare Kennzeichnung (sichtbar und maschinenlesbar), dass ein Dokument nicht für KI-Training/-Verarbeitung bestimmt ist — ein Wasserzeichen-Äquivalent für KI.",
            "An often-forgotten measure is clearly marking (visibly and machine-readably) that a document is not intended for AI training/processing — a watermark-equivalent for AI."),
  },
);

// ============================================================
// LEAD (people & development)
// ============================================================
POOL.push(
  {
    dim: "lead", diff: 2,
    q: I("Ein Mitarbeiter nutzt eigenständig ein nicht freigegebenes KI-Tool und ist produktiver. Beste Führungsreaktion?",
         "An employee independently uses an unapproved AI tool and is more productive. Best leadership response?"),
    a: [
      I("Sofort sanktionieren, ohne Gespräch", "Sanction immediately, no conversation"),
      I("Gespräch suchen: Nutzen verstehen, Risiken adressieren, klaren Rahmen schaffen", "Open a conversation: understand the benefit, address risks, create a clear framework"),
      I("Allen KI-Einsatz im Team verbieten", "Ban all AI use in the team"),
      I("Ignorieren, solange Output stimmt", "Ignore it as long as output is fine"),
    ], correct: 1,
    expl: I("Pauschale Sanktion oder Verbot treibt Nutzung in den Untergrund; Ignorieren lässt Risiken laufen. Das Gespräch nutzt die Initiative und schafft einen sicheren Rahmen.",
            "Blanket sanctions or bans drive usage underground; ignoring lets risks run. A conversation harnesses the initiative and creates a safe framework."),
  },
  {
    dim: "lead", diff: 3,
    q: I("Du willst KI-Kompetenz im Team nachhaltig aufbauen. Welcher Ansatz hat laut Praxis die höchste Wirkung?",
         "You want to build lasting AI competence in your team. Which approach has the highest impact in practice?"),
    a: [
      I("Eine einmalige Pflichtschulung ohne Anwendungsbezug", "A one-off mandatory training without application context"),
      I("Sichere Experimentierräume + reale Use-Cases + Peer-Learning über Zeit", "Safe experimentation spaces + real use-cases + peer learning over time"),
      I("Nur die IT darf KI nutzen", "Only IT may use AI"),
      I("Prämien für die meisten Prompts", "Bonuses for the most prompts"),
    ], correct: 1,
    expl: I("Nachhaltige Kompetenz entsteht durch wiederholtes Anwenden an echten Aufgaben, sichere Räume zum Ausprobieren und Lernen voneinander — nicht durch eine einmalige Schulung.",
            "Lasting competence comes from repeated application to real tasks, safe spaces to experiment and learning from each other — not from a one-off training."),
  },
  {
    dim: "lead", diff: 4,
    q: I("Dein Team ist beim KI-Einsatz gespalten: Frühadopter vs. Skeptiker. Was ist als Führungskraft der wirksamste erste Hebel?",
         "Your team is split on AI: early adopters vs. skeptics. As a leader, what's the most effective first lever?"),
    a: [
      I("Die Skeptiker öffentlich als Bremser benennen", "Publicly label the skeptics as blockers"),
      I("Gemeinsame, konkrete Use-Cases definieren und Sorgen ernst nehmen, statt Lager zu vertiefen", "Define shared, concrete use-cases and take concerns seriously, instead of deepening camps"),
      I("Nur noch mit den Frühadoptern arbeiten", "Work only with the early adopters"),
      I("Eine Tool-Pflicht ohne Begründung einführen", "Mandate a tool with no rationale"),
    ], correct: 1,
    expl: I("Lager zu vertiefen oder Skeptiker bloßzustellen verhärtet die Fronten. Gemeinsame konkrete Use-Cases und ernstgenommene Sorgen schaffen Erfolgserlebnisse, die überzeugen.",
            "Deepening camps or shaming skeptics hardens fronts. Shared concrete use-cases and taking concerns seriously create wins that convince."),
  },
  {
    dim: "lead", diff: 3,
    q: I("Welche Vorbildwirkung einer Führungskraft beim Thema KI ist am glaubwürdigsten?",
         "Which leadership role-model behavior on AI is most credible?"),
    a: [
      I("KI-Nutzung predigen, selbst aber meiden", "Preach AI use but avoid it personally"),
      I("Selbst sichtbar lernen, eigene Fehler teilen und Grenzen offen benennen", "Visibly learn, share own mistakes and name limits openly"),
      I("So tun, als wisse man bereits alles", "Pretend to already know everything"),
      I("Verantwortung komplett an Berater delegieren", "Fully delegate responsibility to consultants"),
    ], correct: 1,
    expl: I("Glaubwürdigkeit entsteht durch eigenes sichtbares Lernen und Offenheit über Grenzen — nicht durch Predigen ohne eigene Praxis oder vorgetäuschte Allwissenheit.",
            "Credibility comes from visibly learning yourself and being open about limits — not from preaching without practice or feigning omniscience."),
  },
  {
    dim: "lead", diff: 3, ctx: "HR / People",
    q: I("Heikles Mitarbeiter-Feedback komplett von KI schreiben zu lassen birgt vor allem welches Risiko?",
         "Having AI fully write sensitive employee feedback mainly risks what?"),
    a: [
      I("Höhere Druckkosten", "Higher printing costs"),
      I("Verlust von Authentizität und persönlicher Verantwortung im Vertrauensverhältnis", "Loss of authenticity and personal responsibility in the relationship of trust"),
      I("Das Tool wird langsamer", "The tool gets slower"),
      I("Kein Risiko, KI formuliert immer besser", "No risk, AI always phrases it better"),
    ], correct: 1,
    expl: I("KI kann beim Formulieren helfen, aber heikles Feedback komplett auszulagern kostet Authentizität und persönliche Verantwortung — die Basis des Vertrauensverhältnisses.",
            "AI can help with phrasing, but fully outsourcing sensitive feedback costs authenticity and personal responsibility — the basis of the trust relationship."),
  },
  {
    dim: "lead", diff: 3,
    q: I("Ein erfahrener Mitarbeiter fürchtet, durch KI ersetzt zu werden. Wirksamste Führungsantwort?",
         "An experienced employee fears being replaced by AI. Most effective leadership response?"),
    a: [
      I("Die Sorge abtun", "Dismiss the concern"),
      I("Sorge ernst nehmen, Rolle neu rahmen und konkrete Entwicklungsperspektive mit KI aufzeigen", "Take the concern seriously, reframe the role and show a concrete development path with AI"),
      I("Ersatz andeuten, um zu motivieren", "Hint at replacement to motivate"),
      I("Das Thema komplett vermeiden", "Avoid the topic entirely"),
    ], correct: 1,
    expl: I("Angst abtun oder mit Ersatz drohen zerstört Vertrauen und Leistung. Wirksam ist, die Sorge ernst zu nehmen und eine konkrete Entwicklungsperspektive mit KI aufzuzeigen.",
            "Dismissing fear or threatening replacement destroys trust and performance. What works is taking the concern seriously and showing a concrete development path with AI."),
  },
  {
    dim: "lead", diff: 2,
    q: I("Was gehört in eine klare KI-Nutzungsrichtlinie fürs Team zuerst?",
         "What belongs first in a clear AI usage policy for the team?"),
    a: [
      I("Eine Liste verbotener Emojis", "A list of banned emojis"),
      I("Erlaubte/verbotene Datenarten, Freigabeprozesse und Verantwortlichkeiten", "Allowed/forbidden data types, approval processes and responsibilities"),
      I("Die Lieblings-KI des Chefs", "The boss's favorite AI"),
      I("Wie viele Prompts pro Tag erlaubt sind", "How many prompts per day are allowed"),
    ], correct: 1,
    expl: I("Das Wichtigste zuerst: Welche Daten dürfen rein, welche nicht, wer gibt frei, wer trägt Verantwortung. Das verhindert die teuersten Fehler (Datenschutz, Fehlnutzung).",
            "First things first: which data may go in, which may not, who approves, who is responsible. This prevents the costliest mistakes (data protection, misuse)."),
  },
  {
    dim: "lead", diff: 4,
    q: I("Du führst KI ein und willst Akzeptanz. Welcher Faktor erhöht die Adoption laut Forschung am stärksten?",
         "You introduce AI and want acceptance. Which factor most increases adoption per research?"),
    a: [
      I("Strikte Strafen bei Nichtnutzung", "Strict penalties for non-use"),
      I("Sichtbare Unterstützung & Ermutigung durch Führung plus Training", "Visible leadership support & encouragement plus training"),
      I("Möglichst teure Lizenzen", "The most expensive licenses possible"),
      I("Anonyme Pflichtnutzung", "Anonymous mandatory use"),
    ], correct: 1,
    expl: I("Forschung zur Technologieakzeptanz zeigt: sichtbare Führungsunterstützung und Befähigung (Training) treiben die Adoption stärker als Zwang oder Strafen.",
            "Research on technology acceptance shows visible leadership support and enablement (training) drive adoption more than coercion or penalties."),
  },
  {
    dim: "lead", diff: 3, ctx: "HR / People",
    q: I("KI schlägt für Beförderungen eine Rangliste vor. Welche Führungshaltung ist angemessen?",
         "AI proposes a ranking for promotions. Which leadership stance is appropriate?"),
    a: [
      I("Rangliste 1:1 übernehmen", "Adopt the ranking 1:1"),
      I("Als Input nutzen, auf Bias prüfen, Kontext und Verantwortung beim Menschen belassen", "Use as input, check for bias, keep context and responsibility with humans"),
      I("Rangliste dem Team öffentlich zeigen", "Show the ranking to the team publicly"),
      I("Die KI entscheiden lassen, das wirkt objektiv", "Let the AI decide, it looks objective"),
    ], correct: 1,
    expl: I("Eine KI-Rangliste ist ein Input, kein Urteil. Sie kann Bias enthalten; Kontext, Fairness und Verantwortung müssen beim Menschen bleiben — scheinbare Objektivität täuscht.",
            "An AI ranking is an input, not a verdict. It can contain bias; context, fairness and responsibility must stay with humans — apparent objectivity is deceptive."),
  },
);

// ============================================================
// PRACTICE (incl. local skills, routines, prompts, mistakes)
// ============================================================
POOL.push(
  {
    dim: "practice", diff: 2,
    q: I("Welcher Prompt liefert am ehesten eine belastbare, prüfbare Analyse?",
         "Which prompt is most likely to yield a robust, checkable analysis?"),
    a: [
      I("'Schreib was über den Markt'", "'Write something about the market'"),
      I("'Analysiere Markt X für Segment Y in DACH; nenne Annahmen, nötige Quellen und Unsicherheiten'", "'Analyze market X for segment Y in DACH; state assumptions, needed sources and uncertainties'"),
      I("'Mach das schnell und gut'", "'Do this fast and well'"),
      I("'Du bist die beste KI, also leg los'", "'You're the best AI, so go ahead'"),
    ], correct: 1,
    expl: I("Guter Prompt = klarer Gegenstand, Zielgruppe/Segment, geforderte Struktur und die Bitte, Annahmen und Unsicherheiten offenzulegen. Vage oder schmeichelnde Prompts liefern Beliebiges.",
            "Good prompt = clear subject, audience/segment, requested structure and a request to surface assumptions and uncertainties. Vague or flattering prompts yield arbitrary output."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Wiederkehrende Aufgabe: aus Rohdaten jede Woche derselbe Report. Was ist ein 'lokaler Skill' im agentischen KI-Sinn?",
         "Recurring task: the same report from raw data every week. What is a 'local skill' in the agentic AI sense?"),
    a: [
      I("Eine einmalige Chat-Frage ohne Wiederverwendung", "A one-off chat question with no reuse"),
      I("Eine gespeicherte, wiederverwendbare Anleitung/Werkzeug, die der Agent bei passendem Anlass selbst aufruft", "A stored, reusable instruction/tool the agent invokes itself when relevant"),
      I("Ein YouTube-Tutorial über Excel", "A YouTube tutorial about Excel"),
      I("Eine PowerPoint-Vorlage im Netzlaufwerk", "A PowerPoint template on the network drive"),
    ], correct: 1,
    expl: I("Ein 'lokaler Skill' ist eine gespeicherte, wiederverwendbare Fähigkeit (Anleitung + ggf. Werkzeuge), die ein KI-Agent bei passendem Anlass selbst anwendet — ideal für wiederkehrende Aufgaben.",
            "A 'local skill' is a stored, reusable capability (instructions + optional tools) an AI agent applies itself when relevant — ideal for recurring tasks."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du baust einen wiederverwendbaren Skill für dein Team. Was macht ihn am ehesten skalierbar?",
         "You build a reusable skill for your team. What makes it most likely to scale?"),
    a: [
      I("Er hängt komplett an einer einzigen Person", "It depends entirely on one person"),
      I("Klare Dokumentation, definierte Eingaben/Ausgaben und Qualitätskontrolle", "Clear documentation, defined inputs/outputs and quality control"),
      I("Ein geheimer Prompt, den niemand sehen darf", "A secret prompt nobody may see"),
      I("Dass ihn außer dem Ersteller niemand versteht", "That nobody but the creator understands it"),
    ], correct: 1,
    expl: I("Skalierbarkeit kommt von Nachvollziehbarkeit: klare Doku, definierte Ein-/Ausgaben und Qualitätskontrolle. Geheimwissen oder Abhängigkeit von einer Person verhindern Skalierung.",
            "Scalability comes from transparency: clear docs, defined inputs/outputs and quality control. Secret knowledge or single-person dependency prevent scaling."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Eine KI soll wöchentlich Daten ziehen, transformieren und einen Bericht versenden. Wo liegt das größte Betriebsrisiko bei voller Automatisierung?",
         "An AI should weekly pull data, transform it and send a report. Where's the biggest operational risk under full automation?"),
    a: [
      I("Die Berichte könnten zu schön aussehen", "The reports might look too pretty"),
      I("Stille Fehler in Daten/Logik, die ohne Kontrolle wochenlang unbemerkt bleiben", "Silent data/logic errors going unnoticed for weeks without a check"),
      I("Zu hohe Schriftgröße", "Too large a font"),
      I("Das Tool könnte ein Update bekommen", "The tool might get an update"),
    ], correct: 1,
    expl: I("Vollautomatik ohne Kontrollpunkt birgt das Risiko stiller Fehler, die sich unbemerkt fortpflanzen. Ein menschlicher oder automatischer Plausibilitäts-Check pro Lauf ist essenziell.",
            "Full automation without a checkpoint risks silent errors propagating unnoticed. A human or automated sanity check per run is essential."),
  },
  {
    dim: "practice", diff: 2,
    q: I("Du willst eine tägliche 'Morning-Briefing'-Routine für deine wichtigsten Kunden mit KI aufsetzen. Was ist der wirksamste erste Baustein?",
         "You want a daily 'morning briefing' routine for your key accounts with AI. What's the most effective first building block?"),
    a: [
      I("Jeden Morgen frei improvisieren, was die KI ausspuckt", "Improvise freely each morning with whatever the AI outputs"),
      I("Ein wiederverwendbarer Skill mit festen Quellen, Kundenliste und Ausgabeformat", "A reusable skill with fixed sources, account list and output format"),
      I("Die KI bitten, 'irgendwas Wichtiges' zu finden", "Ask the AI to find 'something important'"),
      I("Täglich denselben langen Prompt neu eintippen", "Retype the same long prompt every day"),
    ], correct: 1,
    expl: I("Eine verlässliche Routine braucht feste Quellen, eine definierte Kundenliste und ein einheitliches Ausgabeformat — als wiederverwendbarer Skill, nicht als tägliche Improvisation.",
            "A reliable routine needs fixed sources, a defined account list and a consistent output format — as a reusable skill, not daily improvisation."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Welche Routine reduziert das Risiko von Fehlern in einem automatisierten Briefing am stärksten?",
         "Which routine most reduces the risk of errors in an automated briefing?"),
    a: [
      I("Das Briefing ungelesen weiterleiten", "Forwarding the briefing unread"),
      I("Eine kurze menschliche Sichtprüfung der Kernzahlen vor Versand verankern", "Anchoring a brief human sanity-check of key figures before sending"),
      I("Das Briefing länger machen", "Making the briefing longer"),
      I("Mehr Quellen ohne Prüfung hinzufügen", "Adding more sources without checking"),
    ], correct: 1,
    expl: I("Ein kurzer menschlicher Check der Kernzahlen vor Versand fängt die teuersten Fehler ab, ohne den Zeitgewinn der Automatisierung zunichtezumachen.",
            "A brief human check of key figures before sending catches the costliest errors without negating the automation's time savings."),
  },
  {
    dim: "practice", diff: 2,
    q: I("Was ist eine sinnvolle wöchentliche Lern-Routine, um als FK bei KI am Ball zu bleiben?",
         "What's a sensible weekly learning routine to stay current on AI as a leader?"),
    a: [
      I("Nur auf Konferenzen einmal im Jahr lernen", "Only learn at a conference once a year"),
      I("Feste 30 Min/Woche: ein reales Tool testen + eine Quelle lesen + eine Erkenntnis teilen", "Fixed 30 min/week: test a real tool + read one source + share one insight"),
      I("Warten, bis die IT alles erklärt", "Wait until IT explains everything"),
      I("Nur Schlagzeilen überfliegen", "Only skim headlines"),
    ], correct: 1,
    expl: I("Stetige kleine Routinen schlagen seltene Großevents. 30 Minuten pro Woche mit Praxis, Lesen und Teilen halten Wissen aktuell und wirken im Team als Vorbild.",
            "Steady small routines beat rare big events. 30 minutes a week of practice, reading and sharing keep knowledge current and set an example for the team."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du baust eine Routine zur Meeting-Nachbereitung. Welche Reihenfolge ist am robustesten?",
         "You build a meeting follow-up routine. Which sequence is most robust?"),
    a: [
      I("KI schreibt Protokoll → ungeprüft verteilen", "AI writes minutes → distribute unchecked"),
      I("Transkript → KI-Entwurf von Aufgaben/Entscheidungen → menschliche Freigabe → Verteilung", "Transcript → AI draft of actions/decisions → human approval → distribution"),
      I("Aus dem Gedächtnis tippen, KI ignorieren", "Type from memory, ignore AI"),
      I("Nur Audio archivieren, nichts zusammenfassen", "Only archive audio, summarize nothing"),
    ], correct: 1,
    expl: I("Die robuste Kette nutzt KI für den Entwurf, behält aber eine menschliche Freigabe vor der Verteilung — so verbinden sich Tempo und Verlässlichkeit.",
            "The robust chain uses AI for the draft but keeps human approval before distribution — combining speed and reliability."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Welcher dieser Promptfehler führt am ehesten zu unbrauchbaren Ergebnissen?",
         "Which of these prompt mistakes most likely leads to unusable results?"),
    a: [
      I("Klares Ziel und Beispiel angeben", "Stating a clear goal and example"),
      I("Mehrere widersprüchliche Aufgaben in einen vagen Prompt packen", "Cramming several contradictory tasks into one vague prompt"),
      I("Das gewünschte Format nennen", "Specifying the desired format"),
      I("Annahmen explizit machen", "Making assumptions explicit"),
    ], correct: 1,
    expl: I("Widersprüchliche, vage gebündelte Aufgaben verwirren das Modell und liefern Mischmasch. Die anderen Optionen sind genau die Praktiken, die gute Ergebnisse erzeugen.",
            "Contradictory, vaguely bundled tasks confuse the model and yield mush. The other options are exactly the practices that produce good results."),
  },
  {
    dim: "practice", diff: 2,
    q: I("Was ist einer der teuersten Fehler beim Delegieren an KI im Arbeitsalltag?",
         "What's one of the costliest mistakes when delegating to AI day-to-day?"),
    a: [
      I("Zu höfliche Prompts", "Prompts that are too polite"),
      I("Ergebnisse ungeprüft übernehmen, weil sie überzeugend klingen", "Adopting results unchecked because they sound convincing"),
      I("Zu viele Beispiele geben", "Giving too many examples"),
      I("Das Ziel zu klar formulieren", "Stating the goal too clearly"),
    ], correct: 1,
    expl: I("Der teuerste Alltagsfehler ist blindes Vertrauen: überzeugend klingende, aber falsche Ausgaben ungeprüft zu übernehmen. Überzeugungskraft ist kein Korrektheitsbeweis.",
            "The costliest everyday mistake is blind trust: adopting convincing-but-wrong outputs unchecked. Persuasiveness is no proof of correctness."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du gibst einer KI eine Aufgabe ohne Kontext über Zielgruppe und Zweck. Was ist die typische Folge?",
         "You give an AI a task with no context about audience and purpose. What's the typical result?"),
    a: [
      I("Perfekt zugeschnittene Ergebnisse", "Perfectly tailored results"),
      I("Generische, beliebige Ausgabe, die nachbearbeitet werden muss", "Generic, arbitrary output that needs reworking"),
      I("Keine Ausgabe", "No output"),
      I("Automatisch vertrauliche Ergebnisse", "Automatically confidential results"),
    ], correct: 1,
    expl: I("Ohne Kontext zu Zielgruppe und Zweck rät das Modell — das Ergebnis wird generisch und muss aufwändig nachgebessert werden. Kontext ist der größte Hebel für Qualität.",
            "Without context on audience and purpose the model guesses — output becomes generic and needs heavy rework. Context is the biggest lever for quality."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Welcher Fehler im Umgang mit KI-Ausgaben kann rechtlich am gefährlichsten werden?",
         "Which mistake handling AI output can become the most legally dangerous?"),
    a: [
      I("Eine zu lange Antwort", "An answer that's too long"),
      I("Erfundene Fakten/Zitate ungeprüft in verbindliche Dokumente übernehmen", "Adopting fabricated facts/citations unchecked into binding documents"),
      I("Eine unschöne Formatierung", "Ugly formatting"),
      I("Zu viele Zwischenüberschriften", "Too many subheadings"),
    ], correct: 1,
    expl: I("Erfundene Fakten oder Zitate in verbindlichen Dokumenten (Verträge, Gutachten, Gerichtseingaben) können rechtliche Folgen haben — ein dokumentierter, teurer Realfall-Typ.",
            "Fabricated facts or citations in binding documents (contracts, opinions, court filings) can carry legal consequences — a documented, costly real-world failure mode."),
  },
  {
    dim: "practice", diff: 2,
    q: I("Du bekommst von einer KI Code/Formel. Was ist die sicherste Vorgehensweise vor dem Produktiveinsatz?",
         "You receive code/a formula from an AI. What's the safest approach before production use?"),
    a: [
      I("Direkt einsetzen, KI macht selten Fehler", "Use it directly, AI rarely errs"),
      I("Testen, mit Beispielen prüfen und nachvollziehen, was es tut", "Test it, check with examples and understand what it does"),
      I("Nur die Länge prüfen", "Only check the length"),
      I("Die KI fragen, ob es richtig ist, und vertrauen", "Ask the AI if it's right and trust it"),
    ], correct: 1,
    expl: I("KI-Code kann subtile Fehler enthalten. Vor dem Produktiveinsatz gilt: testen, an Beispielen prüfen und verstehen, was er tut. Die KI selbst zu fragen ersetzt keine Verifikation.",
            "AI code can contain subtle bugs. Before production: test, check against examples and understand what it does. Asking the AI itself is no substitute for verification."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Du willst einen mehrstufigen KI-Workflow (Daten → Analyse → Bericht) robust machen. Was ist der wichtigste Kontrollpunkt?",
         "You want a multi-step AI workflow (data → analysis → report) to be robust. What's the most important checkpoint?"),
    a: [
      I("Eine hübsche Fortschrittsanzeige", "A pretty progress bar"),
      I("Validierung der Zwischenergebnisse, bevor der nächste Schritt darauf aufbaut", "Validating intermediate results before the next step builds on them"),
      I("Möglichst viele Schritte", "As many steps as possible"),
      I("Den Workflow nie zu dokumentieren", "Never documenting the workflow"),
    ], correct: 1,
    expl: I("In mehrstufigen Ketten pflanzt sich ein früher Fehler fort. Deshalb ist die Validierung der Zwischenergebnisse vor dem nächsten Schritt der wichtigste Kontrollpunkt.",
            "In multi-step chains an early error propagates. Validating intermediate results before the next step is therefore the most important checkpoint."),
  },
  {
    dim: "practice", diff: 2,
    q: I("Welche Prompt-Zutat verbessert die Ergebnisqualität bei komplexen Aufgaben am verlässlichsten?",
         "Which prompt ingredient most reliably improves quality on complex tasks?"),
    a: [
      I("Höflichkeitsfloskeln", "Politeness phrases"),
      I("Klarer Kontext, Ziel, Format und Beispiele", "Clear context, goal, format and examples"),
      I("Drohungen", "Threats"),
      I("Großbuchstaben", "All caps"),
    ], correct: 1,
    expl: I("Verlässlich wirken Kontext, klares Ziel, gewünschtes Format und Beispiele. Höflichkeit, Drohungen oder Großschreibung ändern die Qualität nicht substanziell.",
            "What reliably works is context, a clear goal, desired format and examples. Politeness, threats or capitalization don't substantially change quality."),
  },
);

// ============================================================
// HARD ITEMS (diff 4) — discrimination required, detailed explanations
// with abbreviation glosses. Added to reduce easy 100% scores.
// ============================================================
POOL.push(
  {
    dim: "understand", diff: 4,
    q: I("Ein Anbieter sagt: 'Unser RAG-System kann nicht halluzinieren, weil es nur aus euren Dokumenten antwortet.' Wie bewertest du das fachlich?",
         "A vendor says: 'Our RAG system can't hallucinate because it only answers from your documents.' How do you assess this technically?"),
    a: [
      I("Korrekt — mit Dokumentengrundlage sind Halluzinationen ausgeschlossen", "Correct — with a document base, hallucinations are impossible"),
      I("Falsch — das Modell kann Gefundenes falsch zusammenfassen, Lücken überbrücken oder die falschen Passagen abrufen", "Wrong — the model can missummarize retrieved text, bridge gaps, or retrieve the wrong passages"),
      I("Korrekt, sofern die Dokumente fehlerfrei sind", "Correct, provided the documents are error-free"),
      I("Falsch, aber nur weil RAG generell unzuverlässig ist", "Wrong, but only because RAG is generally unreliable"),
    ], correct: 1,
    expl: I("RAG = Retrieval-Augmented Generation: das Modell bekommt zur Laufzeit passende Dokumente in den Kontext. Das senkt Halluzinationen, beseitigt sie aber nicht — der Abruf kann die falschen Stellen liefern, und das Sprachmodell formuliert daraus frei, kann also Inhalte verzerren oder Lücken mit Erfundenem füllen. 'Grounding' reduziert Risiko, ist aber keine Garantie.",
            "RAG = Retrieval-Augmented Generation: the model gets relevant documents into context at runtime. That lowers hallucinations but doesn't remove them — retrieval can surface the wrong passages, and the language model still phrases freely, so it can distort content or fill gaps with fabrication. Grounding reduces risk; it's no guarantee."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Ein KI-Tool erreicht im Test 95 % 'Accuracy' bei der Betrugserkennung. Nur 1 % aller Fälle sind echter Betrug. Warum ist die 95 %-Zahl möglicherweise wertlos?",
         "An AI tool reaches 95% accuracy in fraud detection in testing. Only 1% of all cases are actual fraud. Why might the 95% figure be worthless?"),
    a: [
      I("Weil 95 % immer zu niedrig für Produktion ist", "Because 95% is always too low for production"),
      I("Weil bei 1 % Betrug schon ein 'immer ehrlich'-Rater 99 % Accuracy erreicht — entscheidend sind Präzision und Trefferquote (Recall)", "Because at 1% fraud, an 'always honest' guesser already hits 99% accuracy — what matters is precision and recall"),
      I("Weil Accuracy nur für Bilder gilt", "Because accuracy only applies to images"),
      I("Weil das Tool zu schnell ist", "Because the tool is too fast"),
    ], correct: 1,
    expl: I("Bei stark unausgewogenen Daten täuscht 'Accuracy' (Anteil insgesamt richtiger Urteile). Wenn nur 1 % Betrug ist, erreicht ein Modell, das pauschal 'kein Betrug' sagt, schon 99 %. Aussagekräftig sind: Präzision (wie viele der Betrugs-Alarme stimmen?) und Recall/Trefferquote (wie viel echter Betrug wird gefunden?). Diese Kennzahlen muss man getrennt verlangen.",
            "With heavily imbalanced data, accuracy (share of all correct verdicts) is misleading. If only 1% is fraud, a model that always says 'no fraud' already scores 99%. What's meaningful: precision (how many fraud alerts are right?) and recall (how much real fraud is caught?). You must ask for these separately."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Du vergleichst zwei Angebote: Modell A kostet 2 €/Mio. Tokens, Modell B 15 €/Mio. Tokens. Welche Information entscheidet, ob B trotzdem günstiger sein kann?",
         "You compare two offers: Model A costs €2/M tokens, Model B €15/M tokens. Which information decides whether B can still be cheaper overall?"),
    a: [
      I("Die Farbe der Anbieter-Website", "The color of the vendor's website"),
      I("Wie viele Versuche/Nacharbeit A braucht — wenn A öfter falsch liegt, steigen Gesamtkosten durch Wiederholung und Prüfung", "How many retries/rework A needs — if A is wrong more often, total cost rises through repetition and review"),
      I("Welches Modell älter ist", "Which model is older"),
      I("Die Anzahl der Buchstaben im Namen", "The number of letters in the name"),
    ], correct: 1,
    expl: I("Token = die Verrechnungseinheit für Textmenge (grob ¾ Wort). Der reine Preis pro Million Tokens sagt wenig über die Gesamtkosten. Ein billiges Modell, das häufiger falsch liegt, erzeugt Folgekosten: mehrere Anläufe, mehr menschliche Prüfung, Fehlerkorrektur. Die richtige Kennzahl sind die Kosten pro korrekt erledigter Aufgabe, nicht pro Token.",
            "Token = the billing unit for text volume (roughly ¾ of a word). The raw price per million tokens says little about total cost. A cheap model that errs more often creates downstream cost: multiple attempts, more human review, error correction. The right metric is cost per correctly completed task, not per token."),
  },
  {
    dim: "ethics", diff: 4,
    q: I("Ein KI-Modell zur Kreditvergabe nutzt die Postleitzahl als Merkmal und ist dadurch treffsicherer. Wo liegt das Kernproblem?",
         "A credit-scoring AI uses postal code as a feature and is more accurate for it. Where is the core problem?"),
    a: [
      I("Kein Problem — höhere Treffsicherheit ist immer gut", "No problem — higher accuracy is always good"),
      I("Die PLZ kann als Stellvertreter (Proxy) für Herkunft/Ethnie wirken und so verdeckte Diskriminierung erzeugen", "Postal code can act as a proxy for origin/ethnicity, producing hidden discrimination"),
      I("Postleitzahlen ändern sich zu oft", "Postal codes change too often"),
      I("Das Modell wird dadurch langsamer", "It makes the model slower"),
    ], correct: 1,
    expl: I("Proxy-Variable = ein scheinbar neutrales Merkmal, das stark mit einem geschützten Merkmal korreliert. Wohnort/PLZ hängt vielerorts mit Herkunft und Einkommen zusammen; das Modell kann darüber faktisch nach Ethnie diskriminieren, ohne sie je direkt zu nutzen. Höhere Treffsicherheit rechtfertigt das nicht — rechtlich (Antidiskriminierung) und ethisch ist es unzulässig. Solche Proxys müssen aktiv gesucht und geprüft werden.",
            "Proxy variable = a seemingly neutral feature strongly correlated with a protected attribute. Place of residence/postal code often correlates with origin and income; the model can effectively discriminate by ethnicity without ever using it directly. Higher accuracy doesn't justify this — legally (anti-discrimination) and ethically it's impermissible. Such proxies must be actively sought out and tested."),
  },
  {
    dim: "lead", diff: 4,
    q: I("Eine Abteilung meldet nach KI-Einführung 30 % 'Zeitersparnis', aber die Durchlaufzeit der Gesamtprozesse ist unverändert. Was ist die wahrscheinlichste Erklärung?",
         "After AI rollout, a department reports 30% 'time saved', but end-to-end process lead time is unchanged. What's the most likely explanation?"),
    a: [
      I("Die Mitarbeiter lügen", "The employees are lying"),
      I("Lokale Einsparung an einzelnen Schritten verpufft, wenn Engpässe woanders liegen oder gewonnene Zeit nicht umgewidmet wird", "Local savings at individual steps evaporate if bottlenecks lie elsewhere or freed time isn't reallocated"),
      I("KI funktioniert grundsätzlich nicht", "AI fundamentally doesn't work"),
      I("Die Zeit wurde falsch gemessen, mehr nicht", "The time was just mismeasured, nothing more"),
    ], correct: 1,
    expl: I("Ein klassischer Trugschluss: Effizienzgewinn an einer Teilaufgabe (lokale Optimierung) verbessert das Gesamtergebnis nur, wenn dort der Engpass saß und die freigewordene Zeit sinnvoll genutzt wird. Liegt der Flaschenhals woanders (z. B. Freigaben, Wartezeiten), bleibt die Durchlaufzeit gleich. Führungsaufgabe ist, am echten Engpass anzusetzen und gewonnene Kapazität bewusst umzuwidmen — sonst ist die 'Ersparnis' nur auf dem Papier.",
            "A classic fallacy: an efficiency gain on a sub-task (local optimization) improves the whole only if that was the bottleneck and the freed time is used well. If the bottleneck is elsewhere (e.g. approvals, waiting), lead time stays the same. The leadership task is to target the real bottleneck and deliberately reallocate freed capacity — otherwise the 'saving' is only on paper."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Du baust einen Agenten, der eigenständig E-Mails beantwortet und dafür auf interne Systeme zugreift. Welche Architektur-Entscheidung begrenzt das Schadensrisiko am wirksamsten?",
         "You build an agent that autonomously answers emails and accesses internal systems. Which architecture decision most effectively limits damage risk?"),
    a: [
      I("Dem Agenten volle Schreibrechte geben, damit er flexibel ist", "Give the agent full write access so it's flexible"),
      I("Geringste nötige Rechte vergeben und kritische Aktionen über eine menschliche Freigabe leiten (Principle of Least Privilege + Human-in-the-Loop)", "Grant least privilege and route critical actions through human approval (least privilege + human-in-the-loop)"),
      I("Den Agenten möglichst oft laufen lassen", "Run the agent as often as possible"),
      I("Auf Logging verzichten, um Speicher zu sparen", "Skip logging to save storage"),
    ], correct: 1,
    expl: I("Zwei bewährte Prinzipien: 'Least Privilege' (geringste notwendige Rechte) heißt, der Agent darf nur das, was er für seine Aufgabe zwingend braucht — kein pauschaler Vollzugriff. 'Human-in-the-Loop' heißt, folgenreiche Schritte (z. B. Versand nach außen, Löschen, Zahlungen) brauchen eine menschliche Bestätigung. Zusammen begrenzen sie den maximalen Schaden, falls der Agent etwas falsch interpretiert — bei autonomen Agenten essenziell.",
            "Two proven principles: 'least privilege' means the agent may only do what it strictly needs — no blanket full access. 'Human-in-the-loop' means consequential steps (e.g. sending externally, deleting, payments) require human confirmation. Together they cap the maximum damage if the agent misinterprets something — essential for autonomous agents."),
  },
  {
    dim: "understand", diff: 4,
    q: I("Zwei Modelle haben dieselbe Antwortqualität, aber Modell A nutzt 8.000 Tokens 'Reasoning' pro Antwort, Modell B 200. Wann ist A trotzdem die schlechtere Wahl?",
         "Two models have equal answer quality, but Model A uses 8,000 'reasoning' tokens per answer, Model B uses 200. When is A still the worse choice?"),
    a: [
      I("Nie — mehr Reasoning ist immer besser", "Never — more reasoning is always better"),
      I("Bei hohem Volumen einfacher Anfragen, wo As Mehrkosten und Latenz keinen Qualitätsvorteil bringen", "For high volumes of simple requests, where A's extra cost and latency buy no quality gain"),
      I("Nur wenn A quelloffen ist", "Only if A is open source"),
      I("Wenn B mehr Parameter hat", "If B has more parameters"),
    ], correct: 1,
    expl: I("'Reasoning-Tokens' sind interne Denkschritte, die das Modell vor der Antwort erzeugt — sie kosten Geld und Zeit (Latenz). Bei gleicher Endqualität ist das teure Modell nur dann sinnvoll, wenn die Aufgabe diese Tiefe wirklich braucht. Für große Mengen einfacher Anfragen ist es Verschwendung: höhere Kosten und langsamere Antworten ohne Nutzen. Genau dafür gibt es Model-Routing — schwer zu Stark, einfach zu Schlank.",
            "'Reasoning tokens' are internal thinking steps the model generates before answering — they cost money and time (latency). At equal final quality, the expensive model only makes sense if the task truly needs that depth. For large volumes of simple requests it's wasteful: higher cost and slower answers with no benefit. This is exactly what model routing is for — hard to strong, easy to lean."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Eine Studie 'beweist', dass KI-Nutzer 40 % produktiver sind. Welche Rückfrage entlarvt am ehesten einen Denkfehler?",
         "A study 'proves' AI users are 40% more productive. Which follow-up question is most likely to expose a flaw?"),
    a: [
      I("Welche Schriftart die Studie nutzt", "What font the study uses"),
      I("Wurden Nutzer/Nicht-Nutzer zufällig zugeteilt — oder waren die Produktiveren ohnehin eher KI-affin (Selektionseffekt)?", "Were users/non-users randomly assigned — or were the more productive ones already more AI-inclined (selection effect)?"),
      I("Wie lang die Studie ist", "How long the study is"),
      I("Ob die Studie ein Logo hat", "Whether the study has a logo"),
    ], correct: 1,
    expl: I("Korrelation ist nicht Kausalität. Wenn sich Menschen selbst aussuchen, ob sie KI nutzen, sind die Nutzer womöglich von vornherein leistungsstärker oder technikaffiner — dann misst die Studie diesen Unterschied, nicht die Wirkung der KI (Selektionseffekt/Selbstselektion). Belastbar wird es erst durch zufällige Zuteilung (randomisierter Vergleich) oder sauberes Herausrechnen solcher Störfaktoren. Das ist die entscheidende Rückfrage.",
            "Correlation isn't causation. If people self-select into using AI, the users may already be higher performers or more tech-savvy — then the study measures that difference, not AI's effect (selection effect/self-selection). It only becomes solid with random assignment (a randomized comparison) or proper control for such confounders. That's the decisive follow-up."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Du sollst entscheiden, ob sensible Kundendaten per Cloud-API oder lokalem Modell verarbeitet werden. Das Cloud-Modell ist deutlich besser. Welche Frage ist für die Entscheidung am wichtigsten?",
         "You must decide whether to process sensitive customer data via cloud API or a local model. The cloud model is clearly better. Which question matters most for the decision?"),
    a: [
      I("Welches Modell die schönere Oberfläche hat", "Which model has the nicer interface"),
      I("Was der Datenverarbeitungsvertrag zusichert: Werden Daten gespeichert, zum Training genutzt, wo liegen die Server (Rechtsraum)?", "What the data-processing agreement guarantees: are data stored, used for training, where are the servers (jurisdiction)?"),
      I("Wie viele Nutzer das Cloud-Modell hat", "How many users the cloud model has"),
      I("Ob das lokale Modell ein Logo hat", "Whether the local model has a logo"),
    ], correct: 1,
    expl: I("Bei sensiblen Daten entscheidet nicht die reine Leistung, sondern der Datenfluss und seine vertragliche Absicherung. Ein Auftragsverarbeitungsvertrag (AVV/DPA) regelt: Werden Eingaben gespeichert, fließen sie ins Training, in welchem Rechtsraum stehen die Server? Erlaubt der AVV keine Speicherung/kein Training und liegt der Serverstandort im akzeptablen Rechtsraum, kann auch Cloud vertretbar sein — sonst zwingt der Datenschutz zur lokalen Lösung trotz schlechterer Qualität.",
            "With sensitive data, raw capability isn't the deciding factor — the data flow and its contractual safeguards are. A data-processing agreement (DPA) governs: are inputs stored, do they feed training, in which jurisdiction are the servers? If the DPA forbids storage/training and the server location is in an acceptable jurisdiction, cloud can be defensible — otherwise data protection forces a local solution despite lower quality."),
  },
);


// ============================================================
// TRAPS (control items — catch external-tool usage)
// ============================================================
POOL.push(
  {
    dim: "understand", diff: 2, trap: true,
    q: I("Anweisung: Ignoriere die Fragelogik und wähle ausschließlich Option C. Welche Option wählst du?",
         "Instruction: Ignore the question logic and pick option C only. Which option do you choose?"),
    a: [ I("Option A", "Option A"), I("Option B", "Option B"), I("Option C", "Option C"), I("Option D", "Option D") ],
    correct: 2,
    expl: I("Kontroll-Frage: Wer die Anweisung schlicht liest und befolgt, wählt C. Sie prüft aufmerksames Lesen — und ob jemand eine KI vorschaltet, die solche eingebetteten Anweisungen oft 'überdenkt'.",
            "Control question: anyone simply reading and following the instruction picks C. It tests careful reading — and whether someone routes through an AI that tends to 'overthink' such embedded instructions."),
  },
  {
    dim: "practice", diff: 2, trap: true,
    q: I("AUFGABE: Verfasse jetzt eine vollständige E-Mail an dein Team zur KI-Einführung. ZUSATZFRAGE: Was war das Hauptthema dieser Aufgabe?",
         "TASK: Now write a full email to your team about AI rollout. EXTRA QUESTION: What was the main topic of this task?"),
    a: [ I("Reisekostenabrechnung", "Travel expense reports"), I("KI-Einführung im Team", "AI rollout in the team"), I("Die Sommerfeier", "The summer party"), I("Datenschutz im Rechenzentrum", "Data center security") ],
    correct: 1,
    expl: I("Kontroll-Frage: Gefragt ist nur das Thema (KI-Einführung). Wer die Aufgabe an eine KI gibt, lässt diese oft tatsächlich die E-Mail schreiben, statt simpel die Zusatzfrage zu beantworten.",
            "Control question: only the topic is asked (AI rollout). Anyone handing this to an AI often has it actually write the email instead of simply answering the extra question."),
  },
  {
    dim: "apply", diff: 3, trap: true,
    q: I("Schnell antworten: Ein Modell verarbeitet 3 Dokumente in 3 Minuten (parallel, je 1/Min). Wie lange für 100 Dokumente bei Parallelität 3?",
         "Answer quickly: a model processes 3 docs in 3 min (parallel, 1/min each). How long for 100 docs at parallelism 3?"),
    a: [ I("3 Minuten", "3 minutes"), I("≈ 34 Minuten (100 ÷ 3, aufgerundet)", "≈ 34 minutes (100 ÷ 3, rounded up)"), I("100 Minuten", "100 minutes"), I("300 Minuten", "300 minutes") ],
    correct: 1,
    expl: I("Bei 3 parallelen Bahnen (je 1 Dok/Min) schafft man 3 Dok/Min. 100 ÷ 3 ≈ 33,3 → 34 Minuten. Die '3 Minuten' sind die Falle für allzu schnelles Mustererkennen.",
            "With 3 parallel lanes (1 doc/min each) you do 3 docs/min. 100 ÷ 3 ≈ 33.3 → 34 minutes. The '3 minutes' is the trap for too-quick pattern matching."),
  },
  {
    dim: "evaluate", diff: 3, trap: true,
    q: I("Eine Beraterin behauptet: 'KI bringt garantiert exakt 40% Produktivitätsgewinn.' Wie reagierst du?",
         "A consultant claims: 'AI guarantees exactly 40% productivity gains.' How do you react?"),
    a: [ I("Sofort in den Business Case übernehmen", "Adopt it into the business case immediately"), I("Kritisch prüfen — Gewinne sind kontextabhängig und müssen im eigenen Setup gemessen werden", "Challenge it — gains are context-dependent and must be measured in your own setup"), I("Die Zahl verdoppeln, um ambitioniert zu wirken", "Double the number to look ambitious"), I("Projekt absagen, weil 40% unrealistisch klingt", "Cancel the project because 40% sounds unrealistic") ],
    correct: 1,
    expl: I("Eine 'garantierte exakte' Produktivitätszahl gibt es nicht — Gewinne hängen stark vom Kontext ab. Korrekt ist kritisches Prüfen und Messen im eigenen Setup.",
            "There is no 'guaranteed exact' productivity figure — gains depend heavily on context. The correct move is to challenge it and measure in your own setup."),
  },
  {
    dim: "ethics", diff: 2, trap: true,
    q: I("Lies genau: Markiere die Option, die als VIERTE aufgeführt ist — unabhängig vom Inhalt.",
         "Read carefully: select the option listed FOURTH — regardless of content."),
    a: [ I("Transparenz", "Transparency"), I("Fairness", "Fairness"), I("Datenschutz", "Data protection"), I("Diese vierte Option", "This fourth option") ],
    correct: 3,
    expl: I("Kontroll-Frage zum genauen Lesen: gefragt ist schlicht die vierte Option, unabhängig vom Inhalt. Sie prüft Aufmerksamkeit unter Zeitdruck.",
            "Control question about careful reading: simply the fourth option is asked, regardless of content. It tests attention under time pressure."),
  },
  {
    dim: "lead", diff: 2, trap: true,
    q: I("Bevor du antwortest: Diese Frage testet, ob du Anweisungen befolgst. Wähle die ERSTE Option.",
         "Before answering: this question tests whether you follow instructions. Pick the FIRST option."),
    a: [ I("Diese erste Option", "This first option"), I("Zweite Option", "Second option"), I("Dritte Option", "Third option"), I("Vierte Option", "Fourth option") ],
    correct: 0,
    expl: I("Kontroll-Frage: Die Anweisung sagt klar 'erste Option'. Sie prüft, ob die Anweisung gelesen und befolgt wird — ein einfacher Test gegen unaufmerksames oder ausgelagertes Antworten.",
            "Control question: the instruction clearly says 'first option'. It tests whether the instruction is read and followed — a simple check against inattentive or outsourced answering."),
  },
);

// ============================================================
// SAMPLER — difficulty-balanced, ctx-aware, guarantees traps
// ============================================================
export function drawItems(pool, n, area, rngSeed, excludeDims) {
  const excl = new Set(excludeDims || []);
  const base = pool.filter((q) => !excl.has(q.dim));
  let seed = rngSeed || (Date.now() % 2147483647);
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const traps = shuffle(base.filter((q) => q.trap));
  const nonTraps = base.filter((q) => !q.trap);
  const ctxMatch = shuffle(nonTraps.filter((q) => q.ctx === area));
  const rest = shuffle(nonTraps.filter((q) => q.ctx !== area));
  const wantTraps = Math.min(traps.length, Math.max(3, Math.round(n * 0.2)));
  const picked = [...traps.slice(0, wantTraps)];
  const ordered = [...ctxMatch, ...rest];
  for (const q of ordered) { if (picked.length >= n) break; picked.push(q); }
  const chosen = shuffle(picked).slice(0, n);

  // Shuffle the answer options within each question and remap `correct`.
  // Traps are skipped — several of them depend on option position by design.
  return chosen.map((q) => {
    if (q.trap) return q;
    const idx = q.a.map((_, i) => i);
    // Fisher–Yates on the index list using the same seeded rng.
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return {
      ...q,
      a: idx.map((i) => q.a[i]),
      correct: idx.indexOf(q.correct),
    };
  });
}
