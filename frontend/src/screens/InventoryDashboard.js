import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import InventoryAddNew from "../components/Adithya/InventoryAddNew";
import InventoryInStock from "../components/Adithya/InventoryInStock";
import InventoryManagerProfile from "../components/Adithya/InventoryManagerProfile";
import Wholesales from "../components/Adithya/Wholesales";

const drawerWidth = 300;

const InventoryDashboardStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#042B58",
    [theme.breakpoints.up("md")]: {},
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const InventoryDashboard = (props) => {
  const { window } = props;

  const history = useHistory();
  const theme = useTheme();
  const classes = InventoryDashboardStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [inventoryAddNewOpen, setInventoryAddNewOpen] = useState(false);
  const [wholesalesOpe, setWholesalesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    if (
      !localStorage.getItem("authToken") ||
      localStorage.getItem("userRole") !== "inventoryManager"
    ) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      history.push("/admin-login");
    }
  }, [history]);

  useEffect(() => {
    const getProfile = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get(
          "http://localhost:6500/matrix/api/inventoryManager/get-profile",
          config
        )
        .then((res) => {
          setProfileName(res?.data?.profile?.username);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    if (localStorage.getItem("userRole") === "inventoryManager") {
      getProfile();
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    history.push("/admin-login");
  };

  const drawer = (
    <div className="bg-lightSilver " style={{ height: "1000px" }}>
      <div className={classes.toolbar} />
      <div className="mt-10 m-auto mb-3 w-3/4 flex justify-center">
        <img
          src="https://i.ibb.co/1qjCgjz/download.jpg"
          alt="profile-pic-inventory-manager"
          width="100%"
          height="100%"
          border="0"
          className="object-contain rounded-full"
        ></img>
      </div>
      <div className="mt-2 mx-5 mb-8">
        <Typography variant="h6" noWrap className="font-extrabold text-xl ml-2">
          {profileName.length > 1 ? `${profileName}` : "Inventory Manager"}
        </Typography>
      </div>
      <List>
        <ListItem
          button
          onClick={() => {
            setInventoryAddNewOpen(false);

            setWholesalesOpen(false);

            setProfileOpen(false);
            setInventoryOpen(true);
          }}
        >
          <ListItemText primary={"Inventory"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setWholesalesOpen(false);

            setProfileOpen(false);
            setInventoryOpen(false);
            setInventoryAddNewOpen(true);
          }}
        >
          <ListItemText primary={"Add Books"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setInventoryAddNewOpen(false);

            setProfileOpen(false);
            setInventoryOpen(false);
            setWholesalesOpen(true);
          }}
        >
          <ListItemText primary={"Wholesales"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            setInventoryAddNewOpen(false);

            setWholesalesOpen(false);

            setInventoryOpen(false);
            setProfileOpen(true);
          }}
        >
          <ListItemText primary={"Profile"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container justifyContent="flex-start">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={" text-2xl font-black "}>
              Inventory Manager
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end">
            <button
              className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
              style={{
                boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
              }}
              onClick={logOutHandler}
            >
              LogOut
            </button>
          </Grid>
        </Toolbar>
      </AppBar>{" "}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {inventoryOpen && <InventoryInStock />}
        {inventoryAddNewOpen && <InventoryAddNew />}
        {wholesalesOpe && <Wholesales />}
        {profileOpen && <InventoryManagerProfile />}
      </main>
    </div>
  );
};

export default InventoryDashboard;
