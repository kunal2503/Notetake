import { Link } from "react-router-dom";



const NotFound = () => {
    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <span className="font-bold animate-bounce text-8xl text-black">404</span>
            <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
            <Link to={"/"} className="mt-4 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors">
                Go Home
            </Link>
        </div>
    )
}

export default NotFound;