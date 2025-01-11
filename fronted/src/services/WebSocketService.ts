type Subscriber<T = any> = (data: T) => void;
type MessageType = string;
interface WebSocketMessage<T = any> {
  type: MessageType;
  data: T;
}
class WebSocketChannel {
  private ws: WebSocket | null = null;
  private subscribers = new Map<string, Subscriber[]>();

  public connect(id: number) {
    return new Promise<void>((resolve) => {
      if (this.ws?.readyState === WebSocket.OPEN) return;

      this.ws = new WebSocket(`http://localhost:4000/ws/chat/${id}`);
      const self = this;
      this.ws.onopen = function () {
        resolve();
        console.log("[open] Соединение установлено");
      };

      this.ws.onclose = function (event) {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          console.log("[close] Соединение прервано");
        }
      };

      this.ws.onerror = function (error) {
        console.warn(`[error]`, error);
      };

      this.ws.onmessage = async function (event: MessageEvent) {
        const body = JSON.parse(event.data);
        const type = body.type;
        const subscribers = self.subscribers.get(type);

        console.log("//WS onmessage ", body, "bd", body.data, { subscribers });

        if (subscribers?.length) {
          subscribers.forEach((cb) => cb(body.data));
        }
      };
    });
  }

  public subscribe<T extends any>(type: MessageType, callback: Subscriber<T>) {
    const callbacks = this.subscribers.get(type) ?? [];

    this.subscribers.set(type, [...callbacks, callback]);

    return () => this.unsubscribe(type, callback);
  }

  public unsubscribe<T = any>(type: MessageType, callback: Subscriber<T>) {
    const callbacks = this.subscribers.get(type);
    if (callbacks?.length) {
      this.subscribers.set(
        type,
        callbacks.filter((cb) => cb !== callback),
      );
    }
  }
  public emit<T>(type: MessageType, data: T) {
    if (!this.ws) {
      throw new Error("Ws is not initialized");
    }

    if (this.ws.readyState !== WebSocket.OPEN) {
      console.warn("[WebSocket] Невозможно отправить сообщение, соединение не открыто.");
      throw new Error("Ws closed");
    }
    const message: WebSocketMessage<T> = { type, data };
    this.ws.send(JSON.stringify(message));
    console.debug("[WebSocket] Отправлено сообщение:", message);
  }

  public close() {
    if (!this.ws) {
      throw new Error("Ws is not initialized");
    }
    this.ws.close();
  }

  public get isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const webSocketService = new WebSocketChannel();
