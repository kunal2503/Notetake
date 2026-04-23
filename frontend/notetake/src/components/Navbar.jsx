import {LayoutDashboard,LogOut,LucideStickyNote, Settings, MenuIcon, X} from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";


const Navbar = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleSideBarOpen = () =>{
        setSideBarOpen(!sideBarOpen);
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <h1 className="font-bold text-2xl text-gray-800">NoteTake</h1>
                <ul className="hidden md:flex items-center justify-center gap-6">
                    <li className="flex items-center justify-center  px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <Link className="flex items-center justify-center gap-2" to={"/dashboard"}>
                        <LayoutDashboard className="text-gray-600" size={20} />
                        <span className="font-medium text-gray-700">Dashboard</span>
                        </Link>
                    </li>
                    <li className="flex items-center justify-center px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <Link className="flex items-center justify-center gap-2" to={"/"}>
                        <LucideStickyNote className="text-gray-600" size={20} />
                        <span className="font-medium text-gray-700">Notes</span>
                        </Link>
                    </li>
                    <li className="flex items-center justify-center px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <Link className="flex items-center justify-center gap-2" to={"/setting"}>
                        <Settings className="text-gray-600" size={20} />
                        <span className="font-medium text-gray-700">Settings</span>
                        </Link>
                    </li>
                    <li className="flex items-center justify-center px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer">
                        <Link className="flex items-center justify-center gap-2" to={"/logout"}>
                            <LogOut className="text-gray-600" size={20} />
                            <span className="font-medium text-gray-700">Logout</span>
                        </Link>
                    </li>
                </ul>
                {/* Mobile menu button - for simplicity, assuming no toggle state yet */}
                <button className="md:hidden text-gray-600" onClick={handleSideBarOpen}>
                    {sideBarOpen ? <X className="text-gray-600" size={20} /> :

                        <MenuIcon  className="text-gray-600" size={20} />
                    }
                </button>
                { sideBarOpen ?
                     <SideBar sideBarOpen={sideBarOpen}/> : null
                }
            </div>
        </nav>
    )
}

export default Navbar;