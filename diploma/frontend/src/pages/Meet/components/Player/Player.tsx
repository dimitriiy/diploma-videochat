import React from "react";
import classes from "./styles.module.scss";
import { ParticipantList } from "@/pages/Meet/components/ParticipantList/ParticipantList.tsx";
import { PlayerControl } from "@/pages/Meet/components/Player/components/PlayerControl";

interface Props {}

export const Player = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.videoContainer}>
      <div className={classes.videoContainerContent}>
        <video id="camera-stream" className={classes.mainVideo} loop muted>
          <source src="" />
        </video>

        <ParticipantList />
        <PlayerControl />
      </div>
    </div>
  );
};
