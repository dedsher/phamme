import knex from "knex";
import config from "../../knexfile";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = config[environment];

const db = knex(connectionConfig);

async function fixSequence() {
  try {
    await db.raw(`
        SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"));
        SELECT setval('message_id_seq', (SELECT MAX(id) FROM message));
      `);
    console.log("Sequence fixed successfully.");
  } catch (err) {
    console.error("Error fixing sequence:", err);
  }
}

fixSequence();

export default db;
