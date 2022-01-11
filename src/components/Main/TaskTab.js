import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { getAllTasks } from "../../services/tasksService";
import TaskRow from "./TaskRow";
import { getAllUsers } from "../../services/usersServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const TaskTab = ({ token, user, socket }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
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
  }, [tasks]);

  // Gets Tasks
  useEffect(() => {
    const getTasks = () => {
      getAllTasks(token)
        .then(res => {
          var newArrayTaskofObject = Object.values(res.tasksArray);
          setTasks(newArrayTaskofObject);
        })
        .catch(err => console.log(err));
    };
    getTasks();

    const getUsers = () => {
      getAllUsers(token)
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
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
                username={user.username}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={tasks.length}
                rowsPerPage={5}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTab;
