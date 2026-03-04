import { useEffect, useMemo, useState } from "react";
import { ORDERS } from "../../mockdata/data";
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


    const filtered = useMemo(() => data.filter((o) => {
    const s = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    return s && (filter === "all" || o.status === filter);
  }), [search, filter]);

  // console.log(filtered);



    if (ordersLoading) return <p className="text-white text-center items-center">Loading...</p>;



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
                  <td className="py-3.5 px-3">
                    {/* <Badge value={o.status} /> */} hiii
                  </td>
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















// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrdersRequest } from "../../features/post/postSlice";
// import type { RootState } from "../../app/store";


// export default function Orders() {
//   const dispatch = useDispatch();
//   const { data, loading } = useSelector(
//     (state: RootState) => state.posts
//   );

//   useEffect(() => {
//     dispatch(fetchOrdersRequest());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       {data.map((order) => (
//         <div key={order.id}>
//           <p className="text-white">{order.id} - {order.customer}</p>
//         </div>
//       ))}
//     </div>
//   );
// }