import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLoginMutation } from "../../Services/authService";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
      navigate("/"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #d3fcf9, #b2ebf2)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "400px",
          textAlign: "center",
          borderRadius: 3,
          backgroundColor: "#ffffff",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        {/* Scale Loader */}


        <Avatar
          sx={{
            margin: "0 auto",
            backgroundColor: "#1976d2",
            width: 56,
            height: 56,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2", mt: 2 }}>
          Welcome to RENTAH
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Sign in to continue
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0px 1000px white inset !important",
                WebkitTextFillColor: "#000 !important",
                transition: "background-color 5000s ease-in-out 0s",
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0px 1000px white inset !important",
                WebkitTextFillColor: "#000 !important",
                transition: "background-color 5000s ease-in-out 0s",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 1, py: 1.2, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {isLoading ? <ScaleLoader color="#fff" height={20} /> : "Login"}
          </Button>

        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Forgot your password? <span style={{ color: "#1976d2", cursor: "pointer" }}>Reset here</span>
        </Typography>
      </Paper>
    </Box>
  );
}
