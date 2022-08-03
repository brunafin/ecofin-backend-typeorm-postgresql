import { AppDataSource } from "../data-source";
import { Monthly } from "../entities/Monthly";

export const monthlyRepository = AppDataSource.getRepository(Monthly);

