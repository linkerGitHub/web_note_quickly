import Vue from 'vue'
import 'bulma-fluent/bulma.sass'

import '../lib/vueDevTool'

import 'element-ui/lib/theme-chalk/fonts/element-icons.woff'
import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'

import App from './App.vue'

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App),
})
