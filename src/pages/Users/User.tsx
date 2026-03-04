import { useEffect, useState } from "react";
import { USERS } from "../../mockdata/data";
import { Card } from "../../components/ui/card";
import Avatar from "../../components/ui/Avatar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { fetchUsersRequest } from "../../features/post/postSlice";

export default function Users() {

  const dispatch = useDispatch();

  const { users, usersLoading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);


  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter((u) => {
    const s = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return s && (roleFilter === "all" || u.role === roleFilter);
  });

  if (usersLoading) return <p className="text-white">loading</p>


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
                <td className="px-5 py-3.5">
                  {/* <Badge value={u.role} /> */} hii
                </td>
                <td className="px-5 py-3.5 font-bold text-white">{u.orders}</td>
                <td className="px-5 py-3.5">
                  {/* <Badge value={u.status} /> */} hii
                </td>
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