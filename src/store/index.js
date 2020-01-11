import Vue from 'vue'
import Vuex from 'vuex'
import http from "../hppt/api";
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // item: [],
        // tab1 id 房间id
        oddsid: '9',
        odd:19.1,
        buyObj:{},
        //期号
        issue:'',
        betLog:[]
    },
    mutations: {
        // addItem(state, obj) {
        //     state.item.push(obj);
        // },
        SET_TABID(state, id){
            state.oddsid = id;
        },
        setbuyObj(state,obj){
            state.buyObj = obj
        },
        SET_ISSUE(state,sue){
            state.issue = sue;
        },
        SET_BETLOG(state,arr){
            state.betLog = arr;
        }
    }
    ,
    actions: {
        buy(context,args){
            let obj = {
                room_id:this.state.oddsid,
                //当前期
                issue:this.state.issue,
            }
            console.log(args)
            console.log(obj)
            return http.betting(obj,args)
        },
        getbetLog(context){
            http.betLog(24)
            .then(res=>{
                this.commit('SET_BETLOG',res.data.data)
            })
            
        }

    },
    modules: {}
})
export default store;