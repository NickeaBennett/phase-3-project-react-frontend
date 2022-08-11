import Todo from './Todo'


const Todos = ({todos, onDelete}) => {
    return (
        <>
            {todos.map((todo, index)=>(
              <Todo key={index} todo={todo} onDelete={onDelete} />
                ))}
        </>
    )
}

export default Todos