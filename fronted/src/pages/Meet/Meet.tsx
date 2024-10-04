import { AppLayout } from "@/components/AppLayout/AppLayout.tsx";
import { Transcription } from "./components/Transcription";
import classes from "./styles.module.scss";
import React from "react";
import { Chat } from "@/components/Chat";
import { PlayerHeader } from "@/pages/Meet/components/PlayerHeader";
import { Player } from "@/pages/Meet/components/Player";
import { videoStream } from "@/pages/Meet/VideoStream.ts";
export const Meet = () => {
  React.useEffect(() => {
    const cameraVideoStream = document.getElementById("camera-stream") as HTMLVideoElement;
    if (!navigator.mediaDevices) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      cameraVideoStream.srcObject = stream;
      cameraVideoStream.play();
      videoStream(stream);
    });

    ["temp", "temp1"].forEach((id) => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const dom = document.getElementById(id) as HTMLVideoElement;
        dom.srcObject = stream;
        dom.play();
      });
    });

    function chatTabs() {
      const tabRoot = document.querySelectorAll(".chat-tabs__item");

      console.log(tabRoot);

      //chat-tabs__item
      tabRoot.forEach((dom) => {
        dom.addEventListener("click", function (e) {
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

      document.querySelector("#share-screen").addEventListener("click", (e) => {
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
      document.querySelector(el).addEventListener("click", (e) => {
        e.target.classList.toggle("player-control__button--toggle");
      });
    });
    app();
  }, []);
  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.playerSection}>
          <PlayerHeader />
          <Player />
          <Transcription />
        </div>
        <Chat />
      </div>
    </AppLayout>
  );
};
