import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import SuspenseLoader from "./components/loaders/SuspenseLoader";
import MyStories from "./pages/my stories/MyStories";
const AppLayout = lazy(() => import("./layouts/Applayout"));
const Home = lazy(() => import("./pages/home/Home"));
const Bookmarks = lazy(() => import("./pages/bookmarks/Bookmarks"));
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
          <Route path="/my-bookmarks" element={<Bookmarks />} />
          <Route path="/my-stories" element={<MyStories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
