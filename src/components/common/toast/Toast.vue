<template>
<div class="toast" v-show="isShow">
  <div>{{message}}</div>
</div>
</template>
<script>
export default {
  name:'Toast',
  data() {
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration)
    }
  }
}
</script>
<style scoped>
.toast {
  width: 150px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  font-size: 18px;
  border-radius: 10px;
  text-align: center;

  color: #fff;
  background-color: rgba(0, 0, 0, .75);
}
</style>