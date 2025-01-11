import React from "react";

import classes from "./styles.module.scss";
import { chatService } from "@/services/ChatService.ts";
import { observer } from "mobx-react";

export const ChatFooter = observer(() => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    chatService.sendMessage();
  };
  return (
    <>
      {/*<div className={classes.chatNotyTyping}>*/}
      {/*  <div className={classes.chatNotyTypingIndicator}>*/}
      {/*    <img src="src/assets/load.svg" alt="" />*/}
      {/*  </div>*/}
      {/*  <div className={classes.chatNotyTyping__text}>John is typing..</div>*/}
      {/*</div>*/}
      <form className={classes.chatInput} onSubmit={onSubmit}>
        <input
          className={classes.chatInputInput}
          placeholder="Write message here"
          value={chatService.value}
          onChange={(e) => chatService.onChange(e.target.value)}
        />
        <button className={classes.chatInputFile}>
          <img src="./src/assets/icons/pic.svg" alt="" />
        </button>
        <div className={classes.chatInputDivider}></div>
        <button className={classes.chatInputSend} type={"submit"}>
          <img src="./src/assets/icons/arrow-right.svg" alt="" />
        </button>
      </form>
    </>
  );
});
