import React, { useState, useEffect, useRef, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useToken from "../../utils/useToken";
import jwt_decode from "jwt-decode";
import { SocketContext } from "../../services/socketService";
import UserRow from "./UserRow";
import { getAllUsers } from "../../services/usersServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const generator = require("generate-password");

const UserTab = () => {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    username: "",
    roomId: 0,
    role: "User"
  });

  const [newTeammate, setNewTeammate] = useState({
    _id: 0,
    username: "",
    job: "",
    role: "User",
    password: "",
    currentUser: "",
    roomId: ""
  });

  const { token } = useToken();
  const [decoded, setDecoded] = useState("");

  let realToken = useRef();
  const parseToken = JSON.parse(token);
  realToken.current = parseToken.token;
  const socket = useContext(SocketContext);


  useEffect(() => {
    setDecoded(jwt_decode(realToken.current));
    socket.emit(
      "subscribe",
      jwt_decode(realToken.current).roomId,
      jwt_decode(realToken.current).username
    );

    setUser({
      ...user,
      username: decoded.username,
      role: decoded.role,
      roomId: decoded.roomId
    });

    const generatedPassword = generator.generate({
      length: 10,
      numbers: true
    });
    setNewTeammate({
      ...newTeammate,
      password: generatedPassword,
      currentUser: decoded.username,
      roomId: decoded.roomId
    });

    return () => {
      socket.emit(
        "unsubscribe",
        jwt_decode(realToken.current).roomId,
        jwt_decode(realToken.current).username
      );
      socket.removeAllListeners();
    };
  }, [token, socket, decoded.username, decoded.role]);

  //sockets use effect
  useEffect(() => {
    socket.on("joined", message => {
      console.log(message);
    });

    socket.on("left", message => console.log(message));

    socket.on("UserAdded", result => {
      const { data, success, message } = result;
      if (!success) {
        toast.error(message);
      } else {
        setUsers(prevUsers => [...prevUsers, data]);
        toast.success(message);
      }
    });

    socket.on("UserUpdated", result => {
      const { data, success, message } = result;
      console.log("success is true", success);
      if (!success) {
        toast.error(message);
      } else {
        const userIndex = users.findIndex(item => item._id === data._id);
        const updatedUsersArray = [...users];
        updatedUsersArray[userIndex] = data;
        setUsers(updatedUsersArray);
        toast.success(message);
      }
    });

    socket.on("UserDeleted", result => {
      const { data, success } = result;
      if (!success) {
        toast.error("Something went wrong :(");
      } else {
        if (users) {
          setUsers(prevUsers =>
            prevUsers.filter(item => item._id !== data._id)
          );
          toast.success("User deleted!");
        }
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, users]);

  const onSubmit = e => {
    e.preventDefault();

    setNewTeammate({ ...newTeammate, currentUser: user.username });

    socket.emit("addUser", newTeammate);


    setNewTeammate({
      username: "",
      job: "",
      role: "User",
      password: "",
      currentUser: "",
      roomId: ""
    });
  };

  useEffect(() => {
    const getUsers = () => {
      getAllUsers(realToken.current)
        .then(res => {
          var newArrayUserofObject = Object.values(res.usersArray);
          setUsers(newArrayUserofObject);
        })
        .catch(err => console.log(err));
    };
    getUsers();
  }, []);

  return (
    <>
      <ToastContainer />
      <TableContainer component={Paper} width="100%">
        <Table sx={{ minWidth: 1000, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Job Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(teammate => (
              <UserRow key={teammate._id} user={user} teammate={teammate} socket={socket} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTab;
