# LHIND · AI Leadership Check — Webapp

Eine eigenständige React-Webapp (Vite). Das ist dieselbe App wie das Claude-Artifact,
aber lauffähig auf jedem Webserver. Der einzige Unterschied unter der Haube: der
geteilte Speicher (`window.storage`) wurde durch einen austauschbaren Storage-Adapter
ersetzt (`src/storage.js`).

---

## TL;DR — in 3 Minuten lokal starten

Voraussetzung: **Node.js 18+** installiert ([nodejs.org](https://nodejs.org)).

```bash
npm install
npm run dev
```

Dann die angezeigte Adresse öffnen (i. d. R. http://localhost:5173).
Fertig. Läuft mit Browser-lokalem Speicher — kein Backend nötig.

Für die Produktion:

```bash
npm run build      # erzeugt den Ordner dist/ (statische Website)
npm run preview    # zum lokalen Testen des Builds
```

Der Ordner `dist/` ist eine komplett statische Seite und kann überall gehostet werden.

---

## Wichtig: Speicher-Modi verstehen

Die App speichert **keine personenbezogenen Daten** — nur anonyme, aggregierte
Kennzahlen (Score, Seniorität, Rolle, Bereich, Altersgruppe) für den Vergleich und das
Admin-Panel. Wo diese landen, hängt vom Modus ab:

| Modus | Setup | Kohorten-Vergleich umfasst… |
|-------|-------|------------------------------|
| **Lokal** (Standard) | nichts | nur Durchläufe **in diesem Browser/auf diesem Gerät** |
| **Geteilt** (Supabase) | `.env` ausfüllen | **alle** Teilnehmer projektweit |

Solange du keine `.env` mit Supabase-Daten anlegst, läuft alles lokal. Das ist ideal
zum Testen oder für einen einzelnen Kiosk-Rechner. Für einen echten unternehmensweiten
Vergleich brauchst du den geteilten Modus (Option C unten).

---

## Deployment — drei Wege

### Option A — Statisches Hosting (am einfachsten, empfohlen)

`npm run build` erzeugt `dist/`. Lade den Inhalt auf einen beliebigen statischen Host:

- **Vercel:** Repo importieren → Framework „Vite" → fertig. Oder `npx vercel`.
- **Netlify:** `dist/` per Drag&Drop auf app.netlify.com/drop, oder Repo verbinden
  (Build command `npm run build`, Publish directory `dist`).
- **Eigener Webserver / Nginx / IIS / SharePoint-Static:** Inhalt von `dist/` in das
  Web-Verzeichnis kopieren.
- **GitHub Pages:** `dist/` in einen `gh-pages`-Branch pushen. Wenn die App unter einem
  Unterpfad läuft (z. B. `…/aicheck/`), in `vite.config.js` `base: "/aicheck/"` setzen
  und neu bauen.

Lokal/Intern: Da die App rein im Browser läuft (keine Server-Logik), genügt jeder Host,
der HTML/JS ausliefert — auch ein internes Netzlaufwerk mit Webfreigabe.

### Option B — Docker (für internes Hosting hinter der Firewall)

Im Projekt liegt ein `Dockerfile`. Damit baust du ein Image, das die App über Nginx
ausliefert:

```bash
docker build -t lhind-aicheck .
docker run -p 8080:80 lhind-aicheck
# dann http://localhost:8080 öffnen
```

Das eignet sich gut, um die App on-premise im LHIND-Netz zu betreiben, ohne externe
Dienste. (Im Docker-Standard läuft sie im lokalen Speichermodus pro Browser — für den
geteilten Vergleich Option C kombinieren und die Env-Variablen beim Build mitgeben.)

### Option C — Geteilter Vergleich über alle Teilnehmer (Supabase)

Wenn das Admin-Panel und das Histogramm **alle** Teilnehmer zeigen sollen, brauchst du
einen gemeinsamen Datenspeicher. Der schnellste DSGVO-taugliche Weg ist Supabase
(kostenloser Tarif reicht; EU-Region wählbar):

1. Auf [supabase.com](https://supabase.com) ein Projekt anlegen (Region: EU).
2. Im SQL-Editor diese Tabelle erstellen:

   ```sql
   create table kv_store (
     key   text primary key,
     value text
   );

   alter table kv_store enable row level security;

   -- Es werden nur anonyme Aggregat-JSONs gespeichert (keine Personendaten).
   -- Diese Policy erlaubt der Web-App (anon) Lesen + Schreiben auf diese Tabelle:
   create policy "anon kv access" on kv_store
     for all using (true) with check (true);
   ```

3. Unter *Project Settings → API* `Project URL` und `anon public key` kopieren.
4. Im Projekt `.env` anlegen und befüllen:

   ```bash
   cp .env.example .env
   ```
   ```
   VITE_SUPABASE_URL=https://DEINPROJEKT.supabase.co
   VITE_SUPABASE_ANON_KEY=DEIN_ANON_KEY
   ```

5. `npm run build` neu ausführen und deployen. Die App erkennt die Variablen
   automatisch und nutzt dann den geteilten Speicher. (Bei Vercel/Netlify die beiden
   `VITE_…`-Variablen in den Projekt-Einstellungen hinterlegen statt in `.env`.)

> Hinweis: Der `anon key` ist für öffentliche Web-Apps gedacht und darf im Browser
> liegen. Da nur anonyme Aggregatdaten gespeichert werden, ist das unkritisch. Wenn du
> strengere Kontrolle willst, kann man die Policy einschränken oder ein kleines eigenes
> Backend vorsetzen — der Adapter in `src/storage.js` ist genau dafür der Umschaltpunkt.

---

## Admin-Panel

Erreichbar über den „Admin"-Button auf der Startseite. **PIN: `2024`**.
Ändern in `src/App.jsx` — suche nach `const ADMIN_PIN`.

Der Admin-Bereich zeigt Aggregatauswertungen und die schwierigsten Fragen
(Trainingsbedarf). Im lokalen Modus bezieht er sich nur auf dieses Gerät, im geteilten
Modus auf alle Teilnehmer.

---

## Projektstruktur

```
webapp/
├─ index.html            Einstiegspunkt
├─ package.json          Abhängigkeiten & Skripte
├─ vite.config.js        Build-Konfiguration (base-Pfad hier setzen)
├─ Dockerfile            optionales Container-Hosting
├─ .env.example          Vorlage für den geteilten Supabase-Modus
└─ src/
   ├─ main.jsx           React-Bootstrap
   ├─ App.jsx            die komplette App (Fragenpool, Test, Bericht, Admin)
   ├─ storage.js         Speicher-Adapter (lokal ⇄ Supabase) — der Umschaltpunkt
   └─ index.css          Basis-Styles
```

## Anpassen

- **Fragen ergänzen/ändern:** in `src/App.jsx` im Array `POOL` (gleiche `I("de","en")`-Struktur).
- **Admin-PIN:** `ADMIN_PIN` in `src/App.jsx`.
- **Zeit pro Frage / Fragenanzahl:** `TIME_PER_Q` bzw. `NQ` in `src/App.jsx`.
- **Empfehlungen & Ressourcen-Links:** Funktion `buildRecs` in `src/App.jsx`.
