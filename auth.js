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
