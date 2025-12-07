import { loadDB, saveDB } from "../database.js";

export function isPremium() {
  const db = loadDB();
  return db.premium === true;
}

export function ativarPremium() {
  const db = loadDB();
  db.premium = true;
  saveDB(db);
}

export function desativarPremium() {
  const db = loadDB();
  db.premium = false;
  saveDB(db);
}
