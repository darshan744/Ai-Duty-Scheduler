import { createBrowserRouter } from "react-router";
import Auth from "./pages/Auth";
import StaffSchedulePage from "./pages/Staff/StaffSchedule";
import StaffPage from "./pages/Staff/StaffPage";
import StaffProfilePage from "./pages/Staff/StaffProfile";
import AdminPage from "./pages/Admin/AdminPage";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import AdminProfile from "./pages/Admin/AdminProfile";
import Scheduler from "./pages/Admin/Scheduler";

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
        Component: StaffProfilePage,
      },
      {
        path: "schedule",
        Component: Scheduler,
      },
    ],
  },
]);

export default routes;
