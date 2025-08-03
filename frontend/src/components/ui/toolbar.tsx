import type React from "react";

function Toolbar({ children }: React.ComponentProps<"div">) {
  return (
    <>
      <div className="flex gap-3 p-4 items-center justify-between">
        {/** left part */}
        <div>
          <h1 className="font-bold text-xl">Duty Scheduler</h1>
        </div>
        {/**  Right part    */}
        <div>{children}</div>
      </div>
    </>
  );
}

export default Toolbar;
