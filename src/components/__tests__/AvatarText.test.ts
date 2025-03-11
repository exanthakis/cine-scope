import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AvatarText from '../ui/AvatarText.vue'
import IconAvatar from '../icons/IconAvatar.vue'

describe('AvatarText', () => {
  const original_title = 'Daniel Radcliffe'
  const title = 'Harry Potter'
  const poster_path = 'iPg0J9UzAlPj1fLEJNllpW9IhGe.jpg'

  it('should render the original_title and title correctly', () => {
    const wrapper = mount(AvatarText, {
      props: {
        original_title,
        title,
      },
    })

    expect(wrapper.text()).toContain(original_title)
    expect(wrapper.text()).toContain(title)
  })

  it('should render avatar image when path is provided', () => {
    const wrapper = mount(AvatarText, {
      props: {
        poster_path,
        title,
      },
    })
    const img = wrapper.find('img')

    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(`https://image.tmdb.org/t/p/original/${poster_path}`)
    expect(img.attributes('alt')).toBe(title)
  })

  it('should render IconAvatar when path is not provided', () => {
    const wrapper = mount(AvatarText)
    expect(wrapper.findComponent(IconAvatar).exists()).toBe(true)
  })

  it('should matches snapshot', () => {
    const wrapper = mount(AvatarText, {
      props: {
        original_title,
        title,
        poster_path,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
