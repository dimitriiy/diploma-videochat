import { createBrowserRouter } from "react-router-dom";
import { Main } from "@/pages/Main";
import { Meet } from "@/pages/Meet";
import { Settings } from "@/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/meet",
    element: <Meet />,
  },
  {
    path: "/settings/:id",
    element: <Settings />,
  },

  {
    path: "/login",
    element: <div>Login</div>,
  },
  {
    path: "/register",
    element: <div>register</div>,
  },
]);
