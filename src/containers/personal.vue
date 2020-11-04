<template lang="html">
  <div>
    <headerintro/>
    <skills/>
  </div>
</template>
<script>
import headerintro from '../components/header';
import skills from '../components/skills';

export default {
  name: 'personal',
  components: { headerintro, skills },
};
</script>
