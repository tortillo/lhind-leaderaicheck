# Anleitung: Neue Fragen mit einer KI generieren

Diese Anleitung hilft dir, mit einer beliebigen KI (Claude, ChatGPT, Gemini …)
qualifizierte neue Fragen im **exakt passenden Format** zu erzeugen. Die Ausgabe
lässt sich direkt in `src/questions.js` einfügen — ohne Nacharbeit.

---

## So gehst du vor

1. Kopiere den **kompletten Prompt** aus dem grauen Block weiter unten.
2. Füge ihn in deine KI ein. Passe oben die **drei Platzhalter** an (Anzahl, Dimension,
   Themen-/Kontextwunsch).
3. Die KI gibt dir fertige Frage-Blöcke aus.
4. Öffne `src/questions.js`, gehe zur passenden Dimension und füge die Blöcke
   in das jeweilige `POOL.push( … )` ein (oder in die erste `POOL = [ … ]`-Liste).
   Achte darauf, dass am Ende jedes Blocks ein Komma steht.
5. Optional gegenprüfen: `npm run build` muss fehlerfrei durchlaufen.

---

## Das Format (zur Orientierung)

Jede Frage ist ein Objekt mit genau diesen Feldern:

```js
{
  dim: "apply",          // eine von: understand | apply | evaluate | ethics | lead | practice
  diff: 3,               // Schwierigkeit 1 (Wissen) … 4 (Analyse/Bewertung)
  ctx: "Finance",        // OPTIONAL: Geschäftsfunktion, wird bei passendem Bereich bevorzugt
  trap: true,            // OPTIONAL: nur für Kontrollfragen (siehe Hinweis unten)
  q: I("Deutsche Frage?", "English question?"),
  a: [
    I("Option A de", "Option A en"),
    I("Option B de", "Option B en"),
    I("Option C de", "Option C en"),
    I("Option D de", "Option D en"),
  ],
  correct: 1,            // Index der richtigen Option, 0–3
  expl: I("Kurze Erläuterung, warum richtig/falsch.",
          "Short explanation of why right/wrong."),
},
```

Regeln: immer **genau 4 Optionen**, **eine** eindeutig richtige, drei plausible
(keine Scherz-Antworten), Optionen etwa gleich lang, kein „alle/keine der obigen".
`I(...)` ist der zweisprachige Helfer — immer Deutsch zuerst, dann Englisch.

> Hinweis zu `trap`: Kontrollfragen prüfen aufmerksames Lesen / eigenständiges
> Antworten. Die brauchst du selten selbst zu erzeugen — es sind schon genug im Pool.
> Lass das Feld einfach weg, wenn du normale Fachfragen generierst.

---

## Der fertige Prompt (kopieren & einfügen)

```
Du hilfst mir, Multiple-Choice-Fragen für ein KI-Kompetenz-Self-Assessment für
Führungskräfte zu erstellen. Ich brauche die Ausgabe in einem exakten JavaScript-Format,
damit ich sie direkt in meinen Code einfügen kann.

>>> BITTE ANPASSEN <<<
- Anzahl Fragen: 5
- Dimension (genau eine pro Frage): apply
- Themen-/Kontextwunsch: praktische KI-Nutzung im Controlling, mittlere bis hohe Schwierigkeit
>>> ENDE ANPASSEN <<<

DIMENSIONEN (was sie messen):
- understand : Grundverständnis, wie generative KI funktioniert (Tokens, Kontextfenster,
  Halluzinationen, Modellfamilien, lokal vs. API).
- apply      : KI sinnvoll auf reale Geschäftsaufgaben anwenden (Use-Cases, Baseline,
  Piloten, Model-Routing, Risiken abwägen).
- evaluate   : KI-Output kritisch bewerten (Quellen verifizieren, Halluzinationen
  erkennen, Provenienz statt Detektor-Scores).
- ethics     : Datenschutz, Bias, Verantwortung, Zweckbindung, Mitbestimmung.
- lead       : Menschen führen im KI-Zeitalter (Akzeptanz, Nutzungsrahmen, Vorbild,
  Umgang mit Sorgen/Skepsis).
- practice   : konkrete Praxis (gute Prompts, wiederverwendbare Routinen/Skills,
  typische Fehler beim Delegieren an KI).

FORMAT-REGELN (zwingend einhalten):
1. Gib NUR JavaScript-Objekte aus, keine Einleitung, kein Markdown, keine Backticks.
2. Jede Frage exakt nach diesem Muster (Komma am Ende nicht vergessen):

  {
    dim: "apply", diff: 3, ctx: "Finance",
    q: I("Deutsche Frage?", "English question?"),
    a: [
      I("Option A de", "Option A en"),
      I("Option B de", "Option B en"),
      I("Option C de", "Option C en"),
      I("Option D de", "Option D en"),
    ], correct: 1,
    expl: I("Kurze Erläuterung (1–2 Sätze), warum die richtige Option stimmt und worauf es ankommt.",
            "Short explanation (1–2 sentences) why the correct option is right and what matters."),
  },

3. Genau 4 Optionen. Genau eine eindeutig richtige (Index in "correct", 0–3).
4. Die 3 falschen Optionen sind plausible, realistische Fehlannahmen — keine Witze,
   keine offensichtlich absurden Antworten. Alle Optionen etwa gleich lang.
5. Verwende KEIN "alle der obigen" / "keine der obigen".
6. Schwierigkeit: diff 1 = reines Wissen, diff 2 = Verständnis, diff 3 = Anwendung/
   Abwägung, diff 4 = Analyse mehrerer Faktoren / kritische Bewertung.
7. "ctx" nur setzen, wenn die Frage klar zu einer Geschäftsfunktion passt
   (z. B. Finance, Marketing, "HR / People", Operations, "Sales / Account",
   "Pricing / Commerce", "Product / Strategy"). Sonst "ctx" ganz weglassen.
8. Inhaltlich zeitlos formulieren: KEINE konkreten Modell-Versionsnummern oder
   Produktnamen, die schnell veralten. Lieber Kategorien (z. B. "kleines/lokales
   Modell", "starkes Reasoning-Modell", "Frontier-Modell").
9. Deutsch zuerst, dann Englisch — beide Sprachen inhaltlich gleichwertig.
10. Erfinde keine Statistiken oder Studien in den Fragetexten.

Erzeuge jetzt die gewünschte Anzahl Fragen.
```

---

## Tipp

Wenn du gezielt schwächere Bereiche deiner Teilnehmer stärken willst: Schau im
Admin-Panel unter „schwerste Fragen" / der Dimensions-Auswertung nach, wo am meisten
falsch lag, und lass dir für genau diese Dimension neue Fragen generieren.
