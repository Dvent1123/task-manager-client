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
import { getAllTasks } from "../../services/tasksService";
import { SocketContext } from "../../services/socketService";
import TaskRow from "./TaskRow";
import { getAllUsers } from "../../services/usersServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const TaskTab = () => {
    /// We can pull out all the token and current user stuff from both the TaskTab and the UserTab
    // We can put all of that plus the tocket stuff in the Tabs component and then just pass these down
    // as props instead
  const { token } = useToken();
  const [decoded, setDecoded] = useState("");
  let realToken = useRef();
  const socket = useContext(SocketContext);
  const parseToken = JSON.parse(token);
  realToken.current = parseToken.token;

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('')

  useEffect(() => {
    setDecoded(jwt_decode(realToken.current));
    socket.emit(
      "subscribe",
      jwt_decode(realToken.current).roomId,
      jwt_decode(realToken.current).username
    );
    setUsername(decoded.username)

    return () => {
      socket.emit(
        "unsubscribe",
        jwt_decode(realToken.current).roomId,
        jwt_decode(realToken.current).username
      );
      socket.removeAllListeners();
    };
  }, [socket, token, decoded.username]);

  useEffect(() => {
    socket.on("joined", message => {
      console.log(message);
    });

    socket.on("joined", () =>
      socket.emit("subscribe", decoded.roomId, decoded.username)
    );

    socket.on("left", message => console.log(message));

    socket.on("TaskAdded", result => {
      const { data, success, message } = result;
      if (!success) {
        toast.error(message);
      } else {
        setTasks(prevTasks => [...prevTasks, data]);
        toast.success(message);
      }
    });

    socket.on("TaskDeleted", result => {
      const { data, success } = result;
      if (!success) {
        toast.error("An error occurred :(");
      } else {
        if (tasks) {
          setTasks(prevTasks =>
            prevTasks.filter(item => item._id !== data._id)
          );
        }
        toast.success("Task deleted!");
      }
    });

    socket.on("TaskUpdated", result => {
      const { data, success, message } = result;
      if (!success) {
        toast.error(message);
      } else {
        const taskIndex = tasks.findIndex(item => item._id === data._id);
        const updatedTasksArray = [...tasks];
        updatedTasksArray[taskIndex] = data;
        setTasks(updatedTasksArray);
        toast.success(message);
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket, tasks]);

  // Gets Tasks
  useEffect(() => {
    const getTasks = () => {
      getAllTasks(realToken.current)
        .then(res => {
          var newArrayTaskofObject = Object.values(res.tasksArray);
          setTasks(newArrayTaskofObject);
        })
        .catch(err => console.log(err));
    };
    getTasks();
  }, []);

  // Gets Users
  useEffect(() => {
    const getUsers = () => {
      getAllUsers(realToken.current)
        .then(res => {
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

  return (
    <>
      <ToastContainer />
      <TableContainer component={Paper} width="100%">
        <Table sx={{ minWidth: 1000, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Assigned</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TaskRow
                key={task._id}
                task={task}
                users={users}
                socket={socket}
                username={username}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTab;
