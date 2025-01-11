import classes from "./styles.module.scss";
import cx from "classnames";
import { chatService } from "@/services/ChatService.ts";
import { observer } from "mobx-react";
import { roomService } from "@/services/RoomService.ts";

export const ChatTabs = observer(() => {
  return (
    <ul className={classes.chatTabs}>
      <li className={cx(classes.chatTabsItem, classes.chatTabsItemActive)}>
        <button>{`Сообщения (${chatService.messages.length})`}</button>
      </li>
      <li className={classes.chatTabsItem}>
        <button>{`Участники (${roomService.countUsers})`}</button>
      </li>
    </ul>
  );
});
