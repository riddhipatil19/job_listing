import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faBriefcase, faUsers } from "@fortawesome/free-solid-svg-icons"
import useThemeStore from "../store/themeStore.js"
import useAuthStore from "../store/authStore.js"

const Landing = () => {
  const { theme } = useThemeStore((state) => state)
  const { isLoggedIn, user } = useAuthStore((state) => state)

  const getDashboardLink = () => {
    if (!user) return "/login"
    switch (user.role) {
      case "CANDIDATE":
        return "/candidate/dashboard"
      case "RECRUITER":
        return "/recruiter/dashboard"
      case "ADMIN":
        return "/admin/dashboard"
      default:
        return "/login"
    }
  }

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream <span className="text-blue-600">Job</span>
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Connect with top employers and discover opportunities that match your skills and aspirations. Your next
            career move starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn ? (
              <Link
                to={getDashboardLink()}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/jobs"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/register"
                  className={`px-8 py-4 rounded-lg transition-colors text-lg font-medium border-2 border-blue-600 ${
                    theme === "dark"
                      ? "text-blue-400 hover:bg-blue-600 hover:text-white"
                      : "text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose JobPortal?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faSearch} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Job Search</h3>
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                Advanced filters and AI-powered recommendations to find jobs that perfectly match your skills and
                preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faBriefcase} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Opportunities</h3>
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                Curated job listings from top companies across various industries, ensuring quality opportunities for
                every career level.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Application</h3>
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                Streamlined application process with one-click apply and real-time application tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 px-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5K+</div>
              <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Job Seekers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take the Next Step?</h2>
          <p className={`text-xl mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Join thousands of professionals who have found their dream jobs through our platform.
          </p>
          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register?role=candidate"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Find Jobs
              </Link>
              <Link
                to="/register?role=recruiter"
                className={`px-8 py-4 rounded-lg transition-colors text-lg font-medium border-2 border-blue-600 ${
                  theme === "dark"
                    ? "text-blue-400 hover:bg-blue-600 hover:text-white"
                    : "text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                Post Jobs
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Landing
