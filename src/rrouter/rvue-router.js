let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    const initial = window.location.hash.slice(1) || '/';
    Vue.util.defineReact(this, 'current', initial);

    // window.addEventListener('hashchange', this.onH)
  }

}

VueRouter.install = function (_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      },
    },
    render(h) {
      console.log('h');
      console.log(h);
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, [
        this.$slots.default
      ])
    }
  })
  Vue.component('router-view', {
    render(h) {
      return h(null)
    }
  })
}

export default VueRouter;