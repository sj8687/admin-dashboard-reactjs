import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "../../components/ui/card";
import Avatar from "../../components/ui/Avatar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { fetchDriversRequest, fetchRevenueRequest } from "../../features/post/postSlice";
import RevenueChart from "../Dashboards/RevenueChart";

export default function Analytics() {

  const dispatch = useDispatch();

  const { drivers,revenueChart,  } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchDriversRequest());
    dispatch(fetchRevenueRequest());
  }, [dispatch]);





useEffect(() => {
  
}, [dispatch]);

  // if (driversLoading) return <p className="text-white">Loading</p>
  // if (revenueLoading) return <p className="text-amber-200">Loading</p>
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
            <BarChart data={revenueChart}>
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
            <BarChart data={revenueChart}>
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
            {[...drivers].sort((a, b) => b.trips - a.trips).map((d, i) => (
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
                <td className="px-5 py-4 text-amber-50">
                  {/* <Badge value={d.status} /> */} hii
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div>
        <RevenueChart />
      </div>
    </div>
  );
}