import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import useThemeStore from "../store/themeStore"

const PublicLayout = () => {
  const { theme } = useThemeStore((state) => state)

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
