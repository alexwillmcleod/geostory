import { Outlet } from "react-router";

const Page = () => {
  return (
    <div className="h-screen">
      <div className="bg-[#586BA4] w-full border-2 h-24" />
      <Outlet />
    </div>
  );
};

export default Page;
