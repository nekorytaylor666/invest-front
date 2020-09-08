export const state = () => ({
    token: "",
    user: {}
})

export const getters = {
    isAuth(state) {
        return state.token
    },
    getToken(state) {
        return state.token
    }
}

export const mutations = {
    SET_TOKEN(state, payload) {
        state.token = payload.token
        state.expiredAt = payload.expired_at
    },
    SET_USER(state, payload) {
        state.user = payload
    }
}

 export const actions = {
    async authenticate(store, payload) {
        this.$axios.post('/v1/all/signin', {
            "username": payload.bin,
            "password": payload.pwd,
            "role": "investor",
            "key": "username"
        })
        .then(function (response) {
            store.commit("SET_TOKEN", response.data.token);
            let expiredAt = new Date(Date.now() + 86400e3);
            expiredAt = expiredAt.toUTCString();
            document.cookie = `spk-token=${response.data.token};expires=${expiredAt}`
            $nuxt.$router.push("/newproject");
        })
        .catch(function (error) {
            // handle error
            console.log(error, ">>>>");
        })
    },
}