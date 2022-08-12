
import TaskCard from './taskcard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Box from '@mui/material/Box';



export default function TaskList({ tasks, users, url, handleFilter, handleEditTask }) {

  function handleDelete(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    
  }

  return (
    <Container>
      <h1>What To Do?</h1>
      <Button variant='contained' href="/tasks/add">Add A Task</Button>
      <Box>
        <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              User
            </InputLabel>
            
            <NativeSelect
              defaultValue={"All"}
              onChange={(e) => handleFilter(e)}
            >
              <option value={"All"}>All</option>
              {users.map((user) => 
              <option key={user.id} value={user.id}>{user.name}</option>)}
            </NativeSelect>
          </FormControl>
      </Box>
      <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 12 }}>
        {tasks.map((task) => (
          <Grid item xs={4} key={task.id}> 
            <TaskCard
              key={task.id}
              task={task}
              handleDelete={handleDelete}
              users={users}
              url={url}
            />
          </Grid>
        ))}       
      </Grid>
    </Container>
    
  )
}