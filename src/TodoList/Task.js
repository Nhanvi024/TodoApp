import './Task.css'
import ImageCross from '../images/icon-cross.svg';
import { useContext } from 'react';
import { TodoContext } from './TodoList';

export function Task(props) {
    const { todoList, setTodoList } = useContext(TodoContext);

    const handleChecked = (e, item) => {
        item.completed = e.target.checked;
        setTodoList([...todoList]);
    };

    const handleDeleteTask = (taskId) => {
        setTodoList(todoList.filter((item) => {
            return item.id !== taskId;
        }))
    };

    const handleDragStart = (e, dragTask) => {
        e.dataTransfer.setData('text/plain', dragTask.id);
        e.target.id = 'task-dragging';
    }
    const handleDragEnd = (e) => {
        e.target.id = '';
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e, dropTask) => {
        // e.preventDefault();
        let dragTaskId = e.dataTransfer.getData('text/plain');
        let taskDropTemp = {};
        let taskDrag = {};

        todoList.forEach((task) => {
            if (task.id === dropTask.id) {
                taskDropTemp = task;
            }
            if (task.id === dragTaskId) {
                taskDrag = task;
            }
        });

        setTodoList(todoList.map((task) => {
            if (dropTask.id !== dragTaskId) {
                    if (task.id === dropTask.id) {
                        return taskDrag;
                    } else if (task.id === dragTaskId) {
                        return taskDropTemp;
                    } else {
                        return task;
                    }

            } else {
                return task;
            }

        }))
    }

    return (
        <div className="todoTask"
            draggable='true'
            onDragStart={(e) => handleDragStart(e, props.item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, props.item)}>

            <input className="completedCheckBox" name="completed" type="checkbox" checked={props.completed} onChange={(e) => handleChecked(e, props.item)} id={props.taskID} />
            <label className='taskName' taskdone={props.completed ? 'true' : 'false'} htmlFor={props.taskID}>{props.taskName}</label>
            <button onClick={() => handleDeleteTask(props.item.id)}><img src={ImageCross} alt='ImageCross' /></button>
        </div>
    );
}