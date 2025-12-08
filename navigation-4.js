// ========================================
// AUREUM - NAVIGATION SYSTEM
// ========================================

const navigation = {
    // Rotas disponíveis
    routes: {
        onboarding: './screens/onboarding.html',
        cadastro: './screens/cadastro.html',
        cadastroFinal: './screens/cadastro-final.html',
        login: './screens/login.html',
        home: './screens/home.html',
        analise: './screens/analise.html',
        biblioteca: './screens/biblioteca.html',
        libraryItem: './screens/library-item.html',
        premiumContent: './screens/premium-content.html',
        premium: './screens/premium.html',
        paymentRedirect: './screens/payment_redirect.html',
        success: './screens/success.html',
        progresso: './screens/progresso.html',
        dia: './screens/dia.html',
        diaAtual: './screens/dia-atual.html',
        transformacao30: './screens/transformacao30.html',
        uploadFoto: './screens/upload-foto.html',
        perfil: './screens/perfil.html',
        config: './screens/config.html'
    },

    // Navegar para uma página
    goTo(page, params = {}) {
        const route = this.routes[page];
        if (!route) {
            console.error(`Rota não encontrada: ${page}`);
            return;
        }

        // Salvar parâmetros no sessionStorage
        if (Object.keys(params).length > 0) {
            sessionStorage.setItem('navParams', JSON.stringify(params));
        }

        // Redirecionar
        window.location.href = route;
    },

    // Obter parâmetros da navegação
    getParams() {
        const params = sessionStorage.getItem('navParams');
        if (params) {
            sessionStorage.removeItem('navParams');
            return JSON.parse(params);
        }
        return {};
    },

    // Verificar se usuário está logado
    requireLogin() {
        const user = localStorage.getItem('user');
        if (!user) {
            this.goTo('login');
            return false;
        }
        return true;
    },

    // Voltar para página anterior
    goBack() {
        window.history.back();
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = navigation;
}
