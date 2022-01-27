import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    hasShop: false,
    currentProducts: [],
    currentUserOrders:[],
    // url: "https://e-bon-iproject.herokuapp.com"
    url: "https://e-bon-iproject.herokuapp.com",
    paymentUrl: "",
  },
  mutations: {
    MUTATE_IS_LOGIN(state, payload) {
      state.isLoggedIn = payload;
    },
    MUTATE_HAS_SHOP(state, payload) {
      state.hasShop = payload;
    },
    MUTATE_PRODUCTS(state,payload) {
      state.currentProducts = payload
    },
    MUTATE_ORDERS(state,payload) {
      state.currentUserOrders = payload
    },
    MUTATE_PAYMENT_URL(state, payload) {
      state.paymentUrl = payload
    }
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
    async fetchProducts(context){
      try {
        const resp = await axios.get(`${context.state.url}/product`,{
          headers:{
            access_token : localStorage.access_token
          }
        })
        // console.log(resp.data);
        context.commit("MUTATE_PRODUCTS", resp.data)
        return resp.data
      } catch (error) {
        return error.response.data.message
      }
    },
    async postOrder(context,payload) {
      try {
        const resp = await axios.post(`${context.state.url}/order/add`, payload,{
          headers:{
            access_token: localStorage.access_token
          }
        })
        return resp.data
      } catch (error) {
        // console.log(error,"<<<<<<<<");
        return error.response.data.message
      }
    },
    async fectchOrder(context) {
        try {
          const resp = await axios.get(`${context.state.url}/order`,{
          headers:{
            access_token: localStorage.access_token
          }
        })
        context.commit("MUTATE_ORDERS", resp.data)
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
      context.commit("MUTATE_PAYMENT_URL", resp.data.redirect_url)
      } catch (error) {
        console.log(error.response.data);
      }
      
    }
  },
  modules: {},
});
