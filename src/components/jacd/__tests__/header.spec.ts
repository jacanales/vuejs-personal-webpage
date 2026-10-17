import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../header.vue'

const mountHeader = () => mount(Header)

describe('Header content', () => {
    it('states who the person is and what they do', () => {
        const wrapper = mountHeader()
        expect(wrapper.find('h1').text()).toBe('Jesús Antonio Canales Diez')
        expect(wrapper.find('h2').text()).toBe('Security Software Engineering')
    })

    it('adds a positioning line beyond the job title', () => {
        const wrapper = mountHeader()
        const tagline = wrapper.find('[data-test="tagline"]')
        expect(tagline.exists()).toBe(true)
        expect(tagline.text().length).toBeGreaterThan(20)
    })
})

describe('Header primary call to action', () => {
    it('shows the email as a labelled link, not an icon alone', () => {
        const wrapper = mountHeader()
        const cta = wrapper.find('[data-test="cta"]')
        expect(cta.exists()).toBe(true)
        expect(cta.attributes('href')).toBe('mailto:contact@jacd.es')
        expect(cta.text()).toContain('contact@jacd.es')
    })
})

describe('Header accessibility', () => {
    it('gives every link an accessible name', () => {
        const wrapper = mountHeader()
        const links = wrapper.findAll('a')
        expect(links.length).toBeGreaterThan(0)
        for (const link of links) {
            const label = link.attributes('aria-label') ?? ''
            const text = link.text().trim()
            expect(label.length + text.length, `link ${link.attributes('href')} has no name`).toBeGreaterThan(0)
        }
    })

    it('describes the portrait instead of leaving alt empty', () => {
        const wrapper = mountHeader()
        const alt = wrapper.find('img.portrait').attributes('alt')
        expect(alt).toBeTruthy()
        expect(alt).toMatch(/Jesús/i)
    })

    it('keeps the hovered glyphs out of the screen reader tree', () => {
        const wrapper = mountHeader()
        const icons = wrapper.findAll('i')
        expect(icons.length).toBeGreaterThan(0)
        for (const icon of icons) {
            expect(icon.attributes('aria-hidden')).toBe('true')
        }
    })

    it('never renders a link without an href', () => {
        const wrapper = mountHeader()
        for (const link of wrapper.findAll('a')) {
            expect(link.attributes('href')).toBeTruthy()
        }
    })

    it('marks external links so the opened tab cannot reach back', () => {
        const wrapper = mountHeader()
        const external = wrapper.findAll('a[target="_blank"]')
        expect(external.length).toBeGreaterThan(0)
        for (const link of external) {
            expect(link.attributes('rel')).toContain('noopener')
        }
    })

    it('exposes one h1 and puts the content in a main landmark', () => {
        const wrapper = mountHeader()
        expect(wrapper.findAll('h1')).toHaveLength(1)
        expect(wrapper.find('main').exists()).toBe(true)
    })
})

describe('Header renders without JavaScript enhancement', () => {
    it('ships the presentation visible instead of waiting for a script', () => {
        const wrapper = mountHeader()
        const presentation = wrapper.find('[data-test="presentation"]')
        expect(presentation.exists()).toBe(true)
        expect(presentation.classes()).not.toContain('hidden')
    })
})

describe('Header stack strip', () => {
    it('names the stack the title claims, as readable text', () => {
        const wrapper = mountHeader()
        const strip = wrapper.find('[data-test="stack"]')
        expect(strip.exists()).toBe(true)
        expect(strip.classes()).not.toContain('hidden')

        const items = strip.findAll('li')
        expect(items.length).toBeGreaterThanOrEqual(6)
        for (const item of items) {
            expect(item.text().trim().length).toBeGreaterThan(1)
        }
        expect(strip.text()).toMatch(/Go/)
        expect(strip.text()).toMatch(/Kubernetes/)
    })

    it('lists the current database and clouds, without the retired ones', () => {
        const wrapper = mountHeader()
        const names = wrapper.findAll('[data-test="stack"] li').map((item) => item.text().trim())

        expect(names).toContain('Postgres')
        expect(names).toContain('AWS')
        expect(names).toContain('GCP')

        expect(names).not.toContain('MySQL')
        expect(names).not.toContain('PHP 7')
    })
})

describe('Header AI focus', () => {
    it('names the AI work once, as AI security and AI-assisted coding', () => {
        const wrapper = mountHeader()
        const focus = wrapper.find('[data-test="focus"]')
        expect(focus.exists()).toBe(true)

        const text = focus.text()
        expect(text).toMatch(/AI/)
        expect(text).toMatch(/secur/i)
        expect(text).toMatch(/code/i)
    })

    it('keeps the AI mention to a single short line', () => {
        const wrapper = mountHeader()
        const focus = wrapper.find('[data-test="focus"]')
        const words = focus.text().trim().split(/\s+/).filter(Boolean)

        expect(words.length).toBeLessThanOrEqual(16)
    })
})
