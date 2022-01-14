import  React, {useEffect} from "react";
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

const User = ({
  open,
  handleClose,
  onSubmit,
  task,
  setNewTask,
  users
}) => {
  useEffect(() => {
    setNewTask(task);
  }, [task]);
  const { createdBy, assignedTo, desc, status } = task;
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
            Edit Profile
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5">
              Created By: {createdBy}
            </Typography>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={assignedTo}
              onChange={e =>
                setNewTask({ ...task, assignedTo: e.target.value })
              }
              autoWidth
              label="Assigned To"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {users.map((user, index) => {
                return (
                  <MenuItem key={index} value={user}>
                    {user}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              id="desc"
              label="Task Description"
              name="desc"
              autoComplete="desc"
              defaultValue={desc}
              onChange={e => setNewTask({ ...task, desc: e.target.value })}
              autoFocus
            />
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={status}
              onChange={e => setNewTask({ ...task, status: e.target.value })}
              autoWidth
              label="Status"
            >
              <MenuItem value="0">
                <em>None</em>
              </MenuItem>
              <MenuItem value="1">Not Complete</MenuItem>
              <MenuItem value="2">In Progress</MenuItem>
              <MenuItem value="3">Pending Approval</MenuItem>
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

export default User;
