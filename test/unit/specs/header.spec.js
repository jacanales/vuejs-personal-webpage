import Vue from 'vue';
import headerintro from '@/components/header';

describe('header.vue', () => {
  it('should render name', () => {
    const Constructor = Vue.extend((headerintro));
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.presentation .title').textContent)
      .toContain('Jesús Antonio Canales Diez');
  });
});
