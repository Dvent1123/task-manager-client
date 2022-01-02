import React from "react";
import mainLandingImage from "../../assets/main_image.svg";
import tasksImage from "../../assets/tasks.svg";
import landinglogo from "../../assets/logo512.jpg";
import NavBar from "../Main/NavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@mui/material/styles";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    background: "linear-gradient(90deg, #ffffff 50%, #f2f2f2 50%)"
  }
}));
let theme = createTheme();
theme = responsiveFontSizes(theme);

const Landing = () => {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" className={classes.mainContainer}>
          <NavBar />
          <Box
            sx={{
              width: "100%",
              height: { xs: "100vh", md: "70vh" },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              margin: 0
            }}
            padding={1}
          >
            <Paper
              sx={{
                width: { xs: "100%", md: "50%" },
                height: "100%",
                display: "flex",
                alignItems: { xs: "center", md: "flex-end" },
                justifyContent: { xs: "center" },
                backgroundColor: "transparent",
                boxShadow: "none"
              }}
            >
              <img
                style={{ width: "100%", maxWidth: "500px", margin: "2rem" }}
                src={mainLandingImage}
                alt="teamwork"
              />
            </Paper>
            <Box
              sx={{
                height: "100%",
                width: { xs: "100%", md: "50%" },
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-end" }
              }}
              flexDirection="column"
            >
              <Typography sx={{ pl: { xs: 0, md: 3 } }} variant="h3">
                Invest 10% less time
              </Typography>
              <Typography sx={{ pl: { xs: 0, md: 3 } }} variant="h2">
                Create A Real Time Office <br /> For You and Your Team
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, pl: { xs: 0, md: 3 } }}>
                Have you ever needed somewhere convenient to manage everything?
                Register now for free and instant organization!{" "}
              </Typography>
            </Box>
          </Box>

          <section>
            <Box
              maxWidth="xl"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
                backgroundColor: "#2f2e41"
              }}
            >
              <Typography
                color="white"
                variant="h2"
                component="div"
                sx={{ textAlign: "center", my: 1 }}
              >
                How it works
              </Typography>
              <Typography
                variant="h5"
                color="white"
                component="div"
                sx={{
                  textAlign: "center",
                  my: 1,
                  width: { xs: "100%", md: "75%" }
                }}
              >
                Sign up and easily add users to your project. Start receiving
                real-time data and notifications. Have users complete tasks and
                have continous production.
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Box sx={{ width: { xs: "100%", md: "50%" }, p: 3 }}>
                  <Grid
                    container
                    spacing={{
                      xs: 1,
                      sm: 4,
                      md: 4
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <Typography
                        variant="h2"
                        component="div"
                        color="white"
                        sx={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "50%",
                          border: "1.5px solid white",
                          textAlign: "center",
                          my: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        1
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Sign up
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Register easily through the registration portal or
                        better yet, right on this page!
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <Typography
                        variant="h2"
                        component="div"
                        color="white"
                        sx={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "50%",
                          border: "1.5px solid white",
                          textAlign: "center",
                          my: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        2
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Add Users{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Create a user after you login, send them their username
                        and password so they can login and begin working.
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <Typography
                        variant="h2"
                        component="div"
                        color="white"
                        sx={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "50%",
                          border: "1.5px solid white",
                          textAlign: "center",
                          my: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        3
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Create Task
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Create a task to be completed, give it a name and a
                        description so your users know what to do!
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <Typography
                        variant="h2"
                        component="div"
                        color="white"
                        sx={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "50%",
                          border: "1.5px solid white",
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        4
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        Assign Task{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Assign the task to any user in your project, this will
                        appear in their task list so they will know what they
                        have to do.
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <Typography
                        variant="h2"
                        component="div"
                        color="white"
                        sx={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "50%",
                          border: "1.5px solid white",
                          textAlign: "center",
                          my: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        5
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Manage Task{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Easily manage your tasks with the ability to create,
                        edit, and delete any task at any time.
                      </Typography>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      item
                      xs={12}
                      md={6}
                    >
                      <Typography
                        variant="h2"
                        component="div"
                        color="white"
                        sx={{
                          height: "80px",
                          width: "80px",
                          borderRadius: "50%",
                          border: "1.5px solid white",
                          textAlign: "center",
                          my: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        6
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Approve Task
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        color="white"
                        sx={{
                          flexGrow: 1,
                          textAlign: "center",
                          my: 1
                        }}
                      >
                        Wait for your team members to complete tasks and then
                        easily change their status so your team members know
                        when they are all caught up!
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    className="page-image"
                    src={tasksImage}
                    alt="file-w-people"
                    style={{ width: "100%", maxWidth: "500px", margin: "2rem" }}
                  />
                </Box>
              </Box>
            </Box>
          </section>
          <footer>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                marginTop: "2rem"
              }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 3,
                  my: 1
                }}
              >
                <img
                  src={landinglogo}
                  alt="site logo"
                  style={{ width: "100%", maxWidth: "50px" }}
                />
                Todo Simply
              </Typography>
            </Box>
          </footer>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Landing;
