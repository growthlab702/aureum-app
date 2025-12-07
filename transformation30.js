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

// Validar número do dia
function validateDay(day) {
  const n = Number(day);
  if (isNaN(n) || n < 1 || n > 30) return 1;
  return n;
}

// Iniciar o programa de 30 dias
export function init30Program(userId) {
  const db = loadDB();
  const user = db.users.find(u => u.id === userId);

  if (!user) return { error: "Usuário não encontrado." };

  // Se nunca iniciou, cria o progresso
  if (!db.progress[userId] || !db.progress[userId].transform30) {
    db.progress[userId] = {
      ...db.progress[userId],
      transform30: {
        currentDay: 1,
        startedAt: new Date().toISOString(),
        completedDays: []
      }
    };

    saveDB(db);
  }

  return db.progress[userId].transform30;
}

// Buscar o dia atual
export function getCurrentDay(userId) {
  const db = loadDB();

  if (!db.progress[userId] || !db.progress[userId].transform30) {
    return { currentDay: 1 };
  }

  return db.progress[userId].transform30;
}

// Avançar para o próximo dia
export function completeDay(userId, day) {
  const db = loadDB();
  const userProgress = db.progress[userId]?.transform30;

  if (!userProgress) return { error: "Programa não iniciado." };

  const validated = validateDay(day);

  if (!userProgress.completedDays.includes(validated)) {
    userProgress.completedDays.push(validated);
  }

  if (validated < 30) {
    userProgress.currentDay = validated + 1;
  } else {
    userProgress.currentDay = 30;
  }

  saveDB(db);
  return userProgress;
}

// Reiniciar do zero
export function reset30(userId) {
  const db = loadDB();

  db.progress[userId].transform30 = {
    currentDay: 1,
    startedAt: new Date().toISOString(),
    completedDays: []
  };

  saveDB(db);
  return { success: true };
}
