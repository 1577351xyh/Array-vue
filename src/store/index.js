import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 const store = new Vuex.Store({
  state: {
    item:[]
  },
  mutations: {
    addItem(state, obj){
      state.item.push(obj);
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store;