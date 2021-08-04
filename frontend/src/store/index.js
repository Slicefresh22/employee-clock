import { createStore } from 'vuex'
import AuthService from '../services/AuthService';
import AppService from '../services/AppService';

export const store = createStore({
  state(){
    return {
      isAuthenticated: false, 
      currentUser: {}, 
      loginErrors: []
    }
  },

  mutations: {
    login(state, status){
      state.isAuthenticated = status;
    },

    logout(state, status){
      state.isAuthenticated = status;
      AppService.deleteLocalStorage('token');
    }, 

    setAuthenticated(state, status){
      state.isAuthenticated = status;
    }, 

    setCurrentUser(state, data){
      state.currentUser = data;
    },

    setLoginErrors(state, err){
      state.loginErrors.push(err);
    }
  },

  actions: {
    login({ commit }, data){
      const { username, password } = data;

      AuthService.Login(username,password).then((res) => {
        const { data: token } = res;
        if(token){
            AppService.writeLocalStorage('token', token);
            commit('login', true);
        }else {
            AppService.deleteLocalStorage('token');
            commit('login', false);
        }
      })
      .catch((err) => {
        commit('setLoginErrors', err);
      })
    }, 

    logout({ commit }) {
      commit('logout', false);
    },

    setCurrentUser({ commit }) {
      AuthService.getCurrentUser().then(user => {
        commit('setCurrentUser', user)
      })
    }

  },

  getters: {
    getAuthStatus(state){
      return state.isAuthenticated;
    }, 

    getCurrentUser: (state)=>{
      return state.currentUser;
    }
  },

  modules: {
  }

});
