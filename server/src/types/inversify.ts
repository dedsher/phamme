const TYPES = {
  Db: Symbol.for("Db"),
  ALLOWED_ORIGIN: Symbol.for("ALLOWED_ORIGIN"),
  Repository: Symbol.for("Repository"),
  AttachmentRepository: Symbol.for("AttachmentRepository"),
  AttachmentService: Symbol.for("AttachmentService"),
  AttachmentController: Symbol.for("AttachmentController"),
  ChatRepository: Symbol.for("ChatRepository"),
  ChatService: Symbol.for("ChatService"),
  ChatController: Symbol.for("ChatController"),
  MessageRepository: Symbol.for("MessageRepository"),
  MessageService: Symbol.for("MessageService"),
  MessageController: Symbol.for("MessageController"),
  UserRepository: Symbol.for("UserRepository"),
  UserService: Symbol.for("UserService"),
  UserController: Symbol.for("UserController"),
  AuthController: Symbol.for("AuthController"),
  AuthenticateToken: Symbol.for("AuthenticateToken"),
  ErrorHandler: Symbol.for("ErrorHandler"),
  io: Symbol.for("io"), 
};

export { TYPES };
