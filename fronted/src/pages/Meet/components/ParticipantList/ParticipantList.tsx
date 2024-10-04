import React from "react";
import { Participant } from "@/pages/Meet/components/ParticipantList/components/Participant";

import classes from "./styles.module.scss";

interface Props {}

export const ParticipantList = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={classes.participantsList}>
      <Participant />
      <Participant />
    </div>
  );
};
