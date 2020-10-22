/**
 *
 * TaskColumns
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import {
  makeSelectTasks,
  makeSelectHasTaskAdded,
  makeSelectHasTaskDeleted,
  makeSelectHasTaskUpdated,
  makeSelectError,
  makeSelectErrorMsg,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import taskSections from './mocksData/taskColumnsData';
import TaskBoard from '../TaskBoard/index';
import { taskDragAndDropRequest, fetchTasksRequest } from './actions';

import 'react-toastify/dist/ReactToastify.css';

export function TaskColumns(props) {
  useInjectReducer({ key: 'taskColumns', reducer });
  useInjectSaga({ key: 'taskColumns', saga });
  const {
    tasks,
    hasTaskAdded,
    hasTaskDeleted,
    hasTaskUpdated,
    error,
    errorMsg,
    fetchTasks,
    taskDragAndDrop,
  } = props;

  // console.log("TASKS ", hasTaskAdded, hasTaskDeleted, hasTaskUpdated, toast)

  useEffect(() => {
    fetchTasks();

    if (hasTaskAdded) {
      toast.success('Task added successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else if (hasTaskDeleted) {
      toast.success('Task deleted successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else if (hasTaskUpdated) {
      toast.success('Task updated successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else if (error) {
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  }, [hasTaskAdded, hasTaskUpdated, hasTaskDeleted, error, errorMsg]);

  const handleOnDragEnd = result => {
    const { source, destination, draggableId } = result;
    const taskList = [...tasks];

    if (destination) {
      // Copies the tasks getting from the redux state so that mutation can be performed directly.
      const destinationColumn = destination.droppableId;
      const destinationIndex = destination.index;
      const sourceColumn = source.droppableId;

      // Finds the index of the dragged task card from the taskList array.
      const sourceTaskIndex = taskList.findIndex(
        task => task.id === draggableId,
      );
      const destinationTaskList = taskList.filter(
        data => data.status === destinationColumn,
      );

      // This condition executes if dragged task card source and drop destination are same otherwise else condition executes.
      if (sourceColumn === destinationColumn) {
        const destinationTaskId = destinationTaskList[destinationIndex].id;
        const destinationTaskIndex = taskList.findIndex(
          task => task.id === destinationTaskId,
        );

        // Extracts the dragged task card from the taskList array.
        const [draggedTaskCard] = taskList.splice(sourceTaskIndex, 1);

        // Inserts the dragged task card in the taskList array at the index of the destination task card.
        taskList.splice(destinationTaskIndex, 0, draggedTaskCard);
      } else {
        const todoColumn = 'todo';
        const doingColumn = 'doing';
        const completedColumn = 'completed';

        if (
          (sourceColumn === todoColumn && destinationColumn === doingColumn) ||
          (sourceColumn === doingColumn &&
            destinationColumn === completedColumn) ||
          (sourceColumn === completedColumn && destinationColumn === todoColumn)
        ) {
          let destinationTaskId = null;
          let destinationTaskIndex = null;

          // This condition executes when the dragged task card needs to be dropped in between existing cards.
          if (
            destinationIndex !== 0 &&
            destinationIndex !== destinationTaskList.length
          ) {
            destinationTaskId = destinationTaskList[destinationIndex].id;
            destinationTaskIndex = taskList.findIndex(
              task => task.id === destinationTaskId,
            );

            // This condition executes when the dragged task card needs to be dropped at the end of the existing cards or there's no card available.
          } else if (destinationIndex === destinationTaskList.length) {
            destinationTaskIndex = taskList.length + 1;
          } else {
            destinationTaskIndex = 0;
          }

          // Extracts the dragged task card from the taskList array.
          const [draggedTaskCard] = taskList.splice(sourceTaskIndex, 1);

          // Changes the status of to be dropped task card according the destinationColumn.
          draggedTaskCard.status = destinationColumn;

          // Inserts the dragged task card in the taskList array at the index of the destination task card depending on the source task index.
          if (sourceTaskIndex < destinationTaskIndex) {
            taskList.splice(destinationTaskIndex - 1, 0, draggedTaskCard);
          } else {
            taskList.splice(destinationTaskIndex, 0, draggedTaskCard);
          }
        }
      }
    }
    return taskDragAndDrop(taskList);
  };

  return (
    <div className="task-list-container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {taskSections &&
          taskSections.map(taskSection => {
            const taskSectionId = taskSection.id;
            return <TaskBoard key={taskSectionId} taskSection={taskSection} />;
          })}
      </DragDropContext>
    </div>
  );
}

TaskColumns.defaultProps = {
  tasks: [],
  errorMsg: '',
};

TaskColumns.propTypes = {
  fetchTasks: PropTypes.func,
  taskDragAndDrop: PropTypes.func,
  tasks: PropTypes.array,
  hasTaskAdded: PropTypes.bool,
  hasTaskDeleted: PropTypes.bool,
  hasTaskUpdated: PropTypes.bool,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
  hasTaskAdded: makeSelectHasTaskAdded(),
  hasTaskDeleted: makeSelectHasTaskDeleted(),
  hasTaskUpdated: makeSelectHasTaskUpdated(),
  error: makeSelectError(),
  errorMsg: makeSelectErrorMsg(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTasks: () => dispatch(fetchTasksRequest()),
    taskDragAndDrop: taskList => dispatch(taskDragAndDropRequest(taskList)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TaskColumns);
