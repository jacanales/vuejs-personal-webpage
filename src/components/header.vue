<template>
  <!-- Header -->
  <section class="hero is-link is-fullheight is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <h1 class="title is-1">
          Jesús Antonio Canales Diez
        </h1>
        <h2 class="subtitle is-3">
          Senior Backend Developer/Analyst
        </h2>
      </div>
      <div class="container is-fluid">
        <aside class="menu" id="lista">
          <!-- Contacto -->
          <p class="menu-label">
            Contact
          </p>
          <ul class="menu-list">
            <li v-for="source in contact" :key="source.data">
              <a v-if="!source.link" role="button" class="icon-text">
                <span class="icon is-small">
                  <i :class="'fa ' + source.icon"></i>
                  <!-- Telefono -->
                </span> {{ source.data }}
              </a>
              <a v-if="source.link" :href="source.link" class="icon-text">
                <span class="icon is-small">
                  <i :class="'fa ' + source.icon"></i>
                  <!-- Telefono -->
                </span> {{ source.data }}
              </a>
            </li>
          </ul>
          <!-- Redes sociales -->
          <p class="menu-label">
            Social Media
          </p>
          <ul class="menu-list">
            <li v-for="media in social" :key="media.text">
              <a :href="media.link" class="icon-text">
                <span class="icon is-small">
                  <i :class="'fab ' + media.icon"></i>
                </span> {{ media.text }}
              </a>
            </li>
          </ul>

          <!-- Hobbies -->
          <p class="menu-label">
            Hobbies
          </p>
          <ul class="menu-list">
            <li v-for="hobby in hobbies" :key="hobby"><a role="button">{{ hobby }}</a></li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>

<script>
const contact = [
  {
    data: '+34 669 33 32 83',
    icon: 'fa-phone',
    link: null,
  },
  {
    data: 'jacanalesdiez@gmail.com',
    icon: 'fa-envelope',
    link: 'mailto:gonzalo.pozzo4@gmail.com',
  },
];

const social = [
  {
    link: 'https://github.com/jacanales/',
    icon: 'fa-github',
    text: 'jacanales',
  },
  {
    link: 'https://www.facebook.com/jacanalesdiez',
    icon: 'fa-facebook',
    text: 'jacanalesdiez',
  },
  {
    link: 'https://www.linkedin.com/in/jacanales/',
    icon: 'fa-linkedin',
    text: 'jacanales',
  },
  {
    link: 'https://twitter.com/tanque_tm',
    icon: 'fa-twitter',
    text: 'tanque_tm',
  },
];

const hobbies = ['Dance', 'Sport', 'Theather/Cinema'];

export default {
  name: 'headerintro',
  data() { return { contact, social, hobbies }; },
};
</script>

<style lang="scss">
  .menu-label {
    color: #fff000;
    font-size: 12pt;
  }
</style>
