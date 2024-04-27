import React, { useEffect, useState } from "react";
import styles from "./viewStory.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import storyApi from "../../api/storiesApi";
import { GoHeartFill } from "react-icons/go";
import { IoBookmark } from "react-icons/io5";
import debounce from "lodash/debounce";
import toast from "react-hot-toast";
import ProgressBar from "../progressbar/ProgressBar";

function ViewStory({ storyId, modalClose }) {
  const [storyData, setstoryData] = useState(null);
  const [slides, setslides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const debouncedBookmark = debounce(async () => {
    if (storyData) {
      await storyApi.bookmarkStory(storyData._id);
    }
  }, 500);
  const debouncedLike = debounce(async () => {
    if (storyData) {
      await storyApi.likeStory(storyData._id);
    }
  }, 500);
  const fetchStoryData = async () => {
    const res = await storyApi.getStory(storyId);
    setstoryData(res);
    setslides(res?.slides);
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
  const handleLike = async () => {
    const newLikedState = !storyData.liked;
    setstoryData((prevData) => ({
      ...prevData,
      liked: newLikedState,
      likes: newLikedState
        ? [...prevData.likes, "newLike"]
        : prevData.likes.filter(
            (like, index) => index !== prevData.likes.length - 1
          ),
    }));
    debouncedLike();
  };

  const handleBookmark = async () => {
    setstoryData((prevData) => ({
      ...prevData,
      bookmarked: !prevData.bookmarked,
    }));
    debouncedBookmark();
  };
  const handleProgressComplete = () => {
    setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
    // setCurrentSlideIndex((prev) => {
    //   const nextIndex = slides.length - 1 ? prev : prev + 1;
    //   return nextIndex;
    // });
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
        <div>
          <div className={styles.progressbarContainer}>
            {slides.map((slide, index) => (
              <ProgressBar
                key={index}
                isActive={index === currentSlideIndex}
                isCompleted={index < currentSlideIndex}
                onComplete={handleProgressComplete}
              />
            ))}
          </div>
          <div className={styles.iconsGroup}>
            <IoClose
              size={35}
              className={styles.closeIcon}
              onClick={modalClose}
            />
            <LuSend size={26} className={styles.shareIcon} />
          </div>
        </div>
        <div style={{ padding: "0.4rem" }}>
          <h3>{slides[currentSlideIndex].title}</h3>
          <p className={styles.description}>
            {slides[currentSlideIndex].description}
          </p>
          <div className={styles.iconsGroup}>
            <div>
              {storyData.bookmarked ? (
                <IoBookmark color="blue" size={30} onClick={handleBookmark} />
              ) : (
                <IoBookmark size={30} onClick={handleBookmark} />
              )}
            </div>
            <div className={styles.likeContainer}>
              {storyData?.liked ? (
                <GoHeartFill color="red" size={30} onClick={handleLike} />
              ) : (
                <GoHeartFill size={30} onClick={handleLike} />
              )}
              <span>{storyData?.likes?.length}</span>
            </div>
          </div>
        </div>
        <div className={styles.arrowLeft} onClick={handlePreviousSlide}></div>
        <div className={styles.arrowRight} onClick={handleNextSlide}></div>
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
