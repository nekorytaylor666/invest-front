export default function ({isHMR, app, store, route, params, error, redirect}) {
    const defaultLocale = app.i18n.fallbackLocale
    if (isHMR) return
    const locale = route.query.lang || defaultLocale
    if (store.state.i18n.locales.indexOf(locale) === -1) {
      return error ({message: 'This page could not be found', statusCode: 404})
    }
    store.commit('i18n/SET_LANG', locale)
    app.i18n.locale = store.state.i18n.locale
}