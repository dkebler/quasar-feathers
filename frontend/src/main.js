// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
Vue.use(Quasar) // Install Quasar Framework

import { sync } from 'vuex-router-sync'

import router from './router'
import store from './store'

sync(store, router) // done.

store.commit('increment')
console.log(store.state.count) // -> 1

// Required IE 11 polyfill
// import 'babel-polyfill'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    data: {
      appName: '645 Lighting'
    },
    router,
    el: '#q-app',
    render: h => h(require('./App'))
  })
})
