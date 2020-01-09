import axios from 'axios'
import {MessageBox, Message} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
//axios实例
const http = axios.create({
    // 基地址
    // host:'http://ssc.lgqgg.cn',
    // baseURL: 'http://ssc.lgqgg.cn/',
    //超时
    // timeout:5000
});

//游戏列表
http.gameList = () => {
    return http.get('/api/game/gameList')
};
//玩法列表
http.playList = (id) => {
    return http.get(`/api/playLists/${id}`)
};
//赔率列表
http.oddsInfoList = (id) => {
    return http.get(`/api/oddsInfoList/${id}`)
};
//最近十期中奖记录
http.oddsInfoList = (id) => {
    return http.get(`/api/pk/openIssueResult/${id}`)
};
//当前期号
http.nowIssue = (id) => {
    return http.get(`/api/pk/nowIssue/${id}`)
};
//投注记录
http.betLog = (id) => {
    return http.get(`/api/bet/betLog/${id}`)
};
//下注
// http.betting = ({user_id, room_id, issue,}, obj) => {
//     return http.post('/pk/betting', {
//         //写死
//         user_id:24,
//         //写死
//         // room_id:24,
//         //当前期拿
//         issue:
//         // bet_info: obj
//
//     })
// }

/* {
multiple: 倍模,
num: 注数,
odds_id: 赔率id,
content: 投注内容[],
play_desc: 描述[tab2]
money:每注多少元(默认2元一注)
}*/



//请求拦截
// http.interceptors.request.use(
//     config=>{
//         if(Cookies.get('token')){
//             config.headers['X-Token'] = Cookies.get('token')
//         }
//         return config;
//     },
//     //请求的错误处理
//     error => {
//         return Promiss.reject(error)
//     }
// );


//响应拦截
// http.interceptors.response.use(
//     response=>{
//         const res = response.data;
//         //200
//         if(res.code!==200){
//             Message({
//                 message:res.message || 'error'
//             })
//         }
//         //令牌过期,过期登录
//         if(res.code===501){
//             MessageBox.confirm(
//                 '登录异常,请重新登录',
//                 '确认登录信息',{
//                     confirmButtonText: "重新登录",
//                     cancelButtonText: "取消",
//                     type: "warning"
//                 }
//             ).then(()=>{
//                 //如果点击确定了
//                 //重新发送请求,刷新页面
//                 console.log('我要重新获取token')
//                 location.reload();
//             })
//             return Promise.reject(new Error(res.message)||'error')
//         }else{
//             return res;
//         }
//     },
//     error => {
//         Message({
//             message: error.message,
//             type: "error",
//             duration: 5 * 1000
//         });
//         return Promise.reject(error);
//     }
// )

export default http;