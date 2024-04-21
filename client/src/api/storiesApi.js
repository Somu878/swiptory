import axiosClient from "./AxiosClient";
const storyApi = {
  addStory: (params) => axiosClient.get("stories/add", params),
};
export default storyApi;
