import { useEffect, useState } from "react";
import { DRIVERS } from "../../mockdata/data";
import { Card } from "../../components/ui/card";
import Avatar from "../../components/ui/Avatar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { fetchDriversRequest } from "../../features/post/postSlice";

export default function Drivers() {


  const dispatch = useDispatch();

  const { drivers, driversLoading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchDriversRequest());
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const filtered = drivers.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase())
  );

  if (driversLoading) return <p className="text-white">Loading</p>

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
                  {/* <Badge value={d.status} /> */} hii
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