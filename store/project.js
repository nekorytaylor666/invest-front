export const state = () => ({
    cardStatus: 1,
    categories: [],
    allProjects: [],
    projectStats: {},
    emplProjectStats: {},
    currentProject: {
        id: 0,
        organization: {
            bin: "",
            regdate: "",
            name: "",
            address: "",
            fio: ""
        },
        offeref_by_position: "",
        employee_count: 0,
        email: "",
        phone_number: "",
        info_sent: {
            site: ""
        },
        status: "",
        description: "",
        rus: "",
        name: "",
        current_ganta_step: {
            responsible: "",
            status: "",
            rus: "",
        },
        user: [
            {
                fio: "",
                role: {
                    name: ""
                }
            }
        ]
    },
    finance: {},
    cost: {},
    gantt: [
        {
            id: 1,
            label: "Идет загрузка...",
            start: new Date().getTime(),
            duration: 3 * 24 * 60 * 60 * 1000,
        }
    ],
    docs: [],
    oldDocs: [],
    notifications: [],
    anketaCreated: ""
})

export const getters = {
    getCategories(state) {
        return state.categories
    },
    getAllProjects(state) {
        return state.allProjects
    },
    getProjectStats(state) {
        return state.projectStats
    },
    getEmplProjectStats(state) {
        return state.emplProjectStats
    },
    getGantt(state) {
        return state.gantt
    },
    getCurrentProject(state) {
        return state.currentProject
    },
    getFinance(state) {
        return state.finance
    },
    getCost(state) {
        return state.cost
    },
    getDocuments(state) {
        return state.docs
    },
    getOldDocuments(state) {
        return state.oldDocs
    },
    getNotifications(state) {
        return state.notifications
    },
    getAnketaCreated(state) {
        return state.anketaCreated
    },
    getCardStatus(state) {
        return state.cardStatus
    }
}

export const mutations = {
    SET_CATEGORIES(state, payload) {
        state.categories = payload
    },
    SET_ALL_PROJECTS(state, payload) {
        state.allProjects = payload
    },
    SET_PROJECTS_STATS(state, payload) {
        state.projectStats = payload
    },
    SET_EMPL_PROJECTS_STATS(state, payload) {
        state.emplProjectStats = payload
    },
    SET_CURRENT_PROJECT(state, payload) {
        state.currentProject = payload.project
        state.finance = payload.finance
        state.cost = payload.cost
    },
    SET_GANTT(state, payload) {
        let ganttArr = []
        payload.gantt.map(p => {
            ganttArr.push({
                id: p.id,
                label: payload.locale === "ru" ? p.rus : payload.locale === "en" ? p.eng : payload.locale === "kz" ? p.kaz : p.rus,
                start: new Date(p.start_date).getTime(),
                duration: parseInt(p.duration_in_days * 24 * 60 * 60 * 1000),
                percent: 100,
                type: p.ganta_parent_id ? "milestone" : "project",
                user: p.status,
                parentId: p.ganta_parent_id ? p.ganta_parent_id : null,
                style: {
                    base: p.is_done ? {
                        fill: "#ECEBED",
                        strokeWidth: "0",  
                    } : {
                        fill: "#FF8900",
                        strokeWidth: "0",  
                    }
                }
            })
        })
        state.gantt = ganttArr
    },
    SET_DOCS(state, payload) {
        state.docs = payload
    },
    SET_OLD_DOCS(state, payload) {
        state.oldDocs = payload
    },
    SET_NOTIFICATIONS(state, payload) {
        state.notifications = payload
    },
    ANKETA_CREATED(state, payload) {
        state.anketaCreated = payload
    },
    SET_CARD_STATUS(state, payload) {
        state.cardStatus = payload
    }
}

 export const actions = {
    async fetchCategories(store, payload) {
        return await this.$axios.get('/v1/categor', {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_CATEGORIES", response.data.info);
            return response.data.info
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async createAnketa(store, payload) {
        return await this.$axios.post('/v1/project', payload, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            if (response.data.rus == "ok") {
                return "success"
            } else {
                return "error"
            }
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async fetchAllProjects(store, payload) {
        let url = ""
        if (store.rootState.auth.user.role_id === 1) {
            url = '/v1/list/projects/all'
        } else {
            url = '/v1/list/projects/own'
        }
        return await this.$axios.get(url, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_ALL_PROJECTS", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async getFullProjects(store, payload) {
        let url = '/v1/list/projects/all'
        return await this.$axios.get(url, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_ALL_PROJECTS", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async fetchEmplsProjects(store, payload) {
        let url = `/v1/list/projects/by_user?user_id=${store.rootState.employees.currentEmployee.id}`
        this.$axios.get(url, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_ALL_PROJECTS", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async fetchExactProject(store, payload) {
        let url = `/v1/project?project_id=${payload.id}`
        this.$axios.get(url, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_CURRENT_PROJECT", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    // async fetchProjectsStats(store, payload) {
    //     this.$axios.get('/v1/project/analysis', {
    //         headers: {
    //             Authorization: `Bearer ${store.rootState.auth.token}`
    //         }
    //     })
    //     .then(function (response) {
    //         store.commit("SET_PROJECTS_STATS", response.data.info);
    //     })
    //     .catch(function (error) {
    //         console.log(error, ">>>>");
    //     })
    // },
    async fetchGantt(store, payload) {
        this.$axios.get(`/v1/ganta/restricted/parents?project_id=${payload.id}`, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_GANTT", {gantt: response.data.info, locale: store.rootState.i18n.locale});
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async fetchDocs(store, payload) {
        this.$axios.get(`/v1/project/docs?project_id=${payload.id}`, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_DOCS", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async fetchOldDocs(store, payload) {
        this.$axios.get(`/v1/project/docs?project_id=${payload.id}&step=1`, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_OLD_DOCS", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async fetchNotifications(store, payload) {
        this.$axios.get(`/v1/notifications?project_id=${payload.id}&offset=0`, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_NOTIFICATIONS", response.data.info);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async sendDocs(store, payload) {
        return await this.$axios.post(`/v1/project/docs/file`, payload, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.dispatch('fetchDocs', {id: store.state.currentProject.id})
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async removeDocs(store, payload) {
        console.log(payload);
        this.$axios.get(`/v1/project/docs/file/delete?project_id=${payload.project_id}&document_id=${payload.id}`, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            console.log("REMOVE DOC RES ", response);
            store.dispatch('fetchDocs', {id: store.state.currentProject.id})
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async createManagerComment(store, payload) {
        return await this.$axios.post(`/v1/spk_comment`, payload, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            console.log("COMMENT RES ", response);
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
            return "error"
        })
    },
    async sendAdminStatus(store, payload) {
        return await this.$axios.post(`/v1/ganta/change/status`, payload, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            console.log("ADMIN RES", response);
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
            return "error"
        })
    },
    async sendBox(store, payload) {
        return await this.$axios.post(`/v1/project/docs/box`, payload, {
            headers: {
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            console.log("BOX RES", response);
            store.dispatch('fetchDocs', {id: store.state.currentProject.id})
            return "success"
        })
        .catch(function (error) {
            console.log(error, ">>>>");
            return "error"
        })
    },
}