import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import GistDetailPage from "./GistDetailPage.vue";
import { useGistStore } from "../store";
import { RouterLinkStub, flushPromises } from "@vue/test-utils";
import { mockGists } from "../../__mocks__/gistState";

const initialState = {
  loading: false,
  gists: [],
  selectedGist: undefined,
  selectedUser: undefined,
};
const mockGist = mockGists[0];

const routerPushMock = vi.fn();

vi.mock("vue-router", () => {
  return {
    useRouter: () => ({
      push: routerPushMock,
    }),
    useRoute: () => ({
      params: {
        id: mockGists[0].id,
      },
    }),
  };
});

describe("GistDetailPage", async () => {
  beforeEach(() => {});

  it("Should render", () => {
    render(GistDetailPage, {
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

  it("Should render title", async () => {
    const { getByText } = render(GistDetailPage, {
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
    await flushPromises();
    const gistStore = useGistStore();
    expect(gistStore.fetchGistById).toHaveBeenCalledTimes(1);
    expect(getByText(mockGist.description)).toBeInTheDocument();
  });

  it("Should render all files", async () => {
    const { getByDisplayValue } = render(GistDetailPage, {
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
    await flushPromises();
    for (const filename in mockGist.files) {
      const file = mockGist.files[filename];
      expect(getByDisplayValue(file.filename)).toBeInTheDocument();
      expect(getByDisplayValue(file.content)).toBeInTheDocument();
    }
  });

  it("Should redirect after clicks on edit", async () => {
    const { getByText } = render(GistDetailPage, {
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
    const button = getByText("Edit");
    fireEvent.click(button);
    expect(routerPushMock).toBeCalledTimes(1);
  });
});
