<script lang="ts">
import cityImage from '@/assets/images/city.webp'
import portraitImage from '@/assets/images/profile.webp'

interface SocialLink {
  name: string
  href: string
  icon: string
  handle: string
}

interface StackItem {
  name: string
}

const EMAIL = 'contact@jacd.es'

const socials: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/jacanales/',
    icon: 'fa-github',
    handle: 'jacanales'
  },
  {
    name: 'GitLab',
    href: 'https://gitlab.com/jacanales/',
    icon: 'fa-gitlab',
    handle: 'jacanales'
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jacanales/',
    icon: 'fa-linkedin',
    handle: 'jacanales'
  },
  {
    name: 'X',
    href: 'https://x.com/tanque_tm',
    icon: 'fa-twitter',
    handle: 'tanque_tm'
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/jacanalesdiez',
    icon: 'fa-facebook',
    handle: 'jacanalesdiez'
  },
  {
    name: 'Last.fm',
    href: 'https://www.last.fm/user/tanque_tm',
    icon: 'fa-lastfm',
    handle: 'tanque_tm'
  }
]

const stack: StackItem[] = [
  { name: 'Go' },
  { name: 'Postgres' },
  { name: 'AWS' },
  { name: 'GCP' },
  { name: 'Docker' },
  { name: 'Kubernetes' }
]

export default {
  name: 'hero_intro',
  data() {
    return {
      email: EMAIL,
      socials,
      stack,
      cityImage,
      portraitImage
    }
  }
}
</script>

<template>
  <div class="card-surface">
    <img
      class="backdrop"
      :src="cityImage"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
      decoding="async"
    />
    <div class="scrim" aria-hidden="true"></div>

    <main id="presentation" class="presentation" data-test="presentation">
      <figure class="portrait-frame">
        <img
          class="portrait"
          :src="portraitImage"
          alt="Portrait of Jesús Antonio Canales Diez wearing sunglasses"
          width="140"
          height="140"
          decoding="async"
        />
      </figure>

      <div class="copy">
        <h1 class="name">Jesús Antonio Canales Diez</h1>
        <h2 class="role">Security Software Engineering</h2>
        <p class="tagline" data-test="tagline">
          I build and break the systems that hold other people's data — mostly Go, cloud
          infrastructure and the parts that fail at 3am.
        </p>
        <p class="tagline focus-line" data-test="focus">
          Lately that means <strong>AI</strong> — securing it, and writing code with it.
        </p>
      </div>

      <a class="cta" :href="`mailto:${email}`" data-test="cta">
        <i class="fas fa-envelope" aria-hidden="true"></i>
        {{ email }}
      </a>

      <nav class="socials" aria-label="Profiles and contact">
        <ul>
          <li v-for="profile in socials" :key="profile.href">
            <a
              :href="profile.href"
              :class="['social-link', profile.name.toLowerCase().replace('.', '')]"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${profile.name} — ${profile.handle}`"
            >
              <i :class="['fab', profile.icon]" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </nav>

      <ul class="stack" data-test="stack" aria-label="Main stack">
        <li v-for="item in stack" :key="item.name">{{ item.name }}</li>
      </ul>
    </main>
  </div>
</template>

<style lang="scss">
$spotify: #1ed760;
$twitter: #4a9eff;
$github: #b9c0d4;
$facebook: #5c7bd9;
$lastfm: #e5484d;
$linkedin: #4ba3e3;
$gitlab: #fca326;
$skype: #00aff0;

.card-surface {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  min-height: 100svh;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 5vw, 4rem);
  overflow: hidden;
  background: var(--surface);
}

.backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 42%;
}

/* Authored scrim over the photo, restored from the original hero: a dusk-blue
   wash over a grey-to-black fade. Together they take the warmth out of the
   photograph and give the sky its steel-blue cast. */
.scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(rgba(31, 152, 239, 0.2), rgba(15, 4, 21, 0.4)),
    linear-gradient(to bottom, rgba(164, 174, 197, 0.4) 0%, #000 100%);
}

.presentation {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: clamp(1rem, 2.2vw, 1.6rem);
  width: 100%;
  max-width: 42rem;
  text-align: center;

  /* Authored entrance: exponential ease-out from an already-visible default. */
  animation: reveal 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(-1.25rem) scale(0.985);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.portrait-frame {
  width: clamp(112px, 15vw, 148px);
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(
    150deg,
    rgba(232, 163, 61, 0.95),
    rgba(232, 163, 61, 0.25) 45%,
    rgba(255, 255, 255, 0.22) 100%
  );
  box-shadow: 0 22px 50px -22px rgba(0, 0, 0, 0.95);
}

.portrait {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.copy {
  display: grid;
  gap: 0.65rem;
  justify-items: center;
}

.name {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 7vw, 4.25rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.032em;
  text-wrap: balance;
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.55);
}

.role {
  font-family: var(--font-text);
  font-size: clamp(1rem, 1.9vw, 1.3rem);
  font-weight: 500;
  letter-spacing: 0.005em;
  color: var(--ink-1);
  text-shadow: 0 1px 18px rgba(0, 0, 0, 0.6);
}

.tagline {
  max-width: 32rem;
  font-size: clamp(0.95rem, 1.6vw, 1.06rem);
  line-height: 1.65;
  color: var(--ink-2);
  text-wrap: pretty;
  text-shadow: 0 1px 16px rgba(0, 0, 0, 0.55);
}

/* The current focus of the work: one line, carried by the accent word instead of
   more sentences. */
.focus-line {
  max-width: 30rem;

  strong {
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.01em;
  }
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 44px;
  padding: 0.7rem 1.35rem;
  border-radius: var(--radius-control);
  background: var(--accent);
  color: var(--accent-ink);
  font-weight: 600;
  font-size: 0.98rem;
  text-decoration: none;
  box-shadow: 0 12px 26px -14px rgba(232, 163, 61, 0.85);
  transition:
    background-color 180ms ease-out,
    transform 180ms ease-out;

  i {
    font-size: 0.85em;
  }

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.socials {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(0.35rem, 1.2vw, 0.6rem);
  }
}

.social-link {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.15rem;
  color: var(--ink-2);
  text-decoration: none;
  transition:
    color 160ms ease-out,
    background-color 160ms ease-out,
    transform 160ms ease-out;

  &:hover {
    color: var(--ink-1);
    background: var(--surface-raise);
    transform: translateY(-1px);
  }
}

a.facebook:hover i {
  color: $facebook;
}
a.spotify:hover i {
  color: $spotify;
}
a.twitter:hover i {
  color: $twitter;
}
a.github:hover i {
  color: $github;
}
a.gitlab:hover i {
  color: $gitlab;
}
a.lastfm:hover i {
  color: $lastfm;
}
a.linkedin:hover i {
  color: $linkedin;
}
a.skype:hover i {
  color: $skype;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0 clamp(0.7rem, 1.6vw, 1.1rem);
  padding-top: clamp(0.5rem, 1.6vw, 1rem);
  font-family: var(--font-text);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--ink-1);
  opacity: 0.92;

  li {
    transition: color 180ms ease-out;

    &:hover {
      color: var(--accent);
    }
  }
}

@media screen and (max-width: 30em) {
  .presentation {
    gap: 0.9rem;
  }

  .tagline {
    font-size: 0.9rem;
  }

  .social-link {
    width: 42px;
    height: 42px;
  }
}
</style>
