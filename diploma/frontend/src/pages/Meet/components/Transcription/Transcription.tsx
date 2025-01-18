import React from "react";
import classes from "./styles.module.scss";

interface Props {}

export const Transcription = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.transcription}>
      <div className={classes.transcriptionIcon}>
        <img src="./src/assets/icons/wave.svg" alt="" />
      </div>
      <div className={classes.transcriptionBody}>
        <div className={classes.transcriptionTime}>Now</div>
        <div className={classes.transcriptionContent}>
          Thank you everyone for joining the design critique meeting. I want everyone’s opinion so please start !
        </div>
      </div>
    </div>
  );
};
