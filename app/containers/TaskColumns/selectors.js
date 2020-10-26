import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the taskColumns state domain
 */

const selectGlobal = state => state.tasks || initialState;

/**
 * Other specific selectors
 */
const selectAllTasks = state => state.tasks.tasks;
const selectSingleTask = state => state.tasks.task;
const selectHasTaskAdded = state => state.tasks.hasTaskAdded;
const selectHasTaskUpdated = state => state.tasks.hasTaskUpdated;
const selectHasTaskDeleted = state => state.tasks.hasTaskDeleted;
const selectUserAssignedTasks = state => state.tasks.userAssignedTasks;
const selectUserAssignedTasksFilterRequest = state =>
  state.tasks.userAssignedTasksFilterRequest;
const selectSearchResults = state => state.tasks.searchResults;
const selectHasSearchResultFetched = state =>
  state.tasks.hasSearchResultFetched;
const selectError = state => state.tasks.error;
const selectErrorMsg = state => state.tasks.errorMsg;

/**
 * Default selector used by TaskColumns
 */

const makeSelectTasks = () =>
  createSelector(
    selectAllTasks,
    substate => substate,
  );

const makeSelectTask = () =>
  createSelector(
    selectSingleTask,
    substate => substate,
  );

const makeSelectHasTaskAdded = () =>
  createSelector(
    selectHasTaskAdded,
    substate => substate,
  );
const makeSelectHasTaskDeleted = () =>
  createSelector(
    selectHasTaskDeleted,
    substate => substate,
  );
const makeSelectHasTaskUpdated = () =>
  createSelector(
    selectHasTaskUpdated,
    substate => substate,
  );

const makeSelectUserAssignedTasks = () =>
  createSelector(
    selectUserAssignedTasks,
    substate => substate,
  );
const makeSelectuserAssignedTasksFilterRequest = () =>
  createSelector(
    selectUserAssignedTasksFilterRequest,
    substate => substate,
  );

const makeSelectSearchResults = () =>
  createSelector(
    selectSearchResults,
    substate => substate,
  );
const makeSelectHasSearchResultFetched = () =>
  createSelector(
    selectHasSearchResultFetched,
    substate => substate,
  );

const makeSelectError = () =>
  createSelector(
    selectError,
    substate => substate,
  );
const makeSelectErrorMsg = () =>
  createSelector(
    selectErrorMsg,
    substate => substate,
  );

export {
  selectGlobal,
  makeSelectTasks,
  makeSelectTask,
  makeSelectHasTaskAdded,
  makeSelectHasTaskDeleted,
  makeSelectHasTaskUpdated,
  makeSelectUserAssignedTasks,
  makeSelectuserAssignedTasksFilterRequest,
  makeSelectSearchResults,
  makeSelectHasSearchResultFetched,
  makeSelectError,
  makeSelectErrorMsg,
};
