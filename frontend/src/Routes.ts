import { createBrowserRouter } from "react-router";
import Auth from "./pages/Auth";
import StaffSchedulePage from "./pages/Staff/StaffSchedulePage";
import StaffPage from "./pages/Staff/StaffPage";
import StaffProfilePage from "./pages/Staff/StaffProfile";
import AdminPage from "./pages/Admin/AdminPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProfile from "./pages/Admin/AdminProfile";

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
  {
    path: "admin",
    Component: AdminPage,
    children: [
      {
        path: "dashboard",
        Component: AdminDashboard,
      },
      {
        path: "profile",
        Component: AdminProfile,
      },
    ],
  },
]);

export default routes;
