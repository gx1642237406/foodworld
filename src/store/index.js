import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserName:'',
    user:[],
    userstate:'',
    isLogin:false,
    id:'',
    menuList:[],
  },
  mutations: {
    updateIsLogin(state,bool){
      state.isLogin = bool;
    },
    updateUserName(state,name){
      state.UserName = name;
    },
    updateUser(state,user){
      state.user = user;
    },
    updateUserState(state,ustate){
      state.userstate = ustate;
    },
    updateId(state,id){
      state.id = id;
    },
    menuList(state,list){
      state.menuList = list;
    }
  },
  actions: {
  },
  modules: {
  }
})
