
import {useState } from 'react';

function App() {

  const [todos,setTodos] = useState([]);

  const [inputTodo,setInputTodo] = useState("");

  const [filter,setFilter] = useState("All");


  function handleAddTask(){
    setTodos([...todos,{
      task : inputTodo,
      id : Date.now().toString(),
      isCompleted : false
    }]);
    setInputTodo("")
  }

  function handleDelete(deletedTodoId){
    const newTodos = todos.filter((oneTodo)=> oneTodo.id !== deletedTodoId);

    setTodos(newTodos);
  }
  

  function toggleCompleteTask(taskId){
    const newTodos = todos.map((todo)=>{
      if(todo.id === taskId){
        return {
          ...todo,
          isCompleted : !todo.isCompleted
        }
      }
      
      return todo;
      
      
    })
    setTodos(newTodos);
  }

  const handleFilter=()=>{
    if(filter === "Active"){
      return todos.filter((todo)=>todo.isCompleted === false)
    }else if(filter === "Completed"){
      return todos.filter((todo)=>todo.isCompleted === true)
    }else{
      return todos;
    }
  }

  const clearCompletdTask=()=>{
    const activeTodos = todos.filter((todo)=>!todo.isCompleted);

    setTodos(activeTodos)
  }

  const getActiveTodos =()=>{
    const activeNumberTodo = todos.filter((todo)=> !todo.isCompleted);

    return activeNumberTodo.length;
  }
  return (
    <section>
      <div className="todoBox">
        <h1>Todo List :-</h1>
        <input type="text" onChange={(e)=>setInputTodo(e.target.value)} value={inputTodo} className='inputBar'/>
        <button onClick={handleAddTask} className='addBtn'>ADD</button><br/><hr/>
        <div>
          {
            handleFilter().length > 0 ? handleFilter().map((todo,index)=>{
                return (
                  <div className='todo' key={index}>
                    <input type="checkbox" checked={todo.isCompleted} onChange={()=>toggleCompleteTask(todo.id)}/>
                    <span>{todo.task}</span>
                    <button onClick={()=>handleDelete(todo.id)}>Delete</button><br/>
                  </div>
                )
            }) : "No Task is There"
          }
        </div>
        <div className='footerBtn'>
          {getActiveTodos()} remaining Active Todos.
          <button onClick={()=>setFilter("All")}>All</button>
          <button onClick={()=>setFilter("Active")}>Active</button>
          <button onClick={()=>setFilter("Completed")}>Completed</button>
          <button onClick={clearCompletdTask}>ClearCompletedTask</button>
        </div>
      </div>
    </section>
  );
}

export default App;
