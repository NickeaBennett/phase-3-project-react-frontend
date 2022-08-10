import Header from './components/Header'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Tasks from './components/Tasks'
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'


const App = () =>  {
const [showAddTask,setShowAddTask] = useState(false)
const [tasks, setTasks] = useState([])

useEffect(()=>{
  const getTasks = async () =>{
    const tasksFromServer = await fetchTasks() 
    setTasks(tasksFromServer)
  }
  

  getTasks()
},[])


const fetchTasks =  async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data =  await res.json()
 
    console.log(data)
    return data

}

const fetchTask =  async (id) =>{
    const res = await fetch('http://localhost:5000/tasks/${id}')
    const data =  await res.json()
 
    console.log(data)
    return data

}


const addTask = async (task) =>{
  const res = await fetch (`http://localhost:5000/tasks`,{
    method: 'POST',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(task)
  })

  const data =await  res.json()

  setTasks([...tasks, data])

}


const deleteTask =async(id)=>{
  const res = await fetch (`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
  res.status === 200
  ? setTasks(tasks.filter((task) => task.id !== id)) : alert('Error deleting this task')
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
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
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
