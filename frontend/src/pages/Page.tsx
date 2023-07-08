import { Outlet } from "react-router";
import Header from "../components/HeaderBar";

const Page = () => {
  return (
    <div className="h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Page;
