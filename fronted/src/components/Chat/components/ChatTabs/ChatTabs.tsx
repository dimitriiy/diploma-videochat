import React from "react";

import classes from "./styles.module.scss";
import cx from "classnames";

interface Props {}

export const ChatTabs = (props: React.PropsWithChildren<Props>) => {
  return (
    <ul className={classes.chatTabs}>
      <li className={cx(classes.chatTabsItem, classes.chatTabsItemActive)}>
        <button>Messages (4)</button>
      </li>
      <li className={classes.chatTabsItem}>
        <button>Participants</button>
      </li>
    </ul>
  );
};
