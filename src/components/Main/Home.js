import React, { useEffect, useRef, useContext } from "react";
import useToken from "../../utils/useToken";
import jwt_decode from "jwt-decode";
import { SocketContext } from "../../services/socketService";
import Nav from "../Main/Nav";
import QuickLinks from "../../components/Helpers/QuickLinks";
import Tabs from '../Main/Tabs'

const Home = () => {
  let realToken = useRef();
  const { token } = useToken();
  const parseToken = JSON.parse(token);
  realToken.current = parseToken.token;
  const socket = useContext(SocketContext);

  useEffect(() => {
    let decoded = jwt_decode(realToken.current);

    socket.on("joined", message => console.log(message));
    socket.emit("subscribe", decoded.roomId, decoded.username)

    return () => {
      socket.emit('unsubscribe', decoded.roomId, decoded.username)
      socket.removeAllListeners();
    };
  });

  return (
    <div className="wrapper">
      <Nav token={realToken.current} />
      <div className="container">
        <div className="section-title">
          <h1 className="quick-actions-title">Quick Actions:</h1>
        </div>
        <Tabs token={realToken.current}/>
        {/* <QuickLinks token={realToken.current} /> */}
      </div>
    </div>
  );
};

export { Home };
