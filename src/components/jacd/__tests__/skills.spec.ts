import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skills from '../skills.vue'

describe('Skills Component', () => {
    it('renders correctly', () => {
        const wrapper = mount(Skills)
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the "Skills" title', () => {
        const wrapper = mount(Skills)
        expect(wrapper.find('h2.subtitle.is-1').text()).toBe('Skills')
    })

    it('renders all skill images', () => {
        const wrapper = mount(Skills)
        const skills = [
            'golang',
            'php7',
            'aws',
            'mysql',
            'docker',
            'kubernetes'
        ]

        skills.forEach(skill => {
            const img = wrapper.find(`img[title="${skill}"]`)
            expect(img.exists()).toBe(true)
        })
    })
})
