import "./App.css";
//import ThemeButton from "./components/ui/ThemeButton";
import { ThemeProvider } from "./Context/ThemeContext/ThemeProvider";
import Auth from "./pages/Auth";
function App() {
  return (
  <ThemeProvider >
    <div className="flex flex-col min-h-screen justify-center items-center">
     <Auth /> 
    </div>
  </ThemeProvider>
  )
}

export default App;