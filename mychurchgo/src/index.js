import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './pages/login/login';
import { Route, BrowserRouter } from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

const routing =(
    <BrowserRouter>
    <CookiesProvider>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={App} />
  
    </CookiesProvider>  
    </BrowserRouter>
  )


ReactDOM.render(routing,document.getElementById('root'))