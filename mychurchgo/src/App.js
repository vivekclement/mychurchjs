import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Home from './pages/Home';
import { withCookies } from 'react-cookie';


import Baptism from './pages/baptism/Baptism';
import EditBaptism from './pages/baptism/EditBaptism';
import SearchBaptism from './pages/baptism/SearchBaptism';
import UploadBaptism from './pages/baptism/UploadBaptism';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HolyCommunion from './pages/holycommunion/HolyCommunion';
import CreateBaptism from './pages/baptism/CreateBaptism';

import Marriage from './pages/marriage/Marriage';
import CreateMarriage from './pages/marriage/CreateMarriage';
import EditMarriage from './pages/marriage/EditMarriage';
import SearchMarriage from './pages/marriage/SearchMarriage';
import UploadMarriage from './pages/marriage/UploadMarriage';

import Parishioners from './pages/Parishioners';
import MassIntentions from './pages/MassIntentions';
import Settings from './pages/Settings';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/createBaptism' component={CreateBaptism} />
          <Route path='/editBaptism/:id' component={EditBaptism} />
          <Route path='/searchBaptism' component={SearchBaptism} />
          <Route path='/uploadBaptism' component={UploadBaptism} />
          <Route path='/baptism' component={Baptism} />
          <Route path='/holycommunion' component={HolyCommunion} />
          <Route path='/marriage' component={Marriage} />
          <Route path='/createMarriage' component={CreateMarriage} />
          <Route path='/editMarriage/:id' component={EditMarriage} />
          <Route path='/searchMarriage' component={SearchMarriage} />
          <Route path='/uploadMarriage' component={UploadMarriage} />

          <Route path='/parishioners' component={Parishioners} />
          <Route path='/massintentions' component={MassIntentions} />
          <Route path='/settings' component={Settings} />

        </Switch>
      </Router>
    </>
  );
}

export default withCookies(App);


