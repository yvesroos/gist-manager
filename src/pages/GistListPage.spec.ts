import { render, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import GistListPage from "./GistListPage.vue";
import { useGistStore } from "../store";
import { RouterLinkStub, flushPromises } from "@vue/test-utils";
import { mockUser1 } from "../../__mocks__/gistState";

const initialState = {
  loading: false,
  gists: [],
  selectedGist: undefined,
  selectedUser: undefined,
};

describe("GistListPage", async () => {
  beforeEach(() => {});

  it("Should render", () => {
    render(GistListPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [
          createTestingPinia({
            initialState,
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });
  });

  it("Should render correct total number of gists", async () => {
    const { getByText } = render(GistListPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [
          createTestingPinia({
            initialState,
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });
    const gistStore = useGistStore();
    await flushPromises();
    expect(gistStore.fetchGists).toHaveBeenCalledTimes(1);
    getByText("Showing 2 of 2 total gists");
  });

  it("Should call toggle when click on user", async () => {
    const { getByText, getByAltText } = render(GistListPage, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [
          createTestingPinia({
            initialState,
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });
    const gistStore = useGistStore();
    await flushPromises();
    getByText("Showing 2 of 2 total gists");
    const element = getByAltText(`user ${mockUser1.login}`);
    await fireEvent.click(element);
    expect(gistStore.toogleUser).toHaveBeenCalledTimes(1);
    getByText("Showing 1 of 2 total gists");
  });
});
