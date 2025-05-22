import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Box,
  MenuItem,
  Menu,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { API } from '../global';
function EditForm() {
     const navigate = useNavigate();
  const { id } = useParams(); // assuming route like /edit-task/:taskId
console.log(id)
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });
 const [originalTask, setOriginalTask] = useState(null);
  // Fetch existing task on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/tasks/getTask/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data.message)
        setTask(res.data.message);   
        console.log(res)     // adjust if your API response differs
        setOriginalTask(res.data.message);
      } catch (err) {
        toast.error("Failed to load task data");
        console.error(err);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API}/tasks/updateTask/${id}`,
        task,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      navigate("/taskList");
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message || "Update failed!");
    }
  };


  const handleReset = () => {
    if (originalTask) {
      setTask(originalTask);
    }
  };
  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Task Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />

          <FormLabel component="legend" required>Status</FormLabel>
          <RadioGroup name="status" value={task.status} onChange={handleChange} row>
            <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
            <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
            <FormControlLabel value="Not Started" control={<Radio />} label="Not Started" />
          </RadioGroup>

          <Box display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}

export default EditForm
