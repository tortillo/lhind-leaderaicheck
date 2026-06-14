# Verteilung an alle Teilnehmenden — Schritt-für-Schritt

Dein gewählter Weg: **öffentliche Cloud (Vercel/Netlify) + geteilter Speicher (Supabase) + QR-Code.**
Diese Anleitung führt dich von Null bis zum verteilbaren Link in ~30–45 Minuten.

> **Wichtiger organisatorischer Schritt zuerst:** Auch wenn die App nur anonyme Aggregatdaten
> speichert, sollte eine unternehmensweite Ausrollung mit den Verantwortlichen abgestimmt sein.
> Anlaufstelle: **ase@lhind.dlh.de** — dort Freigabe, Datenschutz-Sicht und ggf. eine
> Wunsch-Subdomain (z. B. `aicheck.lhind.dlh.de`) klären.

---

## Schritt 1 — Geteilten Speicher anlegen (Supabase)

Ohne diesen Schritt sieht jeder nur seine eigenen Durchläufe. Mit ihm fließen alle anonymen
Ergebnisse in einen Topf → Kohorten-Vergleich und Admin-Panel funktionieren über alle.

1. Auf [supabase.com](https://supabase.com) kostenlos registrieren, neues Projekt anlegen.
   **Region: Frankfurt / EU (Central EU)** wählen — wichtig für DSGVO.
2. Im Projekt links auf **SQL Editor** → neues Query → einfügen und ausführen:

   ```sql
   create table kv_store (
     key   text primary key,
     value text
   );
   alter table kv_store enable row level security;
   create policy "anon kv access" on kv_store
     for all using (true) with check (true);
   ```

3. Links auf **Project Settings → API**. Notiere dir zwei Werte:
   - **Project URL** (z. B. `https://abcd1234.supabase.co`)
   - **anon public** key (langer Schlüssel)

Das war's für Supabase. Der `anon`-Key darf öffentlich im Browser liegen — es werden nur
anonyme Aggregat-JSONs gespeichert, keine Personendaten.

---

## Schritt 2 — App deployen (Vercel — empfohlen)

**Variante A: über GitHub (am saubersten, ermöglicht spätere Updates per Git-Push)**

1. Den Inhalt des `webapp`-Ordners in ein (privates) GitHub-Repo legen.
2. Auf [vercel.com](https://vercel.com) mit GitHub einloggen → **Add New → Project** →
   das Repo importieren.
3. Vercel erkennt **Vite** automatisch (Build: `npm run build`, Output: `dist`).
4. Vor dem Deploy unter **Environment Variables** zwei Variablen anlegen:
   - `VITE_SUPABASE_URL` = deine Project URL aus Schritt 1
   - `VITE_SUPABASE_ANON_KEY` = dein anon key aus Schritt 1
5. **Deploy** klicken. Nach ~1 Min bekommst du eine URL wie
   `https://lhind-aicheck.vercel.app`.

**Variante B: ohne GitHub, per CLI (schneller Einmal-Deploy)**

```bash
cd webapp
npm install
npm i -g vercel
vercel            # folgt dem Login, fragt Projektnamen ab
# danach im Vercel-Dashboard unter Settings → Environment Variables die zwei
# VITE_SUPABASE_*-Werte eintragen und einmal neu deployen: vercel --prod
```

**Netlify-Alternative:** Repo verbinden (Build `npm run build`, Publish `dist`) oder
`dist`-Ordner auf app.netlify.com/drop ziehen. Env-Variablen unter *Site settings →
Environment variables*. Bei Drag&Drop vorher lokal mit ausgefüllter `.env` bauen.

---

## Schritt 3 — Funktion prüfen (kurzer Selbsttest)

1. Die URL öffnen, einen kompletten Durchlauf machen.
2. Auf der Startseite **Admin** öffnen (PIN `2024`) — dein Durchlauf sollte in der
   Auswertung auftauchen.
3. Optional auf einem zweiten Gerät/Browser testen: Erscheint der zweite Durchlauf
   ebenfalls im Admin-Panel? Dann ist der geteilte Speicher korrekt verbunden. ✅
4. **PIN ändern** vor der breiten Verteilung: in `src/App.jsx` die Zeile mit
   `const ADMIN_PIN` anpassen, committen/neu deployen.

---

## Schritt 4 — QR-Code & Poster erstellen

Öffne **`qr-generator.html`** (Doppelklick, läuft im Browser, keine Installation):

1. Deine finale App-URL eintragen.
2. Titel/Untertitel/Fußzeile anpassen (Vorbelegung passt schon).
3. **QR & Poster erzeugen** → dann **Poster als PNG** oder **Nur QR (PNG)** herunterladen.

Der QR nutzt hohe Fehlerkorrektur — er funktioniert auch leicht verdeckt oder klein gedruckt.
Eine fertige Beispielausgabe liegt als `beispiel-poster.png` bei.

---

## Schritt 5 — Verteilen

Je nach Setting:

- **E-Mail / Teams / Intranet:** Link + ein, zwei Sätze (siehe Textvorlage unten).
- **Townhall / Workshop / Offsite:** Poster oder QR auf eine Folie — Teilnehmende scannen
  mit dem Handy und starten sofort (die App ist mobil-responsiv).
- **E-Mail-Signatur / Aushang:** den reinen QR-Code einbinden.

### Textvorlage (anpassbar)

> **Betreff: 12 Minuten für deine KI-Standortbestimmung**
>
> Hallo zusammen,
>
> wie KI-fit ist unsere Führung? Mit diesem kurzen, **anonymen** Self-Check (ca. 12 Min)
> bekommst du eine Einschätzung deiner KI-Kompetenz, einen Vergleich mit anderen
> Führungskräften und konkrete nächste Schritte — inklusive eines persönlichen
> Trainingsplan-Prompts.
>
> 👉 [LINK HIER]
>
> Es werden **keine personenbezogenen Daten** gespeichert. Antworte am besten ehrlich und
> ohne fremde Hilfe — der Check enthält Kontrollfragen und läuft auf Zeit.
>
> Fragen? → ase@lhind.dlh.de

---

## Spätere Updates

- **Bei GitHub-Deploy (Variante A):** Änderung committen & pushen → Vercel deployt
  automatisch neu. Der Link bleibt gleich, der QR-Code muss **nicht** neu erstellt werden.
- **Ergebnisse zurücksetzen** (z. B. nach der Pilotphase): im Admin-Panel
  „Alle Daten zurücksetzen". Das leert den geteilten Speicher für alle.

## Kosten

Für eine typische interne Ausrollung bleibt alles im kostenlosen Tarif: Vercel/Netlify
Hobby-Tier und Supabase Free-Tier reichen für hunderte Teilnehmer locker aus. Erst bei sehr
großem Volumen oder kommerzieller Nutzung werden bezahlte Tarife relevant.
