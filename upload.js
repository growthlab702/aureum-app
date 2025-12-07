import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "database.json");
const uploadsFolder = path.join(process.cwd(), "uploads");

// Cria pasta de uploads caso não exista
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);
}

function loadDB() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Função principal de upload
export function saveUpload(userId, file) {
  if (!file || !file.name || !file.data) {
    return { error: "Arquivo inválido." };
  }

  const ext = file.name.split(".").pop().toLowerCase();

  const allowed = ["jpg", "jpeg", "png", "webp"];

  if (!allowed.includes(ext)) {
    return { error: "Formato não suportado. Use JPG, PNG ou WEBP." };
  }

  const fileName = `${userId}-${Date.now()}.${ext}`;
  const filePath = path.join(uploadsFolder, fileName);

  // Salva arquivo fisicamente
  fs.writeFileSync(filePath, file.data);

  // Registra no banco
  const db = loadDB();
  const newUpload = {
    id: Date.now(),
    userId,
    fileName,
    url: `/uploads/${fileName}`,
    createdAt: new Date().toISOString(),
  };

  db.uploads.push(newUpload);
  saveDB(db);

  return { success: true, upload: newUpload };
}
