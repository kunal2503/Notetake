import {
  LayoutDashboard,
  LogOut,
  StickyNote,
  Settings,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const closeSidebar = () => setSideBarOpen(false);

  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition";

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          sideBarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 p-5 transform transition-transform duration-300 ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-blue-600">
            NoteTake
          </h2>
          <button onClick={closeSidebar}>
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navItem} ${
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
            to="/"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navItem} ${
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
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <NavLink
            to="/logout"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default SideBar;