<template>
  <div class="b">
    <h1>这是组件B</h1>
  </div>
</template>

<script>
export default {
  name: 'B',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: green;
}
</style>
