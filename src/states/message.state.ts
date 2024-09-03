import { messageEventEmitter } from "../events/mesasge.events";
import { IMessage } from "../interfaces/message.interface";

class MessageState {
  limit: number = 9;
  queue: IMessage[] = [];

  async insert(message: IMessage): Promise<void> {
    if (this.queue.length >= this.limit) {
      this.queue.shift();
    }

    this.queue.push(message);

    messageEventEmitter.emit("updateMessageState", this.queue);
  }

  async all(): Promise<IMessage[]> {
    return this.queue;
  }

  async last(): Promise<IMessage> {
    const last = this.queue.at(-1);

    if (last) return last;
    throw "Not found last item";
  }

  async first(): Promise<IMessage> {
    const first = this.queue.at(0);

    if (first) return first;
    throw "Not found last item";
  }
}

export default new MessageState();
