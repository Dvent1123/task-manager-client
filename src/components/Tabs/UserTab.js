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
import UserRow from "./UserRow";
import { getAllUsers } from "../../services/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const generator = require("generate-password");

const UserTab = ({ token, user, socket }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [newTeammate, setNewTeammate] = useState({
    username: "",
    job: "",
    role: "User",
    password: "",
    currentUser: "",
    roomId: ""
  });

  useEffect(() => {
    const generatedPassword = generator.generate({
      length: 10,
      numbers: true
    });
    setNewTeammate({
      ...newTeammate,
      password: generatedPassword,
      currentUser: user.username,
      roomId: user.roomId
    });
  }, []);

  //sockets use effect
  useEffect(() => {
    socket.on("left", message => console.log(message));

    socket.on("UserAdded", result => {
      console.log("makes it to user added");
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
  }, [users]);

  useEffect(() => {
    const getUsers = () => {
      getAllUsers(token)
        .then(res => {
          var newArrayUserofObject = Object.values(res.usersArray);
          setUsers(newArrayUserofObject);
        })
        .catch(err => console.log(err));
    };
    getUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <>
      <TableContainer component={Paper} width="100%">
        <Table sx={{ minWidth: 1000, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">Name</TableCell>
              <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">Role</TableCell>
              <TableCell sx={{ paddingRight: {xs: 1, s: 2 ,md: 5}, paddingLeft: {xs: 1, s: 2 ,md: 5} ,width: {xs: "5%",md: "25%"} }} align="center">Job Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? users.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : users
            ).map(teammate => (
              <UserRow
                key={teammate._id}
                user={user}
                teammate={teammate}
                socket={socket}
              />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={users.length}
                rowsPerPage={5}
                rowsPerPageOptions={[]}
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

export default UserTab;
