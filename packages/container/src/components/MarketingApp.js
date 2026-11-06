import { mount } from "marketing/MarketingApp"; // marketing is the (prop) name of the remote app that we defined in the ModuleFederationPlugin in the container's webpack config file
import React, { useRef, useEffect } from "react";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current); // mount is the function that we exported from the bootstrap.js file in the marketing app, and we are passing the ref of the div where we want to mount the marketing app
  }, []);

  return <div ref={ref} />; // we are passing the ref of the div where we want to mount the marketing app
};
