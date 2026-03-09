import Avatar from "@/components/ui/Avatar"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function AdminProfileWrapper() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({
    name: "Super Admin",
    email: "admin@logistics.com",
    avatar: "" // placeholder
  })

  const handleClick = () => setIsOpen(!isOpen) // toggle on click

  // Placeholder for fetching user info from backend
  useEffect(() => {
    async function fetchUser() {
      // TODO: replace with your API call
      // const response = await fetch("/api/user")
      // const data = await response.json()
      // setUser(data)
    }
    fetchUser()
  }, [])

  return (
    <div className="relative ">
      {/* Clickable container with avatar and name/email */}
      <div
        className="flex items-center gap-2 lg:gap-3 cursor-pointer"
        onClick={handleClick}
      >
        <Avatar initials="SA" size="w-8 h-8" text="text-xs" />
        <div className="hidden sm:block">
          <p className="font-bold text-[12px] text-gray-800 dark:text-white">{user.name}</p>
          <p className="text-gray-600 text-[13px] dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Conditional Profile Card */}
      {isOpen && (
        <Card className="absolute top-14 right-2 w-[90vw] max-w-[400px] p-6 shadow-xl z-50 transition-all">          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <img
              src={user.avatar || "adminlogo2.webp"}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full border-2 border-yellow-500"
            />
          </div>

          {/* Name and Email */}
          <div className="text-center mb-6 ">
            <p className="font-bold text-gray-900 dark:text-white text-lg">{user.name}</p>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>

          {/* Logout Button */}
          <button className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl font-semibold transition-colors">
            Logout
          </button>
        </Card>
      )}
    </div>
  )
}