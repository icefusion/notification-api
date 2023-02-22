import { Router } from "express";

import messageRouter from "@modules/messages/infra/http/routes/message.routes";

const routes = Router();

routes.use("/messages", messageRouter);

export default routes;
