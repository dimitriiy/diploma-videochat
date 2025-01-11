import { AppLayout } from "@/components/AppLayout/AppLayout.tsx";
import { Transcription } from "./components/Transcription";
import classes from "./styles.module.scss";
import React from "react";
import { Chat } from "@/components/Chat";
import { PlayerHeader } from "@/pages/Meet/components/PlayerHeader";

import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { roomService } from "@/services/RoomService.ts";
export const Meet = observer(() => {
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (id === undefined) return;

    roomService.joinRoom({ id: +id });

    return () => roomService.close();
  }, []);

  console.log(roomService.isLoading);
  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.playerSection}>
          <PlayerHeader />
          {/*<Player />*/}
          <Transcription />
        </div>
        <Chat />
      </div>
    </AppLayout>
  );
});
