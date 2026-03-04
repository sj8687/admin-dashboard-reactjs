import { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/card";
import Badge from "../../components/ui/Badge";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { fetchOrdersRequest } from "../../features/post/postSlice";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const FILTERS = ["all", "pending", "in-transit", "delivered", "cancelled"];

  const dispatch = useDispatch();
  const { data, ordersLoading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchOrdersRequest());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return data.filter((o) => {
      const s =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());
      return s && (filter === "all" || o.status === filter);
    });
  }, [search, filter, data]);

  if (ordersLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-white">Loading...</p>
      </div>
    );

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Orders
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {filtered.length} total orders
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-xl text-sm font-semibold w-full sm:w-auto">
          + New Order
        </button>
      </div>

      <Card className="p-4 sm:p-6">

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, customers..."
            className="w-full lg:flex-1 bg-slate-900/60 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
          />

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-700/50 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                {["Order ID", "Customer", "Route", "Driver", "Type", "Status", "Amount"].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 first:pl-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-slate-700/30">
                  <td className="py-3 px-3 font-bold text-indigo-400">{o.id}</td>
                  <td className="py-3 px-3 text-slate-200">{o.customer}</td>
                  <td className="py-3 px-3 text-xs text-slate-300">
                    {o.pickup} → {o.drop}
                  </td>
                  <td className="py-3 px-3 text-slate-300">{o.driver}</td>
                  <td className="py-3 px-3 text-slate-400">{o.type}</td>
                  <td className="py-3 px-3">
                    <Badge value={o.status} />
                  </td>
                  <td className="py-3 px-3 font-bold text-white">₹{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {filtered.map((o) => (
            <div key={o.id} className="bg-slate-800/50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-bold text-indigo-400">{o.id}</p>
                <Badge value={o.status} />
              </div>

              <p className="text-sm text-slate-200">{o.customer}</p>

              <div className="text-xs text-slate-400">
                {o.pickup} → {o.drop}
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>{o.driver}</span>
                <span className="font-bold text-white">₹{o.amount}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No orders found
          </div>
        )}
      </Card>
    </div>
  );
}