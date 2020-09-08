<template>
  <div class="layout">
    <main class="app">
      <Sidebar />
      <Nuxt class="view"/>
    </main>
    <Header />   
  </div>
</template>

<script>
import Sidebar from "../components/app/Sidebar";
import Header from "../components/app/Header";
export default {
  name: 'default-layout',
   components: {
    Sidebar,
    Header
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.dz-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dz-info {
  display: flex;
  flex-flow: column;
  margin-left: 15px;
  width: 100%;
}
.dz-filename {
  color: #15151A;
  font-size: 16px;
}
.dz-size {
  color: #5D5D66;
  font-size: 14px;
  margin-bottom: 10px;
}
.dz-remove-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #F2F2F5;
  border-radius: 5px;
  width: 40px;
  height: 36px;
  margin-right: 15px;
  margin-bottom: 10px;
}
.dz-remove-custom div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.dz-remove-custom div i {
  font-size: 15px;
}

.dz-remove {
  display: none;
}

</style>
