









import './index.css'
// or
import './App.css'
import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

/* ─── GOOGLE FONT ─────────────────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const style = document.createElement("style");
style.textContent = `
  * { font-family: 'Manrope', sans-serif; box-sizing: border-box; }
  h1,h2,h3,h4,.font-display { font-family: 'Syne', sans-serif !important; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
  .nav-btn:hover { background: rgba(99,102,241,0.15) !important; color: #a5b4fc !important; }
  .row-hover:hover { background: rgba(99,102,241,0.04) !important; }
  .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,102,241,0.12) !important; }
  .btn-primary:hover { background: #4f46e5 !important; }
  .btn-danger:hover { background: #fee2e2 !important; }
`;
document.head.appendChild(style);

/* ─── MOCK DATA ───────────────────────────────────────────────────────────── */
const STATS = {
  totalRevenue: 984320, totalOrders: 12483, activeDeliveries: 342,
  pendingOrders: 87, totalDrivers: 198, completedToday: 156,
  cancelledToday: 12, avgDeliveryTime: "38 min",
};

const REVENUE_CHART = [
  { month: "Jan", revenue: 65000, orders: 820 }, { month: "Feb", revenue: 72000, orders: 940 },
  { month: "Mar", revenue: 68000, orders: 880 }, { month: "Apr", revenue: 85000, orders: 1100 },
  { month: "May", revenue: 91000, orders: 1240 }, { month: "Jun", revenue: 78000, orders: 980 },
  { month: "Jul", revenue: 95000, orders: 1320 }, { month: "Aug", revenue: 102000, orders: 1450 },
  { month: "Sep", revenue: 88000, orders: 1180 }, { month: "Oct", revenue: 110000, orders: 1560 },
  { month: "Nov", revenue: 98000, orders: 1380 }, { month: "Dec", revenue: 132000, orders: 1820 },
];

const ORDERS = [
  { id: "ORD-10291", customer: "Rahul Mehta", pickup: "Andheri West, Mumbai", drop: "Powai, Mumbai", driver: "Suresh Kumar", status: "delivered", amount: 450, weight: "12 kg", date: "2024-03-15", type: "Express" },
  { id: "ORD-10292", customer: "Priya Sharma", pickup: "Koramangala, Bengaluru", drop: "Whitefield, Bengaluru", driver: "Ravi Patil", status: "in-transit", amount: 320, weight: "5 kg", date: "2024-03-15", type: "Standard" },
  { id: "ORD-10293", customer: "Amit Joshi", pickup: "Connaught Place, Delhi", drop: "Gurgaon, Haryana", driver: "Unassigned", status: "pending", amount: 780, weight: "20 kg", date: "2024-03-15", type: "Heavy" },
  { id: "ORD-10294", customer: "Sneha Reddy", pickup: "T. Nagar, Chennai", drop: "Anna Nagar, Chennai", driver: "Vijay S.", status: "in-transit", amount: 210, weight: "2 kg", date: "2024-03-15", type: "Express" },
  { id: "ORD-10295", customer: "Karan Patel", pickup: "Banjara Hills, Hyderabad", drop: "Secunderabad", driver: "Mohammed A.", status: "cancelled", amount: 560, weight: "8 kg", date: "2024-03-15", type: "Standard" },
  { id: "ORD-10296", customer: "Deepa Nair", pickup: "MG Road, Kochi", drop: "Kakkanad, Kochi", driver: "Thomas K.", status: "delivered", amount: 390, weight: "6 kg", date: "2024-03-14", type: "Standard" },
  { id: "ORD-10297", customer: "Arjun Singh", pickup: "Salt Lake, Kolkata", drop: "Park Street, Kolkata", driver: "Bikash D.", status: "delivered", amount: 270, weight: "3 kg", date: "2024-03-14", type: "Express" },
  { id: "ORD-10298", customer: "Meera Iyer", pickup: "Juhu, Mumbai", drop: "Bandra, Mumbai", driver: "Anil W.", status: "pending", amount: 490, weight: "9 kg", date: "2024-03-14", type: "Heavy" },
];

