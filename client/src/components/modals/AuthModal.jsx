import React, { useContext, useState } from "react";
import styles from "./authModal.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { LoginUser, RegisterUser } from "../../api/authApi";
import { LoadingContext } from "../../layouts/Applayout";
function AuthModal({ action, closeModal }) {
  const { setloggedIn } = useContext(LoadingContext);
  const [showPassord, setshowPassord] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      let response;
      if (action === "Login") {
        response = await LoginUser(username, password);
      } else {
        response = await RegisterUser(username, password);
      }
      if (response.status === 400) {
        seterror("Invalid password");
      } else if (response.status === 404) {
        seterror("No account found.Please register or try different inputs");
      } else if (response.status === 200) {
        closeModal();
        localStorage.setItem("token", response?.data?.token);
        setloggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.authModalContainer}>
      <IoMdCloseCircleOutline
        size={"35px"}
        color="#FF0000"
        className={styles.closeIcon}
        onClick={closeModal}
      />
      <div style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
        {action} to SwipTory
      </div>
      <form>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            spellCheck={false}
            required
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassord ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            required
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          {showPassord ? (
            <IoMdEyeOff
              size={"20px"}
              className={styles.eyeIcon}
              onClick={() => setshowPassord(!showPassord)}
            />
          ) : (
            <IoMdEye
              size={"20px"}
              className={styles.eyeIcon}
              onClick={() => setshowPassord(!showPassord)}
            />
          )}
        </div>
        <span className={styles.errorSpan}>{error}</span>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          {action}
        </button>
      </form>
    </div>
  );
}

export default AuthModal;
