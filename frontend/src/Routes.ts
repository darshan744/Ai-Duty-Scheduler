import { createBrowserRouter  } from "react-router";
import Auth from "./pages/Auth";

const routes = createBrowserRouter([
    {
        path:"",
        Component:Auth
    }
])

export default routes