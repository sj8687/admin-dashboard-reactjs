export const STATS = {
    totalRevenue: 984320,
    totalOrders: 12483,
    activeDeliveries: 342,
    pendingOrders: 87,
    totalDrivers: 198,
    completedToday: 156,
    cancelledToday: 12,
    avgDeliveryTime: "38 min",
};
export const STATUS_MAP = {
    delivered: { cls: "bg-emerald-500/10 text-emerald-400", label: "Delivered" },
    "in-transit": { cls: "bg-indigo-500/10 text-indigo-400", label: "In Transit" },
    pending: { cls: "bg-amber-500/10 text-amber-400", label: "Pending" },
    cancelled: { cls: "bg-red-500/10 text-red-400", label: "Cancelled" },
};
