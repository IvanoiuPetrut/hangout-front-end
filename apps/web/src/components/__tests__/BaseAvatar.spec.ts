import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseAvatar from '@components/navigation/data_display/BaseAvatar.vue'

describe('BaseAvatar', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        userName: 'Test User'
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct username', () => {
    const userName = 'Test User'
    const wrapper = mount(BaseAvatar, {
      props: {
        userName
      }
    })

    expect(wrapper.text()).toContain(userName)
  })
})
