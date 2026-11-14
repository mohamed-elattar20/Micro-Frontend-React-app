import React, { lazy, Suspense, useState } from "react";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import AuthApp from "./components/AuthApp";
import Progress from "./components/Progress";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const LazyMarketingApp = lazy(() => import("./components/MarketingApp"));
const LazyAuthApp = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <StylesProvider generateClassName={generateClassName}>
          <div>
            <Header
              isSignedIn={isSignedIn}
              onSignOut={() => setIsSignedIn(false)}
            />
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth">
                  <LazyAuthApp onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/" component={LazyMarketingApp} />
              </Switch>
            </Suspense>
          </div>
        </StylesProvider>
      </BrowserRouter>
    </>
  );
};
