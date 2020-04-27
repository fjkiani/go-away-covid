
import React, { useEffect, useState, Component } from "react";

import Home from "./pages/Home"
import About from "./pages/About"

import Nav from "./components/Nav"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



export default function App() {
  return (
    <Router>
    <div>
    <Nav/>
      <Switch>
      <Route exact path ="/" component = {Home}/>
      <Route path = "/about" component = {About}/>
      </Switch>
    </div>
    </Router>
  )
}
