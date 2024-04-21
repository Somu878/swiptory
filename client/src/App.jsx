import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import SuspenseLoader from "./components/loaders/SuspenseLoader";
const AppLayout = lazy(() => import("./layouts/Applayout"));
const Home = lazy(() => import("./pages/Home"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <AppLayout />
            </Suspense>
          }
          path="/"
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
