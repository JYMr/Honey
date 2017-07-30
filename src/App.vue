<template>
  <div id="app">
    <router-view name="content"></router-view>
    <router-view name="foot"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>