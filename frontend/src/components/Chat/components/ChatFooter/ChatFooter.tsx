import React from "react";

import classes from "./styles.module.scss";
import { chatService } from "@/services/ChatService.ts";
import { observer } from "mobx-react";
import pic from "@/assets/icons/pic.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";

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
          placeholder="Введите текст..."
          value={chatService.value}
          onChange={(e) => chatService.onChange(e.target.value)}
        />
        {/*<button className={classes.chatInputFile}>*/}
        {/*  <img src={pic} alt="" />*/}
        {/*</button>*/}
        {/*<div className={classes.chatInputDivider}></div>*/}
        <button className={classes.chatInputSend} type={"submit"}>
          <img src={arrowRight} alt="" />
        </button>
      </form>
    </>
  );
});
