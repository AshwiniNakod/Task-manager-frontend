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
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../global";

function TaskForm() {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [selectedValue, setSelectedValue] = React.useState("Not Started");
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValue(e.target.value);
    setTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/tasks/addTask`,
        task,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(task)
      toast.success(res.data.message);
      //   console.log('Response:', res.data.message);
      setTask({ title: "", description: "", status: "" });
      navigate("/taskList");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Submission failed!");
    }
  };

  const handleReset = () => {
    setTask({ title: "", description: "", status: "" });
  };
  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Task Form
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

          <FormLabel component="legend" required error={!selectedValue}>Status</FormLabel>
          <RadioGroup
            name="status"
            value={selectedValue}
            onChange={handleChange}
            row
            
          >
            <FormControlLabel
              value="Completed"
              control={<Radio />}
              label="Completed"
            />
             <FormControlLabel
              value="In Progress"
              control={<Radio />}
              label="In Progress"
            />
            <FormControlLabel
              value="Not Started"
              control={<Radio />}
              label="Not Started"
            />
          </RadioGroup>

          <Box display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Submit
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

export default TaskForm;
