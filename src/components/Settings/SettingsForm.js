import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://todo-simply.com/home">
        Todo Simply
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SettingsForm = ({ onSubmit, user, setUser }) => {
  return (
    <div className="random">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%"
              }}
            >
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="/home"
              >
                <ArrowBackIosIcon />
              </Link>
            </Box>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {user.username[0]}
            </Avatar>
            <Typography component="h1" variant="h5">
              User Settings
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                defaultValue={user.username}
                onChange={e => setUser({ ...user, username: e.target.value })}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="pass"
                label="Password"
                name="password"
                type="password"
                autoComplete="pass"
                defaultValue={user.new_password}
                onChange={e =>
                  setUser({ ...user, new_password: e.target.value })
                }
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="pass2"
                label="Password Confirmation"
                name="password"
                type="password"
                autoComplete="password"
                defaultValue={user.new_password_confirmation}
                onChange={e =>
                  setUser({
                    ...user,
                    new_password_confirmation: e.target.value
                  })
                }
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="job"
                label="Job"
                name="job"
                autoComplete="job"
                defaultValue={user.job}
                onChange={e => setUser({ ...user, job: e.target.value })}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                defaultValue={user.role}
                onChange={e => setUser({ ...user, role: e.target.value })}
                autoFocus
                disabled
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Confirm Changes By Typing in Password"
                name="password"
                type="password"
                autoComplete="password"
                defaultValue={user.current_password}
                onChange={e =>
                  setUser({ ...user, current_password: e.target.value })
                }
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update User
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default SettingsForm;
