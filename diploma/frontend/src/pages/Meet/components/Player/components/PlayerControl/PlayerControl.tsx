import React from "react";
import classes from "./styles.module.scss";
import shareScreen from "@/assets/icons/share-screen.svg";
import camera from "@/assets/icons/camera.svg";
import phone from "@/assets/icons/phone.svg";
import mic from "@/assets/icons/mic.svg";
import tool from "@/assets/icons/tool.svg";

interface Props {}

export const PlayerControl = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.playerControl}>
      {/*<button className={classes.playerControlButton} id="share-screen">*/}
      {/*  <img src={shareScreen} alt="" />*/}
      {/*</button>*/}
      <button className={classes.playerControlButton} id="camera-toggle">
        <img src={camera} alt="" />
      </button>
      <button className={classes.playerControlButtonCancel}>
        <img src={phone} alt="" />
      </button>
      <button className={classes.playerControlButton} id="mic-toggle">
        <img src={mic} alt="" />
      </button>
      {/*<button className={classes.playerControlButton}>*/}
      {/*  <img src={tool} alt="" />*/}
      {/*</button>*/}
    </div>
  );
};
