import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    stats: null,
    data: [],
    activities: [],
    drivers: [],
    users: [],
    revenueChart: [],
    pieData: [],
    message: null,
    Loginloading: false,
    pieLoading: false,
    revenueLoading: false,
    driversLoading: false,
    ordersLoading: false,
    statsLoading: false,
    activityLoading: false,
    usersLoading: false,
    LoginSuccess: false,
    loginError: null,
    pieError: null,
    revenueError: null,
    usersError: null,
    driversError: null,
    activityError: null,
    error: null,
};
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // fetchPostsRequest(state) {
        //   state.loading = true;
        //   state.error = null;
        // },
        // fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
        //   state.loading = false;
        //   state.data = action.payload;
        // },
        // fetchPostsFailure(state, action: PayloadAction<string>) {
        //   state.loading = false;
        //   state.error = action.payload;
        // },
        fetchOrdersRequest(state) {
            state.ordersLoading = true;
        },
        fetchOrdersSuccess(state, action) {
            state.ordersLoading = false;
            state.data = action.payload;
        },
        fetchOrdersFailure(state, action) {
            state.ordersLoading = false;
            state.error = action.payload;
        },
        fetchStatsRequest(state) {
            state.statsLoading = true;
        },
        fetchStatsSuccess(state, action) {
            state.statsLoading = false;
            state.stats = action.payload;
        },
        fetchStatsFailure(state, action) {
            state.statsLoading = false;
            state.error = action.payload;
        },
        fetchActivityRequest(state) {
            state.activityLoading = true;
            state.activityError = null;
        },
        fetchActivitySuccess(state, action) {
            state.activityLoading = false;
            state.activities = action.payload;
        },
        fetchActivityFailure(state, action) {
            state.activityLoading = false;
            state.activityError = action.payload;
        },
        fetchDriversRequest(state) {
            state.driversLoading = true;
            state.driversError = null;
        },
        fetchDriversSuccess(state, action) {
            state.driversLoading = false;
            state.drivers = action.payload;
        },
        fetchDriversFailure(state, action) {
            state.driversLoading = false;
            state.driversError = action.payload;
        },
        fetchUsersRequest(state) {
            state.usersLoading = true;
            state.usersError = null;
        },
        fetchUsersSuccess(state, action) {
            state.usersLoading = false;
            state.users = action.payload;
        },
        fetchUsersFailure(state, action) {
            state.usersLoading = false;
            state.usersError = action.payload;
        },
        fetchRevenueRequest(state) {
            state.revenueLoading = true;
            state.revenueError = null;
        },
        fetchRevenueSuccess(state, action) {
            state.revenueLoading = false;
            state.revenueChart = action.payload;
        },
        fetchRevenueFailure(state, action) {
            state.revenueLoading = false;
            state.revenueError = action.payload;
        },
        fetchPieRequest(state) {
            state.pieLoading = true;
            state.pieError = null;
        },
        fetchPieSuccess(state, action) {
            state.pieLoading = false;
            state.pieData = action.payload;
        },
        fetchPieFailure(state, action) {
            state.pieLoading = false;
            state.pieError = action.payload;
        },
        loginRequest(state, action) {
            state.Loginloading = true;
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action) {
            state.Loginloading = false;
            state.message = action.payload;
        },
        loginFailure(state, action) {
            state.Loginloading = false;
            state.error = action.payload;
        },
    },
});
export const { 
// fetchPostsRequest,
// fetchPostsSuccess,
// fetchPostsFailure,
fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure, fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure, fetchActivityRequest, fetchActivitySuccess, fetchActivityFailure, fetchDriversRequest, fetchDriversSuccess, fetchDriversFailure, fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, fetchRevenueRequest, fetchRevenueSuccess, fetchRevenueFailure, fetchPieRequest, fetchPieSuccess, fetchPieFailure, loginRequest, loginSuccess, loginFailure, } = postSlice.actions;
export default postSlice.reducer;
