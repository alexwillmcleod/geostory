import { Outlet } from "react-router";

const Page = () => {
  return (
    <>
      <div className="bg-[#586BA4] w-full border-2 h-24" />
      <Outlet />
    </>
  );
};

export default Page;
