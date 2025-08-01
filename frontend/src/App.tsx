import { RouterProvider } from "react-router";
//import ThemeButton from "./components/ui/ThemeButton";
import { ThemeProvider } from "./Context/ThemeContext/ThemeProvider";
import routes from "./Routes";


function App() {
  return (
  <ThemeProvider >
    <RouterProvider router={routes} />
  </ThemeProvider>
  )
}

export default App;
