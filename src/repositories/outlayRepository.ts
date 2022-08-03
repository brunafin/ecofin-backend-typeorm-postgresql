import { AppDataSource } from "../data-source";
import { Outlay } from "../entities/Outlay";

export const outlayRepository = AppDataSource.getRepository(Outlay);