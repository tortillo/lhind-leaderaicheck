# Automatische Versionierung & Releases — Anleitung

Ab jetzt kümmert sich GitHub bei jedem Push auf `main` selbst um die Version: Nummer
hochzählen, Release-Notes ergänzen, ein GitHub-Release mit Tag anlegen. Du musst nichts
mehr von Hand in `version.js` oder `package.json` ändern.

## Was passiert bei jedem Push auf `main`

1. Die Action liest die aktuelle Version (aus `src/releases.json`).
2. Sie zählt die Version hoch — wie genau, steuerst du über deine Commit-Nachricht
   (siehe unten).
3. Sie schreibt einen neuen Eintrag oben in `src/releases.json`:
   - **Titel** = deine letzte Commit-Nachricht (Präfixe wie `feat:` werden entfernt).
   - **Änderungsliste** = automatisch alle Commit-Nachrichten seit dem letzten Release.
4. Sie aktualisiert `package.json` auf dieselbe Version.
5. Sie committet diese beiden Dateien zurück (mit `[skip ci]`, damit keine Endlosschleife
   entsteht), setzt ein Tag `vX.Y.Z` und legt ein **GitHub-Release** an.

In der App erscheint die neue Nummer automatisch im Footer (sobald Vercel neu deployt hat).

## So steuerst du die Versionsnummer über die Commit-Nachricht

Die Logik orientiert sich an „Semantic Versioning":

| Deine Commit-Nachricht beginnt/enthält … | Ergebnis            | Beispiel        |
|------------------------------------------|---------------------|-----------------|
| `feat: …` oder `[minor]`                  | MINOR (neue Funktion) | 2.2.0 → 2.3.0 |
| `[major]` oder `BREAKING CHANGE`          | MAJOR (großer Umbau)  | 2.2.0 → 3.0.0 |
| alles andere (z. B. `fix: …`, `docs: …`)  | PATCH (Korrektur)     | 2.2.0 → 2.2.1 |

Beispiele:
- `feat: Avatar-Verlauf als Liniendiagramm` → 2.3.0, Titel „Avatar-Verlauf als Liniendiagramm".
- `fix: Tippfehler im Bericht` → 2.2.1, Titel „Tippfehler im Bericht".
- `feat: neues Scoring [major]` → 3.0.0.

Der **Titel** des Releases ist immer deine letzte Commit-Nachricht (ohne Präfix). Die
**Liste** sammelt alle Commits seit dem letzten Release — wenn du also fünf Mal committest
und dann erst alles zusammen nach `main` bringst, stehen alle fünf in den Notes.

## Einmalige Einrichtung in GitHub (wichtig!)

Damit die Action zurück committen und Releases anlegen darf, musst du **einmal** eine
Einstellung setzen:

1. Repo → **Settings** → **Actions** → **General**.
2. Ganz unten unter **Workflow permissions**:
   - **„Read and write permissions"** auswählen.
   - Häkchen bei **„Allow GitHub Actions to create and approve pull requests"** ist nicht
     nötig, schadet aber nicht.
3. **Save**.

Ohne diesen Schritt schlägt der Schritt „Commit version changes" mit einem
Berechtigungsfehler fehl.

## Tipp zur Sprache der Notes

Die automatisch erzeugten Notes werden in beiden Sprachfeldern (de/en) mit demselben Text
deiner Commit-Nachricht gefüllt — die Action übersetzt nicht. Zwei Möglichkeiten:
- Schreib deine Commit-Nachrichten einfach in der Sprache, die dir lieber ist.
- Oder verfeinere die Notes nachträglich direkt in `src/releases.json` (manuell editierbar,
  ändert sofort die Anzeige in der App).

## Verhältnis zu Vercel

Die Action und Vercel sind unabhängig: Die Action pflegt Version + Release in GitHub,
Vercel baut und deployt die App. Da die Action ihre Änderungen nach `main` zurückschreibt,
löst dieser Rück-Commit ein weiteres Vercel-Deployment aus — das ist gewollt und sorgt
dafür, dass die neue Versionsnummer auch wirklich live geht. Eine erneute Auslösung der
**Action** verhindert das `[skip ci]` im Commit zuverlässig.

## Wenn du doch mal manuell eingreifen willst

`src/releases.json` ist die einzige Quelle der Wahrheit. Du kannst dort jederzeit von Hand
einen Eintrag korrigieren oder die Versionsnummer setzen — die App und das Bump-Skript
lesen beide daraus.
