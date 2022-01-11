import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import User from "../Modals/User";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserRow = ({ teammate, socket, user }) => {
  const [teamMate, setTeamMate] = useState({
    _id: 0,
    username: "",
    job: "",
    role: "User",
    password: "",
    currentUser: "",
    roomId: ""
  });
  const { _id } = teamMate;

  useEffect(() => {
    setTeamMate({
      _id: teammate._id,
      username: teammate.username,
      job: teammate.job,
      role: teammate.role,
      password: teammate.password,
      roomId: teammate.roomId,
      currentUser: user.username
    });
  }, []);

  const removeUser = async () => {
    const data = {
      id: _id,
      currentUser: user.username
    };
    socket.emit("deleteUser", data);
  };

  //where you update the tasks
  const onSubmit = e => {
    e.preventDefault();

    socket.emit("updateUser", teamMate);
    handleClose();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <TableRow
      key={_id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">{teammate.username}</TableCell>
      <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">{teammate.role}</TableCell>
      <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">{teammate.job}</TableCell>
      <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={removeUser}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <User
        open={open}
        handleClose={handleClose}
        onSubmit={onSubmit}
        user={teamMate}
        setUser={setTeamMate}
        page={"1"}
      />
    </TableRow>
  );
};

export default UserRow;
