import React from 'react';

export default function TodoItem(props) {
    const todo = props.todo
    const onComplete = props.onComplete
        console.log(" todo item", todo);
    var className = todo.state == "pending"? "pending" : "completed"
    var isCompleted= todo.state == "completed";
    return <li className={"todo-item "+className}>
        {todo.content}
        <input checked={isCompleted} type="checkbox"  onChange={event => onComplete(todo)} />
    </li>
}