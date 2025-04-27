import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Code} from 'lucide-react';

import MenuIcon from "@mui/icons-material/Menu";
import { 
  AiFillHome, 
  AiOutlineSearch, 
  AiOutlineUserAdd, 
  AiOutlineSetting, 
  AiOutlineLogout 
} from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import styles from "./styles/NewsFeed.module.css";
import BackBG from "../components/assets/appBG.jpg";
import { CastForEducationOutlined } from "@mui/icons-material";

function NewsFeed() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  function handleSignOut(e) {
    localStorage.removeItem("psnUserId");
    localStorage.removeItem("psnToken");
    localStorage.removeItem("psnUserFirstName");
    localStorage.removeItem("psnUserLastName");
    localStorage.removeItem("psnUserEmail");
    navigate("/s");
  }

  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
  }, [navigate]);

  // Close drawer on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  }, [location.pathname, isMobile]);

  const drawerWidth = 240;

  const navItems = [
    { text: "Home", icon: <AiFillHome size={20} />, to: "" },
    { text: "Following", icon: <BiAddToQueue size={20} />, to: "following" },
    { text: "Followers", icon: <AiOutlineUserAdd size={20} />, to: "follower" },
    { text: "Search", icon: <AiOutlineSearch size={20} />, to: "allaccounts" },
    { text: "Educational Content", icon: <CastForEducationOutlined size={20} />, to: "education" },
    { text: "My Profile", icon: <AiOutlineSetting size={20} />, to: "myprofile" },
  ];

  const drawer = (
    <Box>
      <Toolbar>
      <Box style={{
          backgroundColor: '#1e40af',
          padding: '0.75rem',
          borderRadius: '0.75rem',
          marginRight: '1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
            <Code size={18} style={{ color: '#ffff' }} />
        </Box>
        <h1 style={{
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#1e40af',
          margin: 0
        }}>TECHSHARE</h1>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.to}
            selected={location.pathname === `/${item.to}`}
          >
            <ListItemIcon style={{ color: '#3b82f6' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem button onClick={handleSignOut}>
          <ListItemIcon style={{ color: 'red' }}>
            <AiOutlineLogout size={20} />
          </ListItemIcon>
          <ListItemText style={{ color: 'red' }} primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      
      
      <Box
        component="navd"
        
      >
        {/* Mobile drawer */}
        <Drawer
  variant="temporary"
  open={isMobile && drawerOpen}
  onClose={handleDrawerToggle}
  ModalProps={{
    keepMounted: true,
  }}
  sx={{
    display: { xs: 'block', sm: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      backgroundImage: `url(${BackBG})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: 'white',
    },
  }}
>
  {drawer}
</Drawer>

        
        {/* Desktop drawer */}
        <Drawer
  variant="persistent"
  open={!isMobile && drawerOpen}
  sx={{
    display: { xs: 'none', sm: 'block' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      backgroundImage: `url(${BackBG})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: 'white',
    },
  }}
>
  {drawer}
</Drawer>

      </Box>
      
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: drawerOpen ? `${drawerWidth}px` : 0 },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* <Toolbar /> This provides spacing below the AppBar */}
        <Container className="pt-3">
          <Outlet style={{ color: "#A7C7E7" }} />
        </Container>
      </Box>
    </Box>
  );
}

export default NewsFeed;