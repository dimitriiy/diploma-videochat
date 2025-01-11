import React from "react";

import classes from "./styles.module.scss";
import { Message } from "@/components/Chat/components/MessageList/components/Message";
import { observer } from "mobx-react";
import { chatService } from "@/services/ChatService.ts";
import { authService } from "@/services/AuthService.ts";
import { roomService } from "@/services/RoomService.ts";

interface Props {}

// @ts-ignore

export const MessageList = observer((props: React.PropsWithChildren<Props>) => {
  console.log(chatService.messages);
  return (
    <div className={classes.messageList}>
      {chatService.messages.map((message) => (
        <Message
          key={message.id}
          text={message.content}
          name={roomService.getUserById(message.user_id)?.name ?? message.user_id.toString()}
          pic=""
          created_at={message.created_at}
          currentUser={message.user_id === authService.user?.id}
        />
      ))}
    </div>
  );
});
