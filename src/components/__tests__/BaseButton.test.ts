import { describe } from 'node:test'
import { expect, it } from 'vitest'
import BaseButton from '../ui/BaseButton.vue'
import { mount, RouterLinkStub } from '@vue/test-utils'

describe('BaseButton', () => {
  const mode = 'primary'
  const global = {
    stubs: {
      RouterLink: RouterLinkStub,
    },
  }

  it('should render as a button if "to" prop is empty or is not provided', () => {
    const to = ''
    const slotContent = 'Click Me'

    const wrapper = mount(BaseButton, {
      props: {
        mode,
        to,
      },
      global,
      slots: { default: slotContent },
    })
    const wrapper1 = mount(BaseButton, {
      props: {
        mode,
      },
      global,
      slots: { default: slotContent },
    })

    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain(slotContent)

    expect(wrapper1.find('button').exists()).toBe(true)
    expect(wrapper1.find('button').text()).toContain(slotContent)
  })

  it('should render RouterLink instead of button when "to" prop is provided', () => {
    const to = '/home'
    const slotContent = 'Click Me'

    const wrapper = mount(BaseButton, {
      props: { mode: 'primary', to },
      global,
      slots: { default: slotContent },
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe(to)
    expect(wrapper.findComponent(RouterLinkStub).text()).toContain(slotContent)
  })

  it('should apply primary mode classes', () => {
    const wrapper = mount(BaseButton, {
      props: { mode },
      global,
    })

    expect(wrapper.classes()).toContain('!bg-red-netflix')
  })

  it('should apply secondary mode classes', () => {
    const mode1 = 'secondary'
    const wrapper = mount(BaseButton, {
      props: { mode: mode1 },
      global,
    })

    expect(wrapper.classes()).toContain('bg-black-primary')
  })
})
