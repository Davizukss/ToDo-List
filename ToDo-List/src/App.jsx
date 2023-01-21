import './App.css'
import { useEffect, useState } from 'react'
import { BsBookmarkCheck, BsTrash, BsBookmarkCheckFill, BsCheck } from 'react-icons/bs'

const API = "http://localhost:5000";

function App() {
  const handleSubimit = async (event) => {
    event.preventDefault();
    const todo ={
      id: Math.random(),
      title,
      time,
      done: false,
    };
   await fetch(API + "/todos",{
    method: 'POST', // ta mandando dados
    body: JSON.stringify(todo), // transforma em string
    headers: {
      'Content-Type': "application/json", //coisa do JSON
    }
   });
   setTodos((prevState) => [...prevState,todo]);
    setTime('');
    setTitle('');
  }
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  //load
    useEffect(()=>{
      const loadData = async() =>{
        setLoading(true)
        const res = await fetch(API + '/todos')
        .then((res) => res.json())
        .then((data) => data);
        setLoading(false);
        setTodos(res);
      }
      loadData();
    },[]) 
    const handleDelete = async (id) =>{
      await fetch(API + "/todos/" + id,{
        method: 'DELETE', // ta mandando dados
        
        });
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }; 
    // const handleEdit = async (id) =>{
    //   const data = await fetch(API + "/todos/" + todo.id,{
    //      method: 'PUT', // ta mandando dados
    //      body: json.stringify(todo),
    //      headers: {
    //        'Content-Type': "application/json", //coisa do JSON
    //      }
    //      });
    //      setTodos((prevState) => 
    //      prevState.map((t) => (t.id === data.id ? (t = data ) : t))
    //      );
    //     }; Arrumar
if(loading){
  return <h2>Wait...</h2>
}

  return (
    <div className="App">
      <div className='todo-header'>
        <h1>React ToDo Application</h1>
      </div>
      <div className='form-todo'>
        <h2>Enter your next task:</h2>
        <form onSubmit={handleSubimit}>
          <div className="form-control">
            <label htmlFor="title">What are you going to do?</label>
           <input type="text" placeholder='Enter your Task Title' onChange={(event)=> setTitle(event.target.value)} 
           value={title || ""}
           required
           />
          </div>
        <h2>Enter your next task:</h2>
          <div className="form-control">
            <label htmlFor="title">Duration:</label>
           <  input type="text" name='time' placeholder='Estimated time in Hours' onChange={(event)=> setTime(event.target.value)} 
           value={time || ""}
           required
           />
          </div>
          <input type="submit"value='Create Task' className = 'button'/>
        </form>
      </div>
      <div className='list-todo'>
        <h2>Task List:</h2>
        {todos.length === 0 && <p>There are no tasks</p>}
        {todos.map((todo =>(
          <div className="todo" key={todo.id}>
            <h3 className={todo.done ? 'todo-done' : ''}>{todo.title}</h3>
            <p>Duration: {todo.time}</p>
            <div className="actions">
              <span /*onClick={()=> handleEdit(todo)}*/>
                {!todo.done ? <input type='checkbox'/> : <input type='checkbox' checked/>}
              </span>
              <BsTrash onClick={()=> handleDelete(todo.id)}/>
            </div>
          </div>
        )))}
      </div>
    </div>
  )
}

export default App
