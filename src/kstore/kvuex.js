// 声明一个插件
// 声明一个类Store
let Vue

class Store {
  constructor(options) {
    // 1.选项处理
    // this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters
    // 2.响应式state
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      // methods: {
      //   ...this.initGetters(options.getters)
      // },
      computed: this.initGetters(options.getters)
      
    })
    console.log('this.initGetters(this._getters)');
    console.log(this.initGetters(this._getters));

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
    
  }

  get state() {
    // console.log(this._vm._data);
    return this._vm._data.$$state
  }

  get getters() {
    return this._vm
  }

  set state(v) {
    console.error('please use replaceState to reset state');
  }

  // getters(type, payload) {
  //   const entry = this._getters[type]

  //   if (!entry) {
  //     console.error('unkwnow mutation type');
  //     return
  //   }

  //   return entry(this.state, payload); 
  // }

  commit(type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error('unkwnow mutation type');
      return
    }
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error('unkwnow action type');
      return
    }

    entry(this, payload)
  }
}

Store.prototype.initGetters = function(getters) {
  let method = {};
  Object.keys(getters).forEach(key => {
    method[key] = () => getters[key](this.state)
  })
  return method;
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

// 导出对象认为是Vuex
export default { Store, install }