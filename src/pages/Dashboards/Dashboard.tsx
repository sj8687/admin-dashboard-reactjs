import { useDispatch, useSelector } from "react-redux";
import Bottombar from "./Bottombar";
import KpiCard from "./KpiCard";
import type { RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchStatsRequest } from "../../features/post/postSlice";
import PuneMap from "@/Maps/Punemap";


export default function Dashboard() {

  const dispatch = useDispatch();

  const { stats, statsLoading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchStatsRequest());
  }, [dispatch]);

  if (statsLoading) return <p className="dark:text-white text-black text-center items-center">Loading...</p>;

  const kpis = stats
    ? [
      {
        label: "Total Revenue",
        value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
      },
    ]
    : [];

  return (
    <>
      <div className=" overflow-x-auto   scrollbar-hide">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mt-12">
        <Bottombar />
      </div>

      <div className="mt-7">
        <PuneMap />
      </div>
    </>
  );
}