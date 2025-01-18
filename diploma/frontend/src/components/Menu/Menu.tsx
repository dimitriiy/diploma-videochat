import classes from "./styles.module.scss";
import { useLocation } from "react-router-dom";
import { MenuItem } from "@/components/Menu/components/MenuItem";

export const Menu = () => {
  const location = useLocation();

  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        <MenuItem path="/" isActive={location.pathname === "/"} icon="home"></MenuItem>
        <MenuItem path="/meet" isActive={location.pathname === "/meet"} icon="camera"></MenuItem>
        <MenuItem
          path="/settings/user"
          isActive={["/settings/user", "/settings/video"].includes(location.pathname)}
          icon="tool"
        ></MenuItem>
      </ul>
    </nav>
  );
};
