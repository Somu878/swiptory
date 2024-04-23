import React, { useEffect, useState, useContext } from "react";
import styles from "./storiesContainer.module.css";
import StoryCard from "../storyCard/StoryCard";
import storyApi from "../../api/storiesApi";
import { LoadingContext } from "../../layouts/Applayout";
function StoriesContainer({ category, loggedIn }) {
  const { setloading } = useContext(LoadingContext);
  const [showMoreBtn, setshowMoreBtn] = useState(false);
  const [storyData, setstoryData] = useState([]);
  const fetchStories = async () => {
    try {
      const res = await storyApi.getStoriesByCategory(category, 1);
      setloading(true);
      setTimeout(() => {
        setloading(false);
        setstoryData(res?.stories);
        if (res?.remainingStories !== 0) {
          setshowMoreBtn(true);
        }
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStories();
  }, [category]);
  return (
    <div className={styles.storiesContainer}>
      <div className={styles.title}>Top Stories about {category}</div>
      {storyData.length > 0 ? (
        <div className={styles.cardsContainer}>
          {storyData.map((story) => (
            <StoryCard
              key={story._id}
              title={story.slides[0].title}
              description={story.slides[0].description}
              image={story.slides[0].imageURL}
              editable={story.editable}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noDataDiv}>No stories Available</div>
      )}

      {showMoreBtn && <button className={styles.showMoreBtn}>Show more</button>}
    </div>
  );
}

export default StoriesContainer;
