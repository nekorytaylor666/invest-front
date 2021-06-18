export const state = () => ({
    token: "",
    user: {},
    company: {},
    activeMenu: null,
    secretCode: ""
})

export const getters = {
    isAuth(state) {
        return state.token
    },
    getToken(state) {
        return state.token
    },
    getUserInfo(state) {
        return state.user
    },
    getCompany(state) {
        return state.company
    },
    getActiveMenu(state) {
        return state.activeMenu
    },
    getSecretCode(state) {
        return state.secretCode
    }
}

export const mutations = {
    SET_TOKEN(state, payload) {
        state.token = payload
    },
    SET_USER(state, payload) {
        state.user = payload
        localStorage.setItem("user", JSON.stringify(payload));
    },
    SET_COMPANY_DATA(state, payload) {
        state.company = payload
    },
    SET_ACTIVE_MENU(state, payload) {
        state.activeMenu = payload
    },
    SET_SECRET_CODE(state, payload) {
        state.secretCode = payload
    }
}

 export const actions = {
    async fecthDataByBin(store, payload) {
        this.$axios.get(`/v1/all/organization?bin=${payload}`)
        .then(function (response) {
            if (response.data.rus === "ok") {
                store.commit("SET_COMPANY_DATA", response.data.info);
            }
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async authenticate(store, payload) {
        return await this.$axios.post('/v1/signin', {
            "value": payload.key === "phone" ? `+7${payload.bin}` : payload.bin,
            "password": payload.pwd,
            "key": payload.key
        })
        .then(function (response) {
            store.commit("SET_TOKEN", response.data.token);
            store.commit("SET_USER", response.data.info);
            localStorage.setItem("token", response.data.token)
            if (response.data.info.role.name === "investor") {
                $nuxt.$router.push(`/newproject?lang=${store.rootState.i18n.locale}`);
            }
            if (response.data.info.role.name === "admin") {
                $nuxt.$router.push(`/projects?lang=${store.rootState.i18n.locale}`);
            }
            if (response.data.info.role.name === "manager" || response.data.info.role.name === "expert") {
                $nuxt.$router.push(`/projects?lang=${store.rootState.i18n.locale}`);
            }
        })
        .catch(function (error) {
            let msg = {}
            if (store.rootState.i18n.locale === "ru") {
                msg = {text: error.response.data.rus, error: error.response.data.error};
            } else if (store.rootState.i18n.locale === "kz") {
                msg = {text: error.response.data.kaz, error: error.response.data.error};
            } else {
                msg = {text: error.response.data.eng, error: error.response.data.error};
            }
            return msg
        })
    },
    logout(store){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        store.commit("SET_TOKEN", "");
        store.commit("SET_USER", {});
        $nuxt.$router.push(`/login?${store.rootState.i18n.locale}`)
    },
    async getEmailCode(store, payload) {
        return await this.$axios.get(`/v1/reset_password?email=${payload}`)
        .then(function (response) {
            return "success"
        })
        .catch(function (error) {
            let msg = ""
            if (store.rootState.i18n.locale === "ru") {
                msg = error.response.data.rus;
            } else if (store.rootState.i18n.locale === "kz") {
                msg = error.response.data.kaz
            } else {
                msg = error.response.data.eng
            }
            return msg
        })
    },
    async sendNewPwd(store, payload) {
        return await this.$axios.post(`/v1/reset_password`, {
            "new_password": payload.password,
            "email_address": payload.email,
            "code": payload.code,
        })
        .then(function (response) {
            console.log(response.data.info);
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
}