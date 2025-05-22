import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../global';

function Login() {
   const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      console.log(API)
      const res = await axios.post(`${API}/user/login`, formData);
       localStorage.setItem('token', res.data.JWTtoken);
      localStorage.setItem('username',res.data.username)
      console.log("res",res)
      toast.success("Login successful!");
      console.log('/dashboard')
      navigate("/dashboard");
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "5rem" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Box>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
           <Button 
           style={{  marginTop: "1rem" }}
            variant="contained" 
            color="primary" 
           onClick={()=>navigate('/registration')} fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  
  )
}

export default Login
