import React from "react";
import ReactDom from "react-dom";

const UsersModal = ({ isShowing, hide, onSubmit, user, setUser }) =>
  isShowing
    ? ReactDom.createPortal(
        <>
          <div className="modal-overlay">
            <div
              className="modal-wrapper"
              tabIndex={-1}
              aria-modal
              aria-hidden
              role="dialog"
            >
              <div className="modal">
                <div className="modal-header">
                  <button
                    className="modal-close-button"
                    onClick={hide}
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form className="modal-form" onSubmit={onSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      className="option-styling"
                      id="username"
                      value={user.username}
                      onChange={e =>
                        setUser({ ...user, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      className="option-styling"
                      id="password"
                      value={user.password}
                      onChange={e =>
                        setUser({ ...user, password: e.target.value })
                      }
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job">Job</label>
                    <input
                      className="option-styling"
                      id="job"
                      value={user.job}
                      onChange={e => setUser({ ...user, job: e.target.value })}
                    />
                  </div>
                  {/* This can stay for now but gonna have to get values from database */}
                  <div className="form-group">
                    <label htmlFor="role">Security Role: </label>
                    <select
                      className="option-styling"
                      id="role"
                      value={user.role}
                      onChange={e => setUser({ ...user, role: e.target.value })}
                    >
                      <option className="option-styling" value="user">
                        User
                      </option>
                      <option className="option-styling" value="admin">
                        Admin
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <button id="modal-form-button" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default UsersModal;
