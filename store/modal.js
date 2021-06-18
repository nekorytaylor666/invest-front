export const state = () => ({
    showModal: false
})

export const getters = {
    getModalStatus(state) {
        return state.showModal
    }
}

export const mutations = {
    SET_MODAL(state, payload) {
        state.showModal = payload
    }
}