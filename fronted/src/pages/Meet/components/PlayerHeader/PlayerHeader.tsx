import React from "react";
import { Button } from "@/components/Button";

import classes from "./styles.module.scss";
interface Props {}

export const PlayerHeader = (props: React.PropsWithChildren<Props>) => {
  return (
    <header className={classes.playerHeader}>
      <div className={classes.playerHeaderTop}>
        <Button size="small">
          <img src="../../../src/assets/icons/arrow-left.svg" alt="" />
        </Button>
        <h2 className={classes.playerHeaderTitleRoom}>Design Critique - Nickelfox Website</h2>

        <Button size="small">
          <img src="../../../src/assets/icons/users.svg" alt="" />
          15+
        </Button>
      </div>
      <div className={classes.playerHeaderBottom}>
        <div className={classes.playerHeaderRec}>
          <img src="../../../src/assets/icons/rec.svg" alt="" />
          REC 00:12:36
        </div>
        <div className={classes.playerHeaderAddUser}>
          <Button size="small">
            <img src="../../../src/assets/icons/plus.svg" alt="" />
          </Button>
          <span className={classes.playerHeaderAddUserBtn}>Add user to the call</span>
        </div>
      </div>
    </header>
  );
};
