export default {
    namespaced: true, // Ajoutez cette ligne
    state: {
        currentPassword: null,
    },
    mutations: {
        setCurrentPassword(state, password) {
            state.currentPassword = password;
        },
    },
    actions: {
        updatePassword({ commit }, password) {
            commit("setCurrentPassword", password);
        },
    },
};