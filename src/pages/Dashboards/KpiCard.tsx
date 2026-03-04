import { Card } from "../../components/ui/card";
import { kpis } from "../../mockdata/data";

export default function KpiCard() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 text-sm mt-1">Welcome back! Here's today's snapshot.</p>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {kpis.map((k) => (
                    <Card key={k.label} className="p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{k.label}</p>
                                <p className="text-3xl font-bold text-white mt-1 font-display">{k.value}</p>
                                <p className="text-xs text-slate-400 mt-1">{k.sub}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${k.accent} flex items-center justify-center text-lg`}>
                                {k.icon}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>

    )
}      
