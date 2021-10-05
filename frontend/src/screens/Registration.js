import React from "react";
import Grid from "@material-ui/core/Grid";
import RegistrationForm from "../components/Adithya/RegistrationForm";
import Footer from "../components/Adithya/Footer";
import Header from "../components/Adithya/Header";

const Registration = () => {
  return (
    <>
      <Header />
      <div className="lg:px-20 md:px-9 sm:px-4">
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={7}>
            <div className="border border-lightSilver rounded-2xl border-8 shadow-2xl my-8 lg:pl-8 pt-6">
              <RegistrationForm />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <div className="my-8 text-cente">
              <img
                src="https://i.ibb.co/6tM2Yyt/rd9026-large-0-005ba5ba5ba5ba-733-733.jpg"
                alt="reg-page-img"
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
