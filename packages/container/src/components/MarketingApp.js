import { mount } from "marketing/MarketingApp"; // marketing is the (prop) name of the remote app that we defined in the ModuleFederationPlugin in the container's webpack config file
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location; // we are getting the current pathname from the window.location object, which is the current URL of the browser

        // if the current pathname is not equal to the next pathname, then we are pushing the next pathname to the history object, which will update the URL in the browser to not to get in an infinite loop.
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />; // we are passing the ref of the div where we want to mount the marketing app
};
