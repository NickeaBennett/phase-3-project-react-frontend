import {useState} from 'react'

const AddTask = ({onAdd}) => {
        const [text, setText] = useState('')
    
    const onSubmit = (e) =>{
        e.preventDefault()

        if(!text){
            alert('Add a task before saving!')
            return
        }

        onAdd({text})

        setText('')
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input 
                    type='text'  
                    placeholder='Add a task'
                    value={text} onChange={(e) => setText(e.target.value)}
                />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}


export default AddTask