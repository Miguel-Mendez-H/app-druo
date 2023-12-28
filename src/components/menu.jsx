import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

const drawerWidth = 230;

function DrawerResponsive(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const menuItemsMemo = useMemo(() => {
    const menuItems = [
      {
        menu: "Ver negocios",
        path: "/negocios/",
      },
      {
        menu: "Crear negocios",
        path: "/negocios/crear",
      },
    ];
  
    return menuItems;
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
  }



  const drawer = (
    <div
      className="drawercontainer"
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%",
        backgroundColor: "#11235A",
        color: "#F6ECA9",
        zIndex: "950",
      }}
    >
      <Toolbar></Toolbar>
      <List>
        {menuItemsMemo.map((item) => (
          <React.Fragment key={item.menu}>
            <ListItemButton component={Link}
              to={item.path}
              selected={selectedMenu === item.menu}
              onClick={() => handleMenuItemClick(item.menu)}
              sx={{fontFamily: 'Lato'}}>
              <ListItemText primary={item.menu} sx={{ fontFamily: 'Lato', fontWeight: 'bold', fontSize: '16px', color: selectedMenu === item.menu ? '#FFD700' : '#F6ECA9'}}/>
            </ListItemButton>
          </React.Fragment>
        ))}
      </List>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#11235A",
              color: "#11235A",
              zIndex: "950",
            },
        }}
        >
          <Toolbar 
          sx={{
            backgroundColor: "#11235A",
          }}>
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
              Druo
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
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#11235A",
              color: "#EBEBEB",
              zIndex: "950",
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
    </Box>
  );
}

DrawerResponsive.propTypes = {
  window: PropTypes.func,
  location: PropTypes.object,
};

export default React.memo(DrawerResponsive);
