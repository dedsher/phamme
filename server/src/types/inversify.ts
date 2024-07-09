const TYPES = {
  Db: Symbol.for("Db"),
  ALLOWED_ORIGIN: Symbol.for("ALLOWED_ORIGIN"),
  Repository: Symbol.for("Repository"),
  AttachmentRepository: Symbol.for("AttachmentRepository"),
  ChatRepository: Symbol.for("ChatRepository"),
  ChatService: Symbol.for("ChatService"),
  ChatController: Symbol.for("ChatController"),
  MessageRepository: Symbol.for("MessageRepository"),
  MessageService: Symbol.for("MessageService"),
  MessageController: Symbol.for("MessageController"),
  UserRepository: Symbol.for("UserRepository"),
  UserService: Symbol.for("UserService"),
  UserController: Symbol.for("UserController"),
  AuthenticateToken: Symbol.for("AuthenticateToken"),
  ErrorHandler: Symbol.for("ErrorHandler"),
  CreateSocket: Symbol.for("CreateSocket"),
  SocketIO: Symbol.for("SocketIO"),
  io: Symbol.for("io"),
};

export { TYPES };
