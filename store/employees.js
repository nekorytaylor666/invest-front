export const state = () => ({
    allEmployees: [],
    roles: [],
    currentEmployee: {},
    userCreated: ""
})

export const getters = {
    getAllEmployees(state) {
        return state.allEmployees
    },
    getRoles(state) {
        return state.roles
    },
    getCurrentEmployee(state) {
        return state.currentEmployee
    },
    getUserCreated(state) {
        console.log("OLOLOL ", state.userCreated);
        return state.userCreated
    }
}

export const mutations = {
    SET_ALL_EMPLOYEES(state, payload) {
        state.allEmployees = payload
    },
    SET_ROLES(state, payload) {
        state.roles = payload
    },
    SET_CURRENT_EMPLOYEE(state, payload) {
        state.currentEmployee = payload
    },
    UPDATE_CURRENT_USER(state, payload) {
        state.currentEmployee = {
            ...state.currentEmployee,
            ...payload
        }
    },
    USER_CREATED(state, payload) {
        state.userCreated = payload
    }
}

 export const actions = {
    async fetchAllEmployees(store, payload) {
        this.$axios.get('/v1/user?offset=0&role=manager', {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_ALL_EMPLOYEES", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async fetchRoles(store, payload) {
        this.$axios.get('/v1/role', {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_ROLES", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async createEmployee(store, payload) {
        return await this.$axios.post('/v1/user', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.dispatch('fetchAllEmployees')
            return "success"
        })
        .catch(function (error) {
            return "error"
        })
    },
    async fetchProfile(store, payload) {
        this.$axios.get('/v1/profile/own', {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("auth/SET_USER", response.data.info, { root: true });
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async updateProfile(store, payload) {
        return await this.$axios.put('/v1/profile/own', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.dispatch('fetchProfile')
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
            return "error"
        })
    },
    async updateEmployee(store, payload) {
        this.$axios.put('/v1/profile/other', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            location.reload()
            store.commit("UPDATE_CURRENT_USER", payload);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async updateProfilePwd(store, payload) {
        return await this.$axios.put('/v1/profile/password/own', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.dispatch('fetchProfile')
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
            return "error"
        })
    },
    async updateEmployeePwd(store, payload) {
        this.$axios.put('/v1/profile/password/other', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            location.reload()
            store.commit("UPDATE_CURRENT_USER", payload);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async sendAssign(store, payload) {
        return await this.$axios.post('/v1/assign', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
            return "error"
        })
    },
    async changeStepAfterUser(store, payload) {
        this.$axios.post('/v1/ganta/change/status', JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            console.log("Next step");
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    }
}