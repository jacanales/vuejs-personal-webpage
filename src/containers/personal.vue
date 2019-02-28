<template lang="html">
  <div id="home">
    <navbar/>
    <headerintro/>
  </div>
</template>
<script>
import navbar from '../components/navbar';
import headerintro from '../components/header';

export default {
  name: 'personal',
  components: { navbar, headerintro },
};
</script>
