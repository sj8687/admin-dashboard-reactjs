import { Card } from "../../components/ui/card";
import { kpis } from "../../mockdata/data";

export default function KpiCard() {
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-4">
      
      {/* Header */}
      <div>
        <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          Dashboard
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-1">
          Welcome back! Here's today's snapshot.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((k) => (
          <Card
            key={k.label}
            className="p-4 sm:p-5 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex items-start justify-between">
              
              {/* Left Content */}
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  {k.label}
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-white mt-1 font-display">
                  {k.value}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {k.sub}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${k.accent} flex items-center justify-center text-base sm:text-lg`}
              >
                {k.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}