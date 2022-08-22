<template>
  <div class="a">
    <h1>这是组件A</h1>
  </div>
</template>

<script>
export default {
  name: 'A',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: red;
}
</style>
