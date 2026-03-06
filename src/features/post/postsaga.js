import { call, put, takeLatest } from "redux-saga/effects";
import { activityApi, driversApi, loginAPI, ordersApi, pieApi, revenueApi, statsApi, usersApi } from "./api";
import { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure, fetchStatsSuccess, fetchStatsFailure, fetchStatsRequest, fetchActivityRequest, fetchActivitySuccess, fetchActivityFailure, fetchDriversSuccess, fetchDriversFailure, fetchDriversRequest, fetchUsersSuccess, fetchUsersFailure, fetchUsersRequest, fetchRevenueSuccess, fetchRevenueFailure, fetchRevenueRequest, fetchPieSuccess, fetchPieFailure, fetchPieRequest, loginRequest, loginSuccess, loginFailure, } from "./postSlice";
// function* workerFetchPosts(): Generator<any, void, Post[]> {
//   try {
//     const data = yield call(fetchPostsAPI);
//     yield put(fetchPostsSuccess(data));
//   } catch (error: any) {
//     yield put(fetchPostsFailure(error.message));
//   }
// };
function* handleFetchOrders() {
    try {
        const data = yield call(ordersApi.getOrders);
        yield put(fetchOrdersSuccess(data));
    }
    catch (error) {
        yield put(fetchOrdersFailure(error.message));
    }
}
;
function* handleFetchStats() {
    try {
        const data = yield call(statsApi.getStats);
        yield put(fetchStatsSuccess(data));
    }
    catch (error) {
        yield put(fetchStatsFailure(error.message));
    }
}
;
function* handleFetchActivity() {
    try {
        const data = yield call(activityApi.getActivity);
        yield put(fetchActivitySuccess(data));
    }
    catch (error) {
        yield put(fetchActivityFailure(error.message));
    }
}
;
function* handleFetchDrivers() {
    try {
        const data = yield call(driversApi.getDrivers);
        yield put(fetchDriversSuccess(data));
    }
    catch (error) {
        yield put(fetchDriversFailure(error.message));
    }
}
;
function* handleFetchUsers() {
    try {
        const data = yield call(usersApi.getUsers);
        yield put(fetchUsersSuccess(data));
    }
    catch (error) {
        yield put(fetchUsersFailure(error.message));
    }
}
;
function* handleFetchRevenue() {
    try {
        const data = yield call(revenueApi.getRevenueChart);
        yield put(fetchRevenueSuccess(data));
    }
    catch (error) {
        yield put(fetchRevenueFailure(error.message));
    }
}
function* handleFetchPie() {
    try {
        const data = yield call(pieApi.getPieData);
        yield put(fetchPieSuccess(data));
    }
    catch (error) {
        yield put(fetchPieFailure(error.message));
    }
}
function* handleLogin(action) {
    try {
        const data = yield call(loginAPI, action.payload.email);
        if (data.status === "success") {
            yield put(loginSuccess(data.message));
        }
        else {
            yield put(loginFailure("Login failed"));
        }
    }
    catch (error) {
        yield put(loginFailure(error.message));
    }
}
export default function* postSaga() {
    // yield takeLatest(fetchPostsRequest.type, workerFetchPosts);
    yield takeLatest(fetchOrdersRequest.type, handleFetchOrders);
    yield takeLatest(fetchStatsRequest.type, handleFetchStats);
    yield takeLatest(fetchActivityRequest.type, handleFetchActivity);
    yield takeLatest(fetchDriversRequest.type, handleFetchDrivers);
    yield takeLatest(fetchUsersRequest.type, handleFetchUsers);
    yield takeLatest(fetchRevenueRequest.type, handleFetchRevenue);
    yield takeLatest(fetchPieRequest.type, handleFetchPie);
    yield takeLatest(loginRequest.type, handleLogin);
}
