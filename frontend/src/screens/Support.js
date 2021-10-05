import Grid from "@material-ui/core/Grid";
import React from "react";
import ContactUs from "../components/Shevon/ContactUs";
import FAQ from "../components/Shevon/FAQ";
import Header from "../components/Adithya/Header";
import Footer from "../components/Adithya/Footer";

const Support = () => {
  return (
    <>
      <Header />
      <Grid item xs={12}>
        <div className=" px-3 py-3 text-center border-0  shadow-md bg-gamboge ">
          <header className="font-boldTallFont text-5xl mb-3 font-bold text-prussianBlue ">
            Contact Us
          </header>
        </div>
      </Grid>
      <div className="mt-2 mb-5 ">
        <ContactUs />
        <FAQ />
      </div>
      <Footer />
    </>
  );
};

export default Support;
