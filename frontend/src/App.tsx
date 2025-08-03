import { RouterProvider } from "react-router";
//import ThemeButton from "./components/ui/ThemeButton";
import { ThemeProvider } from "./Context/ThemeContext/ThemeProvider";
import routes from "./Routes";
import { Toaster } from "sonner";
function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