const DRIVERS = [
  { id: "DRV-001", name: "Suresh Kumar", phone: "+91 98201 12345", vehicle: "Tata Ace — MH01-AB1234", status: "active", rating: 4.8, trips: 1240, earnings: 82400, location: "Andheri, Mumbai", avatar: "SK" },
  { id: "DRV-002", name: "Ravi Patil", phone: "+91 97302 23456", vehicle: "Mahindra Bolero — KA05-CD5678", status: "active", rating: 4.6, trips: 980, earnings: 64200, location: "Koramangala, Bengaluru", avatar: "RP" },
  { id: "DRV-003", name: "Vijay S.", phone: "+91 94403 34567", vehicle: "Ashok Leyland Dost — TN09-EF9012", status: "on-trip", rating: 4.9, trips: 1560, earnings: 102800, location: "T. Nagar, Chennai", avatar: "VS" },
  { id: "DRV-004", name: "Mohammed A.", phone: "+91 96504 45678", vehicle: "Force Tempo — TS07-GH3456", status: "inactive", rating: 4.3, trips: 720, earnings: 47600, location: "Banjara Hills, Hyderabad", avatar: "MA" },
  { id: "DRV-005", name: "Thomas K.", phone: "+91 95605 56789", vehicle: "Eicher Pro — KL12-IJ7890", status: "active", rating: 4.7, trips: 1100, earnings: 72400, location: "MG Road, Kochi", avatar: "TK" },
  { id: "DRV-006", name: "Bikash D.", phone: "+91 93706 67890", vehicle: "Tata 407 — WB24-KL1234", status: "on-trip", rating: 4.5, trips: 860, earnings: 56800, location: "Salt Lake, Kolkata", avatar: "BD" },
];

const USERS = [
  { id: "USR-001", name: "Rahul Mehta", email: "rahul@email.com", phone: "+91 98201 11111", role: "customer", status: "active", orders: 24, city: "Mumbai", avatar: "RM" },
  { id: "USR-002", name: "Priya Sharma", email: "priya@email.com", phone: "+91 97302 22222", role: "customer", status: "active", orders: 18, city: "Bengaluru", avatar: "PS" },
  { id: "USR-003", name: "Admin User", email: "admin@logistics.com", phone: "+91 94403 33333", role: "admin", status: "active", orders: 0, city: "Mumbai", avatar: "AU" },
  { id: "USR-004", name: "Karan Patel", email: "karan@email.com", phone: "+91 96504 44444", role: "customer", status: "suspended", orders: 7, city: "Hyderabad", avatar: "KP" },
  { id: "USR-005", name: "Manager Raj", email: "manager@logistics.com", phone: "+91 95605 55555", role: "manager", status: "active", orders: 0, city: "Delhi", avatar: "MR" },
];

const ACTIVITY = [
  { id: 1, dot: "bg-indigo-400", msg: "New order ORD-10298 placed by Meera Iyer", time: "2 min ago" },
  { id: 2, dot: "bg-blue-400", msg: "Driver Ravi Patil started delivery for ORD-10292", time: "8 min ago" },
  { id: 3, dot: "bg-emerald-400", msg: "ORD-10291 delivered successfully", time: "15 min ago" },
  { id: 4, dot: "bg-red-400", msg: "ORD-10295 cancelled by customer", time: "32 min ago" },
  { id: 5, dot: "bg-amber-400", msg: "New customer registered: Deepa Nair", time: "1 hr ago" },
  { id: 6, dot: "bg-emerald-400", msg: "Payment ₹780 received for ORD-10293", time: "2 hr ago" },
];

