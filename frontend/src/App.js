import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";

//imported screens
import Home from "./screens/Home";
import AboutUs from "./screens/AboutUs";
import AllProducts from "./screens/AllProducts";
import CategorizedProducts from "./screens/CategorizedProducts";
import CourierDashboard from "./screens/CourierDashboard";
import CustomerProfile from "./screens/CustomerProfile";
import DeliveryDashboard from "./screens/DeliveryDashboard";
import InventoryDashboard from "./screens/InventoryDashboard";
import Newsletter from "./screens/Newsletter";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import Registration from "./screens/Registration";
import ShoppingCart from "./screens/ShoppingCart";
import SingleProduct from "./screens/SingleProduct";
import Support from "./screens/Support";
import AdminDashboard from "./screens/AdminDashboard";
import Offers from "./screens/Offers";
import Checkout from "./screens/Checkout";
import OrderSuccess from "./screens/PlaceOrderSuccessfully";
import AdminLogin from "./screens/AdminLogin";

const App = () => {
  return (
    <BRouter>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/books" component={AllProducts} />
          <Route exact path="/category/books" component={CategorizedProducts} />
          <Route exact path="/courier" component={CourierDashboard} />
          <Route exact path="/customer" component={CustomerProfile} />
          <Route exact path="/delivery" component={DeliveryDashboard} />
          <Route exact path="/inventory" component={InventoryDashboard} />
          <Route exact path="/newsletter" component={Newsletter} />
          <Route exact path="/privacy" component={PrivacyPolicy} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/book/:id" component={SingleProduct} />
          <Route exact path="/support" component={Support} />
          <Route exact path="/offers" component={Offers} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/order-success" component={OrderSuccess} />
          <Route exact path="/admin-login" component={AdminLogin} />
        </Switch>
      </main>
    </BRouter>
  );
};

export default App;
