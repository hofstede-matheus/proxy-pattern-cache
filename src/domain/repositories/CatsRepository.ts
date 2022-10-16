import { Cat } from "../entities/Cat";

export interface CatsRepository {
  getCats(): Promise<Cat[] | undefined>
}

export const CatsRepositoryToken = Symbol('CatsRepository')
