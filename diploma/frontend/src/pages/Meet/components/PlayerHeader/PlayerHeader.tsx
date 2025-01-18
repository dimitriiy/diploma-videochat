import { Button } from "@/components/Button";

import classes from "./styles.module.scss";
import { observer } from "mobx-react";
import { roomService } from "@/services/RoomService.ts";

export const PlayerHeader = observer(() => {
  return (
    <header className={classes.playerHeader}>
      <div className={classes.playerHeaderTop}>
        <Button size="small">
          <img src="../../../src/assets/icons/arrow-left.svg" alt="" />
        </Button>
        <h2 className={classes.playerHeaderTitleRoom}>{roomService.data?.name}</h2>

        <Button size="small">
          <img src="../../../src/assets/icons/users.svg" alt="" />
          {roomService.countUsers}
        </Button>
      </div>
      <div className={classes.playerHeaderBottom}>
        {/*<div className={classes.playerHeaderRec}>*/}
        {/*  <img src="../../../src/assets/icons/rec.svg" alt="" />*/}
        {/*  REC 00:12:36*/}
        {/*</div>*/}
        <div className={classes.playerHeaderAddUser}>
          {/*<Button size="small">*/}
          {/*  <img src="../../../src/assets/icons/plus.svg" alt="" />*/}
          {/*</Button>*/}
          {/*<span className={classes.playerHeaderAddUserBtn}>Add user to the call</span>*/}
        </div>
      </div>
    </header>
  );
});
