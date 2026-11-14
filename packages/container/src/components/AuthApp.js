import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "auth/AuthApp"; // auth is the (prop) name of the remote app that we defined in the ModuleFederationPlugin in the container's webpack config file

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const result = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location; // we are getting the current pathname from the window.location object, which is the current URL of the browser

        // if the current pathname is not equal to the next pathname, then we are pushing the next pathname to the history object, which will update the URL in the browser to not to get in an infinite loop.
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn,
    });
    // console.log("Marketing mount result:", result);
    // console.log("Is result undefined?", result === undefined);
    // console.log("onParentNavigate:", result?.onParentNavigate);

    if (!result) {
      console.error("Marketing mount returned undefined");
      return;
    }

    history.listen(result?.onParentNavigate);
  }, []);

  return <div ref={ref} />; // we are passing the ref of the div where we want to mount the marketing app
};
