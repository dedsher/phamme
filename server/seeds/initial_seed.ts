import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("chat_user").del();
  await knex("message").del();
  await knex("chat").del();
  await knex("user").del();

  await knex("user").insert([
    {
      id: 1,
      email: "user1@mail.ru",
      username: "babidjon",
      firstname: "Марк",
      lastname: "Поляков",
      password: "$2b$10$lmXqiRfhd1KmhsJOmSXyR.3Mtoj30IxTmQUgE8kaoSoPBT//kRCVu",
      created_at: "2024-05-14T16:28:01.196041",
      updated_at: "2024-05-14T16:28:01.196041",
      avatar_url: "https://via.placeholder.com/50",
      status: "offline",
      last_login: "2024-05-15T04:28:01.196041",
    },
    {
      id: 2,
      email: "user2@mail.ru",
      username: "thug52",
      firstname: "Илья",
      lastname: "Мерзляков",
      password: "$2b$10$65wD0tRrVc8p2MgTQ9/pTebh0fV6dcNECQErEnQgT2CEmCQIT2fFO",
      created_at: "2024-05-15T16:28:01.196041",
      updated_at: "2024-05-15T16:28:01.196041",
      avatar_url: "https://via.placeholder.com/50",
      status: "online",
      last_login: "2024-05-16T04:28:01.196041",
    },
    {
      id: 3,
      email: "user3@mail.ru",
      username: "messi_72",
      firstname: "Никита",
      lastname: "Галеня",
      password: "$2b$10$HW8qFgIDBimUzK6.PzjQVOcgs5rlMRdiaFSpToNllUSB9y/ddfgtG",
      created_at: "2024-05-16T16:28:01.196041",
      updated_at: "2024-05-16T16:28:01.196041",
      avatar_url: "https://via.placeholder.com/50",
      status: "offline",
      last_login: "2024-05-17T04:28:01.196041",
    },
  ]);

  await knex("chat").insert([
    {
      id: 1,
      created_at: "2024-06-03T16:28:01.196041",
      updated_at: "2024-06-03T16:28:01.196041",
      last_message: "This is message 5 in chat 1",
      last_message_at: "2024-07-01T10:28:50.236Z",
      last_message_author_id: 2,
      unread_count: 3,
    },
    {
      id: 2,
      created_at: "2024-06-04T16:28:01.196041",
      updated_at: "2024-06-04T16:28:01.196041",
      last_message: "This is message 5 in chat 2",
      last_message_at: "2024-07-01T10:29:38.074Z",
      last_message_author_id: 3,
      unread_count: 0,
    },
    {
      id: 3,
      created_at: "2024-06-05T16:28:01.196041",
      updated_at: "2024-06-05T16:28:01.196041",
      last_message: "This is message 5 in chat 3",
      last_message_at: "2024-07-01T10:30:04.487Z",
      last_message_author_id: 1,
      unread_count: 2,
    },
  ]);

  await knex("message").insert([
    {
      id: 1,
      chat_id: 1,
      sender_id: 2,
      content: "This is message 1 in chat 1",
      created_at: "2024-06-04T13:31:11.558785",
      status: "read",
    },
    {
      id: 2,
      chat_id: 1,
      sender_id: 1,
      content: "This is message 2 in chat 1",
      created_at: "2024-06-04T14:31:11.558785",
      status: "read",
      reply_to: 1,
    },
    {
      id: 3,
      chat_id: 1,
      sender_id: 1,
      content: "This is message 3 in chat 1",
      created_at: "2024-06-04T15:31:11.558785",
      status: "read",
    },
    {
      id: 4,
      chat_id: 1,
      sender_id: 2,
      content: "This is message 4 in chat 1",
      created_at: "2024-06-04T16:31:11.558785",
      status: "read",
    },
    {
      id: 5,
      chat_id: 1,
      sender_id: 2,
      content: "This is message 5 in chat 1",
      created_at: "2024-06-04T17:31:11.558785",
      status: "read",
    },
    {
      id: 6,
      chat_id: 2,
      sender_id: 2,
      content: "This is message 1 in chat 2",
      created_at: "2024-06-05T13:31:11.558785",
      status: "read",
    },
    {
      id: 7,
      chat_id: 2,
      sender_id: 3,
      content: "This is message 2 in chat 2",
      created_at: "2024-06-05T14:31:11.558785",
      status: "read",
    },
    {
      id: 8,
      chat_id: 2,
      sender_id: 3,
      content: "This is message 3 in chat 2",
      created_at: "2024-06-05T15:31:11.558785",
      status: "read",
    },
    {
      id: 9,
      chat_id: 2,
      sender_id: 2,
      content: "This is message 4 in chat 2",
      created_at: "2024-06-05T16:31:11.558785",
      status: "read",
      reply_to: 7,
    },
    {
      id: 10,
      chat_id: 2,
      sender_id: 3,
      content: "This is message 5 in chat 2",
      created_at: "2024-06-05T17:31:11.558785",
      status: "read",
      reply_to: 8,
    },
    {
      id: 11,
      chat_id: 3,
      sender_id: 1,
      content: "This is message 1 in chat 3",
      created_at: "2024-06-06T13:31:11.558785",
      status: "read",
    },
    {
      id: 12,
      chat_id: 3,
      sender_id: 1,
      content: "This is message 2 in chat 3",
      created_at: "2024-06-06T14:31:11.558785",
      status: "read",
      reply_to: 11,
    },
    {
      id: 13,
      chat_id: 3,
      sender_id: 3,
      content: "This is message 3 in chat 3",
      created_at: "2024-06-06T15:31:11.558785",
      status: "read",
    },
    {
      id: 14,
      chat_id: 3,
      sender_id: 3,
      content: "This is message 4 in chat 3",
      created_at: "2024-06-06T16:31:11.558785",
      status: "read",
      reply_to: 12,
    },
    {
      id: 15,
      chat_id: 3,
      sender_id: 1,
      content: "This is message 5 in chat 3",
      created_at: "2024-06-06T17:31:11.558785",
      status: "read",
      reply_to: 12,
    },
  ]);

  await knex("chat_user").insert([
    {
      chat_id: 1,
      user_id: 1,
    },
    {
      chat_id: 1,
      user_id: 2,
    },
    {
      chat_id: 2,
      user_id: 2,
    },
    {
      chat_id: 2,
      user_id: 3,
    },
    {
      chat_id: 3,
      user_id: 1,
    },
    {
      chat_id: 3,
      user_id: 3,
    },
  ]);
}
