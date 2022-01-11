import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import BasicModal from "./BasicModal";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskRow = ({ task, users, socket, username }) => {
  const { _id, assignedTo, desc, status, createdBy, roomId } = task;

  const removeTask = async () => {
    const data = {
      id: _id,
      userName: username
    };

    socket.emit("deleteTask", data);
  };

  const [newTask, setNewTask] = useState({
    id: _id,
    createdBy: createdBy,
    roomId: roomId,
    assignedTo: assignedTo,
    status: status,
    desc: desc,
    userName: username
  });

  const onSubmit = e => {
    e.preventDefault();

    socket.emit("updateTask", newTask);
    handleClose();
  };

  const encodeStatus = statusAsNumber => {
    if (statusAsNumber === 1) {
      return "Not Complete";
    }
    if (statusAsNumber === 2) {
      return "In Progress";
    }
    return "Pending Approval";
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <TableRow
      key={_id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left">{assignedTo}</TableCell>
      <TableCell component="th" scope="row">
        {desc}
      </TableCell>
      <TableCell align="right">{encodeStatus(status)}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={removeTask}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <BasicModal
        open={open}
        handleClose={handleClose}
        onSubmit={onSubmit}
        task={newTask}
        setNewTask={setNewTask}
        users={users}
      />
    </TableRow>
  );
};

export default TaskRow;
