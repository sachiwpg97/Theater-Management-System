import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import MovieList from "./Movie/MovieList";
import EditBooking from "./MovieBooking/EditBooking";
import BookingList from "./MovieBooking/BookingList";
import Footer from "./OtherPages/Footer";
import NavBar from "./OtherPages/NavBar";
import EditTheatre from "./Theatre/EditTheatre"
import ScreenView from "./Screen/ScreenView";
import SignUp from "./Sign Up/SignUp";

import AdminSignUp from "./Sign Up/AdminSignUp";

import TheatreSignUp from "./admin/TheatreSignUp";

import ScreenSignUp from "./admin/ScreenSignUp";
import TheatreHome from "./theatreHome/ThreatreHome";
import AddMovie from "./Movie/AddMovie";
import UserList from "./admin/UserList";
import EditUsers from "./admin/EditUsers";
import ViewUsers from "./admin/ViewUsers";
import AdminProfileEdit from "./admin/AdminProfileEdit";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/adminsignup">
          <AdminSignUp />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/theatrehome">
          <TheatreHome />
        </Route>


        <Route exact path="/theatresignup">
          <TheatreSignUp />
        </Route>

        <Route exact path="/screensignup">
          <ScreenSignUp />
        </Route>

        <Route exact path="/movie-list">
          <MovieList />
        </Route>

        <Route exact path="/add-movie">
          <AddMovie />
        </Route>
        <Route exact path="/user-list">
          <UserList />
        </Route>
        <Route exact path="/view/:id">
          <ViewUsers />
        </Route>
        <Route exact path="/screen-list">
          <ScreenView />
        </Route>
        <Route exact path="/edit-booking">
          <EditBooking />
        </Route>
        <Route exact path="/edit-theatre">
          <EditTheatre />
          </Route>
        <Route exact path="/edit-users">
          <EditUsers />
        </Route>
        <Route exact path="/view-bookings">
          <BookingList />
        </Route>
        <Route exact path="/edit-admin">
          <AdminProfileEdit/>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
