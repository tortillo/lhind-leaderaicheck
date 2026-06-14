// ============================================================
// STORAGE ADAPTER
// ------------------------------------------------------------
// The Claude artifact used `window.storage` (a shared key-value store).
// Outside Claude that doesn't exist, so this file provides a drop-in
// replacement with the SAME interface: get(key, shared) / set / delete.
//
// Two backends:
//   1. localStorage  — default. Zero setup. BUT: data lives only in THIS
//      browser. The "cohort comparison" then only reflects runs on this
//      device. Perfect for testing or a single kiosk machine.
//   2. supabase       — a real shared backend. Every participant's anonymous
//      result lands in one table, so the cohort comparison & admin panel
//      work across everyone. Enable by setting VITE_SUPABASE_URL +
//      VITE_SUPABASE_ANON_KEY in your .env (see README).
//
// The app code calls `storage.get/set/delete` and never knows which backend
// is active — so you can start local and switch to Supabase later without
// touching the app.
// ============================================================

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const USE_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_KEY);

// ---------- localStorage backend ----------
const local = {
  async get(key) {
    const raw = localStorage.getItem(key);
    return raw === null ? null : { key, value: raw };
  },
  async set(key, value) {
    localStorage.setItem(key, value);
    return { key, value };
  },
  async delete(key) {
    localStorage.removeItem(key);
    return { key, deleted: true };
  },
};

// ---------- Supabase backend ----------
// Uses a single table `kv_store` with columns: key (text, PK), value (text).
// SQL to create it is in the README. RLS policy must allow anon read/write
// to that table (it stores only anonymous aggregate JSON, no personal data).
let _sb = null;
async function sb() {
  if (_sb) return _sb;
  const { createClient } = await import("@supabase/supabase-js");
  _sb = createClient(SUPABASE_URL, SUPABASE_KEY);
  return _sb;
}
const remote = {
  async get(key) {
    const client = await sb();
    const { data, error } = await client.from("kv_store").select("value").eq("key", key).maybeSingle();
    if (error) throw error;
    return data ? { key, value: data.value } : null;
  },
  async set(key, value) {
    const client = await sb();
    const { error } = await client.from("kv_store").upsert({ key, value }, { onConflict: "key" });
    if (error) throw error;
    return { key, value };
  },
  async delete(key) {
    const client = await sb();
    const { error } = await client.from("kv_store").delete().eq("key", key);
    if (error) throw error;
    return { key, deleted: true };
  },
};

const backend = USE_SUPABASE ? remote : local;

// Public interface — mirrors the old window.storage signature.
// The `shared` argument is accepted and ignored (both backends are already
// "shared" within their scope), so the app code stays unchanged.
export const storage = {
  get: (key, _shared) => backend.get(key),
  set: (key, value, _shared) => backend.set(key, value),
  delete: (key, _shared) => backend.delete(key),
  isShared: USE_SUPABASE, // app can show a hint when running local-only
};
