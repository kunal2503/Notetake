import {
  LayoutDashboard,
  LogOut,
  StickyNote,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SideBar from "./SideBar";

const Navbar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const navLinkClass =
    "flex items-center gap-2 px-3 py-2 rounded-lg transition";

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          
          {/* Logo */}
          <h1 className="font-bold text-2xl text-blue-600 tracking-tight">
            NoteTake
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-4">
            
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/Notes"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <StickyNote size={18} />
              Notes
            </NavLink>

            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `${navLinkClass} ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>

            {/* Logout */}
            <NavLink
              to="/logout"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </NavLink>
          </ul>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={toggleSidebar}
          >
            {sideBarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sideBarOpen && (
        <div className="fixed inset-0 z-40 flex">
          
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar */}
          <div className="relative z-50 w-64 bg-white h-full shadow-lg animate-slideIn">
            <SideBar />
          </div>
        </div>
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
          .animate-slideIn {
            animation: slideIn 0.25s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;