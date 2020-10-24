import { call, put, takeLatest, all } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from './constants';
// import request from 'utils/request';
// import { makeSelectTasks } from './selectors';

import {
  fetchTasksSuccess,
  fetchTasksFailure,
  fetchTaskSuccess,
  fetchTaskFailure,
  addTaskFailure,
  addTaskSuccess,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
} from './actions';

const baseUrl = 'http://localhost:3004/tasks';

// Request for fetching all tasks
function* asyncFetchTasksRequest() {
  try {
    const response = yield call(() => axios.get(baseUrl));
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

export function* watchFetchAllTasksSaga() {
  yield takeLatest(actions.FETCH_ALL_TASKS_REQUEST, asyncFetchTasksRequest);
}

// Request for fetching single task
function* asyncFetchTaskRequest(action) {
  try {
    const { taskId } = action.payload;
    yield put(fetchTaskSuccess(taskId));
  } catch (error) {
    yield put(fetchTaskFailure(error));
  }
}

export function* watchFetchTaskSaga() {
  yield takeLatest(actions.FETCH_TASK_REQUEST, asyncFetchTaskRequest);
}

// Adding task
function* asyncAddTaskRequest(action) {
  try {
    const data = action.payload;
    yield call(() =>
      axios({
        method: 'post',
        url: baseUrl,
        data,
      }),
    );
    yield put(addTaskSuccess());
  } catch (error) {
    yield put(addTaskFailure(error));
  }
}

export function* watchAddTaskSaga() {
  yield takeLatest(actions.ADD_TASK_REQUEST, asyncAddTaskRequest);
}

// Updating task
function* asyncUpdateTaskRequest(action) {
  try {
    const { taskId, data } = action.payload;
    yield call(() =>
      axios({
        method: 'patch',
        url: `${baseUrl}/${taskId}`,
        data,
      }),
    );
    yield put(updateTaskSuccess());
  } catch (error) {
    yield put(updateTaskFailure(error));
  }
}

export function* watchUpdateTaskSaga() {
  yield takeLatest(actions.UPDATE_TASK_REQUEST, asyncUpdateTaskRequest);
}

// Deleting task
function* asyncDeleteTaskRequest(action) {
  try {
    const { taskId } = action.payload;
    yield call(() => axios.delete(`${baseUrl}/${taskId}`));
    yield put(deleteTaskSuccess());
  } catch (error) {
    yield put(deleteTaskFailure(error));
  }
}

export function* watchDeleteTaskSaga() {
  yield takeLatest(actions.DELETE_TASK_REQUEST, asyncDeleteTaskRequest);
}

export default function* rootSaga() {
  yield all([
    watchFetchAllTasksSaga(),
    watchFetchTaskSaga(),
    watchAddTaskSaga(),
    watchUpdateTaskSaga(),
    watchDeleteTaskSaga(),
  ]);
}
