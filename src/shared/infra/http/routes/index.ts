import { Router } from "express";

import messageRouter from "@modules/messages/infra/http/routes/message.routes";
import authRouter from "@modules/auth/infra/http/routes/auth.route";

const routes = Router();

routes.use("/messages", messageRouter);
routes.use("/auth", authRouter);

export default routes;
