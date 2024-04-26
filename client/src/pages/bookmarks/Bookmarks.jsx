import React from "react";
import styles from "./bookmarks.module.css";
import storyApi from "../../api/storiesApi";

function Bookmarks() {
  const [storyData, setstoryData] = useState([]);
  const fetchMyBookmarks = async () => {
    try {
      const res = await storyApi.getMyBookmarks();
      setstoryData(res?.stories);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.bookmarksContainer}>
      <div>My Bookmarks</div>
    </div>
  );
}

export default Bookmarks;
