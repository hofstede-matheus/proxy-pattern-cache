import "reflect-metadata";
import './di/containers'
import { inject, container } from 'tsyringe'
import { CatsController } from './controllers/CatsController'
import { GetCatsUseCase } from "./interactors/GetCatsUseCase";
import { InMemmoryCatsRepository } from "./repositories/InMemmoryCatsRepository";

const catsController = container.resolve(CatsController)

async function start() {
  const cats = await catsController.getCats()

  console.log(cats)
}

start()