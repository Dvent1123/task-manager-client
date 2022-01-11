import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import landinglogo from "../../assets/logo512.jpg";

const useStyles = makeStyles(theme => ({
  logo: {
    maxWidth: 60
  }
}));

const Home_Nav = ({ user }) => {
  // const newInitials = userInitial.toUpperCase()

  const [userInitial, setUserInitial] = useState("R");

  useEffect(() => {
    setUserInitial(user.username[0]);
  }, [user.username]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "./";
  };

  const renderNav = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const classes = useStyles();

    const handleOpenUserMenu = event => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
      <AppBar position="static" style={{ background: "white" }}>
        <Container
          maxWidth="xl"
          sx={{ mx: 2, display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Link style={{ color: "black", textDecoration: "none" }} to="/home">
              <img src={landinglogo} alt="scroll" className={classes.logo} />
            </Link>
          </Typography>
          <Toolbar>
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "#6c63ff" }}>{userInitial}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography textAlign="center">
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to="/home"
                    >
                      Home
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to="/settings"
                    >
                      Settings
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };

  return <Fragment>{renderNav()}</Fragment>;
};

export default Home_Nav;
