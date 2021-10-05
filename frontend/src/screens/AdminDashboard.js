import React, { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import AdminDashboard from "../components/Randika/AdminDashboard";
import RevenueComponents from "../components/Randika/RevenueComponents";
import SalesComponent from "../components/Randika/SalesComponent";
import AdminNewsletter from "../components/Randika/AdminNewsletter";
import FAQ from "../components/Randika/FAQ";
import AdminUserAccount from "../components/Randika/AdminUserAccount";
import AdminUsers from "../components/Randika/AdminUsers";
import BookRequest from "../components/Deshani/BookRequest";
import Discount from "../components/Randika/Discount";
import AddedDiscounts from "../components/Randika/AddedDisconts";

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

  const [openAdminDashboard, setOpenAdminDashboard] = useState(true);
  const [openRevenueComponent, setOpenRevenueComponent] = useState(false);
  const [openSalesComponent, setOpenSalesComponent] = useState(false);
  const [openDiscountComponent, setOpenDiscountComponent] = useState(false);
  const [openAdminNewsLetter, setOpenAdminNewsLetter] = useState(false);
  const [openAdminUsers, setOpenAdminUsers] = useState(false);
  const [openFAQ, setopenFAQ] = useState(false);
  const [openAdminUserAccount, setopenAdminUserAccount] = useState(false);
  const [OpenBookRequest, setopenBookRequest] = useState(false);
  const [addedDiscountsOpen, setAddedDiscountsOpen] = useState(false);

  const [img, setImg] = useState("");
  const [username, setusername] = useState("");

  const getAdmin = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .get("http://localhost:6500/matrix/api/admin/getAdmin", config)
        .then((res) => {
          setImg(res.data.Admin.profilePicture);
          setusername(res.data.Admin.username);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="bg-lightSilver " style={{ height: "1000px" }}>
      <div className={classes.toolbar} />
      <div className="mt-10 mx-16 mb-3">
        <Avatar
          style={{ width: "120px", height: "120px", margin: "auto" }}
          src={img.imageSecURL}
        />
      </div>
      <div className="mt-2 mx-5 mb-8">
        <Typography variant="h6" noWrap className="text-center">
          {username}
        </Typography>
      </div>
      <List>
        <ListItem button>
          <ListItemText
            primary={"Dashboard"}
            onClick={() => {
              setOpenRevenueComponent(false);
              setOpenSalesComponent(false);
              setOpenDiscountComponent(false);
              setOpenAdminNewsLetter(false);
              setOpenAdminUsers(false);
              setopenFAQ(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setOpenAdminDashboard(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Revenue"}
            onClick={() => {
              setOpenAdminDashboard(false);
              setOpenSalesComponent(false);
              setOpenDiscountComponent(false);
              setOpenAdminNewsLetter(false);
              setOpenAdminUsers(false);
              setopenFAQ(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setOpenRevenueComponent(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Sales"}
            onClick={() => {
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setOpenDiscountComponent(false);
              setOpenAdminNewsLetter(false);
              setOpenAdminUsers(false);
              setopenFAQ(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setOpenSalesComponent(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Discount"}
            onClick={() => {
              setOpenSalesComponent(false);
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setOpenAdminNewsLetter(false);
              setOpenAdminUsers(false);
              setopenFAQ(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setOpenDiscountComponent(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Added Discounts"}
            onClick={() => {
              setOpenSalesComponent(false);
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setOpenAdminNewsLetter(false);
              setOpenAdminUsers(false);
              setopenFAQ(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setOpenDiscountComponent(false);
              setAddedDiscountsOpen(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Newsletter"}
            onClick={() => {
              setOpenDiscountComponent(false);
              setOpenSalesComponent(false);
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setOpenAdminUsers(false);
              setopenFAQ(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setOpenAdminNewsLetter(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Users"}
            onClick={() => {
              setOpenAdminNewsLetter(false);
              setOpenDiscountComponent(false);
              setOpenSalesComponent(false);
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setopenFAQ(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setOpenAdminUsers(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"FAQ"}
            onClick={() => {
              setOpenAdminUsers(false);
              setOpenAdminNewsLetter(false);
              setOpenDiscountComponent(false);
              setOpenSalesComponent(false);
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setopenAdminUserAccount(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setopenFAQ(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Book Requests"}
            onClick={() => {
              setopenFAQ(false);
              setOpenAdminUsers(false);
              setOpenAdminNewsLetter(false);
              setOpenDiscountComponent(false);
              setOpenSalesComponent(false);
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setopenAdminUserAccount(false);
              setAddedDiscountsOpen(false);
              setopenBookRequest(true);
            }}
          />
        </ListItem>

        <ListItem button>
          <ListItemText
            primary={"My Account"}
            onClick={() => {
              setopenFAQ(false);
              setOpenAdminUsers(false);
              setOpenAdminNewsLetter(false);
              setOpenDiscountComponent(false);
              setOpenSalesComponent(false);
              setOpenRevenueComponent(false);
              setOpenAdminDashboard(false);
              setopenBookRequest(false);
              setAddedDiscountsOpen(false);
              setopenAdminUserAccount(true);
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
            <h6 className={" text-3xl font-black "}>Admin Dashboard</h6>
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

        {openAdminDashboard && <AdminDashboard />}
        {openRevenueComponent && <RevenueComponents />}
        {openSalesComponent && <SalesComponent />}
        {openDiscountComponent && <Discount />}
        {openAdminNewsLetter && <AdminNewsletter />}
        {openFAQ && <FAQ />}
        {openAdminUserAccount && <AdminUserAccount />}
        {openAdminUsers && <AdminUsers />}
        {OpenBookRequest && <BookRequest />}
        {addedDiscountsOpen && <AddedDiscounts />}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
