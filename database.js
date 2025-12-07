// SISTEMA DE "BANCO DE DADOS" LOCAL – AUREUM
// Usando localStorage para simular um backend funcional e sem bugs.

export const DB = {
    // Salvar dados no banco
    save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
        }
    },

    // Buscar dados
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            return null;
        }
    },

    // Remover dado
    remove(key) {
        localStorage.removeItem(key);
    }
};

// ===============================
// SISTEMA DE USUÁRIO
// ===============================

export function createUser(data) {
    const user = {
        name: data.name || "",
        email: data.email || "",
        age: data.age || "",
        gender: data.gender || "",
        goal: data.goal || "",
        createdAt: Date.now(),
        dayProgress: 1, // Começa SEMPRE no dia 1
        photo: "",
        premium: false
    };

    DB.save("AUREUM_USER", user);
    return user;
}

export function getUser() {
    return DB.get("AUREUM_USER");
}

export function updateUser(updates) {
    const user = getUser();
    if (!user) return;

    const newUser = { ...user, ...updates };
    DB.save("AUREUM_USER", newUser);
}

export function logoutUser() {
    DB.remove("AUREUM_USER");
}

// ===============================
// PROGRESSO DO PROGRAMA DE 30 DIAS
// ===============================

export function getDayProgress() {
    const user = getUser();
    return user?.dayProgress || 1;
}

export function advanceDay() {
    const user = getUser();
    if (!user) return;

    const nextDay = Math.min(user.dayProgress + 1, 30);
    updateUser({ dayProgress: nextDay });

    return nextDay;
}

export function resetProgress() {
    const user = getUser();
    if (user) updateUser({ dayProgress: 1 });
}

// ===============================
// FOTO DE PERFIL
// ===============================

export function saveUserPhoto(base64) {
    updateUser({ photo: base64 });
}

export function getUserPhoto() {
    const user = getUser();
    return user?.photo || "";
}
