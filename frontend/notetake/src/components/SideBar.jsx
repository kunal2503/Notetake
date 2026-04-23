import {LayoutDashboard,LogOut,LucideStickyNote, Settings, MenuIcon, X} from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({sideBarOpen}) => {
  return (
    <div className="md:hidden absolute top-20 right-10 bg-gray-50 rounded-lg ">
      <ul className="flex flex-col items-center justify-start w-full">
        <li className="flex items-center justify-start w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Link
            className="flex items-center justify-start gap-2"
            to={"/dashboard"}
          >
            <LayoutDashboard className="text-gray-600" size={20} />
            <span className="font-medium text-gray-700">Dashboard</span>
          </Link>
        </li>
        <li className="flex items-center justify-start w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Link className="flex items-center justify-start gap-2" to={"/"}>
            <LucideStickyNote className="text-gray-600" size={20} />
            <span className="font-medium text-gray-700">Notes</span>
          </Link>
        </li>
        <li className="flex items-center justify-start w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Link
            className="flex items-center justify-start gap-2"
            to={"/setting"}
          >
            <Settings className="text-gray-600" size={20} />
            <span className="font-medium text-gray-700">Settings</span>
          </Link>
        </li>
        <li className="flex items-center justify-start w-full px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
          <Link
            className="flex items-center justify-start gap-2"
            to={"/logout"}
          >
            <LogOut className="text-gray-600" size={20} />
            <span className="font-medium text-gray-700">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
