import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "dashboard/DashboardApp"; // dashboard is the (prop) name of the remote app that we defined in the ModuleFederationPlugin in the container's webpack config file

export default ({ onSignIn }) => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />; // we are passing the ref of the div where we want to mount the marketing app
};
