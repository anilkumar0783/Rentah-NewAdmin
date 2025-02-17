import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import CategoryIcon from "@mui/icons-material/Category";
import ViewListIcon from "@mui/icons-material/ViewList";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BusinessIcon from "@mui/icons-material/Business";
import HelpIcon from "@mui/icons-material/Help";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation(); // ✅ Get the current route

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Banners", icon: <ViewListIcon />, path: "/banners" },
    { text: "Notifications", icon: <NotificationsIcon />, path: "/notification" },
    { text: "Reports", icon: <ReportIcon />, path: "/reports" },
    { text: "Help & Support", icon: <HelpIcon />, path: "/help-support" },
    { text: "Categories", icon: <CategoryIcon />, path: "/categories" },
    { text: "Listings", icon: <ViewListIcon />, path: "/listings" },
    { text: "Requests", icon: <ViewListIcon />, path: "/requests" },
    { text: "Business Users", icon: <BusinessIcon />, path: "/business-users" },
    { text: "Sub Admins", icon: <AdminPanelSettingsIcon />, path: "/sub-admins" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#d3fcf9", // ✅ Sidebar Background Color
          color: "#000",
          borderRight: "none", // ✅ Removes the right-side border
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#179778" }}>
          RENTAH
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path; // ✅ Check if the tab is active

            return (
              <NavLink
                to={item.path}
                key={item.text}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton
                  sx={{
                    backgroundColor: isActive ? "#5ceacf" : "transparent", // ✅ Active tab background color
                    color: isActive ? "#000" : "black", // ✅ Keep text color unchanged
                    "&:hover": { backgroundColor: "#5ceacf" }, // ✅ Hover remains the same
                  }}
                >
                  <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </NavLink>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
