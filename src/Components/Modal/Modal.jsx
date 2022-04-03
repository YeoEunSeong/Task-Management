import React, { useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ mode, task, onEditting, selectEdittingId, toggleMode, isValidTime, onAddTask }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [taskStart, setTaskStart] = useState(task.start);
  const [taskEnd, setTaskEnd] = useState(task.end);
  const onNameChange = e => {
    const {
      target: { value },
    } = e;
    setTaskName(value);
  };

  const onStartChange = e => {
    const {
      target: { value },
    } = e;
    setTaskStart(value);
  };

  const onEndChange = e => {
    const {
      target: { value },
    } = e;
    setTaskEnd(value);
  };

  const onCancelClick = () => {
    if (mode === 'read') {
      selectEdittingId(null);
    } else {
      toggleMode();
    }
  };

  const onEdit = e => {
    e.preventDefault();

    const { status, message } = isValidTime(task.id, taskStart, taskEnd);
    if (status === 'ok') {
      onEditting({ ...task, name: taskName, start: taskStart, end: taskEnd });
    } else {
      alert(message);
      setTaskStart(task.start);
      setTaskEnd(task.end);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const { status, message } = isValidTime(null, taskStart, taskEnd);
    if (status === 'ok') {
      onAddTask(taskName, taskStart, taskEnd);
    } else {
      alert(message);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={mode === 'add' ? onSubmit : onEdit}>
        <label htmlFor="task-name">할 일:</label>
        <input
          id="task-name"
          type="text"
          placeholder="할 일을 입력하세요"
          value={taskName}
          onChange={onNameChange}
          required
        />
        <label htmlFor="task-start">시작:</label>
        <input id="task-start" type="number" min="9" max="24" value={taskStart} onChange={onStartChange} />
        <label htmlFor="task-end">끝:</label>
        <input id="task-end" type="number" min="9" max="24" value={taskEnd} onChange={onEndChange} />

        <div className="button-group">
          <button type="button" onClick={onCancelClick}>
            cancel
          </button>
          <button type="submit">submit</button>
        </div>
      </form>
      <div onClick={onCancelClick} className={styles.overlay}></div>
    </>
  );
};

export default Modal;
