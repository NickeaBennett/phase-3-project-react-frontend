import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

 function NewTask({ users, url, handleAddTask }) {
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskUser, setTaskUser] = useState("");
 
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let submittedTask = { task: {
      name: taskName,
      description: taskDescription,
      user_id: taskUser,
    }};

    fetch(`${url}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedTask),
    })
      .then((r) => r.json())
      .then((newTask) => {
        if (newTask.errors) {
          return alert(newTask.errors)
        }
        else {
          handleAddTask(newTask)
          navigate('/')
        }
        });
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <Box
        backgroundColor='primary'
        component='form'
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          aligntems: 'center',
          maxWidth: "xs",
        }}
        noValidate
        autoComplete = 'off'
        onSubmit={handleFormSubmit}
      >
        <h1>Add Task</h1>
        <TextField
          required
          id="outlined-required"
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}

        />
        <TextField
          id="outlined-multiline-flexible"
          label="Task Description"
          multiline
          maxRows={4}
          name="task-description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            User
          </InputLabel>
          <NativeSelect
            onChange={(e) => setTaskUser(e.target.value)}
            defaultValue={1}
          >
            <option value={"User"}>(Select User)</option>
            {users.map((user) => 
            <option key={user.id} value={user.id}>{user.name}</option>)}
          </NativeSelect>
        </FormControl>
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </Container>
  )
}

export default NewTask