import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'


function TaskCard({
  task: {
    id,
    name,
    description,
    user_id
  },
  users,

}) {

  let UserTask = users.find(user => user.id == user_id);

  return (
    <Container>
      <Box
        sx={{
          width: 250,
          height: 250,
          padding: '10px',
          margin: 3,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <h1>{name}</h1>
        <h3>{description}</h3>
        <h4>Created by: {UserTask.name}</h4>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Link to={`/tasks/${id}/edit`}><Button variant={"contained"}><EditIcon /></Button></Link>
        </Box>
      </Box>
    </Container>
  )
}

export default TaskCard