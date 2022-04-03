import Task from '../Task/Task';
import styles from './Tasks.module.css';

const Tasks = ({ tasks, mode, selectEdittingId, deleteTask, changeType }) => {
  return (
    <ul>
      {tasks.map(task => (
        <Task
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
