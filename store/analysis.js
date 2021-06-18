export const state = () => ({
    table: [],
    pie_chart: {
        count: {
            construction: 0,
            yrh: 0,
            production: 0,
            agriculture: 0,
            services: 0
        },
        investment: {
            construction: 0,
            yrh: 0,
            production: 0,
            agriculture: 0,
            services: 0
        },
        employee_count: {
            construction: 0,
            yrh: 0,
            production: 0,
            agriculture: 0,
            services: 0
        },
        tax: {
            construction: 0,
            yrh: 0,
            production: 0,
            agriculture: 0,
            services: 0
        },
    },
})

export const getters = {
    getTable(state) {
        return state.table
    },
    getPieChart(state) {
        return state.pie_chart
    }
}

export const mutations = {
    SET_TABLE(state, payload) {
        state.table = payload
    },
    SET_PIE_CHART(state, payload) {
        state.pie_chart = payload
    }
}

export const actions = {
    async fecthAnalysis(store, payload) {
        return await this.$axios.post(`/v1/analysis`, payload, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            store.commit("SET_TABLE", response.data.info)
            store.commit("SET_PIE_CHART", response.data.pie_chart)
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    },
    async downloadFile(store, payload) {
        this.$axios.post(`/v1/analysis/file`, payload, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${store.rootState.auth.token}`
            }
        })
        .then(function (response) {
            window.open(`http://178.170.221.116:7000${response.data.info}`);
        })
        .catch(function (error) {
            console.log(error, ">>>>");
        })
    }
}