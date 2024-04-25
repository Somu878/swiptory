import React, { useEffect, useState } from "react";
import styles from "./viewStory.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import storyApi from "../../api/storiesApi";
import toast from "react-hot-toast";

function ViewStory({ storyId, modalClose }) {
  const [storyData, setstoryData] = useState(null);
  const [slides, setslides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const fetchStoryData = async () => {
    const res = await storyApi.getStory(storyId);
    setstoryData(res);
    setslides(res?.story?.slides);
  };
  useEffect(() => {
    fetchStoryData();
  }, []);
  if (slides.length === 0) {
    return <div></div>;
  }
  const handlePreviousSlide = () => {
    setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      Math.min(prevIndex + 1, slides.length - 1)
    );
  };

  return (
    <div className={styles.ViewCardContainer}>
      <FaAngleLeft
        size={90}
        className={styles.arrow1}
        onClick={handlePreviousSlide}
      />
      <div
        className={styles.viewStoryCard}
        style={{
          backgroundImage: ` linear-gradient(0deg, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 40%), linear-gradient(rgb(0, 0, 0) 14%, rgba(0, 0, 0, 0) 30%), url(${slides[currentSlideIndex].imageURL})`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div> laoding bar</div>
          <div className={styles.iconsGroup}>
            <IoClose
              size={35}
              className={styles.closeIcon}
              onClick={modalClose}
            />
            <LuSend size={25} className={styles.shareIcon} />
          </div>
        </div>
        <div>
          <h4>{slides[currentSlideIndex].title}</h4>
          <p>{slides[currentSlideIndex].description}</p>
        </div>
      </div>
      <FaAngleRight
        size={90}
        className={styles.arrow2}
        onClick={handleNextSlide}
      />
    </div>
  );
}

export default ViewStory;
