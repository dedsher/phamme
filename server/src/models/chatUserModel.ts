import { Knex } from "knex";

export default class ChatUserModel {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async findChatIdsByUserId(userId: string): Promise<number[]> {
    const chatIds = await this.knex("chat_user")
      .where({ user_id: userId })
      .select("chat_id");

    return chatIds.map((row) => row.chat_id);
  }
}
