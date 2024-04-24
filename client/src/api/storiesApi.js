import axiosClient from "./AxiosClient";
const storyApi = {
  addStory: (params) => axiosClient.post("stories/add", params),
  updateStory: (id, params) =>
    axiosClient.patch(`stories/update/${id}`, params),
  getStory: (id) => axiosClient.get(`stories/story-by-id/${id}`),
  getMyStories: (page) => axiosClient.get(`stories/my-story?page=${page}`),
  getStoriesByCategory: (category, page) =>
    axiosClient.get(
      `stories/story-by-category?category=${category}&page=${page}`
    ),
};
export default storyApi;
