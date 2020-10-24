/*
 *
 * TaskColumns reducer
 *
 */
import * as actions from './constants';

export const initialState = {
  isLoading: false,
  tasks: [],
  error: false,
  errorMsg: '',
  task: {},
  hasTaskAdded: false,
  hasTaskUpdated: false,
  hasTaskDeleted: false,
  userAssignedTasks: [],
  userAssignedTasksFilterRequest: false,
  searchResults: [],
  hasSearchResultFetched: false,
};

let errorMsg = 'Oops!! Something went wrong';

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handling actions for all tasks
    case actions.FETCH_ALL_TASKS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actions.FETCH_ALL_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasTaskAdded: false,
        hasTaskUpdated: false,
        hasTaskDeleted: false,
        userAssignedTasksFilterRequest: false,
        hasSearchResultFetched: false,
        tasks: action.payload,
        error: false,
      };

    case actions.FETCH_ALL_TASKS_FAILURE:
      errorMsg =
        "Oops!! Couldn't  able to fetch records!! Please check your url.";
      return {
        ...state,
        isLoading: false,
        tasks: [],
        error: true,
        errorMsg,
      };

    // Handling actions for single task
    case actions.FETCH_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };

    case actions.FETCH_TASK_SUCCESS: {
      const { taskId } = action.payload;
      const [fetchedTask] = state.tasks.filter(task => task.id === taskId);
      return {
        ...state,
        task: fetchedTask || {},
        isLoading: false,
        error: false,
      };
    }

    case actions.FETCH_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        task: {},
        error: true,
        errorMsg,
      };

    // Handling actions for adding task
    case actions.ADD_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasTaskAdded: false,
        error: false,
      };

    case actions.ADD_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasTaskAdded: true,
        error: false,
      };

    case actions.ADD_TASK_FAILURE:
      errorMsg = "Oops!! Couldn't  able to save your task!! Try again.";
      return {
        ...state,
        hasTaskAdded: false,
        error: true,
        errorMsg,
      };

    // Handling actions for updating task
    case actions.UPDATE_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasTaskUpdated: false,
        error: false,
      };

    case actions.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasTaskUpdated: true,
        task: {},
        error: false,
      };

    case actions.UPDATE_TASK_FAILURE:
      errorMsg = "Oops!! Couldn't  able to update your task!! Try again.";
      return {
        ...state,
        hasTaskUpdated: false,
        error: true,
        errorMsg,
      };

    // Handling actions for deleting task
    case actions.DELETE_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasTaskDeleted: false,
        error: false,
      };

    case actions.DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasTaskDeleted: true,
        error: false,
      };

    case actions.DELETE_TASK_FAILURE:
      errorMsg = "Oops!! Couldn't  able to delete your task!! Try again.";
      return {
        ...state,
        hasTaskDeleted: false,
        error: true,
        errorMsg,
      };

    // Handling actions for user assigned tasks filter
    case actions.USER_ASSIGNED_TASKS_FILTER: {
      const user = action.payload;
      const userAssignedTasks = state.tasks.filter(task => task.user === user);
      return {
        ...state,
        userAssignedTasks,
        error: false,
        isLoading: false,
        hasSearchResultFetched: false,
        userAssignedTasksFilterRequest: true,
      };
    }

    // Handling actions for show all tasks filter
    case actions.SHOW_ALL_TASKS_FILTER:
      return {
        ...state,
        isLoading: false,
        userAssignedTasksFilterRequest: false,
        hasSearchResultFetched: false,
        error: false,
      };

    // Handling actions for search tasks
    case actions.FETCH_SEARCH_RESULTS: {
      const searchInput = action.payload;
      const matchedTasks = state.tasks.filter(taskObj => {
        let taskString = '';
        if (taskObj.task !== '') {
          taskString += taskObj.task
            .toString()
            .toLowerCase()
            .trim();
        }
        return taskString.match(searchInput);
      });

      return {
        ...state,
        searchResults: matchedTasks,
        hasSearchResultFetched: true,
        error: false,
      };
    }

    // Handling actions for drag and drop
    case actions.TASK_DRAG_AND_DROP:
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
