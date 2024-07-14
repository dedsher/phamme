import { Container } from "inversify";
import { UserRepository } from "./repositories";
import { ChatRepository } from "./repositories";
import { MessageRepository } from "./repositories";
import { AttachmentRepository } from "./repositories";
import { UserService } from "./services";
import { ChatService } from "./services";
import { MessageService } from "./services";
import { UserController } from "./controllers";
import { ChatController } from "./controllers";
import { MessageController } from "./controllers";
import {AuthController} from "./controllers";
import { AttachmentService } from "./services";
import { AttachmentController } from "./controllers";
import { TYPES } from "./types/inversify";
import db from "./config/db";
import { buildProviderModule } from "inversify-binding-decorators";
import { ALLOWED_ORIGIN } from "./config/config";
import createSocket from "./socket";
import { authenticateToken, errorHandler } from "./middlewares/middlewares";
import { 
    IAttachmentRepository,
    IAttachmentService,
    IChatRepository,
    IChatService,
    IMessageRepository,
    IMessageService,
    IUserRepository,
    IUserService
} from "./types/core";
import { interfaces } from "inversify-express-utils";
import { Server } from "socket.io";

const container = new Container();

container.bind(TYPES.Db).toConstantValue(db);
container.bind(TYPES.ALLOWED_ORIGIN).toConstantValue(ALLOWED_ORIGIN);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IChatRepository>(TYPES.ChatRepository).to(ChatRepository);
container.bind<IMessageRepository>(TYPES.MessageRepository).to(MessageRepository);
container.bind<IAttachmentRepository>(TYPES.AttachmentRepository).to(AttachmentRepository);

container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IChatService>(TYPES.ChatService).to(ChatService);
container.bind<IMessageService>(TYPES.MessageService).to(MessageService);
container.bind<IAttachmentService>(TYPES.AttachmentService).to(AttachmentService);

container.bind<interfaces.Controller>(TYPES.UserController).to(UserController);
container.bind<interfaces.Controller>(TYPES.ChatController).to(ChatController);
container.bind<interfaces.Controller>(TYPES.MessageController).to(MessageController);
container.bind<interfaces.Controller>(TYPES.AttachmentController).to(AttachmentController);
container.bind<interfaces.Controller>(TYPES.AuthController).to(AuthController);

container.bind(TYPES.AuthenticateToken).toFunction(authenticateToken);
container.bind(TYPES.ErrorHandler).toFunction(errorHandler);


container.bind<Server | null>(TYPES.io).toConstantValue(null);

container.load(buildProviderModule());

export default container;
