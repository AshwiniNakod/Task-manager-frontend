import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../global";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
const filteredTasks = tasks.filter((task)=>{
  return statusFilter === 'All'? tasks : task.status === statusFilter
})
  console.log("filteredTasks:",filteredTasks)
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API}/tasks/getAllLoggedInUserTask?page=${page}&limit=3`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setTasks(res.data.message);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      console.log(err.response.data.message);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "unauthorized user."
      ) {
        navigate("/");
      }
    }
  };
  console.log("tasks",tasks)
  console.log("filteredTasks",filteredTasks)
  //   const filteredTasks =

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, page]);

  const handleDelete = async (taskId) => {
  try {
    console.log(taskId)
    const token = localStorage.getItem("token");
    await axios.delete(`${API}/tasks/deleteTask/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Re-fetch tasks after deletion
    fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
          padding: 2,
          borderRadius: 2,
          boxShadow: 1,
          // marginBottom: 2
        }}
      >
        <Typography sx={{ width: "100px" }}>
          {localStorage.getItem("username")}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/taskForm")}>
          Add Task
        </Button>
      </Box>
      <Box sx={{ backgroundColor: "white", color: "black", p: 2 }}>
        <Typography variant="h4" gutterBottom>
          TASKS
        </Typography>
        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginBottom: "1rem", width: "200px" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        <Grid container spacing={2}>
         
           { filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography>{task.description}</Typography>
                    <Typography>Status: {task.status}</Typography>
                      {/* <Typography><button>DELETE</button></Typography>
                       */}
                          {/* <Grid size={8}> */}
                           <Button  size="small" onClick={()=>handleDelete(task._id)}><DeleteIcon /></Button>  
                           <Button size="small" onClick={()=>navigate(`/editForm/${task._id}`)}> <EditIcon /></Button>   
          {/* <DeleteForeverIcon/> */}
        {/* </Grid> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          
        </Grid>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            style={{ marginTop: "1rem" }}
          />
        )}
      </Box>

      {/* {totalPages > 1 && (
      <div style={{ marginTop: '20px' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    )} */}
    </>
  );
}

export default TaskList;
