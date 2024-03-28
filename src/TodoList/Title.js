import './Title.css'


export function TitleTodo(props) {
    return (
        <div className="todoTitle">
            <p className='titleTodo'>TODO</p>
            <button className='buttonChangeMode' type="toggle" onClick={props.onClick}></button>
        </div>
    );
}