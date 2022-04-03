import { useEffect, useState } from 'react';
import Task from '../Task/Task';
import styles from './Tasks.module.css';

const Tasks = ({ tasks, mode, selectEdittingId, deleteTask, changeType }) => {
  const [marginTops, setMarginTops] = useState([]);

  useEffect(() => {
    let prev = 9;
    let res = [];

    tasks.forEach(({ start, end }) => {
      res = [...res, start - prev];
      prev = end;
    });

    setMarginTops(res);
  }, [tasks]);

  return (
    <ul>
      {tasks.map((task, index) => (
        <Task
          marginTop={marginTops[index]}
          key={task.id}
          task={task}
          mode={mode}
          onChangeType={changeType}
          selectEdittingId={selectEdittingId}
          onDeleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default Tasks;
