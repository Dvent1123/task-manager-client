import React, { useState, useEffect, useRef, useContext } from "react";
import useToken from "../../utils/useToken";
import jwt_decode from "jwt-decode";
import { SocketContext } from "../../services/socket";
import Container from "@mui/material/Container";
import SettingsForm from "./SettingsForm";
import { getUser } from "../../services/user";
import { ToastContainer, toast } from "react-toastify";
import HomeNav from '../Navs/Home_Nav'
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
  });


  useEffect(() => {
    const getUserInfo = async () => {
      await getUser(realToken.current)
        .then(res => {
          setUser({
            ...user,
            id: res.currentUser._id,
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
    socket.on("updatedSettings", result => {
      const { success,data, message } = result;
      if (!success) {
        toast.error(message);
      } else {
        setUser({...user, username: ''})
        toast.success(message);
        setUser({id: data._id,
        currentUser: data.username,
        username: data.username,
        roomId: data.roomId,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
        role: data.role,
        job: data.job})
      }
    });
  }, [user]);


  const onSubmit = e => {
    e.preventDefault();

    socket.emit("updateUserSettings", user);
  };

  return (
    <Container maxWidth="xl">
      <ToastContainer />
      <HomeNav user={user}/>
      {user.username ? (
        <SettingsForm onSubmit={onSubmit} user={user} setUser={setUser} />
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
};

export default Settings;
