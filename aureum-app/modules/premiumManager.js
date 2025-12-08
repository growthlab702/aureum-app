// ========================================
// AUREUM - PREMIUM MANAGER
// ========================================

const premiumManager = {
    // Chaves do localStorage
    PREMIUM_STATUS_KEY: 'aureum_premium_status',
    SELECTED_PLAN_KEY: 'aureum_selected_plan',
    CHECKOUT_MONTHLY_KEY: 'aureum_checkout_monthly',
    CHECKOUT_YEARLY_KEY: 'aureum_checkout_yearly',

    // URLs de checkout (configurar com Kirvano)
    checkoutURLs: {
        monthly: '', // Adicionar URL do checkout mensal
        yearly: ''   // Adicionar URL do checkout anual
    },

    // ========================================
    // PLAN MANAGEMENT
    // ========================================

    // Definir plano selecionado
    setCheckoutPlan(plan) {
        if (plan !== 'monthly' && plan !== 'yearly') {
            console.error('Plano inválido. Use "monthly" ou "yearly"');
            return false;
        }
        localStorage.setItem(this.SELECTED_PLAN_KEY, plan);
        return true;
    },

    // Obter plano selecionado
    getCheckoutPlan() {
        return localStorage.getItem(this.SELECTED_PLAN_KEY) || null;
    },

    // ========================================
    // CHECKOUT URLs
    // ========================================

    // Configurar URL de checkout mensal
    setCheckoutMonthly(url) {
        localStorage.setItem(this.CHECKOUT_MONTHLY_KEY, url);
        this.checkoutURLs.monthly = url;
    },

    // Configurar URL de checkout anual
    setCheckoutAnnual(url) {
        localStorage.setItem(this.CHECKOUT_YEARLY_KEY, url);
        this.checkoutURLs.yearly = url;
    },

    // Obter URL de checkout baseado no plano
    getCheckoutURL(plan) {
        if (plan === 'monthly') {
            return localStorage.getItem(this.CHECKOUT_MONTHLY_KEY) || this.checkoutURLs.monthly;
        } else if (plan === 'yearly') {
            return localStorage.getItem(this.CHECKOUT_YEARLY_KEY) || this.checkoutURLs.yearly;
        }
        return null;
    },

    // ========================================
    // PREMIUM STATUS
    // ========================================

    // Verificar se usuário é premium
    isPremium() {
        const status = localStorage.getItem(this.PREMIUM_STATUS_KEY);
        return status === 'true';
    },

    // Desbloquear premium
    unlockPremium() {
        localStorage.setItem(this.PREMIUM_STATUS_KEY, 'true');
        
        // Atualizar no banco de dados
        if (typeof database !== 'undefined') {
            database.update('premium', true);
            const user = database.getUser();
            if (user) {
                database.updateUser({ premium: true });
            }
        }
        
        return true;
    },

    // Remover premium (para testes/debug)
    removePremium() {
        localStorage.setItem(this.PREMIUM_STATUS_KEY, 'false');
        
        if (typeof database !== 'undefined') {
            database.update('premium', false);
            const user = database.getUser();
            if (user) {
                database.updateUser({ premium: false });
            }
        }
        
        return true;
    },

    // ========================================
    // CONTENT ACCESS
    // ========================================

    // Verificar se pode acessar conteúdo premium
    canAccessPremium(contentId) {
        if (this.isPremium()) {
            return true;
        }
        
        // Verificar se o conteúdo é premium
        if (typeof database !== 'undefined') {
            const item = database.getLibraryItem(contentId);
            return item ? !item.premium : false;
        }
        
        return false;
    },

    // Obter mensagem de bloqueio
    getBlockMessage() {
        return {
            title: 'Conteúdo Premium',
            message: 'Este conteúdo é exclusivo para membros premium. Desbloqueie agora e tenha acesso completo à transformação.',
            cta: 'Desbloquear Premium'
        };
    },

    // ========================================
    // UTILITIES
    // ========================================

    // Resetar sistema premium (debug)
    resetPremiumSystem() {
        localStorage.removeItem(this.PREMIUM_STATUS_KEY);
        localStorage.removeItem(this.SELECTED_PLAN_KEY);
        console.log('Sistema premium resetado');
    },

    // Obter informações do plano
    getPlanInfo(plan) {
        const plans = {
            monthly: {
                name: 'Plano Mensal',
                price: 'R$ 97',
                period: '/mês',
                features: [
                    'Acesso completo à biblioteca',
                    'Análise facial avançada',
                    'Protocolo de 30 dias',
                    'Conteúdos exclusivos',
                    'Suporte prioritário'
                ]
            },
            yearly: {
                name: 'Plano Anual',
                price: 'R$ 697',
                period: '/ano',
                savings: 'Economize R$ 467',
                features: [
                    'Tudo do plano mensal',
                    '40% de desconto',
                    'Bônus exclusivos',
                    'Atualizações vitalícias',
                    'Comunidade VIP'
                ],
                badge: 'MELHOR OFERTA'
            }
        };
        
        return plans[plan] || null;
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = premiumManager;
}
