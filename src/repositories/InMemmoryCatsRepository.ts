import { Cat } from "../domain/entities/Cat";
import { CatsRepository } from "../domain/repositories/CatsRepository";
import { injectable } from 'tsyringe'

@injectable()
export class InMemmoryCatsRepository implements CatsRepository {
  async getCats(): Promise<Cat[] | undefined> {
    return [
      {
        name: "cat1",
        breedName: "Persa"
      },
      {
        name: "cat1",
        breedName: "Sphynx"
      }
    ]
  }
}