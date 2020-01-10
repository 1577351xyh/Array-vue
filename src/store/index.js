import Vue from 'vue'
import Vuex from 'vuex'
import http from "../hppt/api";
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
        buyObj:{},
        //期号
        issue:'',
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
            state.buyObj = obj
        },
        setissue(state,sue){
            state.issue = sue
        },
    }
    ,
    actions: {
        buy(context,args){
            let obj = {
                room_id:this.state.room_id,
                //当前期拿
                issue:this.state.issue,
            }
            console.log(args)
            console.log(obj)
            return http.betting(obj,args)
        }
    },
    modules: {}
})
export default store;