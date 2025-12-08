/**
 * AUREUM PREMIUM SYSTEM
 * Sistema oficial de controle de assinatura mensal/anual + desbloqueio interno do app.
 * Versão final, robusta, aristocrática e pronta para produção.
 */

// CHAVES SALVAS NO LOCALSTORAGE
const STORAGE_KEY = "aureum_premium_status";
const PLAN_KEY = "aureum_selected_plan";       // qual plano o usuário clicou (mensal ou anual)
const CHECKOUT_M_KEY = "aureum_checkout_monthly";
const CHECKOUT_Y_KEY = "aureum_checkout_yearly";

/* ============================================================
   SALVAR / LER ESTADO DO PREMIUM
============================================================ */

export function isPremium() {
  const status = localStorage.getItem(STORAGE_KEY);
  return status === "true";
}

export function unlockPremium() {
  localStorage.setItem(STORAGE_KEY, "true");
}

export function clearPremium() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ============================================================
   LINKS DE CHECKOUT CONFIGURADOS
   (VOCÊ VAI COLAR OS LINKS AQUI QUANDO CRIAR NO KIRVANO)
============================================================ */

export function setCheckoutMonthly(url) {
  localStorage.setItem(CHECKOUT_M_KEY, url);
}

export function setCheckoutAnnual(url) {
  localStorage.setItem(CHECKOUT_Y_KEY, url);
}

export function getCheckoutURL(plan) {
  if (plan === "monthly") {
    return localStorage.getItem(CHECKOUT_M_KEY);
  }
  if (plan === "annual") {
    return localStorage.getItem(CHECKOUT_Y_KEY);
  }
  return null;
}

/* ============================================================
   SALVAR QUAL PLANO O USUÁRIO CLICOU
============================================================ */

export function setCheckoutPlan(plan) {
  localStorage.setItem(PLAN_KEY, plan);
}

export function getCheckoutPlan() {
  return localStorage.getItem(PLAN_KEY);
}

/* ============================================================
   PARA DEBUG / GARANTIR QUE TUDO FUNCIONA
============================================================ */

export function resetPremiumSystem() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PLAN_KEY);
  localStorage.removeItem(CHECKOUT_M_KEY);
  localStorage.removeItem(CHECKOUT_Y_KEY);
}
