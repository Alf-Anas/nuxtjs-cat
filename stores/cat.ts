import { API } from "~/constants/api";
import {
  Daum,
  GetSearchCatResponse,
  Meta,
} from "interfaces/get-search-cat.interface";
import { defineStore } from "pinia";

export const useCatStore = defineStore("cat", {
  state: () => ({
    raw: null as GetSearchCatResponse | null,

    meta: {} as Meta,
    list: [] as Daum[],
    isLoading: false as boolean,
    message: "" as string,

    query: "" as string,
    page: 1 as number,
  }),

  getters: {},

  actions: {
    async searchCat(search: string) {
      const $nuxt = useNuxtApp();

      this.isLoading = true;
      this.raw = null;
      this.list = [];
      this.meta = {} as Meta;
      this.message = "";
      this.page = 1;

      return $nuxt.$api
        .get(API.GET.SEARCH_CAT, {
          params: {
            search,
            page: 1,
          },
        })
        .then((res) => {
          this.raw = res.data;
          this.list = res.data?.data?.data || [];
          this.meta = res.data?.data?.meta || {};
          if (
            Array.isArray(res.data?.data?.data) &&
            res.data?.data?.data?.length > 0
          ) {
            this.message = "OK";
          } else {
            this.message = "No Data";
          }
        })
        .catch((err) => {
          console.error(err);
          this.message = "Error";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    async loadMoreCat(page: number) {
      const $nuxt = useNuxtApp();
      this.isLoading = true;

      return $nuxt.$api
        .get(API.GET.SEARCH_CAT, {
          params: {
            search: this.query,
            page,
          },
        })
        .then((res) => {
          if (
            Array.isArray(res.data?.data?.data) &&
            res.data?.data?.data?.length > 0
          ) {
            const nData = res.data?.data?.data || [];
            this.list.push(...nData);
            this.message = "OK";
          } else {
            this.message = "No More Data";
          }
        })
        .catch((err) => {
          console.error(err);
          this.message = "Error";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async addCat(
      name: string,
      age: number,
      breed: string,
      color: string,
      file1: File,
      file2: File
    ) {
      const $nuxt = useNuxtApp();
      this.isLoading = true;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", String(age));
      formData.append("breed", breed);
      formData.append("color", color);
      formData.append("images[0]", file1);
      formData.append("images[1]", file2);

      return $nuxt.$api
        .post(API.POST.CREATE_CAT, formData)
        .then(() => {
          this.searchCat(this.query);
        })
        .catch((err) => {
          console.error(err);
          this.message = "Error";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
});
