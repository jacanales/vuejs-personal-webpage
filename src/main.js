import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)

app.mount('#app')

/*
import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  componens: { App },
  render: h => h(App),
}).$mount('#app')
*/
