/**
 *
 * TaskBoard
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { useInjectReducer } from 'utils/injectReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import makeSelectTaskBoard from './selectors';
import reducer from './reducer';

import {
  makeSelectTasks,
  makeSelectTask,
  makeSelectUserAssignedTasks,
  makeSelectuserAssignedTasksFilterRequest,
  makeSelectSearchResults,
  makeSelectHasSearchResultFetched,
} from '../TaskColumns/selectors';

import {
  fetchTaskRequest,
  addTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from '../TaskColumns/actions';

import Modal from '../../components/Modal/index';

export function TaskBoard(props) {
  useInjectReducer({ key: 'taskBoard', reducer });

  const [taskId, setTaskId] = useState(undefined);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [buttonName, setButtonName] = useState('');

  const {
    taskCards,
    taskSection,
    userAssignedTasks,
    userAssignedTasksFilterRequest,
    taskData,
    hasSearchResultFetched,
    searchResults,
    addTask,
    updateTask,
    deleteTask,
    fetchTask,
  } = props;

  const { task, user } = taskData;

  const getDroppableTaskCards = taskCardList => {
    const taskLists =
      taskCardList &&
      taskCardList
        .filter(taskCard => taskCard.status === taskSection.title.toLowerCase())
        .map((taskCard, index) => {
          const taskCardId = taskCard.id;
          const username = taskCard.user;
          const userFirstName = username ? username.split(' ')[0] : '';
          return (
            <Draggable key={taskCardId} draggableId={taskCardId} index={index}>
              {provided => (
                <li
                  key={taskCardId}
                  className="task-card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div
                    onClick={() => toggleUpdateTaskModal(taskCardId)}
                    // onKeyDown={toggleUpdateTaskModal(taskCardId)}
                    className="task-title"
                    role="presentation"
                  >
                    {taskCard.task}
                  </div>
                  <p className="task-card-username-and-drop-btn">
                    <button
                      className="delete-task-btn"
                      id={taskCardId}
                      onClick={handleDelete}
                      type="button"
                    >
                      <FontAwesomeIcon icon={faTrash} className="dropIcon" />
                    </button>
                    <span className="task-card-username" title={username}>
                      {userFirstName}
                    </span>
                  </p>
                </li>
              )}
            </Draggable>
          );
        });
    return taskLists;
  };

  const handleSubmit = (taskName, userName) => {
    const status = taskSection.title.toLowerCase();
    const data = {
      task: taskName.trim(),
      user: userName.trim(),
      status,
    };
    if (taskId === undefined) {
      return addTask(data);
    }
    updateTask(taskId, data);
    return toggleModal();
  };

  const handleDelete = event => {
    event.preventDefault();
    const taskCardId = event.target.id;
    deleteTask(taskCardId);
  };

  const toggleUpdateTaskModal = taskCardId => {
    setButtonName('Update Task');
    setTaskId(taskCardId);
    setModalVisibility(!modalVisibility);
    return taskCardId && fetchTask(taskCardId);
  };

  const toggleModal = () => {
    setModalVisibility(!modalVisibility);
    setButtonName('Add Task');
    setTaskId(undefined);
  };

  const displayTaskCard = () => {
    if (userAssignedTasksFilterRequest) {
      return getDroppableTaskCards(userAssignedTasks);
    }
    if (hasSearchResultFetched) {
      return getDroppableTaskCards(searchResults);
    }
    return getDroppableTaskCards(taskCards);
  };

  return (
    <>
      <div className="task-list-card">
        <header className="task-list-header">
          <h3>{taskSection.title}</h3>
        </header>

        <Droppable key={taskSection.id} droppableId={taskSection.id}>
          {provided => (
            <ul
              className="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {displayTaskCard()}

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <button
          onClick={toggleModal}
          className="add-task-card-btn"
          type="button"
        >
          Add Task Card
          <FontAwesomeIcon icon={faPlus} className="searchIcon" />
        </button>
      </div>

      {modalVisibility ? (
        <Modal
          task={taskId === undefined ? '' : task}
          defaultUserValue={taskId === undefined ? '' : user}
          closeModal={toggleModal}
          buttonName={buttonName}
          onSubmit={handleSubmit}
        />
      ) : null}
    </>
  );
}

TaskBoard.defaultProps = {
  taskCards: [],
  taskData: {},
  userAssignedTasks: [],
  searchResults: [],
};

TaskBoard.propTypes = {
  taskSection: PropTypes.object,
  taskCards: PropTypes.array,
  taskData: PropTypes.object,
  addTask: PropTypes.func,
  deleteTask: PropTypes.func,
  updateTask: PropTypes.func,
  fetchTask: PropTypes.func,
  userAssignedTasks: PropTypes.array,
  userAssignedTasksFilterRequest: PropTypes.bool,
  searchResults: PropTypes.array,
  hasSearchResultFetched: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  taskBoard: makeSelectTaskBoard(),
  taskCards: makeSelectTasks(),
  taskData: makeSelectTask(),
  userAssignedTasks: makeSelectUserAssignedTasks(),
  userAssignedTasksFilterRequest: makeSelectuserAssignedTasksFilterRequest(),
  searchResults: makeSelectSearchResults(),
  hasSearchResultFetched: makeSelectHasSearchResultFetched(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTask: taskId => dispatch(fetchTaskRequest(taskId)),
    updateTask: (taskId, data) => dispatch(updateTaskRequest(taskId, data)),
    deleteTask: taskId => dispatch(deleteTaskRequest(taskId)),
    addTask: data => dispatch(addTaskRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TaskBoard);
