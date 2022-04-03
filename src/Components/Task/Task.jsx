import React from 'react';
import styles from './Task.module.css';

const Task = ({ task: { id, name, start, end, type }, mode, onChangeType, onDeleteTask, selectEdittingId }) => {
  const onDelete = () => {
    onDeleteTask(id);
  };

  const onChangeTypeToCompleted = () => {
    onChangeType(id, 'completed');
  };

  const onChangeTypeToIncompleted = () => {
    onChangeType(id, 'incompleted');
  };

  const onDblClick = e => {
    if (e.target.matches('button')) {
      return;
    }
    if (mode === 'readonly') {
      return;
    }

    selectEdittingId(id);
  };

  return (
    <li
      className={`${styles.task} ${styles[type]} ${mode === 'normal' && styles[`height${end - start}`]}`}
      onDoubleClick={onDblClick}
    >
      <h3>{name}</h3>
      {mode === 'normal' && (
        <>
          <time>
            {start}~{end}
          </time>
          <button onClick={onDelete} className={styles.deleteButton} type="button">
            🗑️
          </button>
        </>
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
