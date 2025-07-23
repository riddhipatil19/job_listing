import { Link } from "react-router-dom"
import useThemeStore from "../store/themeStore.js"

const Page404 = () => {
  const { theme } = useThemeStore((state) => state)

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-6 text-center transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* 404 Animation Placeholder */}
      <div className="w-full max-w-md">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold">Page Not Found</h1>
      <p className="text-lg max-w-md md:max-w-lg">
        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition duration-300"
      >
        Return to Home
      </Link>
    </div>
  )
}

export default Page404
