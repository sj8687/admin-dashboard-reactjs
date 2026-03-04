import { useDispatch, useSelector } from "react-redux";
import Badge from "../../components/ui/Badge";
import { Card } from "../../components/ui/card";
import type { RootState } from "../../app/store";
import { useEffect } from "react";
import {
  fetchActivityRequest,
  fetchOrdersRequest,
} from "../../features/post/postSlice";

export default function Bottombar() {
  const dispatch = useDispatch();
  const { data, ordersLoading, activities, activityLoading } =
    useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
    dispatch(fetchActivityRequest());
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Orders */}
        <Card className="p-4 sm:p-6 h-full">
          <h3 className="font-display font-bold text-white mb-4 text-lg sm:text-xl">
            Recent Orders
          </h3>

          {ordersLoading ? (
            <p className="text-slate-400 text-sm">Loading Orders...</p>
          ) : (
            <div className="divide-y divide-slate-700/40">
              {data.slice(0, 5).map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-2"
                >
                  {/* Left */}
                  <div>
                    <p className="text-sm font-bold text-indigo-400 break-all">
                      {o.id}
                    </p>
                    <p className="text-xs text-slate-500">
                      {o.customer}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex sm:flex-col sm:items-end justify-between sm:justify-end gap-2">
                    <Badge value={o.status} />
                    <p className="text-xs font-bold text-white">
                      ₹{o.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Live Activity */}
        <Card className="p-4 sm:p-6 h-full">
          <h3 className="font-display font-bold text-white mb-4 text-lg sm:text-xl">
            Live Activity
          </h3>

          {activityLoading ? (
            <p className="text-slate-400 text-sm">Loading Activity...</p>
          ) : (
            <div className="divide-y divide-slate-700/40">
              {activities.map((a) => (
                <div
                  key={a.id}
                  className="flex gap-3 py-3 items-start"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-300 leading-snug break-words">
                      {a.msg}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

      </div>
    </div>
  );
}