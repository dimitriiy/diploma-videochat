import { HttpClient } from "@/services/HttpClient.ts";
import { AxiosResponse } from "axios";
import { Room, User } from "@/models";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { authService } from "@/services/AuthService.ts";
import { chatService } from "@/services/ChatService.ts";
type JoinRoomResponse = {
  room: Room;
  users: User[];
};
class RoomService {
  public isRoomReady = false;
  public isLoading = false;
  public users: User[] = [];
  public data: Room | null = null;

  constructor() {
    makeObservable(this, {
      isRoomReady: observable,
      isLoading: observable,
      users: observable.ref,
      data: observable.ref,
      countUsers: computed,
    });
  }
  public async createRoom({ hostId }: { hostId: number }) {
    try {
      const response: AxiosResponse<Room> = await HttpClient.post({ url: "/create-room", data: { host_id: hostId } });

      return response.data;
    } catch (e) {}
  }

  public async joinRoom({ id }: { id: number }) {
    if (this.isLoading) return;

    try {
      this.isLoading = true;
      const response: AxiosResponse<{
        room: Room;
        users: User[];
      }> = await HttpClient.post({
        url: "/join-room",
        data: { user_id: +authService.user!.id, room_id: +id },
      });

      runInAction(() => {
        this.users = response.data.users;
        this.data = response.data.room;
        this.isRoomReady = true;
      });

      await chatService.init(id);
    } catch (e) {
      console.log("joinRoom", e);
      this.isLoading = false;
    }
  }

  public get countUsers() {
    return this.users.length;
  }

  public async init() {
    try {
      this.isLoading = true;
    } catch (e) {
      console.error("init error", e);
    } finally {
      this.isLoading = false;
    }
  }

  public getUserById(id: number) {
    return this.users.find((user) => user.id === id) ?? null;
  }

  close() {
    chatService.close();
  }
}

export const roomService = new RoomService();
