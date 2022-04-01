import React from 'react';
import styles from './Task.module.css';

const Task = ({ task: { id, name, timeStart, timeEnd, type }, mode, onChangeType, onDeleteTask }) => {
  const onDelete = () => {
    onDeleteTask(id);
  };

  const onChangeTypeToCompleted = () => {
    onChangeType(id, 'completed');
  };

  const onChangeTypeToIncompleted = () => {
    onChangeType(id, 'incompleted');
  };

  return (
    <li className={`${styles.task} ${styles[type]}`}>
      <h3>{name}</h3>
      {mode === 'normal' && (
        <button onClick={onDelete} className={styles.deleteButton} type="button">
          🗑️
        </button>
      )}

      {mode === 'normal' && (
        <div className={styles.typeButtonGroup}>
          <button onClick={onChangeTypeToCompleted} type="button">
            ✔️
          </button>
          <button onClick={onChangeTypeToIncompleted} type="button">
            ❌
          </button>
        </div>
      )}
    </li>
  );
};

export default Task;
