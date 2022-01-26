<template>
<div id="prod-container">
  <h1>My Products</h1> 
  <div id="prod-wrapper">
    <product-card 
    v-for="product in currentProducts" 
    :key="product.id"
    :product="product"></product-card>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
import ProductCard from '../components/ProductCard.vue'
export default {
  name: "ProductsPage",
  components:{
    ProductCard
  },
  computed:{
    ...mapState(["currentProducts"])
  },
  created(){
    if(localStorage.access_token) {
        this.$store.commit("MUTATE_IS_LOGIN",true)
        this.$store.dispatch("fetchProducts")
      }
  },
}
</script>

<style>
#prod-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
#prod-container h1 {
  margin: 40px 0px 70px 0;
  border-radius: 20%;
  color: var(--primary);
  background-color: rgba(245, 245, 245, 0.747);
  padding: 20px;
}
#prod-wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 80%;
}
</style>