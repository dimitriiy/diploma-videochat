import classes from "./styles.module.scss";
import { ChatTabs } from "@/components/Chat/components/ChatTabs";
import { MessageList } from "@/components/Chat/components/MessageList";
import { ChatFooter } from "@/components/Chat/components/ChatFooter";
import { observer } from "mobx-react";

export const Chat = observer(() => {
  return (
    <div className={classes.chat}>
      <div className={classes.chatOverlay}></div>
      <div className={classes.chatWrap}>
        <ChatTabs />
        <div className={classes.chatContent}>
          <MessageList />
        </div>
        <div className={classes.chatFooter}>
          <ChatFooter />
        </div>
      </div>
    </div>
  );
});
