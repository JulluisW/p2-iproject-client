<template>
  <div id="add-product-form">
    <h2><i class="fas fa-receipt" style="font-size:50px;"></i>   Your Order Please!   <i class="fas fa-receipt" style="font-size:50px;"></i></h2>
    <form action="" id="form-add-product">
      <input v-model="custName" type="text" placeholder="Customer/Company Name">
      <input v-model="orderDest" type="text" placeholder="Order Destination">
      <input v-model="custPhone" type="text" placeholder="Phone Number">
      <div id="price-container">
        <label for="cars">Choose Product:</label>
        <select name="cars" id="cars" v-model="toPrice">
          <option v-for="item in availableItems" :key="item.id" :value="item.price">{{item.name}}</option>
        </select>
      </div>
      <div>
        <h3>Total Price: {{toPrice}}</h3>      
      </div>
      <div style="display:flex; width: 40%; justify-content: space-between;">
        <button type="submit" @click.prevent="AddOrder" class="submit-shop">Submit</button>
        <button type="submit" @click.prevent="cancelAddOrder"  class="cancel-add-from">Cancel</button>
      </div>
      
    </form>
  </div>
</template>

<script>
export default {
  name: "AddOrder",
  data() {
    return {
      custName: "",
      orderDest: "",
      custPhone: "",
      toPrice: "",
    }
  },
  computed:{
    availableItems() {
      return this.$store.state.currentProducts
    }
  },
  methods:{
    cancelAddOrder() {
      this.$router.push('/')
    },
    async AddOrder() {
      let payload = {
      customerName : this.custName, 
      orderDestination: this.orderDest, 
      customerPhoneNumber: this.custPhone,
      totalPrice: this.toPrice,
      }
      try {
        const resp = await this.$store.dispatch("postOrder",payload)
        if(typeof resp == 'object') {
          console.log("Add Order Success");
          this.$router.push("/")
        } else {
          throw {name: resp}
        }
      } catch (error) {
        console.log(error.name);
      }
    }
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
#add-product-form select{
  padding: 2px;
  width: 55%;
  height: 45px;
  font-size: 15px;
}
#add-product-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin: auto;
  margin-top: 5%;
  width: 600px;
  border-radius: 10%;
  background-color: white;
  padding: 30px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.349);
}
#form-add-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 500px;
  width: 100%;
}
#form-add-product input{
  border-radius: 5px;
  padding: 2px 8px;
  width: 75%;
  height: 35px;
  font-size: 15px;
}

#form-add-product input:hover{
  border: 1px solid var(--primary);
}

#form-add-product button{
  padding: 10px;
  font-size: 17px;
  border-radius: 20%;
  color: whitesmoke;
  border: none;
  height: 50px;
  width: fit-content;
  margin-top: 10px;
}

.submit-shop{
  background-color: green;
}

.submit-shop:hover{
  background-color: rgb(0, 163, 0);
}

.cancel-add-from{
  background-color: red;
}

.cancel-add-from:hover{
  background-color: rgb(255, 60, 60);
}

#text-area-container {
  width: 75%;
}

#text-area-container textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
}

#text-area-container label {
  font-weight: 600;
}

#price-container {
  display: flex;
  width: 85%;
  justify-content: space-evenly;
  align-items: center;
}

#price-container input {
  width: 39%;
  margin: 0 10px;
}
</style>