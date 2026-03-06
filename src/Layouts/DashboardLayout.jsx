import { useState } from "react";
import { NAV } from "../mockdata/data";
import Dashboard from "../pages/Dashboards/Dashboard";
import Orders from "../pages/Orders/Orders";
import Drivers from "../pages/Drivers/Driver";
import Users from "../pages/Users/User";
import Analytics from "../pages/analytics/analytics";
import Settings from "../pages/settings/settings";
import { useTheme } from "../components/ui/DarkmodeToggle";
import Header from "@/pages/Dashboards/Header";
import LiveTracking from "@/pages/Maps/MainMap";
const PAGES = {
    dashboard: Dashboard,
    orders: Orders,
    drivers: Drivers,
    users: Users,
    analytics: Analytics,
    settings: Settings,
    livetracking: LiveTracking
};
export default function DashboardLayout() {
    const [active, setActive] = useState("dashboard");
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme } = useTheme();
    const Page = PAGES[active];
    const handleNavClick = (id) => {
        setActive(id);
        setMobileOpen(false);
    };
    return (<div className={theme === "dark" ? "dark" : ""}>
            <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden relative">

                {/* Sidebar */}
                <aside className={`
                    fixed lg:static z-50 top-0 left-0 h-full
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                    ${collapsed ? "lg:w-16" : "lg:w-56"}
                    w-64
                    bg-white dark:bg-slate-900
                    border-r border-slate-200 dark:border-slate-800
                    flex flex-col
                    transition-all duration-300
                `}>

                    {/* Logo / Top Bar */}
                    <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} p-4 border-b border-slate-200 dark:border-slate-800`}>

                        {/* Hide logo completely when collapsed */}
                        {!collapsed && (<div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm">
                                    🚀
                                </div>

                                <span className="font-bold text-gray-800 dark:text-white text-base">
                                    SwiftLogix
                                </span>
                            </div>)}

                        {/* Collapse Toggle */}

                        <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:block text-slate-400">
                            ☰
                        </button>

                        {/* Mobile Close */}
                        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-slate-400 text-xl">
                            ✕
                        </button>

                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-2 space-y-1 overflow-y-auto">

                        {NAV.map((item) => {
            const isActive = active === item.id;
            return (<button key={item.id} onClick={() => handleNavClick(item.id)} className={`
                                    w-full flex items-center
                                    ${collapsed ? "justify-center" : "gap-3"}
                                    px-3 py-2.5 rounded-xl
                                    transition-all text-left
                                    ${isActive
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "text-gray-500 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"}
                                    `}>

                                    <span className="text-base">
                                        {item.icon}
                                    </span>

                                    {!collapsed && (<span className="text-sm font-medium">
                                            {item.label}
                                        </span>)}

                                </button>);
        })}

                    </nav>

                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* Header */}
                    <Header active={active} toggleSidebar={() => {
            if (window.innerWidth < 1024) {
                setMobileOpen(!mobileOpen);
            }
            else {
                setCollapsed(!collapsed);
            }
        }}/>
                    {/* Page */}
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                        <Page />
                    </main>

                </div>

            </div>
        </div>);
}