const PIE_DATA = [
  { name: "Delivered", value: 8420, color: "#34d399" },
  { name: "In Transit", value: 342, color: "#818cf8" },
  { name: "Pending", value: 87, color: "#fbbf24" },
  { name: "Cancelled", value: 234, color: "#f87171" },
];

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
const STATUS_MAP = {
  delivered:  { cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20", label: "Delivered" },
  "in-transit":{ cls: "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20", label: "In Transit" },
  pending:    { cls: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20", label: "Pending" },
  cancelled:  { cls: "bg-red-500/10 text-red-400 ring-1 ring-red-500/20", label: "Cancelled" },
  active:     { cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20", label: "Active" },
  "on-trip":  { cls: "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20", label: "On Trip" },
  inactive:   { cls: "bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20", label: "Inactive" },
  suspended:  { cls: "bg-red-500/10 text-red-400 ring-1 ring-red-500/20", label: "Suspended" },
  customer:   { cls: "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20", label: "Customer" },
  admin:      { cls: "bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/20", label: "Admin" },
  manager:    { cls: "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20", label: "Manager" },
};

const Badge:any = ({ value }: { value: keyof typeof STATUS_MAP }) => {
  const s = STATUS_MAP[value] || { cls: "bg-slate-500/10 text-slate-400", label: value };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.cls}`}>{s.label}</span>;
};


const Avatar:any = ({ initials, size = "w-9 h-9", text = "text-sm" }:any) => (
  <div className={`${size} rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold ${text} flex-shrink-0`}>
    {initials}
  </div>
);


const Card = ({ children, className = "" }:any) => (
  <div className={`bg-slate-800/60 border border-slate-700/50 rounded-2xl backdrop-blur-sm transition-all duration-200 card-hover ${className}`}>
    {children}
  </div>
);

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "orders",    label: "Orders",    icon: "📦" },
  { id: "drivers",   label: "Drivers",   icon: "🚚" },
  { id: "users",     label: "Users",     icon: "👥" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "settings",  label: "Settings",  icon: "⚙️" },
];

/* ─── DASHBOARD ───────────────────────────────────────────────────────────── */
function Dashboard() {
  const kpis = [
    { label: "Total Revenue", value: `₹${(STATS.totalRevenue / 100000).toFixed(1)}L`, sub: "+12% vs last month", icon: "💰", accent: "from-indigo-500 to-violet-500" },
    { label: "Total Orders", value: STATS.totalOrders.toLocaleString(), sub: `${STATS.completedToday} completed today`, icon: "📦", accent: "from-emerald-500 to-teal-500" },
    { label: "Active Deliveries", value: STATS.activeDeliveries, sub: "Live right now", icon: "🚚", accent: "from-sky-500 to-blue-500" },
    { label: "Pending Orders", value: STATS.pendingOrders, sub: "Need assignment", icon: "⏳", accent: "from-amber-500 to-orange-500" },
    { label: "Total Drivers", value: STATS.totalDrivers, sub: "Registered drivers", icon: "👤", accent: "from-violet-500 to-purple-600" },
    { label: "Avg Delivery", value: STATS.avgDeliveryTime, sub: "Across all orders", icon: "⏱️", accent: "from-pink-500 to-rose-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back! Here's today's snapshot.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{k.label}</p>
                <p className="text-3xl font-bold text-white mt-1 font-display">{k.value}</p>
                <p className="text-xs text-slate-400 mt-1">{k.sub}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.accent} flex items-center justify-center text-lg`}>
                {k.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 p-6">
          <h3 className="font-display font-bold text-white mb-5">Revenue & Orders — 2024</h3>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={REVENUE_CHART}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 12, color: "#e2e8f0" }} />
              <Line type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="orders" stroke="#34d399" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3">
            <div className="flex items-center gap-2 text-xs text-slate-400"><div className="w-3 h-0.5 bg-indigo-400 rounded" /> Revenue (₹)</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><div className="w-3 h-0.5 bg-emerald-400 rounded border-dashed" /> Orders</div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-display font-bold text-white mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="value">
                {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, fontSize: 12, color: "#e2e8f0" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {PIE_DATA.map((d) => (
              <div key={d.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-400">{d.name}</span>
                </div>
                <span className="font-bold text-white">{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="font-display font-bold text-white mb-4">Recent Orders</h3>
          <div className="space-y-0">
            {ORDERS.slice(0, 5).map((o) => (
              <div key={o.id} className="flex justify-between items-center py-3 border-b border-slate-700/40 last:border-0">
                <div>
                  <p className="text-sm font-bold text-indigo-400">{o.id}</p>
                  <p className="text-xs text-slate-500">{o.customer}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge value={o.status} />
                  <p className="text-xs font-bold text-white">₹{o.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-display font-bold text-white mb-4">Live Activity</h3>
          <div className="space-y-0">
            {ACTIVITY.map((a) => (
              <div key={a.id} className="flex gap-3 py-3 border-b border-slate-700/40 last:border-0 items-start">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
                <div>
                  <p className="text-sm text-slate-300 leading-snug">{a.msg}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─── ORDERS ──────────────────────────────────────────────────────────────── */
function Orders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const FILTERS = ["all", "pending", "in-transit", "delivered", "cancelled"];

  const filtered = useMemo(() => ORDERS.filter((o) => {
    const s = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    return s && (filter === "all" || o.status === filter);
  }), [search, filter]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Orders</h1>
          <p className="text-slate-400 text-sm mt-1">{ORDERS.length} total orders</p>
        </div>
        <button className="btn-primary bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">+ New Order</button>
      </div>

      <Card className="p-5">
        {/* Filter Bar */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, customers..."
            className="flex-1 min-w-48 bg-slate-900/60 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors" />
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${filter === f ? "bg-indigo-600 text-white" : "bg-slate-700/50 text-slate-400 hover:bg-slate-700"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                {["Order ID", "Customer", "Route", "Driver", "Type", "Status", "Amount"].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 first:pl-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-slate-700/30 last:border-0 row-hover transition-colors">
                  <td className="py-3.5 px-3 first:pl-0 font-bold text-indigo-400">{o.id}</td>
                  <td className="py-3.5 px-3 text-slate-200 font-medium">{o.customer}</td>
                  <td className="py-3.5 px-3 max-w-[180px]">
                    <div className="text-xs text-slate-300">{o.pickup}</div>
                    <div className="text-xs text-slate-500">→ {o.drop}</div>
                  </td>
                  <td className={`py-3.5 px-3 text-sm ${o.driver === "Unassigned" ? "text-red-400 font-semibold" : "text-slate-300"}`}>{o.driver}</td>
                  <td className="py-3.5 px-3">
                    <span className="bg-slate-700/60 text-slate-400 text-xs px-2.5 py-0.5 rounded-full font-medium">{o.type}</span>
                  </td>
                  <td className="py-3.5 px-3"><Badge value={o.status} /></td>
                  <td className="py-3.5 px-3 font-bold text-white">₹{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">No orders found</div>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ─── DRIVERS ─────────────────────────────────────────────────────────────── */
function Drivers() {
  const [search, setSearch] = useState("");
  const filtered = DRIVERS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Drivers</h1>
          <p className="text-slate-400 text-sm mt-1">{DRIVERS.length} registered drivers</p>
        </div>
        <button className="btn-primary bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">+ Add Driver</button>
      </div>

      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search drivers..."
        className="w-full max-w-xs bg-slate-800/60 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors" />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <Card key={d.id} className="p-5">
            <div className="flex gap-4 items-center mb-4">
              <Avatar initials={d.avatar} size="w-12 h-12" text="text-base" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2">
                  <p className="font-bold text-white text-base truncate">{d.name}</p>
                  <Badge value={d.status} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{d.id} · {d.phone}</p>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl px-4 py-2.5 mb-4 text-xs text-slate-400">
              🚛 {d.vehicle}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Rating", value: `⭐ ${d.rating}` },
                { label: "Trips", value: d.trips.toLocaleString() },
                { label: "Earnings", value: `₹${(d.earnings / 1000).toFixed(0)}K` },
              ].map((s) => (
                <div key={s.label} className="bg-slate-900/50 rounded-xl py-2.5 text-center">
                  <p className="text-sm font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-slate-500">
              <span>📍 {d.location}</span>
              <div className="flex gap-2">
                <button className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">View</button>
                <button className="text-red-400 hover:text-red-300 font-semibold transition-colors">Remove</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── USERS ───────────────────────────────────────────────────────────────── */
function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = USERS.filter((u) => {
    const s = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return s && (roleFilter === "all" || u.role === roleFilter);
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Users</h1>
          <p className="text-slate-400 text-sm mt-1">{USERS.length} registered users</p>
        </div>
        <button className="btn-primary bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">+ Add User</button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..."
          className="flex-1 min-w-48 bg-slate-800/60 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors" />
        {["all", "admin", "manager", "customer"].map((r) => (
          <button key={r} onClick={() => setRoleFilter(r)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${roleFilter === r ? "bg-indigo-600 text-white" : "bg-slate-700/50 text-slate-400 hover:bg-slate-700"}`}>
            {r}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/60">
              {["User", "Email", "Phone", "Role", "Orders", "Status", "City", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-slate-700/30 last:border-0 row-hover transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar initials={u.avatar} size="w-8 h-8" text="text-xs" />
                    <div>
                      <p className="font-semibold text-white">{u.name}</p>
                      <p className="text-xs text-slate-500">{u.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-400 text-xs">{u.email}</td>
                <td className="px-5 py-3.5 text-slate-400 text-xs">{u.phone}</td>
                <td className="px-5 py-3.5"><Badge value={u.role} /></td>
                <td className="px-5 py-3.5 font-bold text-white">{u.orders}</td>
                <td className="px-5 py-3.5"><Badge value={u.status} /></td>
                <td className="px-5 py-3.5 text-slate-400 text-xs">{u.city}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg transition-colors">Edit</button>
                    <button className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 px-2.5 py-1 rounded-lg transition-colors">Ban</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-slate-500">No users found</div>}
      </Card>
    </div>
  );
}

/* ─── ANALYTICS ───────────────────────────────────────────────────────────── */
function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">Business performance overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="font-display font-bold text-white mb-5">Monthly Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={REVENUE_CHART}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 12, color: "#e2e8f0" }} formatter={(v) => [`₹${v!.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#818cf8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-display font-bold text-white mb-5">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={REVENUE_CHART}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 12, color: "#e2e8f0" }} />
              <Bar dataKey="orders" fill="#34d399" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="font-display font-bold text-white">Driver Performance Leaderboard</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              {["#", "Driver", "Total Trips", "Rating", "Earnings", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...DRIVERS].sort((a, b) => b.trips - a.trips).map((d, i) => (
              <tr key={d.id} className="border-b border-slate-700/30 last:border-0 row-hover transition-colors">
                <td className={`px-5 py-4 font-bold text-lg ${i < 3 ? "text-amber-400" : "text-slate-600"}`}>{i + 1}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={d.avatar} size="w-8 h-8" text="text-xs" />
                    <span className="font-semibold text-white">{d.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 font-semibold text-slate-200">{d.trips.toLocaleString()}</td>
                <td className="px-5 py-4 text-amber-400">⭐ {d.rating}</td>
                <td className="px-5 py-4 font-bold text-emerald-400">₹{d.earnings.toLocaleString()}</td>
                <td className="px-5 py-4"><Badge value={d.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ─── SETTINGS ────────────────────────────────────────────────────────────── */
function Settings() {
  const [form, setForm] = useState<{ companyName: string; email: string; currency: string; timezone: string }>({ companyName: "SwiftLogistics India", email: "admin@logistics.com", currency: "INR", timezone: "Asia/Kolkata" });
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySMS, setNotifySMS] = useState(false);

  const Toggle = ({ on, toggle }:any) => (
    <div onClick={toggle} className={`w-11 h-6 rounded-full cursor-pointer transition-colors relative ${on ? "bg-indigo-600" : "bg-slate-600"}`}>
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Configure platform preferences</p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-display font-bold text-white mb-5">General Settings</h3>
          {[{ label: "Company Name", key: "companyName" as const }, { label: "Admin Email", key: "email" as const }, { label: "Currency", key: "currency" as const }, { label: "Timezone", key: "timezone" as const }].map((f) => (
            <div key={f.key} className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{f.label}</label>
              <input value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full bg-slate-900/60 border border-slate-700 text-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors" />
            </div>
          ))}
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors mt-1">Save Changes</button>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <h3 className="font-display font-bold text-white mb-5">Notifications</h3>
            <div className="space-y-4">
              {[{ label: "Email Notifications", sub: "Receive order updates via email", on: notifyEmail, toggle: () => setNotifyEmail(!notifyEmail) },
                { label: "SMS Notifications", sub: "Receive alerts via SMS", on: notifySMS, toggle: () => setNotifySMS(!notifySMS) }].map((n) => (
                <div key={n.label} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-white">{n.label}</p>
                    <p className="text-xs text-slate-500">{n.sub}</p>
                  </div>
                  <Toggle on={n.on} toggle={n.toggle} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-bold text-white mb-2">Danger Zone</h3>
            <p className="text-xs text-slate-500 mb-4">These actions are irreversible. Proceed with caution.</p>
            <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2.5 rounded-xl font-semibold text-sm transition-colors">
              Reset All Data
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────────────── */
const PAGES:any = { dashboard: Dashboard, orders: Orders, drivers: Drivers, users: Users, analytics: Analytics, settings: Settings };

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const Page = PAGES[active];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">

      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-56"} flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 overflow-hidden`}>
        {/* Logo */}
        <div className={`flex items-center gap-3 p-4 border-b border-slate-800 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm flex-shrink-0">🚀</div>
          {!collapsed && <span className="font-display font-bold text-white text-base whitespace-nowrap">SwiftLogix</span>}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-2 space-y-0.5">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)}
                className={`nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${collapsed ? "justify-center" : ""} ${isActive ? "bg-indigo-500/20 text-indigo-400" : "text-slate-500"}`}>
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className={`text-sm whitespace-nowrap ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>}
                {!collapsed && isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-slate-800">
          <button onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-2 text-slate-600 hover:text-slate-400 transition-colors text-sm">
            {collapsed ? "→" : "←"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Super Admin</span>
            <span className="text-slate-700">›</span>
            <span className="text-slate-300 font-semibold capitalize">{active}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System Online
            </div>
            <div className="flex items-center gap-3">
              <Avatar initials="SA" size="w-8 h-8" text="text-xs" />
              <div>
                <p className="text-xs font-bold text-white">Super Admin</p>
                <p className="text-xs text-slate-500">admin@logistics.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Page />
        </main>
      </div>
    </div>
  );
}