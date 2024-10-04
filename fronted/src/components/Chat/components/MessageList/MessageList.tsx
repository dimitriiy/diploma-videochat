import React from "react";

import classes from "./styles.module.scss";
import { Message } from "@/components/Chat/components/MessageList/components/Message";

interface Props {}

export const MessageList = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.messageList}>
      <Message
        text="Anyone is up for illustrations. I think there are less relatable images according to our brand."
        name="Jack"
        pic="/src/assets/user_temp.png"
        timestamp={+new Date()}
      />
      <Message text="Hello." name="You" pic="./src/assets/user_temp.png" timestamp={+new Date()} currentUser={true} />
      <Message text="Buy!" name="Jack" pic="/src/assets/user_temp.png" timestamp={+new Date()} />
    </div>
  );
};
