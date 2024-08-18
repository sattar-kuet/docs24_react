import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ title, children }) {
  // states
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <main>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="md:ml-[16rem]">
        <Header
          title={title}
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
        <div className="p-3 lg:p-5">{children}</div>
      </div>
    </main>
  );
}
