import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    hasShop: false,
    url: "http://localhost:3000",
  },
  mutations: {
    MUTATE_IS_LOGIN(state, payload) {
      state.isLoggedIn = payload;
    },
    MUTATE_HAS_SHOP(state, payload) {
      state.hasShop = payload;
    },
  },
  actions: {
    async dologin(context, payload) {
      try {
        const resp = await axios.post(`${context.state.url}/login`, payload);
        localStorage.access_token = resp.data.access_token;
        localStorage.userId = resp.data.userId;
        context.commit("MUTATE_IS_LOGIN", true);
        return resp.data;
      } catch (error) {
        return error.response.data.message;
      }
    },
    async doregister(context, payload) {
      try {
        const resp = await axios.post(`${context.state.url}/register`, payload);
        return resp.data;
      } catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
      }
    },
    async phoneVerification(context, payload) {
      try {
        const resp = await axios.post(`${context.state.url}/register/phoneValidations`, payload);
        // console.log(resp.data.valid);
        return resp.data.valid;
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getShopByUserId(context, payload) {
      try {
        const resp = await axios.get(`${context.state.url}/shop/${payload}`,{
          headers:{
            access_token: localStorage.access_token
          }
        })
        return resp.data
        // context.commit("MUTATE_HAS_SHOP", true)
      } catch (error) {
        return error.response.data.message;
      }
    },
    async doRegisterShop(context, payload){
      try {
        const resp = await axios.post(`${context.state.url}/shop/register`,payload,{
          headers:{
            access_token : localStorage.access_token
          }
        })
        return resp.data
      } catch (error) {
        return error.response.data.message;
      }
    },
    async doAddProduct(context, payload){
      try {
        const resp = await axios.post(`${context.state.url}/product/add`,payload,{
          headers: {
            access_token: localStorage.access_token
          }
        })
        return resp.data
      } catch (error) {
        return error.response.data.message
      }
    },

    async midtransPayment(context,payload) {
      try {
        const resp = await axios.post(`${context.state.url}/payment`,payload,{
        headers: {
          access_token: localStorage.access_token
        }
      });

      console.log(resp.data);

      } catch (error) {
        console.log(error.response.data);
      }
      
    }
  },
  modules: {},
});
