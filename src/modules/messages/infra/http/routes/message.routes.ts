import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import authMiddleware from '@shared/infra/http/middlewares/authMiddleware';
import MessageController from '../controllers/MessagesController';
const messageRouter = Router();
const messageController = new MessageController();

messageRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      categories: Joi.array().items(Joi.string()).required(),
      subject: Joi.string(),
      message: Joi.string().required()
    },
  }),
  // authMiddleware,
  messageController.create,
);

export default messageRouter;
