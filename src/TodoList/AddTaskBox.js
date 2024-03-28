import './AddTaskBox.css'
import { useContext } from 'react';
import { TodoContext } from './TodoList';
import {v4 as uuidv4} from 'uuid';


export function AddTaskBox(props) {
    const { newTask, setNewTask, todoList, setTodoList } = useContext(TodoContext);

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleAddTodo = (e) => {

        if (e.key === 'Enter') {
            newTask.todoName &&
                setTodoList([...todoList, newTask]);
                setNewTask({ ...newTask, todoName: "", completed: false, id: uuidv4()});
        }

    };

    return (
        <div className="addTaskBox">
            <div className="completedCheckBox" type='checkbox' />
            <input className='inputNewTask' type='text'
                name='todoName'
                value={newTask.todoName}
                onChange={handleOnChange}
                placeholder='Create a new todo...'
                onKeyDown={handleAddTodo} />
            {/* <button onKeyDown={props.onKeyDown}>Add</button> */}
        </div>
    );

}