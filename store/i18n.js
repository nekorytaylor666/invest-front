export const state = () => ({
    locales: ['en', 'ru', 'kz'],
    locale: 'ru',
});

export const getters = {
    getLocale(state) {
        return state.locale
    }
}

export const mutations = {
    SET_LANG (state, locale) {
        state.locale = locale;
    },
};