import React, { useState, useEffect } from "react";
import UsersModal from "./Modal/UsersModal";
import ModalContainer from "./Modal/ModalContainer";
import TrashIcon from "../../assets/trash.svg";
import EditIcon from "../../assets/edit.svg";

const UsersContainer = ({ teammate, socket, user }) => {
  const [teamMate, setTeamMate] = useState({
    _id: 0,
    username: "",
    job: "",
    role: "User",
    password: ""
  });
  const { _id } = teamMate;
  const { isShown, toggle } = ModalContainer();

  useEffect(() => {
    setTeamMate(teammate);
  }, []);

  const removeUser = async () => {
    const data = {
      id: _id,
      currentUser: user.username
    };
    socket.emit("deleteUser", data);
  };

  //where you update the tasks
  const onSubmit = e => {
    e.preventDefault();

    setTeamMate({ ...teamMate, currentUser: user.username });

    toggle();
    socket.emit("updateUser", teamMate);
  };

  return (
    <section className="info-container-title">
      <div className="info-container-center-title">
        <h3 id="task-user-data" className="task-title">
          {teammate.username}{" "}
        </h3>
        <div className="divider-task-title"> | </div>
        <div className="description-container-title">
          <h3 id="task-user-data" className="task-title">
            {teammate.role}{" "}
          </h3>
          <div className="divider-task-title"> | </div>
          <h3 id="task-user-data" className="task-title">
            {teammate.job}
          </h3>
        </div>
        <button className="task-button" onClick={toggle}>
          <img
            id="info-button-pictures"
            src={EditIcon}
            alt="Edit Button | Pen on paper"
          />
        </button>
        <button
          className="task-button"
          id="delete-task-button"
          onClick={removeUser}
        >
          <img
            id="info-button-pictures"
            src={TrashIcon}
            alt="Delete Button | Trashcan"
          />
        </button>
      </div>
      <UsersModal
        isShowing={isShown}
        hide={toggle}
        onSubmit={onSubmit}
        user={teamMate}
        setUser={setTeamMate}
      />
    </section>
  );
};

export default UsersContainer;
