/**
 *
 * Header
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { debounce } from 'lodash';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import saga from './saga';

import users from '../TaskColumns/mocksData/users';
import {
  fetchUserAssignedTasksRequest,
  showAllTaskFilterRequest,
  fetchSearchResultsRequest,
} from '../TaskColumns/actions';

import {
  makeSelectUserAssignedTasks,
  makeSelectuserAssignedTasksFilterRequest,
  makeSelectSearchResults,
  makeSelectHasSearchResultFetched,
} from '../TaskColumns/selectors';

export function Header(props) {
  useInjectSaga({ key: 'header', saga });

  const {
    userAssignedTasksFilterRequest,
    userAssignedTasks,
    fetchSearchResults,
    showAllTaskFilter,
    fetchUserAssignedTasks,
    searchResults,
    hasSearchResultFetched,
  } = props;

  useEffect(() => {
    if (
      (userAssignedTasksFilterRequest && userAssignedTasks.length < 1) ||
      (hasSearchResultFetched && searchResults.length < 1)
    ) {
      toast.info('No records found.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  }, [
    userAssignedTasksFilterRequest,
    userAssignedTasks,
    searchResults,
    hasSearchResultFetched,
  ]);

  const handleSearchQuery = event => {
    const searchInput = event.target.value;
    if (searchInput.length > 1) {
      const searchQuery = searchInput
        .toLowerCase()
        .split(' ')
        .filter(token => token.trim() !== '');
      const searchQueryRegex = new RegExp(searchQuery.join(' '), 'gi');
      fetchSearchQueryData(searchQueryRegex);
    } else {
      showAllTaskFilter();
    }
  };

  const fetchSearchQueryData = debounce(searchQuery => {
    fetchSearchResults(searchQuery);
  }, 500);

  const handleUserChange = event => {
    const selectedUser = event.target.value;
    return selectedUser === 'showAllTasks'
      ? showAllTaskFilter()
      : fetchUserAssignedTasks(selectedUser);
  };

  const userList = users.map(user => (
    <option key={user.id} value={user.name}>
      {user.name}
    </option>
  ));

  return (
    <header className="header">
      <ToastContainer />
      <h1 className="heading">Kanban Board</h1>
      <div className="search-and-filter-wrapper">
        <div className="search-container">
          <form className="search-form">
            <input
              type="text"
              className="search-input"
              onChange={handleSearchQuery}
              placeholder="Search task.."
            />
          </form>
        </div>
        <div className="filter-container">
          <form className="filter-form">
            <select
              className="filter-select"
              name="user-task-filter"
              onChange={handleUserChange}
              defaultValue="Filter tasks by username"
            >
              <option disabled defaultValue="Filter tasks by username">
                Filter tasks by username
              </option>
              <option value="showAllTasks">Show all tasks</option>
              {userList}
            </select>
          </form>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  fetchSearchResults: PropTypes.func,
  showAllTaskFilter: PropTypes.func,
  fetchUserAssignedTasks: PropTypes.func,
  userAssignedTasks: PropTypes.array,
  userAssignedTasksFilterRequest: PropTypes.bool,
  searchResults: PropTypes.array,
  hasSearchResultFetched: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  userAssignedTasks: makeSelectUserAssignedTasks(),
  userAssignedTasksFilterRequest: makeSelectuserAssignedTasksFilterRequest(),
  searchResults: makeSelectSearchResults(),
  hasSearchResultFetched: makeSelectHasSearchResultFetched(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSearchResults: searchQuery =>
      dispatch(fetchSearchResultsRequest(searchQuery)),
    showAllTaskFilter: () => dispatch(showAllTaskFilterRequest()),
    fetchUserAssignedTasks: user =>
      dispatch(fetchUserAssignedTasksRequest(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
