import axiosClient from "./AxiosClient";
const storyApi = {
  addStory: (params) => axiosClient.post("stories/add", params),
  getStory: (id) => axiosClient.get(`stories/story-by-id/${id}`),
};
export default storyApi;
