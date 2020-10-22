import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the taskColumns state domain
 */

const selectGlobal = state => state.tasks || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TaskColumns
 */

const makeSelectTasks = () =>
  createSelector(
    selectGlobal,
    substate => substate.tasks,
  );
const makeSelectTask = () =>
  createSelector(
    selectGlobal,
    substate => substate.task,
  );

const makeSelectHasTaskAdded = () =>
  createSelector(
    selectGlobal,
    substate => substate.hasTaskAdded,
  );
const makeSelectHasTaskDeleted = () =>
  createSelector(
    selectGlobal,
    substate => substate.hasTaskDeleted,
  );
const makeSelectHasTaskUpdated = () =>
  createSelector(
    selectGlobal,
    substate => substate.hasTaskUpdated,
  );

const makeSelectUserAssignedTasks = () =>
  createSelector(
    selectGlobal,
    substate => substate.userAssignedTasks,
  );
const makeSelectuserAssignedTasksFilterRequest = () =>
  createSelector(
    selectGlobal,
    substate => substate.userAssignedTasksFilterRequest,
  );

const makeSelectSearchResults = () =>
  createSelector(
    selectGlobal,
    substate => substate.searchResults,
  );
const makeSelectHasSearchResultFetched = () =>
  createSelector(
    selectGlobal,
    substate => substate.hasSearchResultFetched,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    substate => substate.error,
  );
const makeSelectErrorMsg = () =>
  createSelector(
    selectGlobal,
    substate => substate.errorMsg,
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
