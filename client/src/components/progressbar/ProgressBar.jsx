import React, { useEffect, useState } from "react";
import styles from "./progressbar.module.css";

function ProgressBar({ isActive }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
          }
          return prevProgress + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
