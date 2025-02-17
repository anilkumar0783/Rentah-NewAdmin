import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import Navbar from "../navbar";
import { Box, CssBaseline, Drawer } from "@mui/material";

const drawerWidth = 250; // Sidebar width

const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#E3F2FD", // Light blue Material Design color
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main Content (Takes Full Width After Sidebar) */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", width: `calc(100% - ${drawerWidth}px)` }}>
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
