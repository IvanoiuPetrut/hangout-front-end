import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LeftMenu from '@/components/navigation/LeftMenu.vue'
import BaseAvatar from '@/components/navigation/data_display/BaseAvatar.vue'

describe('LeftMenu.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(LeftMenu)

    expect(wrapper.exists()).toBe(true)
  })

  it('displays the BaseAvatar component', () => {
    const wrapper = mount(LeftMenu)
    const baseAvatar = wrapper.findComponent(BaseAvatar)

    expect(baseAvatar.exists()).toBe(true)
  })
})
