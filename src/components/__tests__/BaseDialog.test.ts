import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseDialog from '../ui/BaseDialog.vue'
import { nextTick } from 'vue'

describe('BaseDialog', () => {
  const global = {
    stubs: {
      BaseButton: true,
    },
  }

  it('should not be visible when show is false', async () => {
    const wrapper = mount(BaseDialog, {
      props: { show: false },
      attachTo: document.body,
      global,
    })
    await nextTick()

    expect(document.body.querySelector('dialog')).toBeNull()

    wrapper.unmount()
  })

  it('should be visible when show is true', async () => {
    const wrapper = mount(BaseDialog, {
      props: { show: true },
      attachTo: document.body,
      global,
    })

    await nextTick()

    expect(document.body.querySelector('dialog')).toBeTruthy()

    wrapper.unmount()
  })

  it('should emit close event when backdrop is clicked', async () => {
    const wrapper = mount(BaseDialog, {
      props: { show: true },
      attachTo: document.body,
      global,
    })

    await nextTick()

    const backdrop = document.body.querySelector('#backdrop')
    expect(backdrop).toBeTruthy()

    backdrop?.dispatchEvent(new Event('click'))
    await nextTick()

    expect(wrapper.emitted('close')).toBeTruthy()

    wrapper.unmount()
  })

  it('should render header, default, and actions slots', async () => {
    const headerSlotContent = 'Header Content'
    const defaultSlotContent = 'Default Content'
    const actionsSlotContent = 'Actions Content'

    const wrapper = mount(BaseDialog, {
      props: { show: true },
      attachTo: document.body,
      global,
      slots: {
        header: headerSlotContent,
        default: defaultSlotContent,
        actions: actionsSlotContent,
      },
    })
    await nextTick()

    const headerSlot = document.body.querySelector('#header-slot')
    const defaultSlot = document.body.querySelector('#default-slot')
    const actionSlot = document.body.querySelector('#actions-slot')

    expect(headerSlot?.textContent).toBe(headerSlotContent)
    expect(defaultSlot?.textContent).toBe(defaultSlotContent)
    expect(actionSlot?.textContent).toBe(actionsSlotContent)

    wrapper.unmount()
  })
})
