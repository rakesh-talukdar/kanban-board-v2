/**
 *
 * Modal
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import users from '../../../mocksData/users';

const Modal = props => {
  const {
    closeModal,
    onSubmit,
    buttonName,
    defaultUserValue,
    task,
    description,
  } = props;

  const [newTask, setNewTask] = useState(task || '');
  // Testing start
  const [newDescription, setNewDescription] = useState(description || '');
  // Testing end
  const [userName, setUserName] = useState(defaultUserValue);
  const [error, setError] = useState({ hasError: false, errorMsg: '' });
  let modalRef = null;

  // Option element from Select ant D
  const { Option } = Select;

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
    setUserName(event);
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setNewDescription(data);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (newTask.length > 2 && userName) {
      onSubmit(newTask, userName, newDescription);
      setNewTask('');
      setNewDescription('');
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
    <Option key={user.id} value={user.name}>
      {user.name}
    </Option>
  ));

  return (
    <section className="modal">
      <div className="modal-content" ref={node => assignedModalRef(node)}>
        <header>
          <Button
            htmlType="button"
            onClick={closeModal}
            className="modal-close-btn"
            size="small"
          >
            X
          </Button>
        </header>

        <div className="task-input-section">
          <p className="error-display">
            {error.hasError === true && error.errorMsg}
          </p>
          <form className="add-task-form" onSubmit={handleSubmit}>
            <label htmlFor="task-input">Add task</label>
            <input
              type="text"
              className="add-task-input"
              name="task"
              placeholder="Add task"
              onChange={handleTaskChange}
              value={newTask}
              id="task-input"
            />

            {/* Testing start */}
            <label htmlFor="task-description">Description</label>
            <CKEditor
              id="task-description"
              className="task-description-input"
              editor={ClassicEditor}
              data={description}
              onChange={handleDescriptionChange}
            />
            {/* Testing end */}

            <label htmlFor="select-user-dropdown">Assign user</label>
            <Select
              className="select-input"
              id="select-user-dropdown"
              showSearch
              placeholder="Select user"
              value={userName || 'Select user'}
              optionFilterProp="children"
              onChange={handleUserChange}
            >
              {userList}
            </Select>
            <Button
              type="primary"
              htmlType="submit"
              className="task-submit-btn"
              size="large"
            >
              {buttonName}
            </Button>
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
  description: PropTypes.any,
};

export default Modal;
