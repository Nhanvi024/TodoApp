import './Bottom.css';
import { useContext } from 'react';
import { TodoContext } from './TodoList';

export const Bottom = (props) => {
    const typeShowList = ['All', 'Active', 'Completed'];
    const { todoList, setTodoList, showList, setshowList, itemLeft } = useContext(TodoContext);

    const handleShowList = (e) => {
        setshowList(e.target.innerText);
    }

    const handleClearCompletedTask = () => {
        setTodoList(todoList.filter((item) => {
            return item.completed === false;
        }));
    }

    return (
        <div className="footerList">
            <p className='itemLeft'>{itemLeft}</p>
            <div className='buttonAction'>
                {typeShowList.map((type, index) => {
                    return (
                        <button key={index}
                            onClick={handleShowList}
                            style={{ color: showList === type ? 'hsl(220, 98%, 61%)' : '' }}
                        >{type}</button>
                    );
                })}
                <button className='buttonClear' type='button' onClick={handleClearCompletedTask}>Clear Completed</button>
            </div>
        </div>
    );


}