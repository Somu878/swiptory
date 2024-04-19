import React, { useContext, useEffect, useState } from "react";
import styles from "./appbar.module.css";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../layouts/Applayout";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdBookmark } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import profile from "../../assets/user.png";
import Modal from "react-modal";
import AuthModal from "../modals/AuthModal";
import { customStyles } from "../../utils/customs";
function Appbar() {
  const navigate = useNavigate();
  const { setloading, settrigger, user, loggedIn, setloggedIn } =
    useContext(LoadingContext);
  const [logoutBox, setlogoutBox] = useState(false);
  const [mobileMenu, setmobileMenu] = useState(false);
  const [authModal, setauthModal] = useState(false);
  const [authAction, setauthAction] = useState(null);
  const handleLogout = () => {
    setloading(true);
    localStorage.clear();
    settrigger((prev) => prev + 1);
    setlogoutBox(false);
    setloggedIn(false);
    setloading(false);
    setmobileMenu(false);
  };
  return (
    <div className={styles.appbar}>
      <div className={styles.title} onClick={() => navigate("/")}>
        SwipTory
      </div>
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
            <button
              className={styles.registerBtn}
              onClick={() => {
                setauthAction("Register");
                setauthModal(true);
              }}
            >
              Register Now
            </button>
            <button
              className={styles.loginBtn}
              onClick={() => {
                setauthAction("Login");
                setauthModal(true);
              }}
            >
              Sign in
            </button>
          </>
        )}
      </div>
      {logoutBox ? (
        <div className={styles.logoutBox}>
          <div className={styles.userName}>{user}</div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Log out
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.mobileham}>
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
                  <div className={styles.userName}>{user}</div>
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
                <button
                  className={styles.registerBtn}
                  onClick={() => {
                    setauthAction("Register");
                    setauthModal(true);
                  }}
                >
                  Register Now
                </button>
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    setauthAction("Login");
                    setauthModal(true);
                  }}
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Modal
        isOpen={authModal}
        style={customStyles}
        onRequestClose={() => {
          setauthModal(false);
        }}
        ariaHideApp={false}
      >
        <AuthModal action={authAction} closeModal={() => setauthModal(false)} />
      </Modal>
    </div>
  );
}

export default Appbar;
