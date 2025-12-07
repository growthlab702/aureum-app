import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "database.json");

function loadDB() {
  const raw = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(raw);
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Simulação do motor de IA
// (Lasy vai substituir internamente pela IA dela)
async function fakeAIResponse(message) {
  return `Recebi sua mensagem: "${message}".  
Aqui está uma recomendação inicial: mantenha consistência e siga as rotinas do app diariamente.`;
}

// Registrar no histórico
function pushToHistory(userId, role, content) {
  const db = loadDB();

  if (!db.chatHistory[userId]) {
    db.chatHistory[userId] = [];
  }

  db.chatHistory[userId].push({
    id: Date.now(),
    role,
    content,
    timestamp: new Date().toISOString(),
  });

  saveDB(db);
}

// Função principal do chat
export async function chatWithAI(userId, userMessage) {
  if (!userMessage || userMessage.trim() === "") {
    return { error: "Digite alguma coisa." };
  }

  // Salva o que o usuário escreveu
  pushToHistory(userId, "user", userMessage);

  // IA responde
  const aiResponse = await fakeAIResponse(userMessage);

  // Salva resposta no histórico
  pushToHistory(userId, "assistant", aiResponse);

  return { success: true, reply: aiResponse };
}

// Buscar histórico do usuário
export function getChatHistory(userId) {
  const db = loadDB();

  if (!db.chatHistory[userId]) {
    return [];
  }

  return db.chatHistory[userId];
}
