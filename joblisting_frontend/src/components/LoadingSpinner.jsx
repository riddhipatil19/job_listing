import useThemeStore from "../store/themeStore"

const LoadingSpinner = ({ size = "md", text = "Loading..." }) => {
  const { theme } = useThemeStore((state) => state)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-t-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
      {text && <p className={`mt-4 text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{text}</p>}
    </div>
  )
}

export default LoadingSpinner
