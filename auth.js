// AUTH.JS – Sistema de Login e Autenticação do AUREUM
import { DB, createUser, getUser, updateUser } from "./database.js";

// ============================================================
// SISTEMA DE CADASTRO
// ============================================================

export function registerUser(formData) {
    // Verificação básica
    if (!formData.name || !formData.email || !formData.gender) {
        return { error: true, message: "Preencha todos os campos obrigatórios." };
    }

    // Confere se já existe usuário
    const existing = getUser();
    if (existing) {
        return { error: true, message: "Você já possui uma conta cadastrada." };
    }

    const newUser = createUser(formData);

    return {
        error: false,
        message: "Cadastro realizado com sucesso!",
        user: newUser
    };
}

// ============================================================
// SISTEMA DE LOGIN
// ============================================================

export function loginUser(email) {
    const user = getUser();

    if (!user) {
        return { error: true, message: "Nenhuma conta encontrada. Registre-se primeiro." };
    }

    if (email !== user.email) {
        return { error: true, message: "E-mail incorreto." };
    }

    // Marcamos o usuário como "logado"
    DB.save("AUREUM_SESSION", { logged: true });

    return {
        error: false,
        message: "Login realizado com sucesso.",
        user
    };
}

// ============================================================
// SISTEMA DE SESSÃO
// ============================================================

export function isLoggedIn() {
    const session = DB.get("AUREUM_SESSION");
    return session?.logged === true;
}

export function logout() {
    DB.remove("AUREUM_SESSION");
}

// ============================================================
// PROTEÇÃO DE ROTAS
// ============================================================

export function protectRoute() {
    if (!isLoggedIn()) {
        window.location.href = "/login.html";  
    }
}

// ============================================================
// REDIRECIONAMENTO APÓS CADASTRO
// ============================================================

export function redirectAfterRegister() {
    window.location.href = "/onboarding.html";
}

export function redirectAfterLogin() {
    window.location.href = "/dashboa


import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "database.json");

// Lê o DB
function loadDB() {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

// Salva no DB
function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Criar usuário
export function createUser(name, email, password) {
  const db = loadDB();

  const exists = db.users.find((u) => u.email === email);
  if (exists) {
    return { error: "Email já cadastrado" };
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  saveDB(db);

  return { success: true, user: newUser };
}

// Login
export function login(email, password) {
  const db = loadDB();

  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { error: "Credenciais inválidas" };
  }

  const session = {
    token: `${user.id}-${Date.now()}`,
    userId: user.id,
  };

  db.sessions.push(session);
  saveDB(db);

  return { success: true, session };
}

// Logout
export function logout(token) {
  const db = loadDB();

  db.sessions = db.sessions.filter((s) => s.token !== token);

  saveDB(db);
  return { success: true };
}

// Verifica sessão
export function getUserByToken(token) {
  const db = loadDB();

  const session = db.sessions.find((s) => s.token === token);
  if (!session) return null;

  return db.users.find((u) => u.id === session.userId);
}
