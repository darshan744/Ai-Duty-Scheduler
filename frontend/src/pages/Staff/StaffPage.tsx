import Toolbar from "@/components/ui/toolbar";
import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

function StaffPage() {
  return (
    <>
      <Toolbar>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
           <Link to="/staff/schedule">Dashboard</Link> 
          </Button>
          <Button variant="ghost" size="sm">
            <Link to="/staff/profile">Profile</Link>
          </Button>
          <Button variant="destructive" size="sm">
            <Link to="">Logout</Link>
          </Button>
        </div>
      </Toolbar>
      <Outlet />
    </>
  );
}

export default StaffPage;
