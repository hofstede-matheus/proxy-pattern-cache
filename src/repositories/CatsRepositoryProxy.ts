import { inject, injectable } from "tsyringe";
import { Cat } from "../domain/entities/Cat";
import { InMemmoryCacheProxy, generateProxeeToken } from "../domain/helpers";
import { CatsRepository, CatsRepositoryToken } from "../domain/repositories/CatsRepository";

@injectable()
export class CatsRepositoryProxy extends InMemmoryCacheProxy implements CatsRepository {
  constructor(@inject(generateProxeeToken(CatsRepositoryToken)) private catsRepository: CatsRepository) {
    super();
  }

  async getCats(): Promise<Cat[] | undefined> {
    const result = this.proxy<Cat[]>(this.catsRepository.getCats);
    return result;
  }
}