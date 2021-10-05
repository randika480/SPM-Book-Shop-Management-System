import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DeliveryManagementNav from "../components/Shevon/DeliveryManagementNav";
import DeliveryCostNav from "../components/Shevon/DeliveryCostNav";
import DeliveryPersonManagement from "../components/Shevon/DeliveryPersonManagement";
import FAQmanagement from "../components/Shevon/FAQmanagement";
import InquiriesManagement from "../components/Shevon/InquiriesManagement";
import DeliveryManagerProfile from "../components/Shevon/DeliveryManagerProfile";

const drawerWidth = 250;

const DeliveryDashboard = makeStyles((theme) => ({
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

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = DeliveryDashboard();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [deliveryManagementNavOpen, setDeliveryManagementNavOpen] =
    useState(true);
  const [deliveryCostNavOpen, setDeliveryCostNavOpen] = useState(false);
  const [deliveryPersonManagementOpen, setDeliveryPersonManagementOpen] =
    useState(false);
  const [faqManagementOpen, setFaqManagementOpen] = useState(false);
  const [inquiriesMnagementOpen, setInquiriesMnagementOpen] = useState(false);
  const [profileManagementOpen, setProfileManagementOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="bg-lightSilver " style={{ height: "1000px" }}>
      <div className={classes.toolbar} />
      <div className="mt-10 mx-16 mb-3">
        <img
          src="https://i.ibb.co/NW4nMPX/profile-pic-24.png"
          alt="profile-pic-24"
          border="0"
        ></img>
      </div>
      <div className="mt-2 mx-5 mb-8">
        <h6 className="font-extrabold text-xl ml-2">Mr. Shevon Krishmal</h6>
      </div>
      <List>
        <ListItem button>
          <ListItemText
            primary={"Delivery Management"}
            onClick={() => {
              setDeliveryCostNavOpen(false);
              setProfileManagementOpen(false);
              setFaqManagementOpen(false);
              setInquiriesMnagementOpen(false);
              setDeliveryPersonManagementOpen(false);
              setDeliveryManagementNavOpen(true);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary={"Delivery Cost Management"}
            onClick={() => {
              setDeliveryManagementNavOpen(false);
              setProfileManagementOpen(false);
              setFaqManagementOpen(false);
              setInquiriesMnagementOpen(false);
              setDeliveryPersonManagementOpen(false);
              setDeliveryCostNavOpen(true);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary={"Delivery Person Management"}
            onClick={() => {
              setDeliveryManagementNavOpen(false);
              setDeliveryCostNavOpen(false);
              setProfileManagementOpen(false);
              setFaqManagementOpen(false);
              setInquiriesMnagementOpen(false);
              setDeliveryPersonManagementOpen(true);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary={"FAQ Management"}
            onClick={() => {
              setDeliveryManagementNavOpen(false);
              setDeliveryCostNavOpen(false);
              setProfileManagementOpen(false);
              setInquiriesMnagementOpen(false);
              setDeliveryPersonManagementOpen(false);
              setFaqManagementOpen(true);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary={"Inquiries Management"}
            onClick={() => {
              setDeliveryManagementNavOpen(false);
              setDeliveryCostNavOpen(false);
              setProfileManagementOpen(false);
              setFaqManagementOpen(false);
              setDeliveryPersonManagementOpen(false);
              setInquiriesMnagementOpen(true);
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary={"Profile Infromation"}
            onClick={() => {
              setDeliveryManagementNavOpen(false);
              setDeliveryCostNavOpen(false);
              setFaqManagementOpen(false);
              setInquiriesMnagementOpen(false);
              setDeliveryPersonManagementOpen(false);
              setProfileManagementOpen(true);
            }}
          />
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
            <h6 className={" text-3xl font-black "}>Delivery Manager</h6>
          </Grid>
          <Grid container justifyContent="flex-end">
            <button
              className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
              style={{
                boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
              }}
            >
              LogOut
            </button>
          </Grid>
        </Toolbar>
      </AppBar>
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

        {deliveryManagementNavOpen && <DeliveryManagementNav />}
        {deliveryCostNavOpen && <DeliveryCostNav />}
        {deliveryPersonManagementOpen && <DeliveryPersonManagement />}
        {faqManagementOpen && <FAQmanagement />}
        {inquiriesMnagementOpen && <InquiriesManagement />}
        {profileManagementOpen && <DeliveryManagerProfile />}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
