import React, { useState, useEffect, useRef, useContext } from "react";
import useToken from "../../utils/useToken";
import jwt_decode from "jwt-decode";
import { SocketContext } from "../../services/socketService";
import Container from "@mui/material/Container";
import SettingsForm from "./SettingsForm";
import { getUser } from "../../services/usersServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Settings = () => {
  let realToken = useRef();
  const { token } = useToken();
  const parseToken = JSON.parse(token);
  realToken.current = parseToken.token;
  const socket = useContext(SocketContext);

  const [user, setUser] = useState({
    id: "",
    currentUser: "",
    username: "",
    roomId: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
    role: "",
    job: ""
  });

  useEffect(() => {
    socket.on("joined", message => console.log(message));
    socket.emit(
      "subscribe",
      jwt_decode(realToken.current).roomId,
      jwt_decode(realToken.current).username
    );

    return () => {
      socket.emit(
        "unsubscribe",
        jwt_decode(realToken.current).roomId,
        jwt_decode(realToken.current).username
      );
      socket.removeAllListeners();
    };
  }, [socket]);

  useEffect(() => {
    const getUserInfo = async () => {
      await getUser(realToken.current)
        .then(res => {
          setUser({
            ...user,
            currentUser: res.currentUser.username,
            username: res.currentUser.username,
            role: res.currentUser.role,
            roomId: res.currentUser.roomId,
            job: res.currentUser.job
          });
        })
        .catch(err => console.log(err));
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    setUser(user);
  }, [user]);

  const onSubmit = e => {
    e.preventDefault();
    // const newUser = {
    //   id: currentUser.id,
    //   currentUser: currentUser.username,
    //   username: userName,
    //   roomId: decoded.roomId,
    //   current_password: password,
    //   new_password: newPassword,
    //   new_password_confirmation: newPasswordConfirmation,
    //   role: role,
    //   job: job
    // };

    socket.emit("updateUserSettings", user);
  };

  return (
    <Container maxWidth="xl">
      <ToastContainer />
      {user.username ? (
        <SettingsForm onSubmit={onSubmit} user={user} setUser={setUser} />
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
};

export default Settings;
