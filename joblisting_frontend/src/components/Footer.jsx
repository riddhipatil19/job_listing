import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import useThemeStore from "../store/themeStore"

const Footer = () => {
  const { theme } = useThemeStore((state) => state)

  return (
    <footer
      className={`w-full py-12 px-6 border-t transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-blue-600 mb-4">JobPortal</h3>
            <p className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Your gateway to finding the perfect job or the ideal candidate. Connect with opportunities that match your
              skills and aspirations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link
                to="/jobs"
                className={`block text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Browse Jobs
              </Link>
              <Link
                to="/register"
                className={`block text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Post a Job
              </Link>
              <Link
                to="/login"
                className={`block text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <a
                href="#"
                className={`block text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Help Center
              </a>
              <a
                href="#"
                className={`block text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Contact Us
              </a>
              <a
                href="#"
                className={`block text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`block text-sm transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-8 pt-8 border-t text-center text-sm ${
            theme === "dark" ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-600"
          }`}
        >
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
