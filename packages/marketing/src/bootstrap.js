import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

// const mount = (el, { onNavigate, defaultHistory }) => {
//   const history = defaultHistory || createMemoryHistory();
//   if (onNavigate) {
//     history.listen(onNavigate);
//   }
//   ReactDOM.render(<App history={history} />, el);
//   return {
//     onParentNavigate({ pathname: nextPathname }) {
//       const { pathname } = history.location;
//       if (pathname !== nextPathname) {
//         history.push(nextPathname);
//       }
//     },
//   };
// };

const mount = (el, { onNavigate, defaultHistory }) => {
  console.log("🔥 NEW MARKETING BOOTSTRAP LOADED");

  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  const result = {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };

  console.log("🔥 MOUNT RETURNING:", result);

  return result;
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    });
  }
}

export { mount };
