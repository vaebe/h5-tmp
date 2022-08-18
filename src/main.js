import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'

import Vant from 'vant'
import 'vant/lib/index.css'

import '@/assets/css/reset.css'
import '@/assets/css/resetVantStyle.scss'

require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
