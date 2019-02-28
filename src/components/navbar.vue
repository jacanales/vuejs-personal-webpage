<template>
  <!-- Navigation bar -->
  <nav class="navbar is-link is-fixed-top is-hidden">
    <div class="navbar-brand">
      <div class="navbar-burger burger" data-target="personalNavbar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="personalNavbar" class="navbar-menu">
      <div class="navbar-end">
        <a v-for="item in navbar" :key="item.class"
           :href="item.href"
           :id="item.id" class="navbar-item">
          <span class="icon">
            <i :class="'fas ' + item.class"></i>
          </span>
          <span>{{ item.text }}</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
const navbar = [
  {
    id: 'about',
    href: '#about',
    class: 'fa-info',
    text: 'About',
  },
  {
    id: 'services',
    href: '#services',
    class: 'fa-bars',
    text: 'Services',
  },
  {
    id: 'resume',
    href: '#resume',
    class: 'fa-file-alt',
    text: 'Resume',
  },
  {
    id: 'portfolio',
    href: '#portfolio',
    class: 'fa-th-list',
    text: 'Portfolio',
  },
  {
    id: 'contact',
    href: '#contact',
    class: 'fa-envelope',
    text: 'Contact',
  },
];
export default {
  name: 'navbar',
  data() { return { navbar }; },
};
</script>

<style scoped>

</style>
