import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import personal from '@/containers/personal';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Personal WebPage',
      component: personal,
    },
  ],
});
