/**
 *
 * Modal
 *
 */

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import users from '../../containers/TaskColumns/mocksData/users';

const Modal = props => {
  const { closeModal, onSubmit, buttonName, defaultUserValue, task } = props;
  const [newTask, setNewTask] = useState(task || '');
  const [userName, setUserName] = useState(defaultUserValue);
  const [error, setError] = useState({ hasError: false, errorMsg: '' });
  let modalRef = null;

  useEffect(() => {
    // To check and hide modal if the click is outside modal.
    const handleCloseModal = event => {
      if (modalRef && !modalRef.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('click', handleCloseModal);
    return () => {
      document.removeEventListener('click', handleCloseModal);
    };
  }, [closeModal, modalRef]);

  const handleTaskChange = event => {
    setNewTask(event.target.value);
  };

  const handleUserChange = event => {
    setUserName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (newTask.length > 2 && userName) {
      onSubmit(newTask, userName);
      setNewTask('');
      setUserName('');
      setError({ hasError: false, errorMsg: '' });
    } else {
      setError({
        hasError: true,
        errorMsg: 'Task and username length should be minimum 2 characters!!',
      });
    }
  };

  const assignedModalRef = node => {
    modalRef = node;
  };

  const userList = users.map(user => (
    <option key={user.id} value={user.name}>
      {user.name}
    </option>
  ));

  return (
    <section className="modal">
      <div className="modal-content" ref={node => assignedModalRef(node)}>
        <header>
          <button
            type="button"
            onClick={closeModal}
            className="modal-close-btn"
          >
            X
          </button>
        </header>

        <div className="task-input-section">
          <p className="error-display">
            {error.hasError === true && error.errorMsg}
          </p>
          <form className="add-task-form" onSubmit={handleSubmit}>
            <label htmlFor="task-input">Add task</label>
            <textarea
              type="text"
              className="add-task-input"
              name="task"
              placeholder="Add task"
              onChange={handleTaskChange}
              value={newTask}
              id="task-input"
            />

            <label htmlFor="select-user-dropdown">Assign user</label>
            <select
              className="select-input"
              onChange={handleUserChange}
              value={userName || 'Select user'}
              id="select-user-dropdown"
            >
              <option disabled defaultValue={userName || 'Select user'}>
                Select user
              </option>
              {userList}
            </select>

            <button type="submit" className="task-submit-btn">
              {buttonName}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

Modal.defaultProps = {
  buttonName: 'Add Task',
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.string,
  buttonName: PropTypes.string,
  defaultUserValue: PropTypes.string,
};

export default Modal;
