// CONFIGURAÇÕES GERAIS DO APP AUREUM

// Aqui você futura e facilmente adiciona:
// - chave de API
// - endpoints externos
// - modos de produção e desenvolvimento
// - variáveis de ambiente para IA

const APP_CONFIG = {
    version: "1.0.0",
    environment: "development",  // altere para "production" quando publicar
    enableLogs: true,

    // 🔧 Endpoints futuros:
    endpoints: {
        aiChat: "/api/chat",
        userUpload: "/api/upload",
        analyzeFace: "/api/face",
        userRegister: "/api/register"
    },

    // 🔐 Chaves (por enquanto deixamos vazias)
    keys: {
        openai: "",
        firebase: "",
        aws: ""
    }
};

// Ativa logs se estiver em modo desenvolvimento
function aureumLog(message) {
    if (APP_CONFIG.enableLogs) {
        console.log("[AUREUM LOG] " + message);
    }
}

aureumLog("Configurações carregadas com sucesso.");


export async function loadConfigJSON() {
    const response = await fetch("./config/config.json");
    return await response.json();
}

