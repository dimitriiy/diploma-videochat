import React from "react";
import classes from "./styles.module.scss";
import classNames from "classnames";

export type Size = "small" | "medium";

interface Props {
  size?: Size;
  stretch?: boolean;
}

export const Button = ({ children, stretch, size = "medium" }: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={classNames(classes.buttonBase, {
        [classes.buttonBaseStretch]: stretch,
        [classes.buttonBaseSmall]: size === "small",
        [classes.buttonBaseMedium]: size === "medium",
      })}
    >
      {children}
    </button>
  );
};
