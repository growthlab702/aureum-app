// ========================================
// AUREUM - DATABASE MANAGER
// ========================================

const database = {
    // Nome da chave no localStorage
    DB_KEY: 'db_aureum',
    USER_KEY: 'user',

    // Estrutura inicial do banco
    initialDB: {
        startDate: null,
        diaAtual: 1,
        diasConcluidos: [],
        materialAtual: null,
        library: [
            {
                id: 'dia1',
                titulo: 'Dia 1 - Postura Aristocrática',
                conteudo: `
                    <h2>Postura Aristocrática</h2>
                    <p>A postura é o primeiro cartão de visita de um aristocrata. Não é apenas sobre ficar ereto, mas sobre emanar confiança e presença.</p>
                    
                    <h3>Exercícios do Dia:</h3>
                    <ul>
                        <li>Mantenha os ombros para trás por 5 minutos, 3x ao dia</li>
                        <li>Caminhe 10 minutos com um livro na cabeça</li>
                        <li>Pratique entrar em uma sala como se fosse sua</li>
                    </ul>
                    
                    <h3>Mindset:</h3>
                    <p>"Sua postura comunica seu valor antes mesmo de você falar. Ande como se o mundo fosse seu palco."</p>
                `,
                premium: false,
                imagem: ''
            },
            {
                id: 'dia2',
                titulo: 'Dia 2 - Higiene Facial Avançada',
                conteudo: `
                    <h2>Higiene Facial Avançada</h2>
                    <p>Aristocratas cuidam da pele com a mesma dedicação que cuidam de sua reputação.</p>
                    
                    <h3>Rotina Matinal:</h3>
                    <ul>
                        <li>Limpeza profunda com água morna</li>
                        <li>Esfoliação suave (2-3x por semana)</li>
                        <li>Hidratação adequada ao seu tipo de pele</li>
                        <li>Protetor solar sempre</li>
                    </ul>
                    
                    <h3>Rotina Noturna:</h3>
                    <ul>
                        <li>Remoção completa de impurezas</li>
                        <li>Tônico facial</li>
                        <li>Sérum nutritivo</li>
                        <li>Creme noturno</li>
                    </ul>
                `,
                premium: false,
                imagem: ''
            },
            {
                id: 'p1',
                titulo: 'Segredos da Simetria Facial',
                conteudo: `
                    <h2>Segredos da Simetria Facial</h2>
                    <p>Conteúdo exclusivo para membros premium. Descubra técnicas avançadas de visagismo e harmonização facial.</p>
                    
                    <h3>O que você aprenderá:</h3>
                    <ul>
                        <li>Análise profunda da proporção áurea</li>
                        <li>Técnicas de massagem facial para simetria</li>
                        <li>Exercícios específicos para cada tipo de rosto</li>
                        <li>Segredos de maquiagem corretiva</li>
                    </ul>
                `,
                premium: true,
                imagem: ''
            },
            {
                id: 'p2',
                titulo: 'Protocolo de Transformação Facial',
                conteudo: `
                    <h2>Protocolo de Transformação Facial</h2>
                    <p>O método completo usado por celebridades e pessoas de alto padrão para transformar a aparência facial.</p>
                    
                    <h3>Inclui:</h3>
                    <ul>
                        <li>Plano de 90 dias de exercícios faciais</li>
                        <li>Dieta específica para saúde da pele</li>
                        <li>Suplementação recomendada</li>
                        <li>Técnicas de mewing avançadas</li>
                    </ul>
                `,
                premium: true,
                imagem: ''
            }
        ],
        premium: false
    },

    // Inicializar banco de dados
    init() {
        const db = localStorage.getItem(this.DB_KEY);
        if (!db) {
            this.save(this.initialDB);
        }
    },

    // Obter banco completo
    get() {
        const db = localStorage.getItem(this.DB_KEY);
        return db ? JSON.parse(db) : this.initialDB;
    },

    // Salvar banco completo
    save(data) {
        localStorage.setItem(this.DB_KEY, JSON.stringify(data));
    },

    // Atualizar campo específico
    update(field, value) {
        const db = this.get();
        db[field] = value;
        this.save(db);
    },

    // Resetar banco
    reset() {
        this.save(this.initialDB);
    },

    // ========================================
    // USER MANAGEMENT
    // ========================================

    // Criar usuário
    createUser(nome, email, senha) {
        const user = {
            id: this.generateId(),
            nome,
            email,
            senha: this.hashPassword(senha),
            premium: false,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.init(); // Inicializar banco após criar usuário
        return user;
    },

    // Obter usuário atual
    getUser() {
        const user = localStorage.getItem(this.USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    // Atualizar usuário
    updateUser(updates) {
        const user = this.getUser();
        if (user) {
            const updatedUser = { ...user, ...updates };
            localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        }
        return null;
    },

    // Login
    login(email, senha) {
        const user = this.getUser();
        if (user && user.email === email && user.senha === this.hashPassword(senha)) {
            return user;
        }
        return null;
    },

    // Logout
    logout() {
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.DB_KEY);
    },

    // ========================================
    // PROGRESS MANAGEMENT
    // ========================================

    // Iniciar jornada de 30 dias
    startJourney() {
        this.update('startDate', new Date().toISOString());
        this.update('diaAtual', 1);
        this.update('diasConcluidos', []);
    },

    // Marcar dia como concluído
    completeDay(dia) {
        const db = this.get();
        if (!db.diasConcluidos.includes(dia)) {
            db.diasConcluidos.push(dia);
            if (dia === db.diaAtual && dia < 30) {
                db.diaAtual = dia + 1;
            }
            this.save(db);
        }
    },

    // Obter progresso
    getProgress() {
        const db = this.get();
        return {
            diaAtual: db.diaAtual,
            diasConcluidos: db.diasConcluidos.length,
            porcentagem: Math.round((db.diasConcluidos.length / 30) * 100)
        };
    },

    // ========================================
    // LIBRARY MANAGEMENT
    // ========================================

    // Obter item da biblioteca
    getLibraryItem(id) {
        const db = this.get();
        return db.library.find(item => item.id === id);
    },

    // Obter todos os itens da biblioteca
    getLibrary() {
        const db = this.get();
        return db.library;
    },

    // Filtrar itens premium
    getPremiumItems() {
        return this.getLibrary().filter(item => item.premium);
    },

    // Filtrar itens gratuitos
    getFreeItems() {
        return this.getLibrary().filter(item => !item.premium);
    },

    // ========================================
    // UTILITIES
    // ========================================

    // Gerar ID único
    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // Hash simples de senha (em produção usar bcrypt)
    hashPassword(password) {
        // Implementação simples - em produção usar biblioteca adequada
        return btoa(password);
    }
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = database;
}
