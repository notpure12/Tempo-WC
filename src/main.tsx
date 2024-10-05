import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import History from "./pages/History.tsx";
import Homepage from "./pages/Homepage.tsx";
import Errorpage from "./pages/Errorpage.tsx";
import Ttest from "./testing/test.tsx";

const homepage = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <Errorpage />,
  },
  {
    path: "/history",
    element: <History />,
    errorElement: <Errorpage />,
  },
  {
    path: "/test",
    element: <Ttest />,
    errorElement: <Errorpage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={homepage}></RouterProvider>
  </StrictMode>
);
