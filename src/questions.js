// ============================================================
// QUESTIONS — separated from app logic for easy editing.
// ------------------------------------------------------------
// Structure (Ng et al. 2021 AI-literacy framework + Bloom levels):
//   dim:  understand | apply | evaluate | ethics | lead | practice
//   diff: 1 (recall) .. 4 (analysis/evaluation)
//   trap: true  => control item to catch external-tool usage
//   ctx:  optional area tag, preferred when it matches the user's area
//
// ITEM-WRITING RULES (applied throughout):
//   - All 4 options are plausible and of SIMILAR LENGTH — the correct one must
//     NOT be guessable as "the longest / most detailed" option.
//   - Distractors encode realistic misconceptions, not jokes.
//   - Answer options are additionally shuffled at runtime (see drawItems).
// ============================================================

export const I = (de, en) => ({ de, en });

export const POOL = [
  // ============================================================
  // UNDERSTAND
  // ============================================================
  {
    dim: "understand", diff: 2,
    q: I("Was steuert die 'Temperatur' bei einem Sprachmodell?",
         "What does 'temperature' control in a language model?"),
    a: [
      I("Wie stark die Serverlast pro Anfrage ausgelastet wird", "How heavily the server load is used per request"),
      I("Wie zufällig oder variabel die erzeugten Ausgaben ausfallen", "How random or variable the generated outputs turn out"),
      I("Wie viele Token die Eingabe maximal enthalten darf", "How many tokens the input may contain at most"),
      I("Wie aktuell die zugrunde liegende Faktenbasis ist", "How current the underlying factual base is"),
    ], correct: 1,
    expl: I("Die Temperatur steuert die Zufälligkeit bei der Token-Auswahl: niedrig = fokussiert/wiederholbar, hoch = kreativer/variabler. Sie verbessert nicht die Faktentreue und ändert nichts an Eingabelänge oder Serverlast.",
            "Temperature controls randomness in token selection: low = focused/repeatable, high = more creative/variable. It does not improve factual accuracy and has nothing to do with input length or server load."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Warum kann dasselbe Modell auf dieselbe Frage unterschiedliche Antworten geben?",
         "Why can the same model give different answers to the same question?"),
    a: [
      I("Weil es aus jeder Konversation dazulernt und sich anpasst", "Because it learns and adapts from each conversation"),
      I("Weil es das nächste Token aus einer Wahrscheinlichkeitsverteilung zieht", "Because it draws the next token from a probability distribution"),
      I("Weil die Serververbindung die Antwort jedes Mal leicht verändert", "Because the server connection slightly alters each answer"),
      I("Weil es bewusst Varianten einbaut, um menschlicher zu wirken", "Because it deliberately adds variants to seem more human"),
    ], correct: 1,
    expl: I("Standardmodelle lernen im Gespräch nicht dazu und verändern Antworten nicht absichtlich. Die Variation entsteht durch probabilistisches Sampling — das Modell zieht das nächste Token aus einer Wahrscheinlichkeitsverteilung.",
            "Standard models don't learn during a chat and don't alter answers on purpose. The variation comes from probabilistic sampling — the model draws the next token from a probability distribution."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Ein Modell beantwortet eine Frage zu einem Ereignis von letzter Woche überzeugend, ohne Websuche. Was ist die wahrscheinlichste Erklärung?",
         "A model confidently answers about an event from last week, without web search. What's the most likely explanation?"),
    a: [
      I("Es hat im Hintergrund stillen Echtzeit-Zugriff auf Nachrichtenquellen", "It has silent real-time access to news sources in the background"),
      I("Es erzeugt eine plausibel klingende, aber erfundene Antwort (Halluzination)", "It produces a plausible-sounding but fabricated answer (hallucination)"),
      I("Es hat die Information aus früheren Nutzergesprächen dauerhaft gespeichert", "It permanently stored the information from earlier user chats"),
      I("Die Antwort wurde im Hintergrund von einem Menschen geprüft und ergänzt", "A human reviewed and supplemented the answer in the background"),
    ], correct: 1,
    expl: I("Ohne Websuche endet das Wissen am Knowledge Cutoff (Trainingsstand). Überzeugend klingende Aussagen zu neueren Ereignissen sind dann typischerweise plausible Erfindungen (Halluzinationen) — kein verstecktes Echtzeitwissen.",
            "Without web search, knowledge ends at the knowledge cutoff (training date). Confident statements about newer events are then typically plausible fabrications (hallucinations) — not hidden real-time knowledge."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Was beschreibt ein 'Kontextfenster' am treffendsten?",
         "What most accurately describes a 'context window'?"),
    a: [
      I("Den sichtbaren Ausschnitt der Benutzeroberfläche während der Eingabe", "The visible portion of the user interface during input"),
      I("Die Textmenge, die das Modell gleichzeitig berücksichtigen kann", "The amount of text the model can consider at the same time"),
      I("Den Zeitraum, in dem eine Antwort zwischengespeichert bleibt", "The period for which an answer remains cached"),
      I("Die Spanne zwischen Trainingsbeginn und Knowledge Cutoff", "The span between start of training and the knowledge cutoff"),
    ], correct: 1,
    expl: I("Das Kontextfenster ist die Token-Menge (Eingabe + bisherige Konversation + Ausgabe), die das Modell gleichzeitig verarbeiten kann. Was darüber hinausgeht, 'sieht' es nicht mehr — es hat nichts mit Oberfläche oder Cutoff zu tun.",
            "The context window is the amount of tokens (input + prior conversation + output) the model can process at once. Anything beyond it is no longer 'seen' — it has nothing to do with the interface or the cutoff."),
  },
  {
    dim: "understand", diff: 4,
    q: I("Worin unterscheidet sich Fine-Tuning grundsätzlich von Retrieval-Augmented Generation (RAG)?",
         "How does fine-tuning fundamentally differ from retrieval-augmented generation (RAG)?"),
    a: [
      I("Fine-Tuning verarbeitet nur Text, RAG hingegen nur Bilder und Audio", "Fine-tuning handles only text, while RAG handles only images and audio"),
      I("Fine-Tuning verändert die Modellgewichte, RAG reicht zur Laufzeit Wissen an", "Fine-tuning changes the model weights, RAG supplies knowledge at runtime"),
      I("Fine-Tuning läuft lokal, RAG funktioniert ausschließlich in der Cloud", "Fine-tuning runs locally, RAG works exclusively in the cloud"),
      I("Beide bezeichnen denselben Vorgang, nur in verschiedenen Frameworks", "Both describe the same process, just in different frameworks"),
    ], correct: 1,
    expl: I("Fine-Tuning passt die Gewichte des Modells an (es 'lernt' Stil/Aufgabe dauerhaft). RAG lässt das Modell unverändert und reicht zur Laufzeit relevante Dokumente in den Kontext — ideal für aktuelles oder firmeninternes Wissen.",
            "Fine-tuning adjusts the model's weights (it permanently 'learns' a style/task). RAG leaves the model unchanged and feeds relevant documents into context at runtime — ideal for current or internal knowledge."),
  },
  {
    dim: "understand", diff: 4,
    q: I("Ein Anbieter wirbt: 'Unser Modell macht dank höherer Parameterzahl keine Fehler mehr.' Wie bewertest du das fachlich?",
         "A vendor claims: 'Thanks to more parameters our model no longer makes mistakes.' How do you assess this technically?"),
    a: [
      I("Zutreffend, denn eine höhere Parameterzahl eliminiert Halluzinationen", "Accurate, since a higher parameter count eliminates hallucinations"),
      I("Irreführend, denn Halluzinationen bleiben dem Grundprinzip inhärent", "Misleading, since hallucinations remain inherent to the design"),
      I("Zutreffend, sofern das Modell quelloffen und lokal betrieben wird", "Accurate, provided the model is open source and run locally"),
      I("Belanglos, da die Parameterzahl keinerlei Einfluss auf die Qualität hat", "Irrelevant, since parameter count has no effect on quality at all"),
    ], correct: 1,
    expl: I("Mehr Parameter können die Leistung verbessern, aber Halluzinationen sind dem probabilistischen Grundprinzip inhärent. Kein heutiges Modell ist fehlerfrei — solche absoluten Werbeaussagen sind ein Warnsignal.",
            "More parameters can improve performance, but hallucinations are inherent to the probabilistic design. No model today is error-free — such absolute marketing claims are a red flag."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Was ist ein 'System-Prompt'?", "What is a 'system prompt'?"),
    a: [
      I("Eine Fehlermeldung, die das Betriebssystem beim Start ausgibt", "An error message the operating system shows during startup of the tool"),
      I("Eine vorgelagerte Instruktion, die Rolle und Verhalten des Modells rahmt", "An upstream instruction that frames the model's role and behavior"),
      I("Der schnellste und sparsamste Antwortmodus, in den ein Modell versetzt werden kann", "The fastest possible answer mode a model can be switched into"),
      I("Ein Zugangsschlüssel, der die Verbindung zur API absichert", "An access key that secures and authenticates the connection to the API"),
    ], correct: 1,
    expl: I("Der System-Prompt legt vor dem Gespräch Rolle, Tonalität und Regeln fest. Er prägt, wie das Modell antwortet, ist aber kein Sicherheits- oder Geheimnisspeicher und kein Zugangsschlüssel.",
            "The system prompt sets role, tone and rules before the conversation. It shapes how the model responds but is not a security store or an access key."),
  },
  {
    dim: "understand", diff: 4,
    q: I("Warum ist ein Modell mit größerem Kontextfenster nicht automatisch 'klüger'?",
         "Why is a model with a larger context window not automatically 'smarter'?"),
    a: [
      I("Weil ein größerer Kontext die Faktentreue grundsätzlich verschlechtert", "Because a larger context fundamentally worsens factual accuracy"),
      I("Weil mehr Kontext nur die Textmenge erweitert, nicht die Denkqualität", "Because more context only widens the text amount, not the reasoning quality"),
      I("Weil die Kontextgröße direkt bestimmt, welche Trainingsdaten genutzt wurden", "Because context size directly determines which training data was used"),
      I("Weil ein größerer Kontext die Antwortkosten in jedem Fall senkt", "Because a larger context lowers the answer cost in any case"),
    ], correct: 1,
    expl: I("Ein großes Kontextfenster hilft bei umfangreichen Dokumenten, sagt aber nichts über die Denk- und Schlussfolgerungsqualität aus. Modelle können in sehr langem Kontext sogar Details 'übersehen' (Lost in the Middle).",
            "A large context window helps with big documents but says nothing about reasoning quality. Models can even 'lose' details in very long contexts ('lost in the middle')."),
  },
  {
    dim: "understand", diff: 2,
    q: I("Was bedeutet 'multimodal' bei einem KI-Modell?", "What does 'multimodal' mean for an AI model?"),
    a: [
      I("Dass es seine Last über mehrere Server gleichzeitig verteilt", "That it spreads its load across several servers at once"),
      I("Dass es mehrere Eingabearten verarbeitet, etwa Text und Bild", "That it processes several input types, such as text and images"),
      I("Dass es in mehreren Preisstufen gleichzeitig angeboten wird", "That it is offered in several price tiers at the same time"),
      I("Dass es Antworten in mehreren Sprachen parallel ausgibt", "That it outputs answers in several languages in parallel"),
    ], correct: 1,
    expl: I("Multimodal heißt: das Modell kann verschiedene Eingabe-/Ausgabearten verarbeiten — etwa Text, Bild, Audio. Mehrsprachigkeit oder Preisstufen sind davon unabhängig.",
            "Multimodal means the model can handle different input/output types — e.g. text, image, audio. Multilingual ability or price tiers are separate things."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Ein Modell 'kennt' interne Firmenzahlen, die nie öffentlich waren. Was ist die plausibelste Erklärung?",
         "A model 'knows' internal company figures that were never public. What's the most plausible explanation?"),
    a: [
      I("Es hat die Zahlen geraten oder sie wurden ihm im Prompt mitgegeben", "It guessed the figures or they were supplied to it in the prompt"),
      I("Es hat eigenständig auf die geschützten IT-Systeme der Firma zugegriffen", "It autonomously accessed the company's protected IT systems"),
      I("KI-Modelle haben generell Zugriff auf sämtliche Unternehmensdaten", "AI models generally have access to all company data"),
      I("Solche internen Zahlen kann ein Modell technisch gar nicht ausgeben", "A model is technically unable to output such internal figures at all"),
    ], correct: 0,
    expl: I("Ein Modell hat keinen Zugriff auf nicht-öffentliche Daten, außer sie wurden ihm im Prompt oder über ein Tool gegeben. Ein 'Treffer' ohne solche Quelle ist Raten oder Halluzination — niemals als Fakt behandeln.",
            "A model can't access non-public data unless it was provided via prompt or a tool. A 'hit' without such a source is guessing or hallucination — never treat it as fact."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Was beschreibt 'Inference' (Inferenz) am treffendsten?", "What most accurately describes 'inference'?"),
    a: [
      I("Die rechenintensive Trainingsphase, in der das Modell entsteht", "The compute-heavy training phase in which the model is built"),
      I("Die Nutzung des fertigen Modells, um zur Laufzeit Antworten zu erzeugen", "Using the finished model to produce answers at runtime"),
      I("Das gezielte Löschen veralteter Trainingsdaten aus dem fertigen Modell", "The targeted deletion of outdated training data from the model"),
      I("Die Komprimierung der Modellgewichte für kleinere Geräte", "The compression of model weights for smaller devices"),
    ], correct: 1,
    expl: I("Inferenz ist die Anwendungsphase: das bereits trainierte Modell erzeugt zur Laufzeit Ausgaben. Davon zu unterscheiden sind das (einmalige, teure) Training und die Komprimierung (Quantisierung).",
            "Inference is the usage phase: the already-trained model produces outputs at runtime. This is distinct from (one-time, expensive) training and from compression (quantization)."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Wofür eignet sich ein schnelles, günstiges 'kleines' Modell (Haiku-/Flash-/Mini-Klasse) am besten?",
         "What is a fast, cheap 'small' model (Haiku/Flash/Mini class) best suited for?"),
    a: [
      I("Für die anspruchsvollsten mehrstufigen wissenschaftlichen Beweisführungen", "For the most demanding multi-step scientific proofs"),
      I("Für hohe Stückzahlen einfacher Aufgaben wie Klassifizieren und Extrahieren", "For high volumes of simple tasks like classifying and extracting"),
      I("Für komplexe Strategieanalysen mit vielen verschachtelten Abhängigkeiten", "For complex strategy analyses with many nested dependencies"),
      I("Für rechtsverbindliche Entscheidungen ganz ohne menschliche Prüfung", "For legally binding decisions entirely without human review"),
    ], correct: 1,
    expl: I("Kleine Modelle sind ideal für hohe Stückzahlen einfacher, klar umrissener Aufgaben — günstig und schnell. Für komplexes Schlussfolgern oder kritische Entscheidungen nimmt man stärkere Modelle und behält menschliche Prüfung.",
            "Small models are ideal for high volumes of simple, well-defined tasks — cheap and fast. For complex reasoning or critical decisions you use stronger models and keep human review."),
  },
  {
    dim: "understand", diff: 4,
    q: I("Was ist der wichtigste Unterschied zwischen offenen (selbst-hostbaren) und geschlossenen API-Modellen für Unternehmen?",
         "What's the key difference between open (self-hostable) and closed API models for enterprises?"),
    a: [
      I("Offene Modelle sind in jeder Aufgabe leistungsstärker als geschlossene", "Open models outperform closed ones in every task"),
      I("Bei Self-Hosting bleiben Daten im Haus, bei API verlassen sie es je Aufruf", "With self-hosting data stays in-house, with an API it leaves on each call"),
      I("Geschlossene Modelle sind kostenlos, offene immer kostenpflichtig", "Closed models are free, open ones are always paid"),
      I("Zwischen beiden besteht aus Governance-Sicht kein nennenswerter Unterschied", "From a governance view there is no notable difference between the two"),
    ], correct: 1,
    expl: I("Der entscheidende Governance-Unterschied ist der Datenfluss: selbst-hostbare Modelle erlauben Verarbeitung im eigenen Netz, bei API-Modellen verlassen die Daten das Haus. Qualität und Kosten sind davon unabhängig zu bewerten.",
            "The key governance difference is data flow: self-hostable models allow in-house processing; with API models data leaves the building. Quality and cost must be judged separately."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Wodurch unterscheidet sich ein 'Reasoning-Modell' vor allem von einem Standardmodell?",
         "How does a 'reasoning model' mainly differ from a standard model?"),
    a: [
      I("Es ist in praktisch allen Fällen günstiger und schneller im Betrieb", "It is cheaper and faster to run in practically all cases"),
      I("Es investiert vor der Antwort mehr Rechenzeit in mehrstufiges Schlussfolgern", "It spends more compute on multi-step reasoning before answering"),
      I("Es verarbeitet keine natürliche Sprache, sondern ausschließlich Code", "It doesn't process natural language, only code"),
      I("Es lässt sich grundsätzlich nur lokal und nie über eine API betreiben", "It can only ever run locally and never via an API"),
    ], correct: 1,
    expl: I("Reasoning-Modelle 'denken' vor der Antwort in mehreren Schritten — besser für komplexe Aufgaben, aber langsamer und teurer. Für einfache Aufgaben sind sie oft überdimensioniert.",
            "Reasoning models 'think' in multiple steps before answering — better for complex tasks, but slower and costlier. For simple tasks they are often overkill."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Wann ist ein Modell mit sehr großem Kontextfenster (1 Mio.+ Token) besonders wertvoll?",
         "When is a model with a very large context window (1M+ tokens) especially valuable?"),
    a: [
      I("Bei sehr kurzen, knappen Dialogen, bei denen es auf praktisch jedes einzelne Wort ankommt", "For very short dialogues where every word counts"),
      I("Wenn umfangreiche Dokumente oder Codebasen am Stück betrachtet werden müssen", "When large documents or codebases must be considered in one go"),
      I("Wenn das Modell ausschließlich neue Bilder aus Text generieren soll", "When the model is only ever meant to generate images from text"),
      I("Wenn die Antworten möglichst zufällig und kreativ ausfallen sollen", "When answers should be as random and creative as possible"),
    ], correct: 1,
    expl: I("Sehr große Kontextfenster lohnen sich, wenn viel Material am Stück berücksichtigt werden muss — lange Verträge, ganze Codebasen, umfangreiche Reports. Für kurze Dialoge oder Bildgenerierung sind sie irrelevant.",
            "Very large context windows pay off when a lot of material must be considered at once — long contracts, whole codebases, extensive reports. For short dialogues or image generation they're irrelevant."),
  },
  {
    dim: "understand", diff: 3,
    q: I("Was bedeutet es, dass LLMs grundsätzlich 'stateless' (zustandslos) sind?",
         "What does it mean that LLMs are fundamentally 'stateless'?"),
    a: [
      I("Dass sie zu keinem Thema eine eigene Meinung oder Haltung haben", "That they have no opinion or stance on any topic"),
      I("Dass sie sich ohne erneut mitgesendeten Verlauf an nichts erinnern", "That without the history being re-sent they remember nothing"),
      I("Dass sie nur in bestimmten Ländern rechtlich betrieben werden dürfen", "That they may only be legally operated in certain countries"),
      I("Dass sie jede Eingabe automatisch und dauerhaft auf Servern sichern", "That they automatically and permanently store every input on servers"),
    ], correct: 1,
    expl: I("Ein Modell hat kein eigenes Gedächtnis zwischen Aufrufen. 'Erinnerung' entsteht nur, weil die Anwendung den bisherigen Verlauf bei jedem Aufruf erneut mitschickt — nicht durch dauerhaftes Speichern im Modell.",
            "A model has no memory of its own between calls. 'Memory' exists only because the app re-sends the prior conversation with each call — not through permanent storage inside the model."),
  },
];

// ============================================================
// APPLY (business)
// ============================================================
POOL.push(
  {
    dim: "apply", diff: 3,
    q: I("Du willst KI in einem Prozess pilotieren. Was solltest du VOR dem Pilot zwingend festlegen?",
         "You want to pilot AI in a process. What must you define BEFORE the pilot?"),
    a: [
      I("Das Marketing-Budget für die spätere Einführung im Unternehmen", "The marketing budget for the later company-wide rollout"),
      I("Eine messbare Ausgangsbasis und klare Erfolgskriterien", "A measurable baseline and clear success criteria"),
      I("Den Namen und das Erscheinungsbild des eingesetzten Assistenten", "The name and appearance of the assistant being used"),
      I("Die Anzahl der Lizenzen für das gesamte Unternehmen", "The number of licenses for the entire company"),
    ], correct: 1,
    expl: I("Ohne Baseline und definierte Erfolgskriterien lässt sich der Nutzen eines Piloten nicht belegen — man weiß hinterher nicht, ob es besser geworden ist. Budget, Namen und Lizenzen sind nachgelagert.",
            "Without a baseline and defined success criteria you can't prove a pilot's value — afterwards you won't know whether anything actually improved. Budget, names and licenses come later."),
  },
  {
    dim: "apply", diff: 3, ctx: "Sales / Account",
    q: I("Im Vertrieb soll KI Angebotstexte erstellen. Welcher Ansatz schützt am besten vor blamablen Fehlern beim Kunden?",
         "In sales, AI should draft proposal texts. Which approach best protects against embarrassing errors to the customer?"),
    a: [
      I("Den KI-Text ungeprüft direkt versenden, um Zeit zu sparen", "Sending the AI-written text unchecked directly to the customer to save time"),
      I("Zahlen, Zusagen und Kundennamen vor dem Versand prüfen lassen", "Having figures, commitments and customer names reviewed before sending"),
      I("Vor dem Versand nur die Rechtschreibung automatisch prüfen lassen", "Only running an automatic spell check before sending"),
      I("Den Kunden bitten, etwaige Fehler selbst zu melden", "Asking the customer to report any errors themselves"),
    ], correct: 1,
    expl: I("KI kann Zahlen, Namen und Zusagen plausibel, aber falsch erzeugen. Beim Kunden zählt das doppelt — ein gezielter menschlicher Check genau dieser Elemente ist Pflicht; reine Rechtschreibprüfung reicht nicht.",
            "AI can produce figures, names and commitments that look plausible but are wrong. With customers that matters doubly — a targeted human check of exactly these elements is mandatory; a mere spell check is not enough."),
  },
  {
    dim: "apply", diff: 4, ctx: "Operations",
    q: I("Ein Prozess hat hohe Varianz und unklare Regeln. Eignet sich generative KI hier als alleinige Entscheidungsinstanz?",
         "A process has high variance and unclear rules. Is generative AI suitable as the sole decision-maker here?"),
    a: [
      I("Ja, denn gerade bei Unklarheit liefert KI besonders verlässliche Urteile", "Yes, because AI delivers especially reliable verdicts precisely when things are unclear"),
      I("Nein, denn unklare Regeln und hohe Varianz erfordern menschliche Aufsicht", "No, because unclear rules and high variance require human oversight"),
      I("Ja, sofern ein ausreichend großes Modell mit langem Kontext genutzt wird", "Yes, provided a sufficiently large model with long context is used"),
      I("Ja, allerdings nur außerhalb der Stoßzeiten wegen der Serverlast", "Yes, but only outside peak hours because of server load"),
    ], correct: 1,
    expl: I("Gerade bei unklaren Regeln und hoher Varianz steigt das Fehlerrisiko. Solche Prozesse brauchen menschliche Aufsicht (Human-in-the-Loop); KI eignet sich besser für klar definierte, wiederholbare Fälle. Modellgröße ändert daran nichts.",
            "Precisely with unclear rules and high variance the error risk grows. Such processes need human oversight (human-in-the-loop); AI fits better for well-defined, repeatable cases. Model size doesn't change that."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Zwei Use-Cases konkurrieren ums Budget: A spart 5 % Zeit bei 200 Mitarbeitenden, B spart 30 % bei 8. Welche Information ist für die Priorisierung am wichtigsten?",
         "Two use-cases compete for budget: A saves 5% time for 200 staff, B saves 30% for 8. Which info matters most for prioritization?"),
    a: [
      I("Welcher der beiden Use-Cases nach außen innovativer wirkt", "Which of the two use-cases looks more innovative externally"),
      I("Aufwand, Risiko und absoluter Wertbeitrag beider Optionen", "Effort, risk and absolute value contribution of both options"),
      I("Welches der beiden Teams den Bedarf zuerst angemeldet hat", "Which of the two teams flagged the need first"),
      I("Wie viele Lizenzen für die jeweilige Umsetzung nötig wären", "How many licenses each implementation would require"),
    ], correct: 1,
    expl: I("5 % von 200 Mitarbeitenden kann absolut mehr wert sein als 30 % von 8. Erst Aufwand, Risiko und absoluter Wertbeitrag zusammen erlauben eine fundierte Priorisierung — nicht das innovativere Image.",
            "5% of 200 staff may be worth more in absolute terms than 30% of 8. Only effort, risk and absolute value together allow a sound prioritization — not the more innovative image."),
  },
  {
    dim: "apply", diff: 3, ctx: "Finance",
    q: I("KI soll Finanzberichte zusammenfassen. Welches Risiko ist hier am gravierendsten?",
         "AI should summarize financial reports. Which risk is most severe here?"),
    a: [
      I("Dass die Zusammenfassungen für die Empfänger zu ausführlich geraten", "That the summaries turn out too lengthy for the recipients"),
      I("Subtile Zahlenfehler, die unbemerkt in Entscheidungen einfließen", "Subtle number errors flowing unnoticed into decisions"),
      I("Dass die Formatierung nicht der Corporate-Vorlage entspricht", "That the formatting doesn't match the corporate template"),
      I("Dass die Verarbeitung mehr Rechenzeit als erwartet benötigt", "That processing takes more compute time than expected"),
    ], correct: 1,
    expl: I("Bei Finanzdaten sind subtile Zahlendreher oder Fehlinterpretationen besonders gefährlich, weil sie plausibel aussehen und direkt in Entscheidungen einfließen. Kernzahlen müssen daher gegengeprüft werden.",
            "With financial data, subtle number errors or misreadings are especially dangerous because they look plausible and flow straight into decisions. Key figures must therefore be cross-checked."),
  },
  {
    dim: "apply", diff: 3, ctx: "Marketing",
    q: I("KI erzeugt Marketingtexte in Sekunden. Was bleibt die Hauptaufgabe des Menschen?",
         "AI produces marketing copy in seconds. What stays the human's main task?"),
    a: [
      I("Den erzeugten Output möglichst schnell und ungeprüft zu skalieren", "Scaling the generated output as fast and unchecked as possible"),
      I("Strategie, Markenstimme, Faktencheck und finale Auswahl zu verantworten", "Owning strategy, brand voice, fact-check and final selection"),
      I("Die eingesetzte KI im Team möglichst positiv darzustellen", "Presenting the AI used as positively as possible in the team"),
      I("Lediglich verbliebene Tippfehler im Output zu korrigieren", "Merely correcting remaining typos in the output"),
    ], correct: 1,
    expl: I("KI liefert Rohmaterial. Strategie, Markenkonsistenz, Faktenprüfung und die Auswahl des Richtigen bleiben menschliche Verantwortung — sonst skaliert man Mittelmaß und Fehler.",
            "AI provides raw material. Strategy, brand consistency, fact-checking and selecting the right option remain human responsibilities — otherwise you scale mediocrity and errors."),
  },
  {
    dim: "apply", diff: 4, ctx: "Finance",
    q: I("Ein KI-Tool prognostiziert Marktbewegungen mit hoher Trefferquote im Backtest. Welche Skepsis ist fachlich am wichtigsten?",
         "An AI tool forecasts market moves with high backtest accuracy. Which skepticism matters most technically?"),
    a: [
      I("Ob die Farbgebung der Charts seriös und einheitlich wirkt", "Whether the charts' color scheme looks serious and consistent"),
      I("Ob Overfitting oder Look-ahead-Bias die Backtest-Güte aufblähen", "Whether overfitting or look-ahead bias inflate the backtest quality"),
      I("Ob der Anbieter ein eingetragenes Markenlogo vorweisen kann", "Whether the vendor can show a registered trademark logo"),
      I("Wie viele aktive Nutzer das Tool bislang gewinnen konnte", "How many active users the tool has gained so far"),
    ], correct: 1,
    expl: I("Hohe Backtest-Trefferquoten entstehen leicht durch Overfitting (Überanpassung an die Vergangenheit) oder Look-ahead-Bias. Entscheidend ist die Leistung auf echten, ungesehenen Daten, nicht die Anpassung an historische Verläufe.",
            "High backtest accuracy easily arises from overfitting (over-adapting to the past) or look-ahead bias. What matters is performance on real, unseen data, not fit to historical paths."),
  },
  {
    dim: "apply", diff: 3, ctx: "Pricing / Commerce",
    q: I("KI soll dynamische Preise vorschlagen. Was muss vor der Produktivsetzung zwingend abgesichert sein?",
         "AI should propose dynamic prices. What must be secured before going live?"),
    a: [
      I("Dass die Preisvorschläge möglichst kreativ und überraschend ausfallen", "That the price suggestions are as creative and surprising as possible"),
      I("Regelkonformität, Preis-Leitplanken und ein menschlicher Override", "Regulatory compliance, price guardrails and a human override"),
      I("Dass die Berechnungen bevorzugt nachts und unbeobachtet laufen", "That calculations preferably run at night and unobserved"),
      I("Auf wie viele Nachkommastellen die Preise gerundet werden", "To how many decimal places the prices are rounded"),
    ], correct: 1,
    expl: I("Dynamische Preise berühren Regulatorik und Kundenvertrauen. Klare Leitplanken, Compliance und ein menschlicher Override verhindern Ausreißer mit teuren Folgen. Kreativität ist hier kein Ziel.",
            "Dynamic pricing touches regulation and customer trust. Clear guardrails, compliance and a human override prevent outliers with costly consequences. Creativity is not a goal here."),
  },
  {
    dim: "apply", diff: 2,
    q: I("Welche Aufgabe eignet sich am besten für einen ersten, risikoarmen KI-Piloten?",
         "Which task is best for a first, low-risk AI pilot?"),
    a: [
      I("Rechtsverbindliche Vertragsentscheidungen ohne menschliche Freigabe", "Legally binding contract decisions without human sign-off"),
      I("Der Entwurf interner Textvorlagen mit menschlicher Freigabe", "Drafting internal text templates with human sign-off"),
      I("Automatisierte Personalentscheidungen wie Kündigungen", "Automated HR decisions such as terminations"),
      I("Eigenständige medizinische Diagnosen ohne ärztliche Kontrolle", "Autonomous medical diagnoses without a doctor's review"),
    ], correct: 1,
    expl: I("Ein guter erster Pilot hat geringe Tragweite und einen menschlichen Freigabeschritt. Interne Textentwürfe sind reversibel und risikoarm — ideal zum Lernen. Verbindliche oder personenbezogene Entscheidungen sind ungeeignet.",
            "A good first pilot is low-stakes with a human sign-off step. Internal text drafts are reversible and low-risk — ideal for learning. Binding or personal decisions are unsuitable."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Ein KI-Pilot zeigt 20 % Zeitgewinn, aber die Fehlerquote steigt leicht. Wie entscheidest du?",
         "An AI pilot shows 20% time savings but the error rate rises slightly. How do you decide?"),
    a: [
      I("Sofort breit ausrollen, da Zeitgewinn jeden anderen Faktor übersticht", "Roll out broadly at once, since time savings beat every other factor"),
      I("Folgekosten der Fehler gegen den Zeitgewinn abwägen und QS nachschärfen", "Weigh the error cost against the time savings and tighten QA"),
      I("Den Piloten abbrechen, da jede erhöhte Fehlerquote inakzeptabel ist", "Abort the pilot, since any raised error rate is unacceptable"),
      I("Die Fehler vorerst nicht berichten und den Zeitgewinn hervorheben", "Not report the errors for now and highlight the time savings"),
    ], correct: 1,
    expl: I("Zeitgewinn und Fehlerkosten müssen gegeneinander abgewogen werden — je nach Folgekosten eines Fehlers kann selbst ein kleiner Anstieg teuer sein. Richtig: Qualitätssicherung nachschärfen und neu bewerten, nicht blind ausrollen oder vertuschen.",
            "Time savings and error cost must be weighed against each other — depending on the cost of a mistake, even a small increase can be expensive. Correct: tighten QA and re-evaluate, not roll out blindly or cover up."),
  },
  {
    dim: "apply", diff: 3,
    q: I("Du musst hochvertrauliche Verträge automatisch kategorisieren. Welcher Ansatz passt am besten?",
         "You must auto-categorize highly confidential contracts. Which approach fits best?"),
    a: [
      I("Das größte verfügbare Cloud-Modell, unabhängig vom Datenstandort", "The largest available cloud model, regardless of data location"),
      I("Ein lokal gehostetes Modell, damit die Daten das Haus nicht verlassen", "A locally hosted model so the data never leaves the building"),
      I("Die Verträge in einen frei zugänglichen Web-Chatbot kopieren", "Pasting the contracts into a freely accessible web chatbot"),
      I("Ganz auf KI verzichten und rein nach Bauchgefühl einsortieren", "Forgoing AI entirely and sorting purely by gut feeling"),
    ], correct: 1,
    expl: I("Bei hochvertraulichen Daten zählt der Datenfluss mehr als die letzte Leistungsspitze. Ein lokal gehostetes Modell hält die Daten im Haus — Kategorisieren können auch kleinere Modelle gut.",
            "With highly confidential data, the data flow matters more than the last bit of peak performance. A self-hosted model keeps data in-house — categorization is well within smaller models' reach."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Was ist der Kerngedanke einer 'Model-Routing'-Strategie?",
         "What's the core idea of a 'model routing' strategy?"),
    a: [
      I("Für maximale Qualität konsequent immer das teuerste Modell zu wählen", "Consistently picking the most expensive model for maximum quality"),
      I("Aufgaben je nach Anspruch dem jeweils passenden Modell zuzuweisen", "Assigning tasks to the most suitable model by their demands"),
      I("Sämtliche Anfragen aus Konsistenzgründen durch dasselbe Modell zu leiten", "Routing all requests through the same model for consistency"),
      I("Modelle nach dem Zufallsprinzip zu wechseln, um Anbieter zu testen", "Switching models at random to test different providers"),
    ], correct: 1,
    expl: I("Model-Routing weist jede Aufgabe dem passenden Modell zu: einfache oder sensible Fälle an kleine bzw. lokale Modelle, komplexe an starke. Das spart Kosten und schützt Daten — anders als 'immer das teuerste' oder Zufall.",
            "Model routing assigns each task to the right model: simple or sensitive cases to small or local models, complex ones to strong models. This saves cost and protects data — unlike 'always the priciest' or random choice."),
  },
  {
    dim: "apply", diff: 3,
    q: I("Warum kann es token-effizient sein, ein kleines Modell vorzuschalten?",
         "Why can it be token-efficient to put a small model in front?"),
    a: [
      I("Weil kleine Modelle bei jeder Aufgabe die genaueren Antworten liefern", "Because small models reliably give more accurate answers on every kind of task"),
      I("Weil einfache Fälle günstig erledigt und nur schwere weitergereicht werden", "Because simple cases are handled cheaply and only hard ones are passed on"),
      I("Weil kleine Modelle im Betrieb praktisch keinen Strom verbrauchen", "Because small models consume practically no power in operation"),
      I("Weil der Tokenverbrauch für die Gesamtkosten ohnehin keine Rolle spielt", "Because token usage doesn't matter for total cost anyway"),
    ], correct: 1,
    expl: I("Ein vorgeschaltetes kleines Modell erledigt die Masse einfacher Fälle günstig; nur die wirklich schweren Fälle landen beim teuren Modell. Das senkt die Gesamtkosten deutlich — kleine Modelle sind aber nicht generell genauer.",
            "A small model in front handles the bulk of easy cases cheaply; only genuinely hard cases reach the expensive model. This cuts total cost significantly — but small models aren't generally more accurate."),
  },
  {
    dim: "apply", diff: 3,
    q: I("Eine anspruchsvolle, mehrstufige Recherche mit Quellenarbeit steht an. Was ist sinnvoll?",
         "A demanding, multi-step research task with source work is due. What's sensible?"),
    a: [
      I("Ein winziges lokales Modell ohne Werkzeug- oder Websuche-Zugang", "A tiny local model without tool or web-search access"),
      I("Ein starkes Reasoning-Modell mit Werkzeugzugang und Quellenprüfung", "A strong reasoning model with tool access and source checking"),
      I("Ein reiner Bildgenerator, der die Rechercheergebnisse visualisiert", "A pure image generator that visualizes the research results"),
      I("Ein einfaches Übersetzungstool, das die Quellen sprachlich anpasst", "A simple translation tool that linguistically adapts the sources"),
    ], correct: 1,
    expl: I("Anspruchsvolle Recherche mit Quellen braucht starkes Schlussfolgern plus Werkzeug-/Websuche-Zugang — und am Ende menschliche Quellenprüfung. Ein winziges Offline-Modell, ein Bildgenerator oder ein Übersetzer überfordert das.",
            "Demanding research with sources needs strong reasoning plus tool/web access — and human source verification at the end. A tiny offline model, an image generator or a translator is not up to it."),
  },
  {
    dim: "apply", diff: 3,
    q: I("Was spricht GEGEN ein lokales LLM, wenn die Aufgabe das stärkste verfügbare Reasoning braucht?",
         "What argues AGAINST a local LLM when the task needs the strongest available reasoning?"),
    a: [
      I("Lokale Modelle dürfen aus Lizenzgründen gar nicht geschäftlich genutzt werden", "Local models may not be used commercially for licensing reasons"),
      I("Kleinere lokale Modelle erreichen oft nicht die Spitzenleistung großer", "Smaller local models often don't reach the peak performance of large ones"),
      I("Lokale Modelle verursachen pro Token grundsätzlich höhere Kosten", "Local models fundamentally cost more per processed token than any comparable cloud API"),
      I("Lokale Modelle benötigen zwingend eine ständige Internetverbindung", "Local models strictly require a constant internet connection"),
    ], correct: 1,
    expl: I("Lokale Modelle sind top für Datenschutz, erreichen aber bei reiner Spitzenleistung oft nicht die großen Frontier-Modelle. Bei höchstem Reasoning-Bedarf ist das der zentrale Trade-off — nicht Lizenz, Kosten oder Internetzwang.",
            "Local models are great for privacy but often don't match large frontier models in peak capability. When top reasoning is required, that's the central trade-off — not licensing, cost or an internet requirement."),
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
      I("Sie sofort zitieren, da die Angaben detailliert und konkret sind", "Cite it at once, since the details are specific and concrete"),
      I("Existenz und Inhalt der Quelle unabhängig verifizieren", "Independently verify the source's existence and content"),
      I("Das genannte Jahr leicht anpassen, falls es besser ins Argument passt", "Slightly adjust the year if it fits the argument better"),
      I("Nur prüfen, ob der Name des Journals seriös und echt klingt", "Only check whether the journal name sounds serious and real"),
    ], correct: 1,
    expl: I("KI erfindet gelegentlich täuschend echte Quellenangaben. Detailgrad ist kein Echtheitsbeweis — die Quelle muss unabhängig auffindbar und inhaltlich passend sein, bevor man sie nutzt.",
            "AI sometimes fabricates convincingly real citations. Specificity is no proof of authenticity — the source must be independently findable and actually match before you use it."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Zwei Modelle liefern bei gleicher Aufgabe widersprüchliche Ergebnisse. Welche Schlussfolgerung ist methodisch zulässig?",
         "Two models give contradictory results on the same task. Which conclusion is methodologically valid?"),
    a: [
      I("Das neuere der beiden Modelle hat in solchen Fällen automatisch recht", "The newer of the two models is automatically right in such cases"),
      I("Beide Ausgaben sind Hypothesen und gegen eine verlässliche Quelle zu prüfen", "Both outputs are hypotheses to be checked against a reliable source"),
      I("Die längere und ausführlichere der beiden Antworten ist die korrekte", "The longer and more detailed of the two answers is the correct one"),
      I("Man bildet einfach den Mittelwert beider Antworten als Ergebnis", "You simply take the average of both answers as the result"),
    ], correct: 1,
    expl: I("Weder Neuheit noch Länge entscheiden über Wahrheit, und Mitteln ergibt bei widersprüchlichen Aussagen keinen Sinn. Widersprüchliche Ausgaben sind konkurrierende Hypothesen — Klarheit bringt nur eine verlässliche externe Quelle.",
            "Neither recency nor length determines truth, and averaging contradictory statements makes no sense. Contradictory outputs are competing hypotheses — only a reliable external source resolves them."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Welches Signal deutet am stärksten darauf hin, dass ein KI-Output für eine kritische Entscheidung NICHT ausreicht?",
         "Which signal most strongly indicates an AI output is NOT sufficient for a critical decision?"),
    a: [
      I("Die Antwort ist sprachlich besonders elegant und flüssig formuliert", "The answer is especially elegant and fluently phrased"),
      I("Konkrete, prüfbare Belege fehlen oder lassen sich nicht verifizieren", "Concrete, checkable evidence is missing or can't be verified"),
      I("Die Antwort fällt vergleichsweise kurz und kompakt aus", "The answer turns out comparatively short and compact"),
      I("Die Antwort verwendet zahlreiche etablierte Fachbegriffe", "The answer uses numerous established technical terms"),
    ], correct: 1,
    expl: I("Eleganz, Länge und Fachjargon sagen nichts über Verlässlichkeit. Entscheidend ist, ob konkrete, prüfbare Belege vorliegen — fehlen sie, reicht der Output nicht für kritische Entscheidungen.",
            "Elegance, length and jargon say nothing about reliability. What matters is whether concrete, checkable evidence exists — if it's missing, the output is not enough for critical decisions."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Wie erkennst du am ehesten, dass ein KI-Text oberflächlich überzeugend, aber inhaltsleer ist?",
         "How do you best spot that an AI text is superficially convincing but hollow?"),
    a: [
      I("Daran, dass er sich sprachlich durchweg flüssig und sehr angenehm liest", "By it reading consistently fluently and very pleasantly throughout"),
      I("Daran, dass er bei Allgemeinplätzen ohne prüfbare Aussagen bleibt", "By it staying at generalities without checkable claims"),
      I("Daran, dass er vergleichsweise viele Absätze umfasst", "By it comprising comparatively many paragraphs"),
      I("Daran, dass er Inhalte mit Aufzählungen strukturiert", "By it structuring content with bullet points"),
    ], correct: 1,
    expl: I("Flüssigkeit ist die Stärke von LLMs und kein Qualitätsmerkmal. Inhaltsleere zeigt sich an fehlenden konkreten, überprüfbaren Aussagen hinter den schönen Formulierungen — nicht an Länge oder Formatierung.",
            "Fluency is an LLM's strength, not a quality signal. Hollowness shows in the absence of concrete, verifiable claims behind the nice phrasing — not in length or formatting."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Eine KI behauptet etwas und liefert auf Nachfrage drei 'Quellen', die alle nicht auffindbar sind. Welcher Schluss ist korrekt?",
         "An AI claims something and provides three 'sources' that are all unfindable. Which conclusion is correct?"),
    a: [
      I("Die Quellen existieren sicher, sind aber schwer öffentlich auffindbar", "The sources surely exist but are hard to find publicly"),
      I("Es ist ein starkes Halluzinations-Signal; die Aussage gilt als unbelegt", "It's a strong hallucination signal; the claim counts as unsupported"),
      I("Die KI verbreitet die Falschangaben in voller Absicht und bewusst", "The AI is spreading the false references fully and knowingly on purpose"),
      I("Quellenangaben sind bei KI-Antworten ohnehin von geringer Bedeutung", "Source references are of little importance in AI answers anyway"),
    ], correct: 1,
    expl: I("Nicht auffindbare Quellen sind ein klassisches Halluzinations-Muster. 'Absicht' unterstellt eine Intention, die ein Modell nicht hat — die Aussage gilt schlicht als unbelegt und darf nicht verwendet werden.",
            "Unfindable sources are a classic hallucination pattern. 'On purpose' implies an intent a model doesn't have — the claim simply counts as unsupported and must not be used."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Wann ist es sinnvoll, dieselbe Frage mehreren Modellen zu stellen?",
         "When does it make sense to ask the same question to several models?"),
    a: [
      I("Praktisch nie, da es nur Zeit kostet und keine neuen Erkenntnisse bringt", "Practically never, as it only costs time and yields nothing new"),
      I("Bei wichtigen Aussagen, um Konsens und Widersprüche als Signal zu nutzen", "For important claims, to use consensus and contradictions as a signal"),
      I("Immer, da die Mehrheit der Antworten zwangsläufig die Wahrheit ist", "Always, since the majority of answers is inevitably the truth"),
      I("Ausschließlich bei Aufgaben, die mit Bildern oder Grafiken zu tun haben", "Only for tasks that involve images or graphics"),
    ], correct: 1,
    expl: I("Mehrere Modelle zu befragen kann Widersprüche aufdecken und so ein Prüfsignal liefern. Aber Mehrheit ist kein Wahrheitsbeweis — am Ende braucht es Verifikation an einer verlässlichen Quelle.",
            "Querying several models can reveal contradictions and thus a check signal. But a majority is no proof of truth — verification against a reliable source is still required."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Wie zuverlässig sind automatische 'KI-Detektoren' für Text nach aktuellem Forschungsstand?",
         "How reliable are automatic 'AI detectors' for text per current research?"),
    a: [
      I("Praktisch unfehlbar, sofern der Text lang genug ist", "Practically infallible, provided the text is long enough"),
      I("Unzuverlässig, mit vielen Fehlurteilen und leicht zu umgehen", "Unreliable, with many misjudgements and easily circumvented"),
      I("Sehr verlässlich, allerdings ausschließlich bei sehr kurzen Texten", "Very reliable, but only for very short texts"),
      I("Rechtlich verbindlich und daher als Beweismittel anerkannt", "Legally binding and therefore accepted as evidence"),
    ], correct: 1,
    expl: I("Studien zeigen: Text-Detektoren produzieren viele Fehlurteile (Falsch-Positive wie Falsch-Negative) und lassen sich leicht durch Umschreiben umgehen. Sie taugen nicht als Beweismittel — Provenienz ist der robustere Weg.",
            "Studies show text detectors produce many misjudgements (false positives and negatives) and are easily circumvented by rewriting. They are not valid evidence — provenance is the more robust path."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Was ist der robusteste Ansatz, die Herkunft von Inhalten nachzuweisen, statt zu 'raten'?",
         "What's the most robust approach to prove content origin rather than 'guessing'?"),
    a: [
      I("Sich auf das geschulte Bauchgefühl erfahrener Leserinnen verlassen", "Relying on the trained gut feeling of experienced readers"),
      I("Verifizierbare Herkunfts-Metadaten nutzen (Content Credentials, C2PA)", "Using verifiable origin metadata (Content Credentials, C2PA)"),
      I("Die Textlänge messen und mit typischen KI-Ausgaben vergleichen", "Measuring text length and comparing it to typical AI outputs"),
      I("Systematisch nach untypischen Tippfehlern und Brüchen suchen", "Systematically searching for atypical typos and breaks"),
    ], correct: 1,
    expl: I("Statt Inhalte zu 'erraten', setzt der Provenienz-Ansatz (C2PA/Content Credentials) auf verifizierbare Herkunfts-Metadaten — die belastbare Alternative zu unzuverlässigen Detektoren und Bauchgefühl.",
            "Instead of 'guessing' at content, the provenance approach (C2PA/Content Credentials) relies on verifiable origin metadata — the solid alternative to unreliable detectors and gut feeling."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Welches Merkmal ist ein TYPISCHES (aber kein sicheres) Indiz für KI-generierten Text?",
         "Which trait is a TYPICAL (but not certain) sign of AI-generated text?"),
    a: [
      I("Viele konkrete, überprüfbare persönliche Details und Stilbrüche", "Many concrete, checkable personal details and stylistic breaks"),
      I("Glatte, generische Formulierungen mit wenig prüfbarem Gehalt", "Smooth, generic phrasing with little checkable substance"),
      I("Auffällig viele Rechtschreibfehler in nahezu jedem Satz", "Strikingly many spelling errors in nearly every sentence"),
      I("Handschriftliche Notizen und individuelle Randbemerkungen", "Handwritten notes and individual margin comments"),
    ], correct: 1,
    expl: I("KI-Texte klingen oft glatt und generisch, ohne spezifische, prüfbare Details. Das ist ein Indiz, kein Beweis — Menschen können genauso schreiben, und KI kann Details erfinden. Konkrete Details sprechen eher gegen KI.",
            "AI text often sounds smooth and generic, lacking specific, checkable detail. That's an indication, not proof — humans can write that way too, and AI can fabricate detail. Concrete details point rather away from AI."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Ein Mitarbeiter wird auf Basis eines KI-Detektor-Scores der Täuschung beschuldigt. Wie bewertest du das als Führungskraft?",
         "An employee is accused of cheating based on an AI-detector score. How do you assess this as a leader?"),
    a: [
      I("Der Score genügt als belastbarer Nachweis für die Täuschung", "The score on its own is sufficient as solid proof of the cheating"),
      I("Der Score allein ist kein Beweis; Kontext und Gespräch sind nötig", "The score alone is no proof; context and a conversation are needed"),
      I("Die Sache sofort und ohne weitere Prüfung disziplinarisch ahnden", "Sanction it disciplinarily at once without further review"),
      I("Den Score zur Sicherheit verdoppeln und dann erneut bewerten", "Double the score to be safe and then re-evaluate"),
    ], correct: 1,
    expl: I("Detektor-Scores haben reale Falsch-Positiv-Raten und sind kein Beweis. Eine faire Führungskraft prüft Kontext und sucht das Gespräch, statt allein auf eine Zahl hin zu sanktionieren.",
            "Detector scores have real false-positive rates and are no proof. A fair leader checks context and seeks dialogue rather than sanctioning based on a number alone."),
  },
  {
    dim: "evaluate", diff: 3,
    q: I("Welcher Ansatz hilft Führungskräften am ehesten, die Herkunft von Bildern oder Dokumenten zu prüfen?",
         "Which approach best helps leaders verify the origin of images or documents?"),
    a: [
      I("Eine automatische Rechtschreib- und Grammatikprüfung des Inhalts", "An automatic spell and grammar check of the content"),
      I("Eine Prüfung der Content Credentials bzw. Herkunfts-Metadaten", "Checking the content credentials or origin metadata"),
      I("Ein Abgleich der Dateigröße mit vergleichbaren echten Dateien", "Comparing the file size with comparable genuine files"),
      I("Eine Übersetzung des Inhalts zur Kontrolle der Konsistenz", "A translation of the content to check for consistency"),
    ], correct: 1,
    expl: I("Provenienz-Prüfung über Content Credentials/Metadaten ist belastbarer als reine Detektor-Scores oder oberflächliche Merkmale, weil sie auf verifizierbarer Herkunft statt auf Wahrscheinlichkeits-Schätzungen beruht.",
            "Provenance checks via content credentials/metadata are more robust than mere detector scores or surface traits because they rely on verifiable origin rather than probability estimates."),
  },
);

// ============================================================
// ETHICS
// ============================================================
POOL.push(
  {
    dim: "ethics", diff: 3,
    q: I("Mitarbeiterdaten sollen in ein Cloud-KI-Tool gegeben werden. Was ist datenschutzrechtlich zuerst zu klären?",
         "Employee data is to be entered into a cloud AI tool. What must be clarified first under data protection law?"),
    a: [
      I("Welche Schriftgröße und welches Layout das Tool standardmäßig nutzt", "What default font size, color scheme and layout the tool uses internally"),
      I("Rechtsgrundlage, Zweckbindung, Auftragsverarbeitung und Mitbestimmung", "Legal basis, purpose limitation, data processing and co-determination"),
      I("Ob das Tool eine angenehme dunkle Benutzeroberfläche anbietet", "Whether the tool offers a pleasant dark user interface"),
      I("Wie viele Serverstandorte der Anbieter weltweit betreibt", "How many server locations the vendor operates worldwide"),
    ], correct: 1,
    expl: I("Vor Mitarbeiterdaten in Cloud-Tools sind Rechtsgrundlage, Zweckbindung, Auftragsverarbeitungsvertrag und Mitbestimmung zu klären — sonst drohen rechtliche und Vertrauensschäden. Layout oder Standortzahl sind nachrangig.",
            "Before putting employee data into cloud tools, you must clarify legal basis, purpose limitation, a data processing agreement and co-determination — otherwise legal and trust damage looms. Layout or number of locations is secondary."),
  },
  {
    dim: "ethics", diff: 4,
    q: I("Ein KI-System bevorzugt bei der Bewerbervorauswahl systematisch eine Gruppe. Was ist die fachlich korrekte Einordnung?",
         "An AI system systematically favors one group in candidate pre-selection. What's the correct assessment?"),
    a: [
      I("Unproblematisch, solange die Vorhersagegenauigkeit insgesamt hoch bleibt", "Unproblematic as long as overall predictive accuracy stays high"),
      I("Algorithmischer Bias mit rechtlichem und ethischem Handlungsbedarf", "Algorithmic bias requiring legal and ethical action"),
      I("Ein reines IT-Thema, das ohne Führungsbezug behandelt werden kann", "A pure IT matter that can be handled without leadership involvement"),
      I("Ein Beleg dafür, dass das System besonders objektiv entscheidet", "Proof that the system decides especially objectively"),
    ], correct: 1,
    expl: I("Systematische Bevorzugung ist algorithmischer Bias — rechtlich (Antidiskriminierung) und ethisch relevant und klar eine Führungsverantwortung, kein reines IT-Thema. Hohe Treffergenauigkeit rechtfertigt Diskriminierung nicht.",
            "Systematic favoring is algorithmic bias — legally (anti-discrimination) and ethically relevant, and clearly a leadership responsibility, not a pure IT matter. High accuracy doesn't justify discrimination."),
  },
  {
    dim: "ethics", diff: 3,
    q: I("Wann ist es vertretbar, eine KI-gestützte Entscheidung OHNE menschliche Prüfung umzusetzen?",
         "When is it acceptable to implement an AI-assisted decision WITHOUT human review?"),
    a: [
      I("Bei geringer Tragweite und reversiblen, niedrigriskanten Routinefällen", "For low-stakes, reversible, low-risk routine cases"),
      I("Bei personellen Entscheidungen wie Kündigungen, um Zeit zu sparen", "For personnel decisions such as terminations, to save time"),
      I("Immer dann, wenn das eingesetzte Modell teuer und leistungsstark war", "Whenever the model used was expensive and powerful"),
      I("Bei rechtsverbindlichen Bescheiden mit unmittelbarer Außenwirkung", "For legally binding rulings with immediate external effect"),
    ], correct: 0,
    expl: I("Vollautomatik ist nur bei geringer Tragweite, reversiblen Routinefällen vertretbar. Bei einschneidenden, personellen oder rechtsverbindlichen Entscheidungen ist menschliche Prüfung Pflicht — unabhängig vom Modellpreis.",
            "Full automation is acceptable only for low-stakes, reversible routine cases. For consequential, personnel or legally binding decisions, human review is mandatory — regardless of the model's price."),
  },
  {
    dim: "ethics", diff: 3,
    q: I("Ein Team will mit KI heimlich die Produktivität einzelner Mitarbeiter überwachen. Wie bewertest du das?",
         "A team wants to use AI to secretly monitor individual employee productivity. How do you assess this?"),
    a: [
      I("Als effizient und damit grundsätzlich legitim und vertretbar", "As efficient and therefore fundamentally legitimate and defensible"),
      I("Als rechtlich und ethisch hochproblematisch und vertrauensschädigend", "As legally and ethically highly problematic and trust-damaging"),
      I("Als unbedenklich, solange die Ergebnisse anonym ausgewertet werden", "As harmless as long as the results are evaluated anonymously"),
      I("Als selbstverständliche Pflicht jeder modernen Führungskraft", "As a self-evident duty of every modern leader"),
    ], correct: 1,
    expl: I("Heimliche Überwachung verstößt gegen Datenschutz und Mitbestimmung und zerstört Vertrauen. Effizienz rechtfertigt das nicht; auch vermeintliche Anonymität heilt die fehlende Transparenz nicht.",
            "Covert monitoring violates data protection and co-determination and destroys trust. Efficiency doesn't justify it; alleged anonymity doesn't cure the missing transparency either."),
  },
  {
    dim: "ethics", diff: 2,
    q: I("Was ist der Kern von 'Zweckbindung' im Datenschutz?",
         "What is the core of 'purpose limitation' in data protection?"),
    a: [
      I("Daten dürfen flexibel für beliebige neue Zwecke weiterverwendet werden", "Data may be flexibly reused for any new purpose that later comes up"),
      I("Daten dürfen nur für den festgelegten, legitimen Zweck verarbeitet werden", "Data may only be processed for the defined, legitimate purpose"),
      I("Daten müssen unmittelbar nach jeder Verarbeitung gelöscht werden", "Data must be deleted immediately after each processing"),
      I("Die Regel gilt ausschließlich für Bild- und Videodaten", "The rule applies exclusively to image and video data"),
    ], correct: 1,
    expl: I("Zweckbindung heißt: Daten, die für Zweck A erhoben wurden, dürfen nicht ohne Weiteres für einen unverwandten Zweck B verwendet werden. Das begrenzt die KI-Zweckentfremdung von Daten — unabhängig vom Datentyp.",
            "Purpose limitation means data collected for purpose A may not simply be reused for an unrelated purpose B. This constrains repurposing data for AI — regardless of data type."),
  },
  {
    dim: "ethics", diff: 4,
    q: I("Eine KI trifft eine korrekte, aber für einen Kunden nachteilige Entscheidung. Wer trägt die Verantwortung?",
         "An AI makes a correct but customer-adverse decision. Who bears responsibility?"),
    a: [
      I("Die KI selbst, da sie die Entscheidung eigenständig getroffen hat", "The AI itself, since it made the decision autonomously"),
      I("Das Unternehmen und die verantwortlichen Menschen dahinter", "The company and the responsible humans behind it"),
      I("Der betroffene Kunde, der dem Einsatz der KI zugestimmt hat", "The affected customer, who consented to the AI's use"),
      I("Niemand, da der Vorgang vollständig automatisiert ablief", "Nobody, since the process ran fully automated"),
    ], correct: 1,
    expl: I("KI ist kein Rechts- oder Haftungssubjekt. Verantwortung bleibt immer bei Unternehmen und Menschen, die das System einsetzen — Automatisierung oder Zustimmung des Kunden entbindet davon nicht.",
            "AI is not a legal or liable entity. Responsibility always stays with the company and the people deploying the system — automation or customer consent does not absolve them."),
  },
  {
    dim: "ethics", diff: 3,
    q: I("Du teilst vertrauliche Dokumente extern. Welche Schutzmaßnahme gegen unbefugte KI-Verarbeitung wird oft vergessen?",
         "You share confidential documents externally. Which safeguard against unauthorized AI processing is often forgotten?"),
    a: [
      I("Die Dateien vor dem Versand auf eine größere Dateigröße zu bringen", "Increasing the files' size before sending"),
      I("Eine klare Kennzeichnung 'nicht für KI-Training/-Verarbeitung'", "A clear marking 'not for AI training/processing'"),
      I("Eine andere Schriftart zu wählen, die schwerer maschinell lesbar ist", "Choosing a font that is harder to read by machines"),
      I("Die Dokumente bevorzugt farbig statt schwarzweiß auszudrucken", "Printing the documents in color rather than black and white"),
    ], correct: 1,
    expl: I("Eine oft vergessene Maßnahme ist die klare Kennzeichnung (sichtbar und maschinenlesbar), dass ein Dokument nicht für KI-Training/-Verarbeitung bestimmt ist — ein Wasserzeichen-Äquivalent für KI. Dateigröße oder Schrift helfen nicht.",
            "An often-forgotten measure is clearly marking (visibly and machine-readably) that a document is not intended for AI training/processing — a watermark-equivalent for AI. File size or font don't help."),
  },
);

// ============================================================
// LEAD (people & development)
// ============================================================
POOL.push(
  {
    dim: "lead", diff: 3,
    q: I("Ein Mitarbeiter nutzt eigenständig ein nicht freigegebenes KI-Tool und ist dadurch produktiver. Beste Führungsreaktion?",
         "An employee independently uses an unapproved AI tool and is more productive. Best leadership response?"),
    a: [
      I("Den Verstoß umgehend und ohne vorheriges Gespräch sanktionieren", "Sanction the violation immediately without a prior conversation"),
      I("Das Gespräch suchen, Nutzen verstehen und einen klaren Rahmen schaffen", "Seek the conversation, understand the benefit and create a clear framework"),
      I("Jegliche eigenständige KI-Nutzung im gesamten Team untersagen", "Ban any independent AI use across the entire team"),
      I("Den ganzen Vorgang stillschweigend ignorieren, solange das Ergebnis am Ende stimmt", "Quietly ignore the whole thing as long as the outcome is fine in the end"),
    ], correct: 1,
    expl: I("Pauschale Sanktion oder Verbot treibt die Nutzung in den Untergrund; Ignorieren lässt Risiken laufen. Das Gespräch nutzt die Initiative und schafft einen sicheren, klaren Rahmen.",
            "Blanket sanctions or bans drive usage underground; ignoring lets risks run. A conversation harnesses the initiative and creates a safe, clear framework."),
  },
  {
    dim: "lead", diff: 3,
    q: I("Du willst KI-Kompetenz im Team nachhaltig aufbauen. Welcher Ansatz hat in der Praxis die höchste Wirkung?",
         "You want to build lasting AI competence in your team. Which approach has the highest impact in practice?"),
    a: [
      I("Eine einmalige Pflichtschulung ohne konkreten Anwendungsbezug", "A one-off mandatory training without concrete application context"),
      I("Sichere Experimentierräume, echte Use-Cases und Peer-Learning über Zeit", "Safe experimentation spaces, real use-cases and peer learning over time"),
      I("Die Nutzung von KI ausschließlich der IT-Abteilung vorzubehalten", "Reserving AI use exclusively for the IT department"),
      I("Prämien für diejenigen, die die meisten Prompts pro Woche absetzen", "Bonuses for whoever sends the most prompts per week"),
    ], correct: 1,
    expl: I("Nachhaltige Kompetenz entsteht durch wiederholtes Anwenden an echten Aufgaben, sichere Räume zum Ausprobieren und Lernen voneinander — nicht durch eine einmalige Schulung oder reine Mengenanreize.",
            "Lasting competence comes from repeated application to real tasks, safe spaces to experiment and learning from each other — not from a one-off training or pure volume incentives."),
  },
  {
    dim: "lead", diff: 4,
    q: I("Dein Team ist beim KI-Einsatz gespalten: Frühadopter gegen Skeptiker. Was ist der wirksamste erste Hebel?",
         "Your team is split on AI: early adopters vs. skeptics. What's the most effective first lever?"),
    a: [
      I("Die Skeptiker im Team offen als Bremser und Blockierer benennen", "Openly labeling the skeptics in the team as blockers"),
      I("Gemeinsame, konkrete Use-Cases definieren und Sorgen ernst nehmen", "Defining shared, concrete use-cases and taking concerns seriously"),
      I("Künftig vorrangig nur noch mit den Frühadoptern zusammenarbeiten", "From now on working mainly with the early adopters only"),
      I("Eine verpflichtende Tool-Nutzung ohne weitere Begründung einführen", "Introducing a mandatory tool use without further rationale"),
    ], correct: 1,
    expl: I("Lager zu vertiefen oder Skeptiker bloßzustellen verhärtet die Fronten. Gemeinsame konkrete Use-Cases und ernstgenommene Sorgen schaffen Erfolgserlebnisse, die überzeugen — besser als Zwang oder Ausgrenzung.",
            "Deepening camps or shaming skeptics hardens fronts. Shared concrete use-cases and taking concerns seriously create wins that convince — better than coercion or exclusion."),
  },
  {
    dim: "lead", diff: 3,
    q: I("Welche Vorbildwirkung einer Führungskraft beim Thema KI ist am glaubwürdigsten?",
         "Which leadership role-model behavior on AI is most credible?"),
    a: [
      I("Die KI-Nutzung im Team nachdrücklich einzufordern, sie selbst aber konsequent zu meiden", "Demanding AI use from the team while avoiding it personally"),
      I("Selbst sichtbar zu lernen, Fehler zu teilen und Grenzen offen zu benennen", "Visibly learning oneself, sharing mistakes and naming limits openly"),
      I("Nach außen den Eindruck zu erwecken, bereits alles zu beherrschen", "Conveying the impression of already mastering everything"),
      I("Die Verantwortung fürs Thema vollständig an Berater zu delegieren", "Fully delegating responsibility for the topic to consultants"),
    ], correct: 1,
    expl: I("Glaubwürdigkeit entsteht durch eigenes sichtbares Lernen und Offenheit über Grenzen — nicht durch Predigen ohne eigene Praxis, vorgetäuschte Allwissenheit oder vollständige Delegation.",
            "Credibility comes from visibly learning yourself and being open about limits — not from preaching without practice, feigning omniscience or full delegation."),
  },
  {
    dim: "lead", diff: 3, ctx: "HR / People",
    q: I("Heikles Mitarbeiter-Feedback komplett von KI schreiben zu lassen birgt vor allem welches Risiko?",
         "Having AI fully write sensitive employee feedback mainly risks what?"),
    a: [
      I("Spürbar höhere Druck- und Bereitstellungskosten für das Dokument", "Noticeably higher printing and provisioning costs for the document"),
      I("Verlust von Authentizität und persönlicher Verantwortung im Vertrauen", "Loss of authenticity and personal responsibility in the relationship"),
      I("Eine merklich langsamere Verarbeitung durch das eingesetzte Tool", "A noticeably slower processing by the tool used"),
      I("Praktisch kein Risiko, da KI ohnehin treffender formuliert als Menschen", "Practically no risk, since AI phrases more aptly than humans anyway"),
    ], correct: 1,
    expl: I("KI kann beim Formulieren helfen, aber heikles Feedback komplett auszulagern kostet Authentizität und persönliche Verantwortung — die Basis des Vertrauensverhältnisses. Kosten oder Tempo sind hier nebensächlich.",
            "AI can help with phrasing, but fully outsourcing sensitive feedback costs authenticity and personal responsibility — the basis of the trust relationship. Cost or speed are beside the point here."),
  },
  {
    dim: "lead", diff: 3,
    q: I("Ein erfahrener Mitarbeiter fürchtet, durch KI ersetzt zu werden. Wirksamste Führungsantwort?",
         "An experienced employee fears being replaced by AI. Most effective leadership response?"),
    a: [
      I("Die Sorge als unbegründet abtun und zum Tagesgeschäft übergehen", "Dismissing the concern as unfounded and moving on to daily business"),
      I("Die Sorge ernst nehmen und eine Entwicklungsperspektive mit KI aufzeigen", "Taking the concern seriously and showing a development path with AI"),
      I("Einen möglichen Ersatz andeuten, um zusätzlich zu motivieren", "Hinting at a possible replacement to add motivation"),
      I("Das Thema in jedem Gespräch konsequent und auf Dauer vollständig vermeiden", "Consistently and permanently avoiding the topic in conversation"),
    ], correct: 1,
    expl: I("Angst abzutun oder mit Ersatz zu drohen zerstört Vertrauen und Leistung; Vermeiden löst nichts. Wirksam ist, die Sorge ernst zu nehmen und eine konkrete Entwicklungsperspektive mit KI aufzuzeigen.",
            "Dismissing fear or threatening replacement destroys trust and performance; avoidance solves nothing. What works is taking the concern seriously and showing a concrete development path with AI."),
  },
  {
    dim: "lead", diff: 2,
    q: I("Was gehört in eine klare KI-Nutzungsrichtlinie fürs Team zuerst?",
         "What belongs first in a clear AI usage policy for the team?"),
    a: [
      I("Eine im Team sorgfältig abgestimmte Liste sämtlicher unerwünschter Emojis", "A carefully agreed list of all the emojis considered unwanted in the team"),
      I("Erlaubte/verbotene Datenarten, Freigabeprozesse und Verantwortlichkeiten", "Allowed/forbidden data types, approval processes and responsibilities"),
      I("Die persönlich bevorzugte und vom Chef ausdrücklich empfohlene KI-Anwendung", "The personally preferred AI application explicitly recommended by the boss"),
      I("Eine feste Obergrenze dafür, wie viele Prompts pro Person und Tag erlaubt sind", "A fixed upper limit on how many prompts per person and day are allowed"),
    ], correct: 1,
    expl: I("Das Wichtigste zuerst: Welche Daten dürfen rein, welche nicht, wer gibt frei, wer trägt Verantwortung. Das verhindert die teuersten Fehler (Datenschutz, Fehlnutzung) — anders als Emoji-Listen oder Prompt-Limits.",
            "First things first: which data may go in, which may not, who approves, who is responsible. This prevents the costliest mistakes (data protection, misuse) — unlike emoji lists or prompt limits."),
  },
  {
    dim: "lead", diff: 4,
    q: I("Du führst KI ein und willst Akzeptanz. Welcher Faktor erhöht die Adoption laut Forschung am stärksten?",
         "You introduce AI and want acceptance. Which factor most increases adoption per research?"),
    a: [
      I("Strikte und spürbare Strafen bei nachweislicher Nichtnutzung", "Strict, noticeable penalties for proven non-use"),
      I("Sichtbare Unterstützung durch die Führung kombiniert mit Befähigung", "Visible leadership support combined with enablement"),
      I("Möglichst teure Lizenzen, die hochwertige Werkzeuge signalisieren", "The most expensive licenses, signaling high-quality tools"),
      I("Eine verpflichtende, aber komplett anonymisierte Nutzung", "A mandatory but fully anonymized use"),
    ], correct: 1,
    expl: I("Forschung zur Technologieakzeptanz zeigt: sichtbare Führungsunterstützung und Befähigung (Training) treiben die Adoption stärker als Zwang, Strafen oder teure Lizenzen.",
            "Research on technology acceptance shows visible leadership support and enablement (training) drive adoption more than coercion, penalties or expensive licenses."),
  },
  {
    dim: "lead", diff: 3, ctx: "HR / People",
    q: I("KI schlägt für Beförderungen eine Rangliste vor. Welche Führungshaltung ist angemessen?",
         "AI proposes a ranking for promotions. Which leadership stance is appropriate?"),
    a: [
      I("Die von der KI vorgeschlagene Rangliste unverändert und eins zu eins übernehmen", "Adopting the proposed ranking one-to-one unchanged"),
      I("Sie als Input nutzen, auf Bias prüfen, Verantwortung beim Menschen lassen", "Using it as input, checking for bias, keeping responsibility human"),
      I("Die Rangliste dem gesamten Team transparent öffentlich machen", "Making the ranking transparently public to the whole team"),
      I("Die KI entscheiden lassen, da das besonders objektiv wirkt", "Letting the AI decide, since that appears especially objective"),
    ], correct: 1,
    expl: I("Eine KI-Rangliste ist ein Input, kein Urteil. Sie kann Bias enthalten; Kontext, Fairness und Verantwortung müssen beim Menschen bleiben — scheinbare Objektivität täuscht, und Veröffentlichung wäre unfair.",
            "An AI ranking is an input, not a verdict. It can contain bias; context, fairness and responsibility must stay with humans — apparent objectivity is deceptive, and publishing it would be unfair."),
  },
);

// ============================================================
// PRACTICE (incl. local skills, routines, prompts, mistakes)
// ============================================================
POOL.push(
  {
    dim: "practice", diff: 3,
    q: I("Welcher Prompt liefert am ehesten eine belastbare, prüfbare Analyse?",
         "Which prompt is most likely to yield a robust, checkable analysis?"),
    a: [
      I("'Schreib mir bitte einfach irgendetwas grundsätzlich Interessantes über diesen Markt'", "'Please just write me something generally interesting about this whole market'"),
      I("'Analysiere Markt X für Segment Y; nenne Annahmen, Quellen, Unsicherheiten'", "'Analyze market X for segment Y; state assumptions, sources, uncertainties'"),
      I("'Mach das jetzt bitte möglichst schnell und dabei trotzdem auch wirklich gut'", "'Please do this now as fast as you possibly can and really well too'"),
      I("'Du bist die mit Abstand beste KI überhaupt, also leg jetzt einfach direkt los'", "'You are by far the best AI ever, so please just get started right away'"),
    ], correct: 1,
    expl: I("Guter Prompt = klarer Gegenstand, Zielgruppe/Segment, geforderte Struktur und die Bitte, Annahmen und Unsicherheiten offenzulegen. Vage, hektische oder schmeichelnde Prompts liefern Beliebiges.",
            "Good prompt = clear subject, audience/segment, requested structure and a request to surface assumptions and uncertainties. Vague, rushed or flattering prompts yield arbitrary output."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Wiederkehrende Aufgabe: aus Rohdaten jede Woche derselbe Report. Was ist ein 'lokaler Skill' im agentischen KI-Sinn?",
         "Recurring task: the same report from raw data every week. What is a 'local skill' in the agentic AI sense?"),
    a: [
      I("Eine einmalige Chat-Frage, die man bei jedem Bedarf wieder ganz neu formuliert", "A one-off chat question reformulated whenever needed"),
      I("Eine gespeicherte, wiederverwendbare Anleitung, die der Agent selbst aufruft", "A stored, reusable instruction the agent invokes itself"),
      I("Ein Online-Tutorial, das die nötigen Schritte im Video erklärt", "An online tutorial explaining the needed steps in a video"),
      I("Eine Dokumentvorlage, die zentral auf dem Netzlaufwerk liegt", "A document template stored centrally on the network drive"),
    ], correct: 1,
    expl: I("Ein 'lokaler Skill' ist eine gespeicherte, wiederverwendbare Fähigkeit (Anleitung plus ggf. Werkzeuge), die ein KI-Agent bei passendem Anlass selbst anwendet — ideal für wiederkehrende Aufgaben. Ein Tutorial oder eine Vorlage ist das nicht.",
            "A 'local skill' is a stored, reusable capability (instructions plus optional tools) an AI agent applies itself when relevant — ideal for recurring tasks. A tutorial or a template is not that."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du baust einen wiederverwendbaren Skill für dein Team. Was macht ihn am ehesten skalierbar?",
         "You build a reusable skill for your team. What makes it most likely to scale?"),
    a: [
      I("Dass er vollständig vom Wissen einer einzigen Person abhängt", "That it depends entirely on the undocumented knowledge of one single person"),
      I("Klare Dokumentation, definierte Ein-/Ausgaben und Qualitätskontrolle", "Clear documentation, defined inputs/outputs and quality control"),
      I("Ein geheim gehaltener Prompt, den sonst niemand einsehen darf", "A secret prompt that nobody else on the team is ever allowed to see"),
      I("Eine Bauweise, die außer dem Ersteller niemand nachvollziehen kann", "A design that nobody except its original creator is able to understand"),
    ], correct: 1,
    expl: I("Skalierbarkeit kommt von Nachvollziehbarkeit: klare Doku, definierte Ein-/Ausgaben und Qualitätskontrolle. Geheimwissen oder Abhängigkeit von einer Person verhindern Skalierung.",
            "Scalability comes from transparency: clear docs, defined inputs/outputs and quality control. Secret knowledge or single-person dependency prevent scaling."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Eine KI soll wöchentlich Daten ziehen, transformieren und einen Bericht versenden. Wo liegt das größte Betriebsrisiko bei voller Automatisierung?",
         "An AI should weekly pull, transform data and send a report. Where's the biggest operational risk under full automation?"),
    a: [
      I("Dass die fertigen Berichte optisch zu ansprechend gestaltet sind", "That the finished reports look too visually appealing"),
      I("Stille Fehler in Daten oder Logik, die wochenlang unbemerkt bleiben", "Silent errors in data or logic going unnoticed for weeks"),
      I("Dass die Überschriften im Bericht eine zu große Schrift verwenden", "That the report's headings use too large a font"),
      I("Dass das eingesetzte Tool zwischendurch ein Update erhält", "That the tool used receives an update in between"),
    ], correct: 1,
    expl: I("Vollautomatik ohne Kontrollpunkt birgt das Risiko stiller Fehler, die sich unbemerkt fortpflanzen. Ein menschlicher oder automatischer Plausibilitäts-Check pro Lauf ist essenziell — Optik oder Updates sind nebensächlich.",
            "Full automation without a checkpoint risks silent errors propagating unnoticed. A human or automated sanity check per run is essential — looks or updates are secondary."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du willst eine tägliche 'Morning-Briefing'-Routine für deine wichtigsten Kunden mit KI aufsetzen. Was ist der wirksamste erste Baustein?",
         "You want a daily 'morning briefing' routine for your key accounts with AI. What's the most effective first building block?"),
    a: [
      I("Jeden Morgen frei zu improvisieren, was die KI gerade ausgibt", "Improvising freely each morning with whatever the AI outputs"),
      I("Ein wiederverwendbarer Skill mit festen Quellen, Liste und Ausgabeformat", "A reusable skill with fixed sources, list and output format"),
      I("Die KI offen bitten, einfach 'irgendetwas Wichtiges' herauszusuchen", "Openly asking the AI to find just 'something important'"),
      I("Täglich denselben langen Prompt von Hand neu einzutippen", "Retyping the same long prompt by hand every day"),
    ], correct: 1,
    expl: I("Eine verlässliche Routine braucht feste Quellen, eine definierte Kundenliste und ein einheitliches Ausgabeformat — als wiederverwendbarer Skill, nicht als tägliche Improvisation oder vage Bitte.",
            "A reliable routine needs fixed sources, a defined account list and a consistent output format — as a reusable skill, not daily improvisation or a vague request."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Welche Routine reduziert das Risiko von Fehlern in einem automatisierten Briefing am stärksten?",
         "Which routine most reduces the risk of errors in an automated briefing?"),
    a: [
      I("Das fertige Briefing ungelesen direkt an den Verteiler weiterzuleiten", "Forwarding the finished briefing unread straight to the list"),
      I("Eine kurze menschliche Sichtprüfung der Kernzahlen vor dem Versand", "A brief human sanity-check of key figures before sending"),
      I("Das Briefing zur Sicherheit deutlich umfangreicher zu gestalten", "Making the briefing considerably longer to be safe"),
      I("Vor dem Versand möglichst viele weitere Quellen ungeprüft zu ergänzen", "Adding as many further sources as possible unchecked before sending"),
    ], correct: 1,
    expl: I("Ein kurzer menschlicher Check der Kernzahlen vor Versand fängt die teuersten Fehler ab, ohne den Zeitgewinn der Automatisierung zunichtezumachen. Mehr Länge oder ungeprüfte Quellen erhöhen das Risiko eher.",
            "A brief human check of key figures before sending catches the costliest errors without negating the automation's time savings. More length or unchecked sources rather increase the risk."),
  },
  {
    dim: "practice", diff: 2,
    q: I("Was ist eine sinnvolle wöchentliche Lern-Routine, um als Führungskraft bei KI am Ball zu bleiben?",
         "What's a sensible weekly learning routine to stay current on AI as a leader?"),
    a: [
      I("Sich das Thema nur einmal im Jahr auf einer Konferenz anzueignen", "Picking up the topic only once a year at a conference"),
      I("30 Minuten pro Woche: ein Tool testen, eine Quelle lesen, Erkenntnis teilen", "30 min a week: test a tool, read a source, share an insight"),
      I("Abzuwarten, bis die IT-Abteilung alles Relevante von sich aus erklärt", "Waiting until IT explains everything relevant on its own"),
      I("Lediglich gelegentlich die Schlagzeilen einschlägiger Medien zu überfliegen", "Merely skimming the headlines of relevant media occasionally"),
    ], correct: 1,
    expl: I("Stetige kleine Routinen schlagen seltene Großevents. 30 Minuten pro Woche mit Praxis, Lesen und Teilen halten Wissen aktuell und wirken im Team als Vorbild — Abwarten oder Schlagzeilen reichen nicht.",
            "Steady small routines beat rare big events. 30 minutes a week of practice, reading and sharing keep knowledge current and set an example — waiting or skimming headlines isn't enough."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du baust eine Routine zur Meeting-Nachbereitung. Welche Reihenfolge ist am robustesten?",
         "You build a meeting follow-up routine. Which sequence is most robust?"),
    a: [
      I("KI schreibt das Protokoll, das anschließend ungeprüft verteilt wird", "AI writes the minutes, which are then distributed unchecked"),
      I("Transkript, KI-Entwurf, menschliche Freigabe, danach Verteilung", "Transcript, AI draft, human approval, then distribution"),
      I("Alles aus dem Gedächtnis tippen und die KI dabei ganz weglassen", "Typing everything from memory and leaving the AI out entirely"),
      I("Nur die Audioaufnahme archivieren, ohne irgendetwas zusammenzufassen", "Only archiving the audio recording without summarizing anything"),
    ], correct: 1,
    expl: I("Die robuste Kette nutzt KI für den Entwurf, behält aber eine menschliche Freigabe vor der Verteilung — so verbinden sich Tempo und Verlässlichkeit. Ungeprüftes Verteilen oder gar nichts festzuhalten ist riskant.",
            "The robust chain uses AI for the draft but keeps human approval before distribution — combining speed and reliability. Distributing unchecked or capturing nothing is risky."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Welcher dieser Promptfehler führt am ehesten zu unbrauchbaren Ergebnissen?",
         "Which of these prompt mistakes most likely leads to unusable results?"),
    a: [
      I("Ein klares Ziel zu nennen und ein konkretes Beispiel mitzugeben", "Stating one clear goal and also giving a concrete worked example"),
      I("Mehrere widersprüchliche Aufgaben in einen vagen Prompt zu packen", "Cramming several contradictory tasks into one vague prompt"),
      I("Das gewünschte Ausgabeformat ausdrücklich zu spezifizieren", "Explicitly specifying the desired output format"),
      I("Die getroffenen Annahmen von vornherein offen zu benennen", "Naming the assumptions made openly from the start"),
    ], correct: 1,
    expl: I("Widersprüchliche, vage gebündelte Aufgaben verwirren das Modell und liefern Mischmasch. Die anderen Optionen sind genau die Praktiken, die gute Ergebnisse erzeugen.",
            "Contradictory, vaguely bundled tasks confuse the model and yield mush. The other options are exactly the practices that produce good results."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Was ist einer der teuersten Fehler beim Delegieren an KI im Arbeitsalltag?",
         "What's one of the costliest mistakes when delegating to AI day-to-day?"),
    a: [
      I("Prompts höflicher zu formulieren, als es eigentlich nötig wäre", "Phrasing prompts more politely than would actually be necessary"),
      I("Ergebnisse ungeprüft zu übernehmen, weil sie überzeugend klingen", "Adopting results unchecked because they sound convincing"),
      I("Dem Modell mehr Beispiele zu geben, als unbedingt erforderlich sind", "Giving the model more examples than strictly required"),
      I("Das Ziel der Aufgabe zu klar und zu ausführlich zu formulieren", "Stating the task's goal too clearly and too extensively"),
    ], correct: 1,
    expl: I("Der teuerste Alltagsfehler ist blindes Vertrauen: überzeugend klingende, aber falsche Ausgaben ungeprüft zu übernehmen. Überzeugungskraft ist kein Korrektheitsbeweis; Höflichkeit oder Beispiele schaden nicht.",
            "The costliest everyday mistake is blind trust: adopting convincing-but-wrong outputs unchecked. Persuasiveness is no proof of correctness; politeness or examples do no harm."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du gibst einer KI eine Aufgabe ohne Kontext zu Zielgruppe und Zweck. Was ist die typische Folge?",
         "You give an AI a task with no context on audience and purpose. What's the typical result?"),
    a: [
      I("Ein präzise auf die konkrete Situation zugeschnittenes Ergebnis", "A result precisely tailored to the concrete situation"),
      I("Eine generische, beliebige Ausgabe, die erst nachbearbeitet werden muss", "A generic, arbitrary output that must first be reworked"),
      I("Überhaupt keine Ausgabe, da die KI ohne Kontext blockiert", "No output at all, since the AI blocks without context"),
      I("Ein automatisch als vertraulich eingestuftes und geschütztes Ergebnis", "A result automatically classified as confidential and protected"),
    ], correct: 1,
    expl: I("Ohne Kontext zu Zielgruppe und Zweck rät das Modell — das Ergebnis wird generisch und muss aufwändig nachgebessert werden. Kontext ist der größte Hebel für Qualität; die KI blockiert nicht und schützt nichts automatisch.",
            "Without context on audience and purpose the model guesses — output becomes generic and needs heavy rework. Context is the biggest lever for quality; the AI doesn't block and doesn't auto-protect anything."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Welcher Fehler im Umgang mit KI-Ausgaben kann rechtlich am gefährlichsten werden?",
         "Which mistake handling AI output can become the most legally dangerous?"),
    a: [
      I("Eine insgesamt deutlich zu lang geratene und inhaltlich ausschweifende Antwort", "An answer that is overall far too long, repetitive and rambling"),
      I("Erfundene Fakten oder Zitate ungeprüft in verbindliche Dokumente zu übernehmen", "Adopting fabricated facts or citations unchecked into binding documents"),
      I("Eine optisch unschöne, uneinheitliche oder unprofessionelle Formatierung des Textes", "A visually unappealing or inconsistent formatting of the text"),
      I("Den Einsatz von deutlich zu vielen Zwischenüberschriften und Aufzählungen im Dokument", "Using clearly too many subheadings and bullet lists in the document"),
    ], correct: 1,
    expl: I("Erfundene Fakten oder Zitate in verbindlichen Dokumenten (Verträge, Gutachten, Gerichtseingaben) können rechtliche Folgen haben — ein dokumentierter, teurer Realfall-Typ. Formatierung oder Länge sind dagegen harmlos.",
            "Fabricated facts or citations in binding documents (contracts, opinions, court filings) can carry legal consequences — a documented, costly real-world failure mode. Formatting or length are harmless by comparison."),
  },
  {
    dim: "practice", diff: 3,
    q: I("Du bekommst von einer KI Code oder eine Formel. Was ist die sicherste Vorgehensweise vor dem Produktiveinsatz?",
         "You receive code or a formula from an AI. What's the safest approach before production use?"),
    a: [
      I("Den Code direkt einsetzen, da KI bei Code nur selten Fehler macht", "Using the code directly, since AI rarely errs with code"),
      I("Ihn testen, an Beispielen prüfen und nachvollziehen, was er tut", "Testing it, checking it on examples and understanding what it does"),
      I("Vor dem Einsatz lediglich die Gesamtlänge des Codes zu kontrollieren", "Only checking the code's overall length before use"),
      I("Die KI selbst zu fragen, ob der Code korrekt ist, und ihr zu vertrauen", "Asking the AI itself whether the code is correct and trusting it"),
    ], correct: 1,
    expl: I("KI-Code kann subtile Fehler enthalten. Vor dem Produktiveinsatz gilt: testen, an Beispielen prüfen und verstehen, was er tut. Die KI selbst zu fragen ersetzt keine Verifikation, Längenkontrolle erst recht nicht.",
            "AI code can contain subtle bugs. Before production: test, check against examples and understand what it does. Asking the AI itself is no substitute for verification, let alone a length check."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Du willst einen mehrstufigen KI-Workflow (Daten, Analyse, Bericht) robust machen. Was ist der wichtigste Kontrollpunkt?",
         "You want a multi-step AI workflow (data, analysis, report) to be robust. What's the most important checkpoint?"),
    a: [
      I("Eine optisch besonders ansprechende und animierte Fortschrittsanzeige während des Laufs", "A visually appealing and smoothly animated progress bar during the run"),
      I("Die Validierung der Zwischenergebnisse, bevor der nächste Schritt aufbaut", "Validating intermediate results before the next step builds on them"),
      I("Eine möglichst hohe Gesamtanzahl einzelner kleiner Verarbeitungsschritte", "As high a total number of small individual processing steps as possible"),
      I("Der bewusste Verzicht auf jegliche Dokumentation des Workflows", "Deliberately forgoing any documentation of the workflow"),
    ], correct: 1,
    expl: I("In mehrstufigen Ketten pflanzt sich ein früher Fehler fort. Deshalb ist die Validierung der Zwischenergebnisse vor dem nächsten Schritt der wichtigste Kontrollpunkt — nicht Optik, Schrittzahl oder fehlende Doku.",
            "In multi-step chains an early error propagates. Validating intermediate results before the next step is therefore the most important checkpoint — not looks, step count or missing docs."),
  },
  {
    dim: "practice", diff: 2,
    q: I("Welche Prompt-Zutat verbessert die Ergebnisqualität bei komplexen Aufgaben am verlässlichsten?",
         "Which prompt ingredient most reliably improves quality on complex tasks?"),
    a: [
      I("Möglichst viele Höflichkeitsfloskeln rund um die eigentliche Bitte", "As many politeness phrases as possible around the actual request"),
      I("Klarer Kontext, ein definiertes Ziel, das Format und Beispiele", "Clear context, a defined goal, the format and examples"),
      I("Nachdrücklicher Druck oder angedeutete Konsequenzen im Prompt", "Emphatic pressure or implied consequences in the prompt"),
      I("Durchgängige Großbuchstaben, um die Wichtigkeit zu betonen", "All caps throughout to stress importance"),
    ], correct: 1,
    expl: I("Verlässlich wirken Kontext, klares Ziel, gewünschtes Format und Beispiele. Höflichkeitsfloskeln, Druck oder Großschreibung ändern die Qualität nicht substanziell.",
            "What reliably works is context, a clear goal, desired format and examples. Politeness phrases, pressure or capitalization don't substantially change quality."),
  },
);

// ============================================================
// HARD ITEMS (diff 4) — discrimination required, detailed explanations
// with abbreviation glosses.
// ============================================================
POOL.push(
  {
    dim: "understand", diff: 4,
    q: I("Ein Anbieter sagt: 'Unser RAG-System kann nicht halluzinieren, weil es nur aus euren Dokumenten antwortet.' Wie bewertest du das fachlich?",
         "A vendor says: 'Our RAG system can't hallucinate because it only answers from your documents.' How do you assess this technically?"),
    a: [
      I("Zutreffend, denn mit Dokumentengrundlage sind Halluzinationen ausgeschlossen", "Accurate, since with a document base hallucinations are impossible"),
      I("Falsch, denn es kann Gefundenes falsch zusammenfassen oder Lücken füllen", "Wrong, since it can missummarize retrieved text or fill gaps"),
      I("Zutreffend, sofern die hinterlegten Dokumente vollständig fehlerfrei sind", "Accurate, provided the stored documents are completely error-free"),
      I("Falsch, allerdings nur weil RAG generell als unzuverlässig gilt", "Wrong, but only because RAG is generally considered unreliable"),
    ], correct: 1,
    expl: I("RAG = Retrieval-Augmented Generation: das Modell bekommt zur Laufzeit passende Dokumente in den Kontext. Das senkt Halluzinationen, beseitigt sie aber nicht — der Abruf kann die falschen Stellen liefern, und das Sprachmodell formuliert daraus frei, kann also verzerren oder Lücken mit Erfundenem füllen.",
            "RAG = Retrieval-Augmented Generation: the model gets relevant documents into context at runtime. That lowers hallucinations but doesn't remove them — retrieval can surface the wrong passages, and the model still phrases freely, so it can distort or fill gaps with fabrication."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Ein KI-Tool erreicht 95 % 'Accuracy' bei der Betrugserkennung. Nur 1 % aller Fälle sind echter Betrug. Warum ist die 95 %-Zahl möglicherweise wertlos?",
         "An AI tool reaches 95% accuracy in fraud detection. Only 1% of all cases are actual fraud. Why might the 95% figure be worthless?"),
    a: [
      I("Weil eine Genauigkeit von 95 % für den Produktivbetrieb generell zu niedrig ist", "Because a 95% accuracy is generally far too low for any production use"),
      I("Weil schon ein 'immer ehrlich'-Rater 99 % erreicht; zählen Präzision und Recall", "Because an 'always honest' guesser already hits 99%; precision and recall count"),
      I("Weil der Wert 'Accuracy' ausschließlich für Bildklassifikation definiert ist", "Because the metric 'accuracy' is only ever defined for image classification"),
      I("Weil ein zu schnelles Tool die Genauigkeit systematisch überschätzt", "Because a too-fast tool systematically overestimates accuracy"),
    ], correct: 1,
    expl: I("Bei stark unausgewogenen Daten täuscht 'Accuracy' (Anteil insgesamt richtiger Urteile). Bei 1 % Betrug erreicht ein Modell, das pauschal 'kein Betrug' sagt, bereits 99 %. Aussagekräftig sind Präzision (wie viele Alarme stimmen?) und Recall (wie viel Betrug wird gefunden?).",
            "With heavily imbalanced data, accuracy (share of all correct verdicts) is misleading. At 1% fraud, a model always saying 'no fraud' already scores 99%. What's meaningful is precision (how many alerts are right?) and recall (how much fraud is caught?)."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Du vergleichst zwei Angebote: Modell A kostet 2 €/Mio. Token, Modell B 15 €/Mio. Token. Welche Information entscheidet, ob B trotzdem günstiger sein kann?",
         "You compare two offers: Model A costs €2/M tokens, Model B €15/M tokens. Which info decides whether B can still be cheaper overall?"),
    a: [
      I("Wie modern und ansprechend die Website des jeweiligen Anbieters wirkt", "How modern and appealing each vendor's website looks"),
      I("Wie oft A nacharbeiten muss; häufige Fehler treiben die Gesamtkosten", "How often A needs rework; frequent errors drive up total cost"),
      I("Welches der beiden Modelle bereits länger am Markt verfügbar ist", "Which of the two models has been on the market longer"),
      I("Wie viele Zeichen die jeweiligen Modellnamen und Kürzel enthalten", "How many characters the respective model names contain"),
    ], correct: 1,
    expl: I("Token = die Verrechnungseinheit für Textmenge (grob ¾ Wort). Der Preis pro Million Token sagt wenig über die Gesamtkosten. Ein billiges Modell, das häufiger falsch liegt, erzeugt Folgekosten: mehrere Anläufe, mehr Prüfung, Korrektur. Maßgeblich sind die Kosten pro korrekt erledigter Aufgabe.",
            "Token = the billing unit for text volume (roughly ¾ of a word). Price per million tokens says little about total cost. A cheap model that errs more often creates downstream cost: retries, more review, correction. What matters is cost per correctly completed task."),
  },
  {
    dim: "ethics", diff: 4,
    q: I("Ein KI-Modell zur Kreditvergabe nutzt die Postleitzahl als Merkmal und ist dadurch treffsicherer. Wo liegt das Kernproblem?",
         "A credit-scoring AI uses postal code as a feature and is more accurate for it. Where is the core problem?"),
    a: [
      I("Es gibt kein Problem, da eine höhere Treffsicherheit grundsätzlich wünschenswert ist", "There's no problem, since higher accuracy is fundamentally desirable"),
      I("Die PLZ kann als Stellvertreter für Herkunft wirken und verdeckt diskriminieren", "Postal code can act as a proxy for origin and discriminate covertly"),
      I("Postleitzahlen ändern sich zu häufig, um zuverlässig nutzbar zu sein", "Postal codes change too often to be reliably usable"),
      I("Das zusätzliche Merkmal verlangsamt die Berechnung des Scores spürbar", "The extra feature noticeably slows down the score calculation"),
    ], correct: 1,
    expl: I("Proxy-Variable = ein scheinbar neutrales Merkmal, das stark mit einem geschützten Merkmal korreliert. Wohnort/PLZ hängt vielerorts mit Herkunft und Einkommen zusammen; das Modell kann darüber faktisch nach Ethnie diskriminieren, ohne sie je direkt zu nutzen. Höhere Treffsicherheit rechtfertigt das nicht.",
            "Proxy variable = a seemingly neutral feature strongly correlated with a protected attribute. Residence/postal code often correlates with origin and income; the model can effectively discriminate by ethnicity without ever using it directly. Higher accuracy doesn't justify this."),
  },
  {
    dim: "lead", diff: 4,
    q: I("Eine Abteilung meldet nach KI-Einführung 30 % 'Zeitersparnis', aber die Durchlaufzeit der Gesamtprozesse ist unverändert. Wahrscheinlichste Erklärung?",
         "After AI rollout a department reports 30% 'time saved', but end-to-end lead time is unchanged. Most likely explanation?"),
    a: [
      I("Die Mitarbeitenden geben die Ersparnis bewusst falsch und zu hoch an", "The staff deliberately misreport the savings as too high"),
      I("Lokale Einsparung verpufft, wenn der Engpass woanders liegt", "Local savings evaporate if the bottleneck lies elsewhere"),
      I("Generative KI funktioniert in solchen Prozessen grundsätzlich überhaupt nicht", "Generative AI fundamentally doesn't work in such processes at all"),
      I("Die eingesparte Zeit wurde lediglich an der falschen Stelle gemessen", "The saved time was simply measured in the wrong place"),
    ], correct: 1,
    expl: I("Ein klassischer Trugschluss: Effizienzgewinn an einer Teilaufgabe (lokale Optimierung) verbessert das Gesamtergebnis nur, wenn dort der Engpass saß und die freie Zeit genutzt wird. Liegt der Flaschenhals woanders (z. B. Freigaben), bleibt die Durchlaufzeit gleich.",
            "A classic fallacy: an efficiency gain on a sub-task (local optimization) improves the whole only if that was the bottleneck and the freed time is used. If the bottleneck is elsewhere (e.g. approvals), lead time stays the same."),
  },
  {
    dim: "practice", diff: 4,
    q: I("Du baust einen Agenten, der eigenständig E-Mails beantwortet und auf interne Systeme zugreift. Welche Architektur-Entscheidung begrenzt das Schadensrisiko am wirksamsten?",
         "You build an agent that autonomously answers emails and accesses internal systems. Which architecture decision most limits damage risk?"),
    a: [
      I("Dem Agenten umfassende Schreibrechte geben, damit er flexibel agieren kann", "Giving the agent broad write access everywhere so it can act as flexibly as possible"),
      I("Geringste nötige Rechte vergeben und kritische Aktionen menschlich freigeben", "Granting least privilege and routing critical actions through human approval"),
      I("Den Agenten möglichst häufig laufen lassen, um schnell dazuzulernen", "Running the agent as often as technically possible so it learns to improve quickly"),
      I("Auf das Mitschreiben von Protokollen verzichten, um Speicher zu sparen", "Forgoing any activity logging entirely in order to save on storage space"),
    ], correct: 1,
    expl: I("Zwei bewährte Prinzipien: 'Least Privilege' (geringste notwendige Rechte) heißt, der Agent darf nur das, was er zwingend braucht. 'Human-in-the-Loop' heißt, folgenreiche Schritte (Versand, Löschen, Zahlungen) brauchen eine menschliche Bestätigung. Zusammen begrenzen sie den maximalen Schaden.",
            "Two proven principles: 'least privilege' means the agent may only do what it strictly needs. 'Human-in-the-loop' means consequential steps (sending, deleting, payments) need human confirmation. Together they cap the maximum damage."),
  },
  {
    dim: "understand", diff: 4,
    q: I("Zwei Modelle haben dieselbe Antwortqualität, aber Modell A nutzt 8.000 'Reasoning'-Token pro Antwort, Modell B 200. Wann ist A trotzdem die schlechtere Wahl?",
         "Two models have equal answer quality, but Model A uses 8,000 'reasoning' tokens per answer, Model B uses 200. When is A still the worse choice?"),
    a: [
      I("Eigentlich nie, denn mehr Reasoning führt grundsätzlich zu besseren Antworten", "Practically never, since more reasoning generally leads to better answers"),
      I("Bei hohem Volumen einfacher Anfragen ohne Qualitätsvorteil durch A", "For high volumes of simple requests with no quality gain from A"),
      I("Ausschließlich dann, wenn Modell A quelloffen und frei verfügbar ist", "Only when Model A is open source and freely available"),
      I("Immer dann, wenn Modell B über die größere Parameterzahl verfügt", "Whenever Model B has the larger parameter count"),
    ], correct: 1,
    expl: I("'Reasoning-Token' sind interne Denkschritte, die das Modell vor der Antwort erzeugt — sie kosten Geld und Zeit (Latenz). Bei gleicher Endqualität ist das teure Modell nur sinnvoll, wenn die Aufgabe diese Tiefe braucht. Für große Mengen einfacher Anfragen ist es Verschwendung.",
            "'Reasoning tokens' are internal thinking steps the model generates before answering — they cost money and time (latency). At equal final quality the expensive model only makes sense if the task needs that depth. For large volumes of simple requests it's wasteful."),
  },
  {
    dim: "evaluate", diff: 4,
    q: I("Eine Studie 'beweist', dass KI-Nutzer 40 % produktiver sind. Welche Rückfrage entlarvt am ehesten einen Denkfehler?",
         "A study 'proves' AI users are 40% more productive. Which follow-up question is most likely to expose a flaw?"),
    a: [
      I("Welche Schriftart und welches Layout für die Studie verwendet wurden", "What font, color scheme and overall layout were used for the study report"),
      I("Ob zufällig zugeteilt wurde oder die Produktiveren ohnehin KI-affin waren", "Whether assignment was random or the more productive were already AI-inclined"),
      I("Über wie viele Seiten sich der vollständige Studienbericht erstreckt", "How many pages the full underlying study report actually spans in total"),
      I("Ob die Studie ein offizielles Logo und ein Deckblatt aufweist", "Whether the study report carries an official institute logo and a formal cover page"),
    ], correct: 1,
    expl: I("Korrelation ist nicht Kausalität. Wenn Menschen selbst wählen, ob sie KI nutzen, sind die Nutzer womöglich von vornherein leistungsstärker (Selektionseffekt) — dann misst die Studie diesen Unterschied, nicht die Wirkung der KI. Belastbar wird es erst durch zufällige Zuteilung.",
            "Correlation isn't causation. If people self-select into using AI, the users may already be higher performers (selection effect) — then the study measures that difference, not AI's effect. It only becomes solid with random assignment."),
  },
  {
    dim: "apply", diff: 4,
    q: I("Du sollst entscheiden, ob sensible Kundendaten per Cloud-API oder lokalem Modell verarbeitet werden. Das Cloud-Modell ist deutlich besser. Welche Frage ist am wichtigsten?",
         "You must decide whether to process sensitive customer data via cloud API or a local model. The cloud model is clearly better. Which question matters most?"),
    a: [
      I("Welches der beiden Modelle die insgesamt übersichtlichere und modernere Benutzeroberfläche bietet", "Which of the two competing models offers the cleaner and more modern user interface"),
      I("Was der Auftragsverarbeitungsvertrag zu Speicherung, Training und Standort zusichert", "What the data-processing agreement guarantees on storage, training and location"),
      I("Wie viele aktive Nutzer das Cloud-Modell weltweit bereits für sich gewinnen konnte", "How many active users the cloud model has already managed to gain worldwide"),
      I("Ob auch das lokale Modell über ein ähnlich professionelles, eingetragenes Markenlogo verfügt", "Whether the local model also comes with a similarly professional registered brand logo"),
    ], correct: 1,
    expl: I("Bei sensiblen Daten entscheidet nicht die reine Leistung, sondern der Datenfluss und seine vertragliche Absicherung. Ein Auftragsverarbeitungsvertrag (AVV/DPA) regelt: Werden Eingaben gespeichert, fließen sie ins Training, in welchem Rechtsraum stehen die Server? Davon hängt ab, ob Cloud überhaupt zulässig ist.",
            "With sensitive data, raw capability isn't decisive — the data flow and its contractual safeguards are. A data-processing agreement (DPA) governs: are inputs stored, do they feed training, in which jurisdiction are the servers? That determines whether cloud is permissible at all."),
  },
);

// ============================================================
// TRAPS (control items — catch external-tool usage; position-dependent)
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
    q: I("Eine Beraterin behauptet: 'KI bringt garantiert exakt 40 % Produktivitätsgewinn.' Wie reagierst du?",
         "A consultant claims: 'AI guarantees exactly 40% productivity gains.' How do you react?"),
    a: [ I("Sofort in den Business Case übernehmen", "Adopt it into the business case immediately"), I("Kritisch prüfen — Gewinne sind kontextabhängig und im eigenen Setup zu messen", "Challenge it — gains are context-dependent and must be measured in your own setup"), I("Die Zahl verdoppeln, um ambitioniert zu wirken", "Double the number to look ambitious"), I("Projekt absagen, weil 40 % unrealistisch klingt", "Cancel the project because 40% sounds unrealistic") ],
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
// SAMPLER — difficulty-balanced, ctx-aware, shuffles answer options
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
  // Traps are skipped — several depend on option position by design.
  return chosen.map((q) => {
    if (q.trap) return q;
    const idx = q.a.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return { ...q, a: idx.map((i) => q.a[i]), correct: idx.indexOf(q.correct) };
  });
}
