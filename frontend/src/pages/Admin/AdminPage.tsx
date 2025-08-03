import { Button } from "@/components/ui/button";
import Toolbar from "@/components/ui/toolbar";
import { Link, Outlet } from "react-router";

export default function AdminPage() {
  return (
    <>
      <Toolbar>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Link to="/admin/schedule">Schedule</Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Link to="/admin/profile">Profile</Link>
          </Button>
          <Button variant="destructive" size="sm">
            <Link to="/">Logout</Link>
          </Button>
        </div>
      </Toolbar>
      <Outlet />
    </>
  );
}
