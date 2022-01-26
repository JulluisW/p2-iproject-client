<template>
  <div class="order-card">
    <div>Customer: {{order.customerName}}</div>
    <div>Total: {{order.totalPrice}}</div>
    <div>Order Destination: {{order.orderDestination}}</div>
    <div>Status: {{order.status}}</div>
    <button @click.prevent="payment(order.id)">Pay!</button>
  </div>
</template>

<script>
export default {
  name: "OrderCard",
  props:["order"],
  methods:{
    async payment(id){
      try {
        let orderId = id+this.order.customerName[0]+this.order.orderDestination[0]
        const payload = {
          orderId,
          amount: this.order.totalPrice
        }

      await this.$store.dispatch("midtransPayment", payload)
      this.$router.push('/payment')
      
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
.order-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f0f07d;
  padding: 20px;
  width: 230px;
  height: 280px;
  border-radius: 10px;
  box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.486) ;
  margin-bottom: 30px;
}
</style>