import React, { useState } from 'react';
import Tasks from './Components/Tasks/Tasks';
import Modal from './Components/Modal/Modal';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: 'BinDung BinDung',
      start: 9,
      end: 10,
      type: 'doing',
    },
    {
      id: 1,
      name: 'Create new Task',
      start: 11,
      end: 12,
      type: 'completed',
    },
    {
      id: 2,
      name: 'Spend Perfect Day',
      start: 15,
      end: 16,
      type: 'incompleted',
    },
  ]);
  const [edittingId, setEdittingId] = useState(null);

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const changeType = (id, type) => {
    const taskToChange = tasks.find(task => task.id === id);
    taskToChange.type = type === taskToChange.type ? 'doing' : type;

    setTasks(tasks.map(task => (task.id === id ? taskToChange : task)));
  };

  const editTask = _task => {
    setTasks(tasks.map(task => (task.id === _task.id ? _task : task)));
    setEdittingId(null);
  };

  const selectEdittingId = id => {
    setEdittingId(id);
  };

  return (
    <>
      <h1>일정 관리 앱</h1>
      <h2>모든 할 일</h2>
      <Tasks
        tasks={tasks}
        mode="normal"
        selectEdittingId={selectEdittingId}
        deleteTask={deleteTask}
        changeType={changeType}
      />

      <h2>완료하지 못한 할 일</h2>

      <Tasks tasks={tasks.filter(task => task.type === 'incompleted')} mode="readonly" />

      {edittingId === null || (
        <Modal
          key={edittingId}
          task={tasks.find(({ id }) => id === edittingId)}
          selectEdittingId={selectEdittingId}
          onEditting={editTask}
        />
      )}
    </>
  );
}

export default App;
