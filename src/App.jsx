import React, { useState } from 'react';
import Tasks from './Components/Tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: 'BinDung BinDung',
      timeStart: 9,
      timeEnd: 10,
      type: 'doing',
    },
    {
      id: 1,
      name: 'Create new Task',
      timeStart: 11,
      timeEnd: 12,
      type: 'completed',
    },
    {
      id: 2,
      name: 'Spend Perfect Day  ',
      timeStart: 15,
      timeEnd: 16,
      type: 'incompleted',
    },
  ]);

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const changeType = (id, type) => {
    const taskToChange = tasks.find(task => task.id === id);
    taskToChange.type = type === taskToChange.type ? 'doing' : type;

    setTasks(tasks.map(task => (task.id === id ? taskToChange : task)));
  };

  return (
    <>
      <h1>일정 관리 앱</h1>
      <h2>모든 할 일</h2>
      <Tasks tasks={tasks} mode="normal" deleteTask={deleteTask} changeType={changeType} />

      <h2>완료하지 못한 할 일</h2>

      <Tasks
        tasks={tasks.filter(task => task.type === 'incompleted')}
        mode="readonly"
        deleteTask={deleteTask}
        changeType={changeType}
      />
    </>
  );
}

export default App;
