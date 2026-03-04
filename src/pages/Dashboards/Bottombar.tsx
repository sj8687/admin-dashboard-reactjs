import { useDispatch, useSelector } from "react-redux";
import Badge from "../../components/ui/Badge";
import { Card } from "../../components/ui/card";
import type { RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchActivityRequest, fetchOrdersRequest } from "../../features/post/postSlice";

export default function Bottombar() {


  const dispatch = useDispatch();
  const { data, ordersLoading, activities, activityLoading } =
    useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchOrdersRequest());
    dispatch(fetchActivityRequest());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 gap-4  scrollbar-hide">
      {ordersLoading && <p>Loading Orders...</p>}
      {activityLoading && <p>Loading Activity...</p>}
      <Card className="p-6">
        <h3 className="font-display font-bold text-white mb-4">Recent Orders</h3>
        <div className="space-y-0  ">
          {data.slice(0, 5).map((o) => (
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
          {activities.map((a) => (
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
  )
}