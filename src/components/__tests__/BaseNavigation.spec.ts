import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseNavigation from '@/components/navigation/BaseNavigation.vue'
import TopNavigation from '@/components/navigation/TopNavigation.vue'
import LeftMenu from '@/components/navigation/LeftMenu.vue'

describe('BaseNavigation.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(BaseNavigation)

    expect(wrapper.exists()).toBe(true)
  })

  it('displays the TopNavigation and LeftMenu components', () => {
    const wrapper = mount(BaseNavigation)
    const topNavigation = wrapper.findComponent(TopNavigation)
    const leftMenu = wrapper.findComponent(LeftMenu)

    expect(topNavigation.exists()).toBe(true)
    expect(leftMenu.exists()).toBe(true)
  })

  it('toggles menu visibility when handleToggleMenuVisibility is called', async () => {
    const wrapper = mount(BaseNavigation)
    const topNavigation = wrapper.findComponent(TopNavigation)
    const leftMenu = wrapper.findComponent(LeftMenu)

    await topNavigation.vm.$emit('toggle-menu-visibility')
    expect(leftMenu.classes()).toEqual(expect.arrayContaining(['left-0']))

    await topNavigation.vm.$emit('toggle-menu-visibility')
    expect(leftMenu.classes()).toEqual(expect.arrayContaining(['-left-full']))
  })
})
