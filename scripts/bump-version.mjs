#!/usr/bin/env node
/**
 * Bumps the version and prepends a new release entry to src/releases.json.
 * Runs in GitHub Actions on every push to main.
 *
 * Title source (your control): the LATEST commit subject line, minus any
 *   conventional-commit prefix (feat:, fix:, etc.).
 * Notes list (automatic): the subjects of all commits since the last release
 *   tag (vX.Y.Z), de-duplicated and lightly cleaned.
 * Bump type:
 *   - subject starts with "feat" or contains "[minor]"  -> MINOR
 *   - subject contains "[major]" or "BREAKING CHANGE"   -> MAJOR
 *   - otherwise                                          -> PATCH
 *
 * Writes the new version to package.json too, and prints the new version and
 * a markdown body to GITHUB_OUTPUT so the workflow can create the release.
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, "..");
const relPath = resolve(root, "src/releases.json");
const pkgPath = resolve(root, "package.json");

const sh = (cmd) => {
  try { return execSync(cmd, { encoding: "utf8" }).trim(); }
  catch { return ""; }
};

// --- 1. current version (from releases.json, the single source of truth) ---
const releases = JSON.parse(readFileSync(relPath, "utf8"));
const current = releases[0]?.version || "0.0.0";
const [maj, min, pat] = current.split(".").map((n) => parseInt(n, 10) || 0);

// --- 2. gather commit info -------------------------------------------------
const lastSubject = sh("git log -1 --pretty=%s");
const lastBody = sh("git log -1 --pretty=%b");

// commits since the last vX.Y.Z tag (fallback: last 20 commits)
const lastTag = sh("git describe --tags --abbrev=0 --match 'v*'");
const range = lastTag ? `${lastTag}..HEAD` : "";
const rawList = sh(`git log ${range} --pretty=%s --no-merges`)
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

// --- 3. decide bump type ---------------------------------------------------
const hay = `${lastSubject}\n${lastBody}`.toLowerCase();
let bump = "patch";
if (hay.includes("[major]") || hay.includes("breaking change")) bump = "major";
else if (/^feat(\(|:|\b)/.test(lastSubject.toLowerCase()) || hay.includes("[minor]")) bump = "minor";

let next;
if (bump === "major") next = `${maj + 1}.0.0`;
else if (bump === "minor") next = `${maj}.${min + 1}.0`;
else next = `${maj}.${min}.${pat + 1}`;

// --- 4. build title + notes ------------------------------------------------
const stripPrefix = (s) =>
  s.replace(/^(feat|fix|chore|docs|refactor|perf|test|build|ci|style)(\([^)]*\))?:\s*/i, "")
   .replace(/\s*\[(minor|major)\]\s*/gi, " ")
   .trim();

const title = stripPrefix(lastSubject) || "Update";

// auto list: cleaned, de-duplicated commit subjects (skip pure version-bump commits)
const seen = new Set();
const notes = rawList
  .map(stripPrefix)
  .filter((s) => s && !/^v?\d+\.\d+\.\d+/.test(s) && !/^release[: ]/i.test(s) && !/bump version/i.test(s))
  .filter((s) => { const k = s.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });

if (notes.length === 0) notes.push(title);

const today = new Date().toISOString().slice(0, 10);

// Notes are stored bilingually; we don't auto-translate, so both languages get
// the same source text. You can refine wording later directly in releases.json.
const entry = {
  version: next,
  date: today,
  title: { de: title, en: title },
  notes: { de: notes, en: notes },
};

// --- 5. write files --------------------------------------------------------
releases.unshift(entry);
writeFileSync(relPath, JSON.stringify(releases, null, 2) + "\n");

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.version = next;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// --- 6. expose results to the workflow ------------------------------------
const mdBody = `## ${title}\n\n${notes.map((n) => `- ${n}`).join("\n")}`;
console.log(`Bumped ${current} -> ${next} (${bump})`);
console.log(`Title: ${title}`);
console.log(`Notes:\n${notes.map((n) => "  - " + n).join("\n")}`);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `version=${next}\n`);
  // multiline output for the release body
  const delim = "RELEASE_BODY_EOF";
  appendFileSync(process.env.GITHUB_OUTPUT, `body<<${delim}\n${mdBody}\n${delim}\n`);
}
