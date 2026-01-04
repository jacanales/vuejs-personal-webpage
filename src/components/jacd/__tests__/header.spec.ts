import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../header.vue'

// Mock jQuery to avoid issues with $(document).ready
vi.mock('jquery', () => {
    return {
        default: Object.assign(() => {
            return {
                toggleClass: vi.fn(),
                ready: (fn: () => void) => fn(),
            }
        }, {
            ready: (fn: () => void) => fn()
        })
    }
})

describe('Header Component', () => {
    it('renders name and titles correctly', () => {
        const wrapper = mount(Header)
        expect(wrapper.text()).toContain('Jesús Antonio Canales Diez')
        expect(wrapper.text()).toContain('Security Software Engineering')
    })

    it('renders contact links', () => {
        const wrapper = mount(Header)
        const emailLink = wrapper.find('a[title="contact@jacd.es"]')
        expect(emailLink.exists()).toBe(true)
    })

    it('renders social links', () => {
        const wrapper = mount(Header)
        const githubLink = wrapper.find('a[href="https://github.com/jacanales/"]')
        expect(githubLink.exists()).toBe(true)

        const linkedinLink = wrapper.find('a[href="https://www.linkedin.com/in/jacanales/"]')
        expect(linkedinLink.exists()).toBe(true)
    })
})
