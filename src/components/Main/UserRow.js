import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import BasicModal from "./BasicModal";
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
      };

  return (
    <TableRow
      key={_id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="right">{teammate.username}</TableCell>
      <TableCell align="right">
      {teammate.role}
      </TableCell>
      <TableCell align="right">{teammate.job}</TableCell>
      <TableCell align="right">
        <IconButton >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={removeUser}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    
    </TableRow>
  );
};

export default UserRow;
