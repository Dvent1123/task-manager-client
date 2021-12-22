import React, { useState, useEffect, useRef, useContext } from "react";
import UsersContainer from "../Helpers/UsersContainer";
import { AiFillPlusCircle } from "react-icons/ai";
import UsersModal from "../Helpers/Modal/UsersModal";
import ModalContainer from "../Helpers/Modal/ModalContainer";
import { getAllUsers } from "../../services/usersServices";
import Loading from "../Helpers/Loading";
import Nav from "../Main/Nav";
import useToken from "../../utils/useToken";
import jwt_decode from "jwt-decode";
import { SocketContext } from "../../services/socketService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const generator = require("generate-password");

const Users = () => {
  const { isShown, toggle } = ModalContainer();
  const [users, setUsers] = useState(null);

  const [user, setUser] = useState({
    username: "",
    roomId: 0,
    password: "",
    password_confirmation: "",
    role: "User",
    job: ""
  });

  const { username, roomId, password, password_confirmation, role, job } = user;

  const [loading, setLoading] = useState(true);
  const { token } = useToken();
  const [decoded, setDecoded] = useState("");

  let realToken = useRef();
  const parseToken = JSON.parse(token);
  realToken.current = parseToken.token;
  const socket = useContext(SocketContext);

  useEffect(() => {
    const generatedPassword = generator.generate({
      length: 10,
      numbers: true
    });
    setUser({
      ...user,
      password: generatedPassword,
      password_confirmation: generatedPassword
    });
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => setLoading(false), 6000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

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

    socket.emit("addUser", user);

    toggle();

    setUser({ ...user, username: "", job: "", role: "User" });
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

  //renders the users
  const renderUsers = teammate => {
    return (
      <div key={teammate._id}>
        <UsersContainer user={user} teammate={teammate} socket={socket} />
      </div>
    );
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <Nav token={realToken.current} />
      <div className="container">
        <section className="whole-section-containers">
          <div className="section-header">
            <h1>Users</h1>
            <button className="add-btn" onClick={toggle}>
              <AiFillPlusCircle size={"40px"} />
            </button>
          </div>
          <UsersModal
            isShowing={isShown}
            hide={toggle}
            onSubmit={onSubmit}
            user={user}
            setUser={setUser}
          />
          <section className="section-container">
            <div className="info-container-title">
              <div className="info-container-center-title">
                <h3 className="task-title">Name</h3>
                <div className="divider-task-title"> | </div>
                <div className="description-container-title">
                  <h3 className="task-title">Role</h3>
                  <div className="divider-task-title"> | </div>
                  <h3 className="task-title">Job Title</h3>
                </div>
                <h3 className="task-title-right">Editing</h3>
              </div>
            </div>

            {loading === false ? (
              <div className="tasks">
                {users && users.length > 0 ? (
                  users.map(teammate => {
                    return renderUsers(teammate);
                  })
                ) : (
                  <p className="landing-header">No Users found</p>
                )}
              </div>
            ) : (
              <Loading />
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Users;
