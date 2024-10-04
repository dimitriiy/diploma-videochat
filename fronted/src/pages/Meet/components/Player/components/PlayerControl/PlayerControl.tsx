import React from "react";
import classes from "./styles.module.scss";

interface Props {}

export const PlayerControl = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.playerControl}>
      <button className={classes.playerControlButton} id="share-screen">
        <img src="./src/assets/icons/share-screen.svg" alt="" />
      </button>
      <button className={classes.playerControlButton} id="camera-toggle">
        <img src="./src/assets/icons/camera.svg" alt="" />
      </button>
      <button className={classes.playerControlButtonCancel}>
        <img src="./src/assets/icons/phone.svg" alt="" />
      </button>
      <button className={classes.playerControlButton} id="mic-toggle">
        <img src="./src/assets/icons/mic.svg" alt="" />
      </button>
      <button className={classes.playerControlButton}>
        <img src="./src/assets/icons/tool.svg" alt="" />
      </button>
    </div>
  );
};
