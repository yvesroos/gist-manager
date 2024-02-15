import { defineStore } from "pinia";
import apiClient from "../services/apiClient";
import { Gist, GistDetail, User } from "../types";

interface GistState {
  gists: Gist[];
  selectedGist?: GistDetail;
  selectedUser?: number;
  loading: boolean;
}

const useGistStore = defineStore("gist", {
  state: (): GistState => ({
    loading: false,
    gists: [],
    selectedGist: undefined,
    selectedUser: undefined,
  }),
  actions: {
    toogleUser(userId?: number) {
      this.selectedUser = this.selectedUser !== userId ? userId : undefined;
    },
    addNewFile() {
      if (this.selectedGist) {
        const randomName = (Math.random() + 1).toString(36).substring(2);
        this.selectedGist.files[randomName] = {
          filename: "new.txt",
          content: "// empty",
        };
      }
    },
    async fetchGists() {
      try {
        this.gists = [];
        this.loading = true;
        const response = await apiClient.get<Gist[]>("");
        this.gists = response;
      } catch (error) {
        console.error("Error fetching gists:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchGistById(id: string) {
      try {
        const response = await apiClient.get<GistDetail>(`/${id}`);
        this.selectedGist = response;
      } catch (error) {
        console.error(`Error fetching gist ID ${id}:`, error);
      }
    },

    async updateGist() {
      try {
        const updatedFiles = Object.entries(
          this.selectedGist?.files || {}
        ).reduce(
          (files, [fileName, { content, filename }]) => ({
            ...files,
            [fileName]: { filename, content },
          }),
          {}
        );
        if (this.selectedGist) {
          const response = await apiClient.patch<GistDetail>(
            `/${this.selectedGist.id}`,
            {
              files: updatedFiles,
            }
          );
          this.selectedGist = response;
        }
      } catch (error) {
        console.error(
          `Error editing gist ID ${this?.selectedGist?.id}:`,
          error
        );
      }
    },
  },
  getters: {
    users: (state) => {
      return state.gists.reduce<Record<string, User>>((users, gist) => {
        return { ...users, [gist.owner.id]: gist.owner };
      }, {});
    },
    gistsBySelectedUser: (state) => {
      return !state.selectedUser
        ? state.gists
        : state.gists.filter((gist) => gist.owner.id === state.selectedUser);
    },
  },
});

export default useGistStore;
