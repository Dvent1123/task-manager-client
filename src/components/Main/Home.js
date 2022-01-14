import React, { useState, useEffect, useRef, useContext } from "react";
import useToken from "../../utils/useToken";
import jwt_decode from "jwt-decode";
import { SocketContext } from "../../services/socket";
import HomeNav from "../Navs/Home_Nav";
import Tabs from "../Tabs/Tabs";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import BasicSpeedDial from "./BasicSpeedDial";

const Home = () => {
  let realToken = useRef();
  const { token } = useToken();
  const parseToken = JSON.parse(token);
  realToken.current = parseToken.token;
  const socket = useContext(SocketContext);

  const [user, setUser] = useState({
    username: "",
    roomId: 0,
    role: "User"
  });

  useEffect(() => {
    socket.on("joined", message => console.log(message));
    socket.emit(
      "subscribe",
      jwt_decode(realToken.current).roomId,
      jwt_decode(realToken.current).username
    );

    setUser({
      ...user,
      username: jwt_decode(realToken.current).username,
      role: jwt_decode(realToken.current).role,
      roomId: jwt_decode(realToken.current).roomId
    });

    return () => {
      socket.emit(
        "unsubscribe",
        jwt_decode(realToken.current).roomId,
        jwt_decode(realToken.current).username
      );
      socket.removeAllListeners();
    };
  }, [socket]);

  return (
    <Container maxWidth="xl">
      <ToastContainer />
      <HomeNav user={user} />
      <Box
        sx={{
          width: "100%",
          height: { xs: "100vh", md: "70vh" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          margin: 0
        }}
        padding={1}
      >
        <Tabs token={realToken.current} user={user} socket={socket} />
      </Box>
      <BasicSpeedDial token={realToken.current} user={user} socket={socket} />
    </Container>
  );
};

export { Home };
