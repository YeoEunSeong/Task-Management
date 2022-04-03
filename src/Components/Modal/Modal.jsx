import React, { useState } from 'react';

const Modal = ({ task, onEditting }) => {
  const [taskName, setTaskName] = useState(task.name);
  const onNameChange = e => {
    const {
      target: { value },
    } = e;
    setTaskName(value);
  };

  const onEdit = e => {
    e.preventDefault();
    onEditting({ ...task, name: taskName });
    return;
  };

  return (
    <form onSubmit={onEdit}>
      <input type="text" value={taskName} onChange={onNameChange} />
      <button type="submit">submit</button>
    </form>
  );
};

export default Modal;
