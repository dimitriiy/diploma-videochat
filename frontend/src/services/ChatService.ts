import { makeObservable, observable, action, flow } from "mobx";
import { Message } from "@/models";
import { webSocketService } from "@/services/WebSocketService.ts";
import { authService } from "@/services/AuthService.ts";

enum Status {
  "default" = "default",
  "connecting" = "connecting",
  "connected" = "connected",
  "failed" = "failed",
}

export enum ChatActions {
  "init" = "init_chat",
  "initChatAnswer" = "init_chat_answer",
  "newMessage" = "new_message",
  "messageSend" = "message_send",
}

export class ChatService {
  public messages: Message[] = [];
  public roomId: number | null = null;
  public value = "";
  public status = Status.default;
  private disposes: Array<() => void> = [];

  constructor() {
    makeObservable<ChatService, "addMessage" | "initMessages">(this, {
      messages: observable,
      value: observable,
      roomId: observable,
      addMessage: action,
      initMessages: action,
      status: observable,
      init: flow,
    });
  }

  private initMessages(data: { messages: Message[] }) {
    this.messages = data.messages;
  }

  private addMessage(message: Message) {
    this.messages.push(message);
  }

  private async initWsTransport() {
    await webSocketService.connect(this.roomId!);
  }

  private disposeAll() {
    this.disposes.forEach((cb) => cb());
  }

  public onChange(value: string) {
    this.value = value;
  }

  public async *init(roomId: number) {
    try {
      if (!roomId) {
        throw new Error("Room ID is not set");
      }
      if (this.status === Status.connecting) return;

      this.status = Status.connecting;

      this.roomId = roomId;
      await this.initWsTransport();

      webSocketService.emit(ChatActions.init, {});
      const disposeInitChatAnswer = webSocketService.subscribe(ChatActions.initChatAnswer, (data: any) =>
        this.initMessages(data),
      );
      const disposeNewMessage = webSocketService.subscribe(ChatActions.newMessage, (message: Message) =>
        this.addMessage(message),
      );

      this.disposes.push(disposeInitChatAnswer);
      this.disposes.push(disposeNewMessage);

      this.status = Status.connected;
    } catch (e) {
      console.log("init error", e);

      this.status = Status.failed;
    }
  }

  public async sendMessage() {
    webSocketService.emit(ChatActions.messageSend, {
      content: this.value,
      user_id: authService.user?.id,
      room_id: this.roomId,
    });

    this.value = "";
  }

  public close() {
    this.disposeAll();
  }
}

export const chatService = new ChatService();
