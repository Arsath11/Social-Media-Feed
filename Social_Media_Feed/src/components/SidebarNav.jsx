import * as React from "react";
import PropTypes from "prop-types";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoSignOut } from "react-icons/go";

import AddBoxIcon from "@mui/icons-material/AddBox";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import { LuTableProperties } from "react-icons/lu";

const drawerWidth = 240;

function SidebarNav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      {/* <List>
        {["View Property", "Add Property", "Sign Out", "Drafts"].map(
          (text, index) => {
        
            const icons = [
              <AddBoxIcon />,
              <StarIcon />,
              <SendIcon />,
              <DraftsIcon />,
            ];

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <ListItemIcon>
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          }
        )}
      </List> */}

      <List>
        {["View Property", "Add Property", "Sign Out"].map((text, index) => {
          const icons = [
            <LuTableProperties size={22} />,
            <IoIosAddCircleOutline size={22} />,

            <GoSignOut size={22} />,
          ];

          return (
            <ListItem key={text} disablePadding>
              {text === "Sign Out" ? (
                <ListItemButton onClick={() => {navigate("/"),
                  localStorage.removeItem('isLoggedIn')
                }}>
                  {/* Trigger signOut function instead of Link */}
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              ) : (
                <ListItemButton
                  component={Link}
                  to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Social Media Feed
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route
            path="/add-property"
            element={<Typography variant="h5">Add Property</Typography>}
          />
          <Route
            path="/view-property"
            element={<Typography variant="h5">View Property</Typography>}
          />

          <Route
            path="/drafts"
            element={<Typography variant="h5">Drafts Page</Typography>}
          />
          <Route
            path="/all-mail"
            element={<Typography variant="h5">All Mail Page</Typography>}
          />
          <Route
            path="/trash"
            element={<Typography variant="h5">Trash Page</Typography>}
          />
          <Route
            path="/spam"
            element={<Typography variant="h5">Spam Page</Typography>}
          />
        </Routes>
      </Box>
    </Box>
  );
}

SidebarNav.propTypes = {
  window: PropTypes.func,
};

export default SidebarNav;
