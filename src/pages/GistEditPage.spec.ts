import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import GistEditPage from "./GistEditPage.vue";
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
        id: mockGist.id,
      },
    }),
  };
});

describe("GistEditPage", async () => {
  beforeEach(() => {});

  it("Should render", async () => {
    const { getAllByLabelText } = render(GistEditPage, {
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
    const titles = getAllByLabelText("file name");
    const contents = getAllByLabelText("file content");
    expect(titles).toHaveLength(Object.keys(mockGist.files).length);
    expect(contents).toHaveLength(Object.keys(mockGist.files).length);

    let i = 0;
    for (const filename in mockGist.files) {
      const file = mockGist.files[filename];
      const title = titles[i] as HTMLInputElement;
      const content = contents[i] as HTMLTextAreaElement;
      expect(title.value).toBe(file.filename);
      expect(content.value).toBe(file.content);
      i++;
    }
  });

  it("Should call save after clicking on save", async () => {
    const { getByText, getAllByLabelText } = render(GistEditPage, {
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
    const titles = getAllByLabelText("file name");
    const contents = getAllByLabelText("file content");
    expect(titles).toHaveLength(Object.keys(mockGist.files).length);
    expect(contents).toHaveLength(Object.keys(mockGist.files).length);

    const firstTitle = titles[0] as HTMLInputElement;
    const originalFilename = firstTitle.value;
    fireEvent.update(firstTitle, "RandomTesting.txt");
    const firstContent = contents[0];
    fireEvent.update(firstContent, "My file content");
    const button = getByText("Save");
    fireEvent.click(button);

    expect(gistStore.selectedGist?.files[originalFilename].filename).toBe(
      "RandomTesting.txt"
    );
    expect(gistStore.selectedGist?.files[originalFilename].content).toBe(
      "My file content"
    );

    expect(gistStore.updateGist).toBeCalledTimes(1);
  });
});
