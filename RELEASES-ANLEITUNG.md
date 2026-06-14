# Releases & Versionierung — Anleitung

> **Hinweis:** Die Versionierung läuft jetzt automatisch über GitHub Actions — siehe
> `AUTO-VERSIONIERUNG-ANLEITUNG.md`. Du musst Version und Release in der Regel **nicht**
> mehr von Hand pflegen. Diese Datei bleibt als Hintergrundwissen und für den Fall, dass
> du doch einmal manuell ein Release anlegen willst.


Ab dieser Version zeigt die App unten eine Versionsnummer (z. B. „v2.1.0 · Was ist neu?").
Ein Klick darauf öffnet die Release-Notes direkt in der App. Das ist auch dein schnellster
Test, ob ein Deployment wirklich live ist: Steht unten die erwartete Nummer, hat es geklappt.

---

## Teil A — Wie die Versionsanzeige funktioniert (schon eingebaut)

Es gibt genau **eine** Stelle, an der die Version und die Notizen gepflegt werden:
die Datei `src/version.js`. Dort stehen:

- `VERSION` — die aktuelle Nummer (z. B. "2.1.0").
- `RELEASES` — die Liste aller Versionen mit Titel und Stichpunkten (neueste zuerst).

Die App liest beides automatisch aus und zeigt es im Footer an. Du musst sonst nichts
anpassen.

### Wenn du künftig eine neue Version herausbringst

1. Öffne `src/version.js`.
2. Erhöhe `VERSION` (Schema MAJOR.MINOR.PATCH — siehe unten).
3. Füge **ganz oben** in `RELEASES` einen neuen Eintrag ein (kopiere einen vorhandenen
   Block und passe ihn an). Beispiel:

```js
{
  version: "2.2.0",
  date: "2026-07-01",
  title: { de: "Kurzer Titel", en: "Short title" },
  notes: {
    de: ["Was ist neu, Stichpunkt 1.", "Stichpunkt 2."],
    en: ["What's new, point 1.", "Point 2."],
  },
},
```

4. Setze in `package.json` das Feld `"version"` auf denselben Wert (Kosmetik/Konsistenz).
5. Hochladen / committen → Vercel deployt → unten steht die neue Nummer.

### Versionsschema (Semantic Versioning, kurz erklärt)

- **PATCH** (2.1.0 → 2.1.1): kleine Korrekturen, Tippfehler, Bugfix. Nichts Neues für Nutzer.
- **MINOR** (2.1.0 → 2.2.0): neue Funktionen, die Bestehendes nicht brechen.
- **MAJOR** (2.1.0 → 3.0.0): große Umbauten / grundlegende Änderungen.

Im Zweifel: neue Funktion = MINOR, reine Reparatur = PATCH.

---

## Teil B — GitHub Release anlegen (machst du in GitHub)

Ein GitHub Release ist ein offizieller, benannter Schnappschuss deines Codes mit Notizen.
Das ist getrennt von der App-Anzeige, aber sinnvoll als sauberes Protokoll.

1. Geh in deinem Repo oben rechts auf **Releases** (oder rechts in der Seitenleiste auf
   „Releases" → „Create a new release").
2. Klick **„Draft a new release"**.
3. Bei **„Choose a tag"** ein neues Tag eingeben: `v2.1.0` → dann „Create new tag on publish".
4. **Release title:** `v2.1.0 — Top-3-Tipps, Avatar-Verlauf & Verallgemeinerung`
5. Ins große Textfeld die Release-Notes von unten einfügen.
6. **„Publish release"** klicken. Fertig.

Beim nächsten Mal genauso, mit der jeweils neuen Nummer.

---

## Fertige Release-Notes zum Einfügen

### v2.1.0 — Top-3-Tipps, Avatar-Verlauf & Verallgemeinerung

```markdown
## Neu
- **Top-3-Tipps am Ende**: konkrete, aus dem persönlichen Ergebnis abgeleitete Empfehlungen.
- **Optionaler Avatar-Name**: freiwillig wählbar; bei gleichem Namen zeigt der Bericht den eigenen Verlauf über mehrere Durchläufe.
- **Führungs-Fragen ausschließbar**: Checkbox im Onboarding für Fach-/Projektrollen ohne disziplinarische Führung.
- **Sichtbare Versionsnummer** im Footer mit klickbaren Release-Notes.

## Geändert
- App ist jetzt **branchenneutral**: Aviation-spezifische Inhalte entfernt, neutrale Geschäftsfunktionen.
- Branding zentral über `BRAND` / `APP_NAME` in `src/App.jsx` einstellbar.

## Hinweis
- Der Avatar-Verlauf funktioniert teilnehmerübergreifend nur mit verbundenem Supabase.
```

### v2.0.0 — Sofort-Feedback, Fragen-Review & mehr Fragen

```markdown
## Neu
- **Sofort-Feedback** nach jeder Frage: richtige Antwort markiert, plus Erläuterung.
- **Gesamtübersicht** am Ende: alle Fragen mit eigener Antwort, richtiger Antwort und Erläuterung.

## Geändert
- Fragenpool deutlich erweitert und in `src/questions.js` ausgelagert (leichter editierbar).
- Admin-Panel: Speicher-Status-Diagnose ergänzt (erklärt ein leeres Panel).
```

### v1.0.0 — Erstveröffentlichung

```markdown
## Erstveröffentlichung
- Anonymes KI-Kompetenz-Self-Assessment für Führungskräfte.
- 6 Kompetenz-Dimensionen, Gamification, Anti-Cheating.
- Kohorten- und Studienvergleich im Ergebnisbericht.
- PIN-geschütztes Admin-Panel mit Auswertung.
```

---

## Tipp zur Reihenfolge

Wenn du die drei Releases sauber nachträgst, lege sie in der Reihenfolge v1.0.0 → v2.0.0
→ v2.1.0 an (älteste zuerst), damit die Daten/Tags chronologisch stimmen. Für künftige
Releases reicht dann immer nur der eine neue Eintrag.
