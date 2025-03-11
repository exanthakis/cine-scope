import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseBadge from '../ui/BaseBadge.vue'

describe('BaseBadge', () => {
  it('should render the title of the badge correctly', () => {
    const title = 'Test title'
    const wrapper = mount(BaseBadge, {
      props: {
        title,
      },
    })
    expect(wrapper.text()).toContain(title)
  })

  it('should emits close event when button is clicked', async () => {
    const title = 'Test title'

    const wrapper = mount(BaseBadge, {
      props: {
        title,
      },
    })

    await wrapper.find('button').trigger('click')

    const closeEvent = wrapper.emitted('close')

    expect(closeEvent).toBeTruthy()
    expect(closeEvent).toHaveLength(1)
  })
})
