import React from "react";
import classes from "./styles.module.scss";
import classNames from "classnames";

export type Size = "small" | "medium";

interface Props {
  size?: Size;
  stretch?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, stretch, size = "medium", onClick, disabled }: React.PropsWithChildren<Props>) => {
  return (
    <button
      className={classNames(classes.buttonBase, {
        [classes.buttonBaseStretch]: stretch,
        [classes.buttonBaseSmall]: size === "small",
        [classes.buttonBaseMedium]: size === "medium",
        [classes.buttonBaseDisabled]: disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
