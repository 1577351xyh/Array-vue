import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        item: [],
        // tab1 id 房间id
        oddsid: '9',
        // tab2 id
        play: '',
        room_id:9,
        odd:19.1,
        buyObj:{}
    },
    mutations: {
        addItem(state, obj) {
            state.item.push(obj);
        },
        setTab1id(state, id){
            state.oddsid = id;
        },
        setTab2id(state, id){
            state.play = id;
        },
        getRoomId(state,id){
            state.room_id = id;
        },
        setbuyObj(state,obj){
            this.buyObj = obj
        },
    }
    ,
    actions: {

    },
    modules: {}
})
export default store;