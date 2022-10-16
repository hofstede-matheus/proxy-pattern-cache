import { injectable } from "tsyringe";
import { Cat } from "../domain/entities/Cat";
import { CatsRepository } from "../domain/repositories/CatsRepository";
import { promises as fs } from "fs";
import path from 'path';

@injectable()
export class FileCatsRepository implements CatsRepository {
  async getCats(): Promise<Cat[] | undefined> {
    const data = await fs.readFile(path.join(__dirname, './cats.txt'), 'utf-8');
    const lines = data.split('\n')
    const cats: Cat[] = lines.map(it => {
      const cat = it.split(' ')
      return {
        name: cat[0],
        breedName: cat[1]
      }
    })
    return cats
  }
}