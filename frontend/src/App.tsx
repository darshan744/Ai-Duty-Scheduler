import { RouterProvider } from "react-router";
import { ThemeProvider } from "./Context/ThemeContext/ThemeProvider";
import routes from "./Routes";
import { Toaster } from "sonner";
function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-right" />
      {/* <ProfilePage /> */}
      {/* <StaffDashboard /> */}
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
