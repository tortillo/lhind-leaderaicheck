# Update-Hinweise — Runde 2 (Top-3-Tipps, Verallgemeinerung, Optionen, Avatar)

Diese Version baut auf der vorherigen auf und enthält deine vier neuen Wünsche.

## Was neu ist

**1. Top-3-Tipps am Ende — aus dem konkreten Ergebnis.** Im Bericht erscheint ein
prominenter Block „Deine Top-3-Tipps". Die Tipps werden aus dem tatsächlichen Ergebnis
abgeleitet: zwei aus den beiden schwächsten Dimensionen (mit konkretem nächsten Schritt
und dem erreichten Prozentwert), der dritte aus dem Verhalten bei den Kontrollfragen
bzw. der erreichten Reife-Stufe. Also keine generischen Floskeln, sondern auf die Person
zugeschnitten.

**2. Aviation-Bezug verallgemeinert.** Die App ist jetzt branchenneutral:
- Die früher aviation-spezifische Pricing-Frage ist auf einen allgemeinen
  Dynamic-Pricing-Kontext umgeschrieben.
- Die Bereichsauswahl im Onboarding nutzt neutrale Geschäftsfunktionen
  (IT/Engineering, Consulting, Sales, Pricing/Commerce, Operations, HR, Finance,
  Marketing, Produkt/Strategie, Sonstige).
- Der Anzeigename ist als Konstante gebündelt: oben in `src/App.jsx` findest du
  `BRAND = "LHIND"` und `APP_NAME = "AI Leadership Check"`. Für einen anderen Kontext
  einfach diese beiden Werte ändern (oder `BRAND = ""` setzen, um nur den App-Namen zu
  zeigen). Die LHIND-spezifische Trainingsempfehlung wurde neutralisiert.

**3. Führungs-Fragen optional ausschließen.** Im Onboarding gibt es jetzt eine Checkbox
„Führungs-spezifische Fragen ausschließen". Ist sie aktiviert, werden für DIESEN Durchlauf
keine `lead`-Fragen gezogen (sinnvoll für Fach-/Projektrollen ohne disziplinarische
Führung). Es werden weiterhin 20 Fragen gestellt, nur eben aus den übrigen Dimensionen.

**4. Optionaler Avatar-Name mit Verlauf.** Ganz oben im Onboarding kann man freiwillig
einen frei erfundenen Avatar-Namen wählen. Wird beim nächsten Mal derselbe Name
eingegeben, zeigt der Bericht einen Verlaufs-Block: die früheren Punktzahlen als kleine
Balken plus die Veränderung zum letzten Mal. Leer lassen ist völlig ok — dann bleibt
alles wie bisher anonym. (Der Name ist ein frei wählbares Pseudonym, keine Identität.)

**Zusatz: Anleitung für KI-generierte Fragen.** Die Datei
`FRAGEN-GENERIEREN-MIT-KI.md` enthält eine Schritt-für-Schritt-Anleitung und einen
fertigen Copy-&-Paste-Prompt, mit dem eine beliebige KI neue Fragen im exakt richtigen
Format erzeugt — direkt einfügbar in `src/questions.js`.

## Deployen

Wie gehabt: die geänderten Dateien (`src/App.jsx`, `src/questions.js`) ins GitHub-Repo
übernehmen → Vercel deployt automatisch. Falls die beiden `VITE_SUPABASE_*`-Variablen
noch nicht in Vercel gesetzt sind, jetzt nachholen und einmal neu deployen, sonst läuft
das Admin-Panel weiter im lokalen Modus (siehe Speicher-Status im Panel).

Der Avatar-Verlauf funktioniert nur dann teilnehmerübergreifend zuverlässig, wenn
Supabase verbunden ist — im lokalen Modus sieht ein Browser nur seine eigenen früheren
Durchläufe.

## Zur Erinnerung

- Admin-PIN weiterhin `2024` (`ADMIN_PIN` in `src/App.jsx`) — vor breiter Verteilung ändern.
- Branding in einem Schritt umstellbar über `BRAND` / `APP_NAME` oben in `src/App.jsx`.
