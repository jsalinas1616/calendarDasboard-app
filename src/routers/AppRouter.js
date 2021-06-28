import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" exact>
            <LoginScreen />
          </Route>
          <Route path="/" exact>
            <CalendarScreen />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
