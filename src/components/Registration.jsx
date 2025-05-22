import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../global";

function Registration() {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const validate = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.emailId) newErrors.emailId = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.emailId))
      newErrors.emailId = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.confirm_password !== formData.password)
      newErrors.confirm_password = "Passwords do not match";

    return newErrors;
  };
  const handleSubmit = async(e) => {
    e.preventDefault();

    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
     try {
           const res = await axios.post(`${API}/user/createUser`, formData);
           toast.success("Registration successful!");
            setFormData({
        username: "",
        emailId: "",
        password: "",
        confirm_password: "",
      });
           console.log('/dashboard')
           navigate("/");
         } catch (err) {
           console.log(err)
           toast.error(err.response?.data?.message || "Registration failed.");
         }

     
    } else {
      toast.error("Please fix the validation errors.");
    }
  };
  return (
    <Container maxWidth="sm">
       <Paper elevation={3} style={{ padding: "2rem", marginTop: "5rem" }}>
      <Typography variant="h6" gutterBottom>
        REGISTRATION
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
         <TextField
            label="Email Id"
            name="emailId"
            type="emailId"
            value={formData.emailId}
            onChange={handleChange}
            error={Boolean(errors.emailId)}
            helperText={errors.emailId}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Confirm Password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
            error={Boolean(errors.confirm_password)}
            helperText={errors.confirm_password}
            fullWidth
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          REGISTER
        </Button>
       <Button  style={{  marginTop: "1rem" }}
       variant="contained" color="primary" onClick={()=>navigate("/")} fullWidth>
          Login
        </Button> 
      </form>
      </Paper>
    </Container>
  );
}

export default Registration;
