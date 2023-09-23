import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";

type RoleData = {
  id: number;
  role_name: string;
};

type UserData = {
  active: boolean;
  created_at: string;
  email: string;
  updated_at: string;
  username: string;
  role: RoleData
};

const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userData, setUserData] = useState<UserData>();

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: (
        <Link
          href={"/auth/login"}
          legacyBehavior
          onClick={() => localStorage.removeItem("token")}
        >
          <a>Logout</a>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwt.decode(token as string) as JwtPayload;
    setUserData(decode?.data)
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-between">
      <div className="w-96 flex justify-center items-center bg-primary-color text-white">
        <h1 className="text-2xl font-black">Library Book</h1>
      </div>
      <div
        style={{
          width: "calc(100% - 384px)",
        }}
        className="flex items-center px-8 justify-between"
      >
        <span className="">
          {moment(currentDate).format("dddd, D MM YYYY, HH:mm")} WIB
        </span>
        <Dropdown menu={{ items }} placement="bottomRight">
          <p className="cursor-pointer">{userData?.username}</p>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
