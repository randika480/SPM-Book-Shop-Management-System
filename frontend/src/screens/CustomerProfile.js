import React, { useState } from "react";
import Profile from "../components/Deshani/Profile";
import OrderHistory from "../components/Deshani/OrderHistory";
import Wishlist from "../components/Deshani/Wishlist";
import RequestBook from "../components/Deshani/RequestBook";
import MyReview from "../components/Deshani/MyReview";
import {
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Header from "../components/Adithya/Header";
import Footer from "../components/Adithya/Footer";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    color:"black",
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: "6rem",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "5rem",
  },
  footer: {
    position: "relative",
    left: "0",
    bottom: "0",
    width: "100%",
    backgroundColor: "red",
    color: "white",
    zIndex: "1201",
    textAlign: "center",
  },
}));

function CustomerProfile(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState(true);
  const [orderHistory, setOrderHistory] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [requestBook, setRequestBook] = useState(false);
  const [review, setReview] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Profile"}
            onClick={() => {
              setProfile(true);
              setOrderHistory(false);
              setWishlist(false);
              setRequestBook(false);
              setReview(false);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Order History"}
            onClick={() => {
              setProfile(false);
              setOrderHistory(true);
              setWishlist(false);
              setRequestBook(false);
              setReview(false);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Wishlist"}
            onClick={() => {
              setProfile(false);
              setOrderHistory(false);
              setWishlist(true);
              setRequestBook(false);
              setReview(false);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Request Book"}
            onClick={() => {
              setProfile(false);
              setOrderHistory(false);
              setWishlist(false);
              setRequestBook(true);
              setReview(false);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <RateReviewIcon />
          </ListItemIcon>
          <ListItemText
            primary={"My Reviews"}
            onClick={() => {
              setProfile(false);
              setOrderHistory(false);
              setWishlist(false);
              setRequestBook(false);
              setReview(true);
            }}
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <React.Fragment>
      <div>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Header />
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

            {profile && <Profile />}
            {orderHistory && <OrderHistory />}
            {wishlist && <Wishlist />}
            {requestBook && <RequestBook />}
            {review && <MyReview />}
          </main>
        </div>
      </div>

      
      <div
        className={classes.footer}
        style={{
          // marginTop: "1vw",
          // backgroundColor: "red",
          // height: "5vw",
          // opacity: 0.8,
        }}
      >
        <Footer />
      </div>
     
    </React.Fragment>
  );
}

CustomerProfile.propTypes = {
  window: PropTypes.func,
};

export default CustomerProfile;
