import { createBrowserRouter } from "react-router";
import Auth from "./pages/Auth";
import ProfilePage from "./pages/Profile";

const routes = createBrowserRouter([
  {
    path: "",
    Component: Auth,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
]);

export default routes;
