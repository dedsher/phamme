import { Container } from "inversify";
import {
  TransactionRepository,
  UserRepository,
  ChatRepository,
  MessageRepository,
  AttachmentRepository,
} from "./repositories";
import {
  TransactionService,
  UserService,
  ChatService,
  MessageService,
  AttachmentService,
} from "./services";

import {
  TransactionController,
  UserController,
  ChatController,
  MessageController,
  AuthController,
  AttachmentController,
} from "./controllers";

import { TYPES } from "./types/inversify";
import db from "./config/db";
import { buildProviderModule } from "inversify-binding-decorators";
import { ALLOWED_ORIGIN } from "./constants/utils";
import { authenticateToken } from "./middlewares/middlewares";
import {
  IAttachmentRepository,
  IAttachmentService,
  IChatRepository,
  IChatService,
  IMessageRepository,
  IMessageService,
  ITransactionRepository,
  ITransactionService,
  IUserRepository,
  IUserService,
} from "./types/core";
import { interfaces } from "inversify-express-utils";
import { Server } from "socket.io";

const container = new Container();

container.bind(TYPES.Db).toConstantValue(db);
container.bind(TYPES.ALLOWED_ORIGIN).toConstantValue(ALLOWED_ORIGIN);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IChatRepository>(TYPES.ChatRepository).to(ChatRepository);
container
  .bind<IMessageRepository>(TYPES.MessageRepository)
  .to(MessageRepository);
container
  .bind<IAttachmentRepository>(TYPES.AttachmentRepository)
  .to(AttachmentRepository);
container
  .bind<ITransactionRepository>(TYPES.TransactionRepository)
  .to(TransactionRepository);

container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IChatService>(TYPES.ChatService).to(ChatService);
container.bind<IMessageService>(TYPES.MessageService).to(MessageService);
container
  .bind<IAttachmentService>(TYPES.AttachmentService)
  .to(AttachmentService);
container
  .bind<ITransactionService>(TYPES.TransactionService)
  .to(TransactionService);

container.bind<interfaces.Controller>(TYPES.UserController).to(UserController);
container.bind<interfaces.Controller>(TYPES.ChatController).to(ChatController);
container
  .bind<interfaces.Controller>(TYPES.MessageController)
  .to(MessageController);
container
  .bind<interfaces.Controller>(TYPES.AttachmentController)
  .to(AttachmentController);
container.bind<interfaces.Controller>(TYPES.AuthController).to(AuthController);
container
  .bind<interfaces.Controller>(TYPES.TransactionController)
  .to(TransactionController);

container.bind(TYPES.AuthenticateToken).toFunction(authenticateToken);

container.bind<Server | null>(TYPES.io).toConstantValue(null);

container.load(buildProviderModule());

export default container;
