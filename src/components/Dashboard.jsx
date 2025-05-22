import React from 'react'
import { Container, Typography } from "@mui/material";
import TaskList from './TaskList';
import TaskForm from './TaskForm';
function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Task Dashboard</Typography>
      {/* <TaskForm /> */}
      <TaskList />
     
    </Container>
  )
}

export default Dashboard
