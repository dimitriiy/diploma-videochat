import { AppLayout } from "@/components/AppLayout/AppLayout.tsx";
import { Transcription } from "./components/Transcription";
import classes from "./styles.module.scss";
import React from "react";
import { Chat } from "@/components/Chat";
import { PlayerHeader } from "@/pages/Meet/components/PlayerHeader";

import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { roomService } from "@/services/RoomService.ts";
import { Player } from "@/pages/Meet/components/Player";
import { doc } from "prettier";
export const Meet = observer(() => {
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (id === undefined) return;

    roomService.joinRoom({ id: +id });

    return () => roomService.close();
  }, []);

  React.useEffect(() => {
    const cameraVideoStream = document.getElementById("camera-stream") as HTMLVideoElement;
    if (!navigator.mediaDevices) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      cameraVideoStream.srcObject = stream;
      cameraVideoStream.play();
      // videoStream(stream);
    });

    document.querySelectorAll(".temp").forEach((videoRef) => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.srcObject = stream;
        videoRef.play();
      });
    });

    function chatTabs() {
      const tabRoot = document.querySelectorAll(".chat-tabs__item");

      console.log(tabRoot);

      //chat-tabs__item
      tabRoot.forEach((dom) => {
        dom?.addEventListener("click", function (e) {
          console.log(e, e.target, this);
          const oldSelectedTab = document.querySelector(".chat-tabs__item--active");
          if (oldSelectedTab) {
            oldSelectedTab.classList.remove("chat-tabs__item--active");
          }
          this.classList.add("chat-tabs__item--active");
        });
      });
    }

    function app() {
      chatTabs();

      document.querySelector("#share-screen")?.addEventListener("click", (e) => {
        const displayMediaOptions = {
          video: {
            displaySurface: "browser",
          },
          audio: {
            suppressLocalAudioPlayback: false,
          },
          preferCurrentTab: false,
          selfBrowserSurface: "exclude",
          systemAudio: "include",
          surfaceSwitching: "include",
          monitorTypeSurfaces: "include",
        };
        async function startCapture() {
          let captureStream = null;

          try {
            captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
          } catch (err) {
            console.error(`Error: ${err}`);
          }
          return captureStream;
        }
        // startCapture();
      });
    }

    ["#camera-toggle", "#mic-toggle"].forEach((el) => {
      document.querySelector(el)?.addEventListener("click", (e) => {
        e.target.classList.toggle("player-control__button--toggle");
      });
    });
    app();
  }, []);

  console.log(roomService.isLoading);
  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.playerSection}>
          <PlayerHeader />
          <Player />
        </div>
        <Chat />
      </div>
    </AppLayout>
  );
});
