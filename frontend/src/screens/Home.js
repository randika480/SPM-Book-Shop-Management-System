import React from "react";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";

import HomeTopBanner from "../components/Adithya/HomeTopBanner";
import HomeCarousal from "../components/Adithya/HomeCarousal";
import HomeCategories from "../components/Adithya/HomeCategories";
import HomeBestSellers from "../components/Adithya/HomeBestSellers";
import Footer from "../components/Adithya/Footer";
import Header from "../components/Adithya/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="m-1">
            <HomeTopBanner />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="my-8 ">
            <h3 className="text-3xl font-boldTallFont pl-16 sm:pl-4 lg:mb-20 ">
              New Arrivals
            </h3>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Hidden only={["sm", "xs"]}>
                <Grid item xs={4}>
                  <img
                    alt="home-side-img"
                    src="https://i.ibb.co/hfsdHHq/rd9123-large-0-005ba5ba5ba5ba-733-733.jpg"
                    className="px-8"
                  />
                </Grid>
              </Hidden>
              <Grid item xs={12} md={8}>
                <div className=" m-auto">
                  <HomeCarousal />
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="my-8">
            <h3 className="text-3xl font-boldTallFont pl-16 sm:pl-4 lg:mb-20">
              Best Sellers
            </h3>
            <div className=" w-10/12 m-auto">
              <HomeBestSellers />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="my-8">
            <h3 className="text-3xl font-boldTallFont pl-16 sm:pl-4 lg:mb-20">
              Categories
            </h3>
            <div className="w-3/4 m-auto">
              <HomeCategories />
            </div>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Home;
