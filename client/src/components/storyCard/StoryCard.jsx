import React from "react";
import styles from "./storyCard.module.css";
import { FiEdit } from "react-icons/fi";
function StoryCard({ title, description, image, editable }) {
  return (
    <div
      className={styles.storyCard}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0) 50%), url(${image})`,
      }}
    >
      <div className={styles.storyData}>
        {/* <img src={image} alt="" /> */}
        <div className={styles.storyTitle}>{title}</div>
        <div className={styles.storyDescription}>{description}</div>
      </div>
      {editable && (
        <button className={styles.editBtn}>
          <FiEdit /> Edit
        </button>
      )}
    </div>
  );
}

export default StoryCard;
