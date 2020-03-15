export default {
  options: {},
  modifiedFlag: '',
  isModified(el) {
    return el.getAttribute(this.modifiedFlag)
  },
  deepModifyClass(el) {
    let classVal = ''
    if(!this.isModified(el)) {
      el.setAttribute(this.modifiedFlag, true)
      el.classList.forEach(className => {
        classVal += `prefix-${className} `
      })
      el.setAttribute('class', classVal)
    }
    // into children
    for (let i = 0; i < el.children.length; i+=1) {
      const child = el.children[i]
      this.deepModifyClass(child)
    }
  },
  install(Vue, options) {
    const plugin = this
    plugin.options = options
    plugin.modifiedFlag = `${this.options.prefix}modify-done`
    Vue.mixin(
      {
        mounted() {
          const el = this.$el
          plugin.deepModifyClass(el)
          console.log(this)
        },
        beforeUpdate() {
        },
        updated() {
          const el = this.$el
          plugin.deepModifyClass(el)
        }
      }
    )
  }
}
