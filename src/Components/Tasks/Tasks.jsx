import Task from '../Task/Task';
import styles from './Tasks.module.css';

const Tasks = ({ tasks, mode, deleteTask, changeType }) => {
  return (
    <ul>
      {tasks.map(task => (
        <Task key={task.id} task={task} mode={mode} onChangeType={changeType} onDeleteTask={deleteTask} />
      ))}
    </ul>
  );
};

export default Tasks;
