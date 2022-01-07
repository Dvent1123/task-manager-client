import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TaskTab from "./TaskTab";
import UserTab from "./UserTab"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tasks" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        {value === 0 ? (
          <Box sx={{ width: "100%", p: 3 }}>
            <TaskTab />
          </Box>
        ) : (
          <Box sx={{ width: "100%", p: 3 }}>
              <UserTab />
          </Box>
        )}
      </Box>
    </Box>
  );
}
