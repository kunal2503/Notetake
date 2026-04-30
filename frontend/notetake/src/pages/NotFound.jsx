import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 text-center">
      
      {/* Big 404 */}
      <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 tracking-tight">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
        Oops! Page not found
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        The page you're looking for doesn’t exist or has been moved.
        Try going back or return to the homepage.
      </p>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow"
        >
          <Home size={18} />
          Go Home
        </Link>
      </div>

      {/* Footer Branding */}
      <p className="mt-10 text-sm text-gray-400">
        NoteTake © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default NotFound;