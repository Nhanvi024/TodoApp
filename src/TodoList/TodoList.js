import './TodoList.css'
import React, { useState, useEffect, createContext, useLayoutEffect } from 'react';
import { AddTaskBox } from "./AddTaskBox";
import { TitleTodo } from "./Title";
import { Task } from "./Task";
import { Bottom } from './Bottom'

// ** Information
// *! Alert
// *Todo
// *? Question

export const TodoContext = createContext()

export function TodoList(props) {

    // ** Dùng render lại UI khi không có state nào thay đổi
    const [, forceUpdate] = useState();
    // ** Change Mode Dark/Light
    const [isDark, setIsDark] = useState(false);
    // ** New task add to Todolist
    const [newTask, setNewTask] = useState({
        id: "",
        todoName: "",
        completed: false,
        showTask: true
    });
    // ** TodoList
    const [todoList, setTodoList] = useState([]);
    // ** Count item not completed
    const [itemLeft, setItemLeft] = useState(0);
    // ** Tab Filter tasks
    const [showList, setshowList] = useState("All");
    //********************************************************************** */

    // ** Function change screen mode (dark/light)
    function handleChageMode() {
        setIsDark(!isDark)
    }

    useEffect(() => {
        let count = 0;
        todoList.forEach((task) => {
            if (!task.completed) {
                count++;
            }
        })
        switch (count) {
            case 0:
                setItemLeft('No item left');
                break;
            case 1:
                setItemLeft('1 item left');
                break;
            default:
                setItemLeft(`${count} items left`);

        }
    }, [todoList]);

    // ** Dùng useLayoutEffect chạy callback xử lý dữ liệu ok rồi mới render ra
    // ** Khi ở tab Completed thêm task mới bị nháy lên rồi mới mất
    useLayoutEffect(() => {
        todoList.forEach((task) => {
            switch (showList) {
                case 'All':
                    task.showTask = true;
                    break;
                case 'Active':
                    task.showTask = !task.completed;
                    break;
                case 'Completed':
                    task.showTask = task.completed;
                    break;
                default:
            }
        })
        forceUpdate({});
    }, [showList, todoList]);

    return (
        <TodoContext.Provider value={{ newTask, setNewTask, todoList, setTodoList, showList, setshowList, itemLeft }}>
            <div className='appTodo' data-theme={isDark ? "dark" : "light"}>
                {/* <div className='imageBackground'>{isDark? <img src={ImageDark} alt='ImageDark'/> : <img src={ImageLight} alt='ImageLight'/>}</div> */}
                <div className="container-grid">
                    <div className='mb-row-title mb-col-main tb-col-main m-col-main l-col-main '>
                        <TitleTodo isDark={isDark} onClick={handleChageMode} />
                    </div>
                    <div className='mb-row-addbox mb-col-main tb-col-main m-col-main l-col-main '>
                        <AddTaskBox />
                    </div>
                    <div className='mb-row-todolist mb-col-main tb-col-main m-col-main l-col-main '>
                        <div className="containerList">
                            <div className="todoList">
                                {todoList.map((item, index) => {
                                    return (
                                        item.showTask &&
                                        <Task key={index} completed={item.completed}
                                            taskName={item.todoName}
                                            taskID={'taskID' + index}
                                            item={item}
                                        />
                                    );
                                })}
                            </div >
                            <Bottom />
                        </div>

                    </div>
                    <div className='mb-row-note mb-col-main tb-col-main m-col-main l-col-main '>
                        <p className='note'>Drag and drop to reorder list</p>
                    </div>
                </div>
            </div>

        </TodoContext.Provider>
    );
}