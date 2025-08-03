import { Button } from "@/components/ui/button";
import Toolbar from "@/components/ui/toolbar";

function StaffDashboard() {
  return (
    <>
      <Toolbar>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            Dashboard
          </Button>
          <Button variant="ghost" size="sm">
            Profile
          </Button>
          <Button variant="destructive" size="sm">
            Logout
          </Button>
        </div>
      </Toolbar>
    </>
  );
}

export default StaffDashboard;
