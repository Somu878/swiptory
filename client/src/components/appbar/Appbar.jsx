import React, { useContext, useState } from "react";
import styles from "./appbar.module.css";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../layouts/Applayout";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdBookmark } from "react-icons/io";
import profile from "../../assets/user.png";
function Appbar({ loggedIn, username }) {
  const navigate = useNavigate();
  const setloading = useContext(LoadingContext);
  const [logoutBox, setlogoutBox] = useState(false);
  const [mobileMenu, setmobileMenu] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    setloading(true);
    setTimeout(() => {
      setlogoutBox(false);
      setloading(false);
      setmobileMenu(false);
    }, 4000);
  };
  return (
    <div className={styles.appbar}>
      <div className={styles.title}>SwipTory</div>
      <div className={styles.btnGroup}>
        {loggedIn ? (
          <>
            <button className={styles.bookmarkBtn}>
              <IoMdBookmark size={"13.5px"} /> Bookmarks
            </button>
            <button className={styles.addStoryBtn}>Add Story</button>
            <img
              className={styles.profileImg}
              src={profile}
              alt="profile"
              width={37}
              height={37}
            />
            <RxHamburgerMenu
              size={"30px"}
              style={{ marginTop: "5px" }}
              onClick={() => setlogoutBox(!logoutBox)}
            />
          </>
        ) : (
          <>
            <button className={styles.registerBtn}>Register Now</button>
            <button className={styles.loginBtn}>Sign in</button>
          </>
        )}
      </div>
      {logoutBox ? (
        <div className={styles.logoutBox}>
          <div>{username}s</div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Log out
          </button>
        </div>
      ) : (
        <></>
      )}
      <div>
        <RxHamburgerMenu
          size={"33px"}
          style={{ marginTop: "12px", marginRight: "10px" }}
          onClick={() => setmobileMenu(!mobileMenu)}
        />
        {mobileMenu ? (
          <div>
            {loggedIn ? (
              <div className={styles.mobileMenu}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "40px",
                  }}
                >
                  <img
                    className={styles.profileImg}
                    src={profile}
                    alt="profile"
                    width={37}
                    height={37}
                  />
                  <div>{username}s</div>
                </div>
                <button className={styles.addStoryBtn}>My Stories</button>
                <button className={styles.addStoryBtn}>Add Story</button>
                <button className={styles.bookmarkBtn}>
                  <IoMdBookmark size={"13.5px"} /> Bookmarks
                </button>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Log out
                </button>
              </div>
            ) : (
              <div className={styles.mobileMenu}>
                <button className={styles.registerBtn}>Register Now</button>
                <button className={styles.loginBtn}>Sign in</button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Appbar;
