import {useState} from 'react'

const AddTask = ({onAdd}) => {
        const [text, setText] = useState('')
        const [day, setDay] = useState('')
    
    const onSubmit = (e) =>{
        e.preventDefault()

        if(!text){
            alert('Add a task')
            return
        }

        onAdd({text,day})

        setText('')
        setDay('')
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
            <div className='form-control'>
                <label>Date</label>
                <input 
                    type='text' 
                    placeholder='Enter date'
                    value={day} onChange={(e) => setDay(e.target.value)}
                />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}


export default AddTask