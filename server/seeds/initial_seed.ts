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
      last_seen: "2024-05-15T04:28:01.196041",
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
      status: "offline",
      last_seen: "2024-05-16T04:28:01.196041",
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
      last_seen: "2024-05-17T04:28:01.196041",
    },
  ]);

  await knex("chat").insert([
    {
      id: 1,
      created_at: "2024-06-03T16:28:01.196041",
      updated_at: "2024-06-03T16:28:01.196041",
      last_message: "Привет) Не хочешь сходить погулять?",
      last_message_at: "2024-06-04T14:31:11.558785",
      last_message_author_id: 1,
    },
    {
      id: 2,
      created_at: "2024-06-04T16:28:01.196041",
      updated_at: "2024-06-04T16:28:01.196041",
      last_message: "как сам?",
      last_message_at: "2024-06-05T14:31:11.558785",
      last_message_author_id: 3,
    },
    {
      id: 3,
      created_at: "2024-06-05T16:28:01.196041",
      updated_at: "2024-06-05T16:28:01.196041",
      last_message: "скибиди доп ес ес",
      last_message_at: "2024-06-06T14:31:11.558785",
      last_message_author_id: 2,
    },
  ]);

  await knex("message").insert([
    {
      id: 1,
      chat_id: 1,
      sender_id: 2,
      content: "Привет, давно не виделись!",
      created_at: "2024-06-04T13:31:11.558785",
      status: "read",
    },
    {
      id: 2,
      chat_id: 1,
      sender_id: 1,
      content: "Привет) Не хочешь сходить погулять?",
      created_at: "2024-06-04T14:31:11.558785",
      status: "read",
      reply_to: 1,
    },
    {
      id: 6,
      chat_id: 2,
      sender_id: 2,
      content: "даров даров",
      created_at: "2024-06-05T13:31:11.558785",
      status: "read",
    },
    {
      id: 7,
      chat_id: 2,
      sender_id: 3,
      content: "как сам?",
      created_at: "2024-06-05T14:31:11.558785",
      status: "read",
    },
    {
      id: 11,
      chat_id: 3,
      sender_id: 1,
      content: "познакомимся?",
      created_at: "2024-06-06T13:31:11.558785",
      status: "read",
    },
    {
      id: 12,
      chat_id: 3,
      sender_id: 2,
      content: "скибиди доп ес ес",
      created_at: "2024-06-06T14:31:11.558785",
      status: "read",
      reply_to: 11,
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

  await knex("auth").insert([
    {
      user_id: 1,
    },
    {
      user_id: 2,
    },
    {
      user_id: 3,
    },
  ]);
}
