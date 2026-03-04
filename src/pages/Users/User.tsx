import { useEffect, useMemo, useState } from "react";
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

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const s =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      return s && (roleFilter === "all" || u.role === roleFilter);
    });
  }, [users, search, roleFilter]);

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Users
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {filtered.length} registered users
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-xl text-sm font-semibold w-full sm:w-auto">
          + Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full lg:flex-1 bg-slate-800/60 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500"
        />

        <div className="flex flex-wrap gap-2">
          {["all", "admin", "manager", "customer"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                roleFilter === r
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-700/50 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">

        {/* Loading State */}
        {usersLoading ? (
          <div className="py-20 text-center text-slate-400">
            Loading users...
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/60">
                    {["User", "Email", "Phone", "Role", "Orders", "City", "Actions"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id} className="border-b border-slate-700/30">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar initials={u.avatar} size="w-8 h-8" text="text-xs" />
                          <div>
                            <p className="font-semibold text-white">
                              {u.name}
                            </p>
                            <p className="text-xs text-slate-500">{u.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 text-xs">
                        {u.email}
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 text-xs">
                        {u.phone}
                      </td>
                      <td className="px-5 py-3.5 text-slate-300 capitalize">
                        {u.role}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-white">
                        {u.orders}
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 text-xs">
                        {u.city}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                            Edit
                          </button>
                          <button className="text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg">
                            Ban
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="md:hidden p-4 space-y-4">
              {filtered.map((u) => (
                <div
                  key={u.id}
                  className="bg-slate-800/50 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar initials={u.avatar} size="w-8 h-8" text="text-xs" />
                    <div>
                      <p className="text-white font-semibold">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{u.role}</span>
                    <span>{u.city}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      Orders: {u.orders}
                    </span>
                    <span className="text-slate-400">{u.phone}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-2 rounded-lg">
                      Edit
                    </button>
                    <button className="flex-1 text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-2 rounded-lg">
                      Ban
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No users found
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}