import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Container from '@mui/material/Container';

export default function EditTaskForm({ tasks, users, url, handleEditTask, handleDeleteTask }) {
  
  const navigate = useNavigate();
  const { id } = useParams()
  const task = tasks.find(t => t.id == id)

  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskUser, setTaskUser] = useState(task.user_id);
  
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let submittedTask = { task: {
      name: taskName,
      description: taskDescription,
      user_id: taskUser
    }};

    fetch(`${url}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedTask),
    })
      .then((r) => r.json())
      .then((newTask) => {
        if (newTask.errors) {
          return alert(newTask.errors)
        } else {
          handleEditTask(newTask)
          navigate('/');
        }
      });
  }

  function handleDeleteClick() {
    fetch(`${url}/tasks/${id}`, {
      method: "DELETE",
    });
    handleDeleteTask(id)
    navigate('/')
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
        <h1>Edit Task</h1>
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
          value={taskDescription? taskDescription : "Enter Description"}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <FormControl>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            User
          </InputLabel>
          <NativeSelect
            onChange={(e) => setTaskUser(e.target.value)}
            value={taskUser}
          >
            {users.map((user) => 
            <option key={user.id} value={user.id}>{user.name}</option>)}
          </NativeSelect>
        </FormControl>
        <Button type="submit" variant="contained">Add Task</Button>
        <Button variant="contained" color="error" sx={{margin: 5}} onClick={handleDeleteClick}>Remove Task</Button>
      </Box>
    </Container>
  )
}