import { Either, left, right, UseCase } from "../domain/helpers";
import { CatsRepository, CatsRepositoryToken } from "../domain/repositories/CatsRepository";
import { injectable, inject } from 'tsyringe'

@injectable()
export class GetCatsUseCase implements UseCase {
  constructor(@inject(CatsRepositoryToken) private catsRepository: CatsRepository) { }

  async execute(): Promise<Either<Error, any>> {
    const cats = this.catsRepository.getCats()
    if (!cats) return left(Error("Error getting cats"))
    return right(cats)
  }
}