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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Page = PAGES[active];

  const handleNavClick = (id: string) => {
    setActive(id);
    setMobileOpen(false); // auto close on mobile
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden relative">

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static z-50 top-0 left-0 h-full
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        ${collapsed ? "lg:w-16" : "lg:w-56"}
        w-64
        bg-slate-900 border-r border-slate-800
        flex flex-col transition-all duration-300
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm">
              🚀
            </div>
            <span className="font-bold text-white text-base">
              SwiftLogix
            </span>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left
                ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Collapse (Desktop only) */}
        <div className="p-2 border-t border-slate-800 hidden lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full py-2 text-slate-500 hover:text-white text-sm"
          >
            {collapsed ? "→ Expand" : "← Collapse"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6">

          {/* Left Side */}
          <div className="flex items-center gap-3">

            {/* Hamburger (Mobile only) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-slate-400 text-2xl"
            >
              ☰
            </button>

            <div className="text-xs hidden sm:flex items-center gap-2">
              <span className="text-slate-500">Super Admin</span>
              <span className="text-slate-700">›</span>
              <span className="text-slate-300 font-semibold capitalize">
                {active}
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System Online
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <Avatar initials="SA" size="w-8 h-8" text="text-xs" />
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-white">
                  Super Admin
                </p>
                <p className="text-xs text-slate-500">
                  admin@logistics.com
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Page />
        </main>
      </div>
    </div>
  );
}