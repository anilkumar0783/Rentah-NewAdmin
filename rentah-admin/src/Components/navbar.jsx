import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Logout, AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import CustomModal from "./ui/CustomModal"; // Import the modal

const menuItems = [
  { text: "DASHBOARD", path: "/" },
  { text: "All Users", path: "/users" },
  { text: "Banners", path: "/banners" },
  { text: "Notifications", path: "/notification" },
  { text: "Reports", path: "/reports" },
  { text: "Help & Support", path: "/help-support" },
  { text: "Categories", path: "/categories" },
  { text: "All Listings", path: "/listings" },
  { text: "Requests", path: "/requests" },
  { text: "Business Users", path: "/business-users" },
  { text: "Sub Admins", path: "/sub-admins" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  // Find the title based on the current path
  const currentTab = menuItems.find((item) => item.path === location.pathname);
  const title = currentTab ? currentTab.text : "Dashboard"; // Default to "Dashboard"

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationTime");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        width: "100%",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          {title} {/* Dynamic title based on the selected tab */}
        </Typography>

        <Box>
          <IconButton color="inherit">
            <AccountCircle fontSize="large" />
          </IconButton>
          <IconButton color="error" onClick={() => setOpenModal(true)}>
            <Logout fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Custom Modal for Logout Confirmation */}
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleLogOut}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </AppBar>
  );
};

export default Navbar;
