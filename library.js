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

// Adicionar item na biblioteca
export function addLibraryItem({ title, content, category, imageUrl = null, videoUrl = null, premium = false }) {
  const db = loadDB();

  const newItem = {
    id: Date.now(),
    title,
    content,
    category, // skincare, postura, cabelo, estilo, etc
    imageUrl,
    videoUrl,
    premium,
    createdAt: new Date().toISOString()
  };

  db.library.push(newItem);
  saveDB(db);

  return { success: true, item: newItem };
}

// Listar tudo (respeitando plano)
export function getLibrary(user) {
  const db = loadDB();

  if (!user) {
    return db.library.filter(item => !item.premium);
  }

  if (user.plan === "premium") {
    return db.library;
  }

  return db.library.filter(item => !item.premium);
}

// Pegar item específico
export function getLibraryItem(id, user) {
  const db = loadDB();
  const item = db.library.find((i) => i.id === Number(id));

  if (!item) return null;

  if (item.premium && (!user || user.plan !== "premium")) {
    return { error: "Conteúdo Premium. Faça upgrade para acessar." };
  }

  return item;
}
