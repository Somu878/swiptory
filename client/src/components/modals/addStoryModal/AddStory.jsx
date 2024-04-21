import React, { useState } from "react";
import styles from "./addStory.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { categories } from "../../../utils/customs";

function AddStory({ action, modalClose }) {
  const initialSlides = [
    { name: "Slide 1" },
    { name: "Slide 2" },
    { name: "Slide 3" },
  ];
  const [slidesArray, setSlidesArray] = useState(initialSlides);
  const handleAddSlide = () => {
    if (slidesArray.length > 5) {
      return;
    }
    const newSlide = { name: `Slide ${slidesArray.length + 1}` };
    setSlidesArray([...slidesArray, newSlide]);
  };
  const handleRemoveSlide = (index) => {
    const updatedSlides = slidesArray.filter((_, i) => i !== index);
    setSlidesArray(updatedSlides);
  };
  return (
    <div className={styles.addStoryContainer}>
      {/* <span>cssa</span> */}
      <IoMdCloseCircleOutline
        size={40}
        color="#FF0000"
        className={styles.modalCloseIcon}
        onClick={modalClose}
      />
      <div className={styles.titleText}>Add Story to Feed</div>

      <div className={styles.formContainer}>
        <div className={styles.slidesContainer}>
          {slidesArray.map((slide, index) => (
            <button className={styles.slide} key={index}>
              {slide.name}
              {index > 2 && (
                <IoMdCloseCircleOutline
                  className={styles.slideCloseIcon}
                  size={20}
                  color="#FF0000"
                  onClick={() => handleRemoveSlide(index)}
                />
              )}
            </button>
          ))}
          <button className={styles.addSlideBtn} onClick={handleAddSlide}>
            Add +
          </button>
        </div>
        <div className={styles.storyForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="heading">Heading</label>
            <input
              type="text"
              name="heading"
              placeholder="Your heading"
              spellCheck={false}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="Story description"
              placeholder="Description"
              spellCheck={false}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Add Image url"
              spellCheck={false}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="category">Category</label>
            <select name="category">
              <option value="" disabled selected>
                Select Category
              </option>
              {categories.slice(1).map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.btnsContainer}>
            <div className={styles.btnGroup}>
              <button className={styles.previousBtn}>Previous</button>
              <button className={styles.nextBtn}>Next</button>
            </div>
            <button className={styles.postBtn}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStory;