import { shallowMount } from '@vue/test-utils';
import LandingPage from '@/renderer/components/LandingPage/LandingPage.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(LandingPage);
    expect(wrapper.text()).toMatch('Welcome to your new project!');
  });
});
