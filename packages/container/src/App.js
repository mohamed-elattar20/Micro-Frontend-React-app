import React from "react";
import { mount } from "marketing/MarketingApp"; // marketing is the (prop) name of the remote app that we defined in the ModuleFederationPlugin in the container's webpack config file

export default () => {
  return <h1>Container</h1>;
};
