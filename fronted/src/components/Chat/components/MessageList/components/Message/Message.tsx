import React from "react";

import classes from "./styles.module.scss";
import classNames from "classnames";

interface Props {
  name: string;
  text: string;
  pic: string;
  timestamp: number;
  currentUser?: boolean;
}

export const Message = ({ name, text, pic, timestamp, currentUser }: Props) => {
  return (
    <div
      className={classNames(classes.message, {
        [classes.messageIam]: currentUser,
      })}
    >
      {!currentUser && (
        <div className={classes.messageUserPic}>
          <img src={pic} alt="" />
        </div>
      )}
      <div className={classes.messageBody}>
        <div className={classes.messageUserName}>{name}</div>
        <div className={classes.messageContent}>
          <div className={classes.messageText}>{text}</div>
          <div className={classes.messageDate}>{new Intl.DateTimeFormat("ru-RU").format(timestamp)}</div>
        </div>
      </div>
    </div>
  );
};
