export default function ({ store, redirect, route }) {
  let token = localStorage.getItem('token')
  if (token) {
    if (!store.state.auth.token) {
      store.commit('auth/SET_TOKEN', token)
    }
    if (!store.state.auth.user.fio) {
      let user = JSON.parse(localStorage.getItem("user"))
      store.commit('auth/SET_USER', user)
    }
    if (store.state.auth.user.role.name === "investor") {
      if(route.path === "/login") {
        return redirect({name: 'newproject'});
      }
      if(route.path == "/") {
        return redirect({name: 'newproject'});
      }
    }
    if (store.state.auth.user.role.name === "admin" || store.state.auth.user.role.name === "manager" || store.state.auth.user.role.name === "expert") {
      if(route.path === "/login") {
        return redirect({name: 'projects'});
      }
      if(route.path == "/") {
        return redirect({name: 'projects'});
      }
    }
  }
  if(!token && (route.path !== "/login" && route.path !== "/reset")) {
    store.commit("auth/SET_TOKEN", "")
    return redirect({name: 'login'});
  }
}