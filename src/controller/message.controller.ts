import { NextFunction, Request, Response } from "express";
import messageRepository from "../repository/message.repository";
import { MessageCreateDTO } from "../dto/message.dto";


class MessageController {
  async getMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await messageRepository.all();

      res.json(messages).status(200);
    } catch (error) {
      res.json({ error }).status(401);
    }
  }

  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const data: MessageCreateDTO = req.body;

      const message = await messageRepository.create(data);

      res.json(message).status(201).send();
    } catch (error) {
      console.error(error);
      res.json({ error }).status(401);
    }
  }
}

export default new MessageController();
