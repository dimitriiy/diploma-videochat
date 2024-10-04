import React from "react";

import classes from "./styles.module.scss";

interface Props {}

export const ChatFooter = (props: React.PropsWithChildren<Props>) => {
  return (
    <>
      <div className={classes.chatNotyTyping}>
        <div className={classes.chatNotyTypingIndicator}>
          <img src="src/assets/load.svg" alt="" />
        </div>
        <div className={classes.chatNotyTyping__text}>John is typing..</div>
      </div>
      <div className={classes.chatInput}>
        <input className={classes.chatInputInput} placeholder="Write message here" />
        <button className={classes.chatInputFile}>
          <img src="./src/assets/icons/pic.svg" alt="" />
        </button>
        <div className={classes.chatInputDivider}></div>
        <button className={classes.chatInputSend}>
          <img src="./src/assets/icons/arrow-right.svg" alt="" />
        </button>
      </div>
    </>
  );
};
