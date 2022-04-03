import React, { useState } from 'react';
import styles from './App.module.css';
import Tasks from './Components/Tasks/Tasks';
import Modal from './Components/Modal/Modal';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      name: 'BinDung BinDung',
      start: 9,
      end: 11,
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
      end: 18,
      type: 'incompleted',
    },
  ]);
  const [schedule, setSchedule] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [edittingId, setEdittingId] = useState(null);
  const [mode, setMode] = useState('read');

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const changeType = (id, type) => {
    const taskToChange = tasks.find(task => task.id === id);
    taskToChange.type = type === taskToChange.type ? 'doing' : type;

    setTasks(tasks.map(task => (task.id === id ? taskToChange : task)));
  };

  const editTask = _task => {
    const { start: prevStart, end: prevEnd } = tasks.find(task => task.id === _task.id);
    const _schedule = [...schedule];
    for (let i = prevStart; i < prevEnd; i++) {
      _schedule[i] = false;
    }

    for (let i = _task.start; i < _task.end; i++) {
      _schedule[i] = true;
    }
    setSchedule(_schedule);
    setTasks(tasks.map(task => (task.id === _task.id ? _task : task)));
    setEdittingId(null);
  };

  const isValidTime = (id, start, end) => {
    if (start >= end) {
      return { status: 'error', message: '끝나는 시각이 시작 시각보다 느려야 합니다.' };
    }

    const _schedule = [...schedule];
    if (id !== null) {
      const { start: _start, end: _end } = tasks.find(task => task.id === id);

      for (let i = _start; i < _end; i++) {
        _schedule[i] = false;
      }
    }
    for (let i = start; i < end; i++) {
      if (_schedule[i]) {
        return { status: 'error', message: '이미 할 일이 있는 시각입니다.' };
      }
    }

    return { status: 'ok', message: '성공적으로 할 일이 추가되었습니다.' };
  };

  const selectEdittingId = id => {
    setEdittingId(id);
  };

  const toggleMode = () => {
    setMode(mode === 'read' ? 'add' : 'read');
  };

  const addTask = (name, start, end) => {
    const _tasks = [...tasks, { id: Date.now(), name, start, end, type: 'doing' }];
    _tasks.sort((a, b) => a.start - b.start);
    const _schedule = [...schedule];

    for (let i = start; i < end; i++) {
      _schedule[i] = true;
    }
    setSchedule(_schedule);
    setTasks(_tasks);
    setMode('read');
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

      <aside className={styles['incompleted-tasks']}>
        <h2>완료하지 못한 할 일</h2>
        <Tasks tasks={tasks.filter(task => task.type === 'incompleted')} mode="readonly" />
      </aside>

      <button onClick={toggleMode} className={styles.add}>
        +
      </button>

      {edittingId === null || (
        <Modal
          mode={mode}
          key={edittingId}
          task={tasks.find(({ id }) => id === edittingId)}
          selectEdittingId={selectEdittingId}
          toggleMode={toggleMode}
          isValidTime={isValidTime}
          onEditting={editTask}
        />
      )}

      {mode === 'add' && (
        <Modal
          mode={mode}
          toggleMode={toggleMode}
          isValidTime={isValidTime}
          onAddTask={addTask}
          task={{ name: '', start: 9, end: 10 }}
        />
      )}
    </>
  );
}

export default App;
