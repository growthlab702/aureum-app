import { isPremium } from "./premiumManager.js";

export function updatePremiumUI() {
  const premium = isPremium();

  // Elementos com atributo data-premium só aparecem se for premium
  document.querySelectorAll("[data-premium]").forEach(el => {
    el.style.display = premium ? "block" : "none";
  });

  // Elementos com data-free só aparecem se NÃO for premium
  document.querySelectorAll("[data-free]").forEach(el => {
    el.style.display = premium ? "none" : "block";
  });

  // Elementos bloqueados (ex: conteúdo premium)
  document.querySelectorAll("[data-locked]").forEach(el => {
    if (premium) {
      el.classList.remove("locked");
      el.removeAttribute("data-locked");
    } else {
      el.classList.add("locked");
    }
  });
}
