import classes from "./styles.module.scss";
import classNames from "classnames";

import avatar from "./avatar_placeholder.svg";
interface Props {
  name: string;
  text: string;
  pic: string;
  created_at: string;
  currentUser?: boolean;
}

export const Message = ({ name, text, created_at, currentUser }: Props) => {
  return (
    <div
      className={classNames(classes.message, {
        [classes.messageIam]: currentUser,
      })}
    >
      {!currentUser && (
        <div className={classes.messageUserPic}>
          <img src={avatar} alt="" />
        </div>
      )}
      <div className={classes.messageBody}>
        <div className={classes.messageUserName}>{name}</div>
        <div className={classes.messageContent}>
          <div className={classes.messageText}>{text}</div>
          <div className={classes.messageDate}>
            {new Intl.DateTimeFormat("ru-RU", {
              minute: "numeric",
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "numeric",
              second: "numeric",
            }).format(new Date(created_at))}
          </div>
        </div>
      </div>
    </div>
  );
};
