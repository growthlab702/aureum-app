// ui.js — Controle de Interface do AUREUM

import { 
    getUser, 
    getUserPhoto, 
    getDayProgress, 
    advanceDay 
} from "./database.js";

import { 
    isLoggedIn, 
    logout, 
    protectRoute 
} from "./auth.js";

// ============================================
// CARREGAMENTO DE ELEMENTOS COM SEGURANÇA
// ============================================

function safeSelect(selector) {
    const el = document.querySelector(selector);
    return el ? el : null;
}

// ============================================
// CARREGAR DADOS DO USUÁRIO NO UI
// ============================================

export function renderUserData() {
    const user = getUser();
    if (!user) return;

    const nameEl = safeSelect("#userName");
    const dayEl = safeSelect("#userDay");
    const photoEl = safeSelect("#userPhoto");

    if (nameEl) nameEl.textContent = user.name;
    if (dayEl) dayEl.textContent = user.dayProgress || 1;

    if (photoEl) {
        const photo = getUserPhoto();
        photoEl.src = photo || "./assets/default-avatar.png";
    }
}

// ============================================
// AVANÇAR DIA DO PROGRAMA
// ============================================

export function handleAdvanceDay() {
    const newDay = advanceDay();
    const dayEl = safeSelect("#userDay");

    if (dayEl) dayEl.textContent = newDay;

    showMessage(`Dia ${newDay} desbloqueado! Continue avançando.`, "success");
}

// ============================================
// SISTEMA DE ALERTAS BONITOS
// ============================================

export function showMessage(text, type = "info") {
    const box = safeSelect("#alertBox");

    if (!box) {
        alert(text); // fallback
        return;
    }

    box.textContent = text;

    box.className = "";  
    box.classList.add("alert-message", `alert-${type}`);

    box.style.opacity = 1;

    setTimeout(() => {
        box.style.opacity = 0;
    }, 2500);
}

// ============================================
// BOTÃO DE LOGOUT
// ============================================

export function setupLogoutButton() {
    const btn = safeSelect("#logoutBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        logout();
        window.location.href = "/login.html";
    });
}

// ============================================
// PROTEGER ROTAS AUTOMATICAMENTE
// ============================================

export function initProtectedPage() {
    protectRoute();
    renderUserData();
}

// ============================================
// NAVEGAÇÃO
// ============================================

export function goTo(page) {
    window.location.href = page;
}
