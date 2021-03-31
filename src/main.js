import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import sui_app from './components/sui-app'
import sui_sticky from './components/sui-sticky'
import Skateui from "./plugins/skateui.js"

Vue.use(Skateui);

Vue.config.productionTip = false

Vue.component('sui-app',sui_app);
Vue.component('sui-sticky',sui_sticky);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
