import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");

  const menuList = [
    {
      id: 1,
      menu: "Dashboard",
      link: "/",
    },
    {
      id: 2,
      menu: "Users Management",
      link: "/users",
    },
  ];

  return (
    <div className="px-4 w-full py-4">
      {menuList.map((result) => {
        return (
          <Link href={result.link} key={result.menu} onClick={() => setActiveMenu(result.menu)}>
            <div className={`w-full py-3 px-6 my-4 duration-200 border ${activeMenu == result.menu ? 'bg-white border-transparent' : ' border-slate-500 text-slate-300 hover:bg-white hover:text-black hover:border-transparent'}`}>
              <span>{result.menu}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
