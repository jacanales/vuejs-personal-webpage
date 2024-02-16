<template>
  <div id="app_container">
    <header_intro/>
    <skills/>
  </div>
</template>

<script>
import konami from '@/components/konami'
import header_intro from "@/components/header";
import skills from "@/components/skills";

konami.run()

export default {
  name: 'App',
  components: { header_intro, skills },
}
</script>

<style>
#app_container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.menu-list a {
    color: #ffffff;
}

</style>
