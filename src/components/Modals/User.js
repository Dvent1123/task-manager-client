import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

const BasicModal = ({ open, handleClose, onSubmit, user, setUser, page }) => {
  useEffect(() => {
    setUser(user);
  }, [user]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Edit User
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
              autoComplete="pass"
              defaultValue={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
              autoFocus
              disabled={page === "1" ? true : false}
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
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={user.role}
              onChange={e => setUser({ ...user, role: e.target.value })}
              autoWidth
              label="Role"
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Finish Edits
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BasicModal;
