let Vue;
class Store {
  constructor(options) {
    this._getters = options.getters;
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state
        }
      },
      computed: this.initGetters(options.getters),
    })
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  commit(type, playload) {
    const entry = this._mutations[type]
    if(!entry) {
      console.error(`unknow mutation type: ${type}`);
      return
    }
    entry(this.state, playload);
  }

  dispatch(type, playload) {
    const entry = this._actions[type];
    if(!entry) {
      console.error(`unknow actions type: ${type}`);
      return
    }
    entry(this, playload);
  }

  get state() {
    return this._vm.$data.$$state
  }

  get getters() {
    return this._vm
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

Store.prototype.initGetters = function(getters) {
  let computed = {} ;
  Object.keys(getters).forEach(key => {
    computed[key] = () => getters[key](this.state)
  })
  return computed;
}

 export default { Store, install }