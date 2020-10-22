/*
 *
 * TaskColumns actions
 *
 */

import * as actions from './constants';

// Fetch request actions for all tasks
export const fetchTasksRequest = () => ({
  type: actions.FETCH_ALL_TASKS_REQUEST,
});

export const fetchTasksSuccess = data => ({
  type: actions.FETCH_ALL_TASKS_SUCCESS,
  payload: data,
});

export const fetchTasksFailure = () => ({
  type: actions.FETCH_ALL_TASKS_FAILURE,
});

// Fetch request actions for single task
export const fetchTaskRequest = taskId => ({
  type: actions.FETCH_TASK_REQUEST,
  payload: {
    taskId,
  },
});

export const fetchTaskSuccess = taskId => ({
  type: actions.FETCH_TASK_SUCCESS,
  payload: {
    taskId,
  },
});

export const fetchTaskFailure = () => ({
  type: actions.FETCH_TASK_FAILURE,
});

// Actions for add task
export const addTaskRequest = data => ({
  type: actions.ADD_TASK_REQUEST,
  payload: data,
});

export const addTaskSuccess = () => ({
  type: actions.ADD_TASK_SUCCESS,
});

export const addTaskFailure = () => ({
  type: actions.ADD_TASK_FAILURE,
});

// Actions for update task
export const updateTaskRequest = (taskId, data) => ({
  type: actions.UPDATE_TASK_REQUEST,
  payload: {
    taskId,
    data,
  },
});

export const updateTaskSuccess = () => ({
  type: actions.UPDATE_TASK_SUCCESS,
});

export const updateTaskFailure = () => ({
  type: actions.UPDATE_TASK_FAILURE,
});

// Actions for delete task
export const deleteTaskRequest = taskId => ({
  type: actions.DELETE_TASK_REQUEST,
  payload: {
    taskId,
  },
});

export const deleteTaskSuccess = () => ({
  type: actions.DELETE_TASK_SUCCESS,
});

export const deleteTaskFailure = () => ({
  type: actions.DELETE_TASK_FAILURE,
});

// Actions for user assigned tasks filter
export const fetchUserAssignedTasksRequest = user => ({
  type: actions.USER_TASK_FILTER_REQUEST,
  payload: user,
});

export const fetchUserAssignedTasksSuccess = user => ({
  type: actions.USER_TASK_FILTER_SUCCESS,
  payload: user,
});

export const fetchUserAssignedTasksFailure = () => ({
  type: actions.USER_TASK_FILTER_FAILURE,
});

// Actions for show all tasks filter
export const showAllTaskFilterRequest = () => ({
  type: actions.SHOW_ALL_TASKS_FILTER_REQUEST,
});

export const showAllTaskFilterSuccess = () => ({
  type: actions.SHOW_ALL_TASKS_FILTER_SUCCESS,
});

export const showAllTaskFilterFailure = () => ({
  type: actions.SHOW_ALL_TASKS_FILTER_FAILURE,
});

// Actions for fetching search results
export const fetchSearchResultsRequest = searchInput => ({
  type: actions.FETCH_SEARCH_RESULTS_REQUEST,
  payload: searchInput,
});

export const fetchSearchResultsSuccess = searchInput => ({
  type: actions.FETCH_SEARCH_RESULTS_SUCCESS,
  payload: searchInput,
});

export const fetchSearchResultsFailure = () => ({
  type: actions.FETCH_SEARCH_RESULTS_FAILURE,
});

// Actions for drag and drop tasks
export const taskDragAndDropRequest = data => ({
  type: actions.TASK_DRAG_AND_DROP_REQUEST,
  payload: data,
});
