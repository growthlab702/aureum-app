/**
 * NAVIGATION CORE
 * Sistema de navegação estável para apps feitos na Lasy.
 * Evita telas brancas, loops e quebras de rota.
 */

// Todas as rotas registradas aqui:
const routes = {
  onboarding: "/screens/onboarding.html",
  cadastro: "/screens/cadastro.html",
  login: "/screens/login.html",
  home: "/screens/home.html",
  biblioteca: "/screens/library.html",
  bibliotecaItem: "/screens/library-item.html",
  chat: "/screens/chat.html",
  transformacao: "/screens/30dias.html",
  analise: "/screens/analise.html",
  upload: "/screens/upload.html",
  perfil: "/screens/perfil.html",
  success: "/screens/success.html",
};

// Guardar rota atual para evitar loops
let currentPage = null;

// Função principal de navegação
export function goTo(page, params = {}) {
  if (!routes[page]) {
    console.error("Rota inválida:", page);
    return;
  }

  const target = routes[page];

  // Evitar reloads desnecessários
  if (currentPage === target) return;

  let url = target;

  // Adiciona query params
  if (Object.keys(params).length > 0) {
    const q = new URLSearchParams(params).toString();
    url += "?" + q;
  }

  window.location.href = url;
  currentPage = url;
}

// Função para ler parâmetros da URL
export function getParams() {
  const params = new URLSearchParams(window.location.search);
  const obj = {};

  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }

  return obj;
}

// Proteção de páginas privadas
export function requireLogin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    goTo("login");
    return null;
  }

  return user;
}

// Navegação segura após login/cadastro
export function authSuccessRedirect() {
  goTo("home");
}
