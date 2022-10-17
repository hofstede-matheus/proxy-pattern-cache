import "reflect-metadata";
import './di/main-container'
import { container } from 'tsyringe'
import { CatsController } from './controllers/CatsController'

const catsController = container.resolve(CatsController)

async function start() {
  const cats = await catsController.getCats()

  console.log(cats)
}

start()