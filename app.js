const messagesContainer = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Função para adicionar mensagem no chat
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    messagesContainer.appendChild(msg);

    // Scroll sempre no final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Função de resposta do bot (simples)
function botReply(userText) {
    // Aqui você pode colocar uma lógica mais avançada ou conectar com IA externa
    let response = "Entendi! Mas ainda não tenho uma resposta avançada programada 😅";

    if (userText.toLowerCase().includes("oi") || userText.toLowerCase().includes("olá")) {
        response = "Olá! Como posso te ajudar hoje?";
    }

    if (userText.toLowerCase().includes("aureum")) {
        response = "AUREUM é seu assistente personalizado. O que deseja saber?";
    }

    addMessage(response, "bot");
}

// Enviar mensagem
sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    // Mensagem do usuário
    addMessage(text, "user");

    // Resposta automática
    setTimeout(() => {
        botReply(text);
    }, 500);

    input.value = "";
});

// Permitir enviar com Enter
input.addEventListener("keydown", (event) => {
