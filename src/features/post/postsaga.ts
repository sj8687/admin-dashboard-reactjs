import { call, put, takeLatest } from "redux-saga/effects";
import { activityApi, driversApi, fetchPostsAPI, ordersApi, revenueApi, statsApi, usersApi } from "./api";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchStatsSuccess,
  fetchStatsFailure,
  fetchStatsRequest,
  fetchActivityRequest,
  fetchActivitySuccess,
  fetchActivityFailure,
  fetchDriversSuccess,
  fetchDriversFailure,
  fetchDriversRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchRevenueSuccess,
  fetchRevenueFailure,
  fetchRevenueRequest,

} from "./postSlice";
import type { Driver, Post, RevenueChartItem, User } from "../../constants/type";
import type { SagaIterator } from "redux-saga";

// function* workerFetchPosts(): Generator<any, void, Post[]> {
//   try {
//     const data = yield call(fetchPostsAPI);
//     yield put(fetchPostsSuccess(data));
//   } catch (error: any) {
//     yield put(fetchPostsFailure(error.message));
//   }
// };

function* handleFetchOrders(): SagaIterator {
  try {
    const data = yield call(ordersApi.getOrders);
    yield put(fetchOrdersSuccess(data));
  } catch (error: any) {
    yield put(fetchOrdersFailure(error.message));
  }
};


function* handleFetchStats(): SagaIterator {
  try {
    const data = yield call(statsApi.getStats);
    yield put(fetchStatsSuccess(data));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
};


function* handleFetchActivity(): SagaIterator {
  try {
    const data = yield call(activityApi.getActivity);
    yield put(fetchActivitySuccess(data));
  } catch (error: any) {
    yield put(fetchActivityFailure(error.message));
  }
};


function* handleFetchDrivers(): SagaIterator {
  try {
    const data: Driver[] = yield call(driversApi.getDrivers);
    yield put(fetchDriversSuccess(data));
  } catch (error: any) {
    yield put(fetchDriversFailure(error.message));
  }
};


function* handleFetchUsers(): SagaIterator {
  try {
    const data: User[] = yield call(usersApi.getUsers);
    yield put(fetchUsersSuccess(data));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
};



function* handleFetchRevenue(): SagaIterator {
  try {
    const data: RevenueChartItem[] = yield call(
      revenueApi.getRevenueChart
    );
    yield put(fetchRevenueSuccess(data));
  } catch (error: any) {
    yield put(fetchRevenueFailure(error.message));
  }
}






export default function* postSaga(): SagaIterator {
  // yield takeLatest(fetchPostsRequest.type, workerFetchPosts);
  yield takeLatest(fetchOrdersRequest.type, handleFetchOrders);
  yield takeLatest(fetchStatsRequest.type, handleFetchStats);
  yield takeLatest(fetchActivityRequest.type, handleFetchActivity);
  yield takeLatest(fetchDriversRequest.type, handleFetchDrivers);
  yield takeLatest(fetchUsersRequest.type, handleFetchUsers);
  yield takeLatest(fetchRevenueRequest.type, handleFetchRevenue);

}


