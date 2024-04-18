import React, { createContext, useState } from "react";
import Loader from "../components/loaders/Loader";
import { Outlet, useNavigate } from "react-router-dom";
import Appbar from "../components/appbar/Appbar";
export const LoadingContext = createContext();
function Applayout() {
  const [loading, setloading] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <LoadingContext.Provider value={setloading}>
        <Loader active={loading}>
          <Appbar loggedIn={true} />
          {<Outlet />}
        </Loader>
      </LoadingContext.Provider>
    </div>
  );
}

export default Applayout;
