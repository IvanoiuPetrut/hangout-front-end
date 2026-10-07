import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TopNavigation from '@/components/navigation/TopNavigation.vue'

describe('TopNavigation.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(TopNavigation, {
      props: {
        friendName: 'Test Friend'
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct friend name', () => {
    const friendName = 'Test Friend'
    const wrapper = mount(TopNavigation, {
      props: {
        friendName
      }
    })

    expect(wrapper.text()).toContain(friendName)
  })

  it('emits toggleMenuVisibility event when button is clicked', async () => {
    const wrapper = mount(TopNavigation, {
      props: {
        friendName: 'Test Friend'
      }
    })

    await wrapper.find('[data-testid="toggle-navigation-button"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('toggleMenuVisibility')
  })
})
