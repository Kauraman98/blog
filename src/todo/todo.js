import React, {useState} from "react";
import "./todo.css";
import TodoItem from "./todo-item";

/**
 * {
 *   id: 6132,
 *    content: "Do something",
 *    state: "completed" | "pending"
 * }
 */
export function Todo () {

    const [todoList, setTodoList] = useState([]);

    function onAddTodo (event) {
        //read text value from input
        if(event.key  != "Enter") {
            return;
        }
        var text = event.target.value;
        var todoItem = {
            id: new Date().getTime(),
            content:  text,
            state: "pending"
        }

        var _todoList = [...todoList, todoItem ];
            setTodoList(_todoList);
        event.target.value = "";
    }

    function toggleComplete(todo) {
          todo.state = todo.state == "pending"? "completed": "pending";
          
          var _todoList= todoList.map(_t => _t == todo ? todo : _t);

          setTodoList(_todoList);
    }
    return <div>
        <h1 className="todo-heading" style={{background: 'red'}}>Todo List</h1>
        <input placeholder="Add a task"   onKeyDown={onAddTodo}/>
        {
            todoList.map(todoItem => <TodoItem  todo={todoItem}  onComplete={toggleComplete}/>)
        }
    </div>
}