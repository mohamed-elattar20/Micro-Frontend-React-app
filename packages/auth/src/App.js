import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

export default ({ history }) => {
  return (
    <div>
      <Router history={history}>
        <StylesProvider generateClassName={generateClassName}>
          <Switch>
            <Route exact path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
          </Switch>
        </StylesProvider>
      </Router>
    </div>
  );
};
