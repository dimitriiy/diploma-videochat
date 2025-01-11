import React from "react";

import classes from "./styles.module.scss";
import classNames from "classnames";

interface Props {
  theme?: "dark" | "light";
}

export const Loader = ({ theme = "light" }: React.PropsWithChildren<Props>) => {
  return (
    <span
      className={classNames(classes.loader, {
        [classes.dark]: theme === "dark",
        [classes.light]: theme === "light",
      })}
    ></span>
  );
};
