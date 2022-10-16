import { GetCatsUseCase } from "../interactors/GetCatsUseCase";
import { injectable, inject } from 'tsyringe'

@injectable()
export class CatsController {
  constructor(@inject(GetCatsUseCase) private getCatsUseCase: GetCatsUseCase) { }
  async getCats(): Promise<string[]> {
    const cats = await this.getCatsUseCase.execute()

    if (cats.isLeft()) throw cats.value
    return cats.value
  }
}