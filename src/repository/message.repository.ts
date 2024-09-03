import { MessageCreateDTO } from "../dto/message.dto";
import { IMessage } from "../interfaces/message.interface";
import messageState from "../states/message.state";

class MessageRepository {
  async all(): Promise<IMessage[]> {
    const messages = await messageState.all();
    return messages;
  }

  async create(data: MessageCreateDTO): Promise<IMessage> {
    const newMessage: IMessage = {
      createdAt: new Date(),
      text: data.text,
    };

    await messageState.insert(newMessage);

    return newMessage;
  }
}

export default new MessageRepository();
