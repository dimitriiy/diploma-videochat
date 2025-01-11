import React from "react";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";
import cx from "classnames";
import camera from "@/assets/icons/camera.svg";
import tool from "@/assets/icons/tool.svg";
import home from "@/assets/icons/home.svg";

const ICONS = {
  camera,
  tool,
  home,
};
interface Props {
  path: string;
  isActive: boolean;
  icon: keyof typeof ICONS;
}

export const MenuItem = React.memo(({ isActive, path, icon }: React.PropsWithChildren<Props>) => {
  return (
    <li className={classes.navListItem}>
      <Link
        to={path}
        className={cx(classes.navListLink, {
          [classes.navListLinkActive]: isActive,
        })}
      >
        <img src={ICONS[icon]} alt="" />
      </Link>
    </li>
  );
});
