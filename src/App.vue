<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import konami from '@/components/konami'

konami.run()

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.menu-list a {
    color: #ffffff;
}
</style>
