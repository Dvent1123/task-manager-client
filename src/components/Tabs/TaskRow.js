import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Task from "../Modals/Task";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

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
      <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">
        {assignedTo}
      </TableCell>
      <TableCell sx={{ paddingRight:{xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} , maxWidth: 100}} align="center" component="th" scope="row">
        <Typography display="inline-block" align="left">
        {desc}
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingRight:{xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5}, width: {xs: "5%",md: "25%"} }} align="center">{encodeStatus(status)}</TableCell>
      <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5}, width: {xs: "5%",md: "25%"}  }} align="right">
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={removeTask}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <Task
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
