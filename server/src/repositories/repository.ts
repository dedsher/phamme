import { TYPES } from "../types/inversify";
import { inject, injectable } from "inversify";
import { Knex } from "knex";

@injectable()
export default class Repository {
    constructor (@inject(TYPES.Db) knex: Knex) {}
}