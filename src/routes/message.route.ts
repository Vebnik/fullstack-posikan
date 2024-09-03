import { Router } from "express";

import controller from "../controller/message.controller";

const router = Router();

router.get("/message", controller.getMessage);
router.post("/message", controller.createMessage);

export default router;