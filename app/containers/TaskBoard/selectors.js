import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the taskBoard state domain
 */

const selectTaskBoardDomain = state => state.taskBoard || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TaskBoard
 */

const makeSelectTaskBoard = () =>
  createSelector(
    selectTaskBoardDomain,
    substate => substate,
  );

export default makeSelectTaskBoard;
export { selectTaskBoardDomain };
