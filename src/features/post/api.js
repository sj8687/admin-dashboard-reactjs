import { STATS } from "../../constants/type";
import { ACTIVITY, DRIVERS, ORDERS, PIE_DATA, REVENUE_CHART, USERS } from "../../mockdata/data";
export const fetchPostsAPI = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok)
        throw new Error("Failed to fetch posts");
    return response.json();
};
export const ordersApi = {
    getOrders: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return ORDERS;
    },
};
export const statsApi = {
    getStats: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(STATS);
            }, 500);
        });
    },
};
export const activityApi = {
    getActivity: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(ACTIVITY);
            }, 500);
        });
    },
};
export const driversApi = {
    getDrivers: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(DRIVERS);
            }, 700);
        });
    },
};
export const usersApi = {
    getUsers: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(USERS);
            }, 600);
        });
    },
};
export const revenueApi = {
    getRevenueChart: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(REVENUE_CHART);
            }, 500);
        });
    },
};
export const pieApi = {
    getPieData: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(PIE_DATA);
            }, 400);
        });
    },
};
export async function loginAPI(email) {
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return res.json();
}
