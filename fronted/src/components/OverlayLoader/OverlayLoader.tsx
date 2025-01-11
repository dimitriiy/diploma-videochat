import React from "react";

import classes from "./styles.module.scss";
import { Loader } from "@/components/Loader";

interface Props {}

export const OverlayLoader = () => {
  return (
    <div className={classes.root}>
      <Loader theme={"dark"} />
    </div>
  );
};
