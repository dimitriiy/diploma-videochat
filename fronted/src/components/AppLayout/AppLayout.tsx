import React from "react";
import { Menu } from "@/components/Menu/Menu.tsx";
import classes from "./styles.module.scss";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { ThemeToggler } from "@/components/ThemeToggler";
console.log(classes);
interface Props {}

export const AppLayout = ({ children }: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.content}>
      <div className={classes.sidebar}>
        <Link to="/" className={classes.logo}>
          <img src={logo} alt="" />
        </Link>
        <Menu />
        <div className={classes.userAvatar}>
          <img src="./src/assets/avatar.png" alt="" />
        </div>
        ` <ThemeToggler />`
      </div>
      <main className={classes.main}>{children}</main>
    </div>
  );
};
