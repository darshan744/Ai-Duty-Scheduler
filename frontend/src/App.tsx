import { RouterProvider } from "react-router";
//import ThemeButton from "./components/ui/ThemeButton";
import { ThemeProvider } from "./Context/ThemeContext/ThemeProvider";
import routes from "./Routes";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
