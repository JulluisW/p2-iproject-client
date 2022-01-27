<template>
  <div id="history">
    <h1>Order History</h1>
    <table id="history-table">
      <thead>
        <th>Customer Name</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Sent to</th>
      </thead>
      <tbody>
        <tr 
        v-for="order in OrderHistory" 
        :key="order.id">
          <td>{{order.customerName}}</td>
          <td>{{order.totalPrice}}</td>
          <td>{{order.status}}</td>
          <td>{{order.orderDestination}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderHistoryList",
  computed:{
    OrderHistory(){
      return this.$store.state.currentUserOrdersHistory
    }
  },
  created(){
    if(localStorage.access_token) {
      this.$store.state.isLoggedIn = true
      this.$store.dispatch("fetchProducts")
      this.$store.dispatch("fectchOrder")
      this.$store.dispatch("fectchOrderHistory")
    }
  }
}
</script>

<style>
  #history{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #history h1{
    margin-top: 50px;
    border-radius: 20%;
    color: var(--primary);
    background-color: rgba(245, 245, 245, 0.747);
    padding: 20px;
    width: fit-content;
    text-align: center;
  }
  #history-table {
    width: 50%;
    height: fit-content;
    margin: auto;
    margin-top: 50px;
    background-color: rgba(245, 245, 245, 0.788);
    border: solid 1px black;
    text-align: center;
    padding: 8px 5px 8px 5px;
  }
  #history-table tbody, thead{
    border: solid 1px black;
  }
</style>