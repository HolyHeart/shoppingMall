<template>
<div class="check-button" :class="{active:isChecked}">
  <img src="~assets/imgs/cart/tick.svg" alt="">
</div>
</template>
<script>
export default {
  name:'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.active {
  background-color: red;
  border: 2px solid red;
}
</style>