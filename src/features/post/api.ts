import { STATS, type Activity, type Driver, type Order, type RevenueChartItem, type User } from "../../constants/type";
import { ACTIVITY, DRIVERS, ORDERS, REVENUE_CHART, USERS } from "../../mockdata/data";



export const fetchPostsAPI = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
};


export const ordersApi = {
  getOrders: async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return ORDERS;
  },
};


export const statsApi = {
  getStats: async (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(STATS);
      }, 500);
    });
  },
};


export const activityApi = {
  getActivity: async (): Promise<Activity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ACTIVITY);
      }, 500);
    });
  },
};


export const driversApi = {
  getDrivers: async (): Promise<Driver[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DRIVERS as Driver[]);
      }, 700);
    });
  },
};



export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(USERS);
      }, 600);
    });
  },
};


export const revenueApi = {
  getRevenueChart: async (): Promise<RevenueChartItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(REVENUE_CHART);
      }, 500);
    });
  },
};



