import Vue from 'vue'
import App from './App.vue'
import router from './route'
import toast from './toast'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false

new Vue({
  router,
  toast,
  BootstrapVue,
  IconsPlugin,
  render: h => h(App),
}).$mount('#app')
