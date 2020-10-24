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
export const fetchUserAssignedTasks = user => ({
  type: actions.USER_ASSIGNED_TASKS_FILTER,
  payload: user,
});

// Actions for show all tasks filter
export const showAllTaskFilterAction = () => ({
  type: actions.SHOW_ALL_TASKS_FILTER,
});

// Actions for fetching search results
export const fetchSearchResultsAction = searchInput => ({
  type: actions.FETCH_SEARCH_RESULTS,
  payload: searchInput,
});

// Actions for drag and drop tasks
export const taskDragAndDropAction = data => ({
  type: actions.TASK_DRAG_AND_DROP,
  payload: data,
});
