import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "database.json");

function loadDB() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Cria progresso inicial para novos usuários
export function initializeProgress(userId) {
  const db = loadDB();

  const existing = db.progress.find((p) => p.userId === userId);
  if (existing) return existing;

  const newProgress = {
    userId,
    currentDay: 1,
    completedDays: [],
    startedAt: new Date().toISOString()
  };

  db.progress.push(newProgress);
  saveDB(db);

  return newProgress;
}

// Marca dia como concluído
export function completeDay(userId, dayNumber) {
  const db = loadDB();

  const progress = db.progress.find((p) => p.userId === userId);
  if (!progress) return { error: "Progresso não encontrado." };

  if (!progress.completedDays.includes(dayNumber)) {
    progress.completedDays.push(dayNumber);
  }

  progress.currentDay = Math.max(progress.currentDay, dayNumber + 1);

  saveDB(db);
  return { success: true, progress };
}

// Retorna status atual
export function getProgress(userId) {
  const db = loadDB();
  return db.progress.find((p) => p.userId === userId) || null;
}
