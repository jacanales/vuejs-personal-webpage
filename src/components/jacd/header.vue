<script>
import $ from 'jquery'

const contact = [
  {
    name: 'email',
    data: 'contact@jacd.es',
    icon: 'fa fa-envelope',
    link: 'mailto:contact@jacd.es'
  }
]

const social = [
  {
    name: 'github',
    link: 'https://github.com/jacanales/',
    icon: 'fa-github',
    text: 'jacanales'
  },
  {
    name: 'gitlab',
    link: 'https://gitlab.com/jacanales/',
    icon: 'fa-gitlab',
    text: 'jacanales'
  },
  {
    name: 'facebook',
    link: 'https://www.facebook.com/jacanalesdiez',
    icon: 'fa-facebook',
    text: 'jacanalesdiez'
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/jacanales/',
    icon: 'fa-linkedin',
    text: 'jacanales'
  },
  {
    name: 'twitter',
    link: 'https://x.com/tanque_tm',
    icon: 'fa-twitter',
    text: 'tanque_tm'
  },
  {
    name: 'lastfm',
    link: 'https://www.last.fm/user/tanque_tm',
    icon: 'fa-lastfm',
    text: 'tanque_tm'
  }
]

$(document).ready(function () {
  $('#presentation').toggleClass('hidden')
})

export default {
  name: 'header_intro',
  data() {
    return { contact, social }
  }
}
</script>

<template>
  <!-- Header -->
  <section class="section hero is-link is-fullheight with-bg">
    <div class="hero-body">
      <div id="presentation" class="container hidden">
        <figure class="image is-128x128">
          <img class="is-rounded" src="@/assets/images/profile.jpg" />
        </figure>
        <h1 class="title is-1">Jesús Antonio Canales Diez</h1>
        <h2 class="subtitle is-3">Software Engineering Manager</h2>
        <h2 class="subtitle is-3">Platform Tech Lead</h2>
        <nav class="tabs centered">
          <div class="columns is-variable is-mobile is-multiline social-list">
            <div class="column" v-for="source in contact" :key="source.name">
              <a
                v-if="!source.link"
                role="button"
                :class="'icon-text ' + source.name"
                target="_blank"
                :title="source.data"
              >
                <span class="icon is-small">
                  <i :class="source.icon"></i>
                  <!-- Telefono -->
                </span>
              </a>
              <a
                v-if="source.link"
                :href="source.link"
                :class="'icon-text ' + source.name"
                target="_blank"
                :title="source.data"
              >
                <span class="icon is-small">
                  <i :class="source.icon"></i>
                </span>
              </a>
            </div>
            <div class="column" v-for="media in social" :key="media.link">
              <a
                :href="media.link"
                :class="'icon-text ' + media.name"
                target="_blank"
                :title="media.text"
              >
                <span class="icon is-small">
                  <i :class="'fab ' + media.icon"></i>
                </span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.menu-label {
  color: #fff000;
  font-size: 12pt;
}

.hero {
  &.with-bg {
    background-image:
      linear-gradient(rgba(31, 152, 239, 0.2), rgba(15, 4, 21, 0.4)),
      linear-gradient(rgba(164, 174, 197, 0.4), #000), url(/public/images/city.jpg);

    background-size: cover;
  }
}

.hero-body {
  position: relative;
  div {
    &#presentation {
      transition:
        all 1.5s,
        height 1.5s,
        transform 1.5s;
      -webkit-transition:
        all 1.5s,
        height 1.5s,
        -webkit-transform 1.5s;
      width: 100vw;
      text-align: center;
    }
    &.hidden {
      opacity: 0;
      margin-top: -400px;
    }
  }
}

figure {
  margin: 0px auto 2vw;

  img {
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0 0 20px 5px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 0 0 20px 5px rgba(0, 0, 0, 1);
  }
}

nav {
  &.centered {
    margin: 0 auto;
    width: max-content;
  }
}

$size-icon: 20px;

$spotify: #1ed760;
$twitter: #1da1f2;
$github: #6b6b6b;
$facebook: #3b5998;
$lastfm: #b90000;
$linkedin: #0073b1;
$gitlab: #fa7035;
$skype: #00aff0;

.social-list {
  font-size: $size-icon;

  a {
    border: none;
  }
}

a.facebook:hover span {
  color: $facebook !important;
}
a.spotify:hover span {
  color: $spotify !important;
}
a.twitter:hover span {
  color: $twitter !important;
}
a.github:hover span {
  color: $github !important;
}
a.gitlab:hover span {
  color: $gitlab !important;
}
a.lastfm:hover span {
  color: $lastfm !important;
}
a.linkedin:hover span {
  color: $linkedin !important;
}
a.skype:hover span {
  color: $skype !important;
}

@media screen and (max-width: 48em) {
  .hero-body {
    nav {
      width: 80vw;

      a {
        padding: 0.5em 0.8em;
        border: none;
        font-size: 15px;
      }
    }

    div {
      .title.is-1 {
        font-size: 1.3rem;
      }
      .subtitle.is-3 {
        font-size: 1rem;
      }
    }
  }
}

.columns.is-variable {
  --columnGap: 0;
}
</style>
