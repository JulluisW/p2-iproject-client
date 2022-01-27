<template>
  <div class="home">
    <h1>Orders</h1> 
    <div id="order-container">
      <order-card 
      v-for="order in currentUserOrders"
      :key="order.id"
      :order="order"></order-card>
    </div>
    <add-buttons></add-buttons>
  </div>
</template>

<script>
// @ is an alias to /src
import AddButtons from '../components/AddButtons.vue'
import OrderCard from '../components/OrderCard.vue'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  components:{
    AddButtons,
    OrderCard
  },
  computed:{
    ...mapState(["currentUserOrders"])
  },
  created(){
    if(localStorage.access_token) {
      this.$store.state.isLoggedIn = true
      this.$store.dispatch("fetchProducts")
      this.$store.dispatch("fectchOrder")
    }
  }
}
</script>

<style>
#order-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 50px;
}
.home h1 {
  text-align: center;
  margin: auto;
  margin-top: 50px;
  border-radius: 20%;
  color: var(--primary);
  background-color: rgba(245, 245, 245, 0.747);
  padding: 20px;
  width: 15%;
}
</style>