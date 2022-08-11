import Header from './components/Header'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Tasks from './components/Todos'
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'


const App = () =>  {
const [showAddTask,setShowAddTask] = useState(false)
const [todos, setTodos] = useState([])

useEffect(()=>{
  const getTasks = async () =>{
    const tasksFromServer = await fetchTasks() 
    setTodos(tasksFromServer)
  }
  

  getTasks()
},[])


const fetchTasks =  async () =>{
    const res = await fetch('http://localhost:5000/todos')
    const data =  await res.json()
 
    console.log(data)
    return data

}

const fetchTask =  async (id) =>{
    const res = await fetch('http://localhost:5000/todos/${id}')
    const data =  await res.json()
 
    console.log(data)
    return data

}


const addTask = async (task) =>{
  const res = await fetch (`http://localhost:5000/todos`,{
    method: 'POST',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(task)
  })

  const data =await  res.json()

  setTodos([...todos, data])

}


const deleteTask =async(id)=>{
  const res = await fetch (`http://localhost:5000/todos/${id}`,{
    method: 'DELETE',
  })
  res.status === 200
  ? setTodos(todos.filter((todo) => todo.id !== id)) : alert('Error deleting this task')
}

  return (
    <Router>
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd={showAddTask}/>

      <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {todos.length > 0 ? (
                  <Tasks
                  todos={todos}
                    onDelete={deleteTask}
                  />
                ) : (
                  'No tasks available!'
                )}
              </>
            }
          />
      </Routes>
    </div>

    </Router>
  )
}


export default App
