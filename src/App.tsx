import { useState } from "react";
import Avatar from "./components/ui/Avatar";
import { NAV } from "./mockdata/data";
import Dashboard from "./pages/Dashboards/Dashboard";
import Orders from "./pages/Orders/Orders";
import Drivers from "./pages/Drivers/Driver";
import Users from "./pages/Users/User";
import Analytics from "./pages/analytics/analytics";
import Settings from "./pages/settings/settings";
import "./index.css";
import "./App.css";
import { Switch } from "./components/ui/switch";
import { useTheme } from "./components/ui/DarkmodeToggle";

const PAGES: any = {
  dashboard: Dashboard,
  orders: Orders,
  drivers: Drivers,
  users: Users,
  analytics: Analytics,
  settings: Settings,
};

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const Page = PAGES[active];

  const handleNavClick = (id: string) => {
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative">
        {/* Sidebar */}
        <aside className={`fixed lg:static z-50 top-0 left-0 h-full ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 ${collapsed ? "lg:w-16" : "lg:w-56"} w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300`}>
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm">
                🚀
              </div>
              <span className="font-bold text-gray-800 dark:text-white text-base">SwiftLogix</span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-slate-400 hover:text-white text-xl">✕</button>
          </div>
          {/* Nav */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${isActive ? "bg-indigo-500/20 text-indigo-400" : "text-gray-500 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden text-gray-400 dark:text-gray-300 text-2xl">☰</button>
              <div className="text-xs hidden sm:flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Super Admin</span>
                <span className="text-gray-700 dark:text-gray-300">›</span>
                <span className="text-gray-800 dark:text-gray-200 font-semibold capitalize">{active}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="flex items-center gap-2">
                <span>☀️</span>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                />
                <span>🌙</span>
              </div>
              <div className="flex items-center gap-2 lg:gap-3">
                <Avatar initials="SA" size="w-8 h-8" text="text-xs" />
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-gray-800 dark:text-white">Super Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@logistics.com</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Page />
          </main>
        </div>
      </div>
    </div>
  );
}