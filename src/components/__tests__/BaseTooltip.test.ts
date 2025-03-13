import { mount } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'
import BaseTooltip from '../ui/BaseTooltip.vue'

describe('BaseTooltip', () => {
  it('should render default & content slots correctly', () => {
    const defaultSlot = 'Main content'
    const contentSlot = 'Body Content'

    const wrapper = mount(BaseTooltip, { slots: { default: defaultSlot, content: contentSlot } })

    expect(wrapper.find('.tooltip').exists()).toBe(true)
    expect(wrapper.find('.tooltip').text()).toContain(contentSlot)

    expect(wrapper.find('.tooltip-title').exists()).toBe(true)
    expect(wrapper.find('.tooltip-title').text()).toContain(defaultSlot)
  })
})
