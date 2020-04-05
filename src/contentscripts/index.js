import Vue from 'vue'
import App from './App.vue'
import '../lib/vueDevTool'

import inject from '../lib/inject'

import 'element-ui/lib/theme-chalk/fonts/element-icons.woff'
import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'

const sideBox = document.createElement('div')
sideBox.setAttribute('id', 'plain-side')
document.getElementsByTagName("body")[0].appendChild(sideBox)


const fontIconStyle = document.createElement('style')
fontIconStyle.setAttribute('type', 'text/css')
fontIconStyle.innerText = `@font-face{font-family:element-icons;src:url(${ chrome.extension.getURL('element-icons.woff')
}) format("woff"),url(${ chrome.extension.getURL('element-icons.ttf') }) format("truetype");font-weight:400;font-display:"auto";font-style:normal;}`
document.head.appendChild(fontIconStyle)

if (process.env.NODE_ENV === 'production') {
  inject.injectCustomCss('contentScripts.css')
}


new Vue({
  el: sideBox,
  render: h => h(App)
})
