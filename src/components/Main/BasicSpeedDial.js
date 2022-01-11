import React, { useState, useEffect } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BasicModal from "./BasicModal";
import UserModal from "./UserModal";
import { getAllUsers } from "../../services/usersServices";
import Fab from "@mui/material/Fab";

export default function BasicSpeedDial({ token, user, socket }) {
  const [openUserModal, setOpenUserModal] = useState(false);
  const handleOpenUserModal = () => setOpenUserModal(true);
  const handleCloseUserModal = () => setOpenUserModal(false);

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const handleOpenTaskModal = () => setOpenTaskModal(true);
  const handleCloseTaskModal = () => setOpenTaskModal(false);

  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    id: "",
    createdBy: user.username,
    roomId: user.roomId,
    assignedTo: "",
    status: "1",
    desc: "",
    currentUser: user.username
  });

  const [teamMate, setTeamMate] = useState({
    _id: 0,
    username: "",
    job: "",
    role: "User",
    password: "",
    currentUser: user.username,
    roomId: user.roomId
  });

  useEffect(() => {
    setTeamMate({
      ...teamMate,
      currentUser: user.username,
      roomId: user.roomId
    });
    setNewTask({
      ...newTask,
      currentUser: user.username,
      roomId: user.roomId,
      createdBy: user.username
    });
  }, [user]);

  useEffect(() => {
    const getUsers = () => {
      getAllUsers(token)
        .then(res => {
          console.log(res);
          var newArrayUserofObject = Object.values(res.usersArray);
          let userNames = newArrayUserofObject.map(user => {
            return user.username;
          });
          //sets the users as an array of only user names
          setUsers(userNames);
        })
        .catch(err => console.log(err));
    };
    getUsers();
  }, []);

  const onSubmitTask = e => {
    e.preventDefault();

    handleCloseTaskModal();

    socket.emit("addTask", newTask);
    setNewTask({
      id: "",
      createdBy: user.username,
      roomId: user.roomId,
      assignedTo: "",
      status: "1",
      desc: "",
      currentUser: user.username
    });
  };

  const onSubmitUser = e => {
    e.preventDefault();

    handleCloseUserModal();

    socket.emit("addUser", teamMate);

    setTeamMate({
      username: "",
      job: "",
      role: "User",
      password: "",
      currentUser: user.username,
      roomId: user.roomId
    });
  };
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        FabProps={{ size: "large", style: { backgroundColor: "#6c63ff" } }}
        sx={{
          margin: 0,
          top: "auto",
          right: { xs: 20, l: 60, xl: 100 },
          bottom: { xs: 20, l: 60, xl: 100 },
          left: "auto",
          position: "fixed",
          zIndex: "tooltip",
        }}
        icon={<SpeedDialIcon sx={{ backgroundColor: "#6c63ff" }} />}
      >
        {user.role === "admin" ? (
          <SpeedDialAction
            icon={<PersonAddAltIcon />}
            tooltipTitle="Add User"
            onClick={e => {
              e.preventDefault();
              handleOpenUserModal();
            }}
          />
        ) : null}

        <SpeedDialAction
          icon={<AddTaskIcon />}
          tooltipTitle="Add Task"
          onClick={e => {
            e.preventDefault();
            handleOpenTaskModal();
          }}
        />
      </SpeedDial>
      <BasicModal
        open={openTaskModal}
        handleClose={handleCloseTaskModal}
        onSubmit={onSubmitTask}
        task={newTask}
        setNewTask={setNewTask}
        users={users}
      />
      <UserModal
        open={openUserModal}
        handleClose={handleCloseUserModal}
        onSubmit={onSubmitUser}
        user={teamMate}
        setUser={setTeamMate}
        page={"2"}
      />
    </>
  );
}
