import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import AdventuresIndex from "@/components/Adventures/AdventuresIndex.vue";
import Button from "@/components/_shared/Button.vue";

// see models/__mocks__ directory
jest.mock("@/store/models/Adventure");

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

const routes = {
  new: { name: "adventures-details", params: { id: "new" } },
  existing: { name: "adventures-details", params: { id: 1 } }
};

describe("AdventuresIndex.vue", () => {
  let wrapper;
  let buttonArray;

  beforeEach(() => {
    wrapper = shallowMount(AdventuresIndex, {
      localVue,
      router
    });
    buttonArray = wrapper.findAll(Button);

    // the .catch(err => {}) part of the component's router.push will throw an error, the test will hapiily pass, though.
    wrapper.vm.$router.push = jest.fn();
  });

  it("calls vuex-orm to fetch the list of adventures", () => {
    const expected = [];
    expect(wrapper.vm.adventures).toEqual(expect.arrayContaining(expected));
  });

  it("displays the new button", () => {
    const newButtonText = buttonArray.at(0).props().text;
    expect(newButtonText).toBe("New adventure");
  });

  it('calls the router push function with param id: "new"', () => {
    const newButton = buttonArray.at(0);
    newButton.trigger("click");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(routes.new);
  });

  // failing since it doesn't find the rest of the buttons
  it("calls the router push function with param id: 1", () => {
    const newButton = buttonArray.at(1);
    newButton.trigger("click");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(routes.existing);
  });
});
