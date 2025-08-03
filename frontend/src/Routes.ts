import { createBrowserRouter } from "react-router";
import Auth from "./pages/Auth";
import StaffSchedulePage from "./pages/Staff/StaffSchedulePage";
import StaffPage from "./pages/Staff/StaffPage";
import StaffProfilePage from "./pages/Staff/StaffProfile";

const routes = createBrowserRouter([
  {
    path: "",
    Component: Auth,
  },
  {
    path: "staff",
    Component: StaffPage,
    children: [
      {
        path: "schedule",
        Component: StaffSchedulePage,
      },
      {
        path: "profile",
        Component: StaffProfilePage,
      },
    ],
  },
]);

export default routes;
