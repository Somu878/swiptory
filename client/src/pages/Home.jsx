import React, { useState } from "react";
import styles from "./home.module.css";
import { categories } from "../utils/customs";
import CategoryCard from "../components/categoryCard/CategoryCard";
import { Toaster } from "react-hot-toast";
function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (name) => {
    setActiveCategory(name);
  };

  return (
    <div className={styles.home}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.categoryContainer}>
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            image={category.imageSrc}
            name={category.name}
            active={activeCategory === category.name}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
