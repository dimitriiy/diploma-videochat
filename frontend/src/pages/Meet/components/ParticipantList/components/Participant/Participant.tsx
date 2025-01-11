import React from "react";
import classes from "./styles.module.scss";
import cx from "classnames";

interface Props {}

export const Participant = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.participantsListItem}>
      <video id="temp" loop muted>
        <source src="" />
      </video>
      <div className={cx(classes.micStatus, classes.micStatusOff, classes.participantsListMicStatus)}>
        <img src="../../../src/assets/icons/mic-off.svg" alt="" />
      </div>
    </div>
  );
};
