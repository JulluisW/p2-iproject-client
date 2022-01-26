import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    url: 'http://localhost:3000'
  },
  mutations: {
    MUTATE_IS_LOGIN(state,payload) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    async dologin(context, payload) {
      try {
        const resp = await axios.post(`${context.state.url}/login`,payload)
        localStorage.access_token = resp.access_token
        context.commit("MUTATE_IS_LOGIN", true)
        return resp.data
      } catch (error) {
        return error.response.data.message
      }
    },
    async doregister(context, payload) {
      try {
        const resp = await axios.post(`${context.state.url}/register`, payload)
        return resp.data
      } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message
      }
    },
    async phoneVerification(context, payload) {
      try {
        const resp = await axios.post(`${context.state.url}/register/phoneValidations`, payload)
        // console.log(resp.data.valid);
        return resp.data.valid
        
      } catch (error) {
        return error.response.data.message
      }
    }
  },
  modules: {
  }
})
