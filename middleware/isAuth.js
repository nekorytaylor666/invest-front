export default function ({ store, redirect, route }) {
  let token = getCookie('spk-token')
  if (token) {
    if (!store.state.auth.token) {
      store.commit('auth/SET_TOKEN', {token})
    }
    if(route.path === "/login") {
      return redirect({name: 'newproject'});
    }
  }
  if(!token && (route.path !== "/login")) {
    store.commit("auth/SET_TOKEN", "")
    return redirect({name: 'login'});
  }
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
String.prototype.trunc = String.prototype.trunc ||
function(n){
    return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};