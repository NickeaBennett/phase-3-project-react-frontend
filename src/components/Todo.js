import {FaTimes} from 'react-icons/fa'

const Todo = ({ todo, onDelete, onToggle}) => {
  return (
    <div className={` todo ${todo.reminder &&'reminder'}` }
         onDoubleClick={()=>{onToggle(todo.id)}}
         >
        <h3>
          {todo.text} 
          <FaTimes
            style={{color : 'red', cursor: 'pointer'  }} 
            onClick={()=>onDelete(todo.id)}
          />
        </h3>
        {/* <p>{task.day}</p> */}
    </div>
  )
}


export default Todo