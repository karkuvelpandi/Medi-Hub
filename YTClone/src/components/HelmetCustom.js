import React from "react";
import { Helmet } from "react-helmet";

const HelmetCustom = ({
  title = "YouTube Clone",
  description = "A project made with youtube API and React JS",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <description>{description}</description>
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default HelmetCustom;
